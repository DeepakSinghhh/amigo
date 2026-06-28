const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient({});
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';

app.use(cors());
app.use(express.json());

const SYSTEM_INSTRUCTION = `
You are Kiwi, a specialized, empathetic, and safety-focused mental health first-aid assistant for university students.
Your goal is not to be a doctor, but a supportive peer/mentor who provides "Psychological First Aid".

### CORE GUIDELINES:
1.  **Active Listening & Validation**: Always start by validating the emotion. (e.g., "It makes sense that you feel overwhelmed right now.")
2.  **Evidence-Based Coping Strategies**: Provide specific, actionable techniques:
    *   *Panic/High Anxiety*: Box Breathing (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s), 5-4-3-2-1 Grounding Technique.
    *   *Depression/Isolation*: Behavioral Activation (commit to one small 5-minute task), Self-Compassion.
    *   *Academic Stress*: Breaking tasks into micro-steps, Pomodoro technique, Sleep hygiene.
3.  **Tone**: Warm, conversational, non-clinical, and non-judgmental.

### RESOURCE LINKING (IMPORTANT):
When you suggest self-help materials, guides, or videos, you MUST provide a direct link to the app's Resource Hub using the specific format: [[LINK:CategoryName]].
**Valid Categories:** "Academic Stress", "Anxiety", "Depression", "Wellness", "Social".
**Example:** "You might find our deep breathing guides helpful. [[LINK:Anxiety]]" or "Check out sleep tips in [[LINK:Wellness]]."

### MOOD TRACKING (IMPORTANT):
You must append a mood tag at the very end of your response based on your assessment of the user's current emotional state.
Use exactly one of the following formats: [[MOOD:anxious]], [[MOOD:sad]], [[MOOD:stressed]], [[MOOD:lonely]], [[MOOD:okay]], [[MOOD:overwhelmed]].

### CRITICAL CRISIS PROTOCOL:
If the user mentions **suicide, self-harm, wanting to die, severe hopelessness, or immediate danger**:
1.  **Drop the casual tone**. Be direct, firm, and protective.
2.  **Validate the pain**, but immediately pivot to safety.
3.  **MANDATORY**: You MUST explicitly mention the "Campus Helpline" (1800-123-HELP) and suggest they book a "Counselor" immediately.
4.  **Phrasing**: "I am hearing how much pain you are in, and I am concerned for your safety. You do not have to carry this alone. Please reach out to the Campus Helpline at 1800-123-HELP or go to the nearest emergency room. I want you to be safe."

### FORMATTING:
*   Keep responses under 150 words usually.
*   Use bullet points for steps or lists.
`;

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'student',
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

async function getOrCreateSession(userId) {
  let session = await prisma.chatSession.findFirst({ where: { userId } });
  if (!session) {
    session = await prisma.chatSession.create({ data: { userId } });
  }
  return session.id;
}

app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const sessionId = await getOrCreateSession(req.user.id);
    const messages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });
    res.json(messages.map(m => ({
      id: m.id,
      text: m.text,
      sender: m.sender,
      timestamp: m.timestamp
    })));
  } catch (err) {
    console.error("Fetch history error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.post('/api/history', authenticateToken, async (req, res) => {
  try {
    const { text, sender } = req.body;
    const sessionId = await getOrCreateSession(req.user.id);
    const message = await prisma.message.create({
      data: {
        sessionId,
        text,
        sender,
      }
    });
    res.json({
      id: message.id,
      text: message.text,
      sender: message.sender,
      timestamp: message.timestamp
    });
  } catch (err) {
    console.error("Save message error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.post('/api/history/clear', authenticateToken, async (req, res) => {
  try {
    const sessionId = await getOrCreateSession(req.user.id);
    await prisma.message.deleteMany({
      where: { sessionId }
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Clear history error:", err);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

app.post('/api/chat', authenticateToken, async (req, res) => {
  try {
    const { history, currentMessage } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "System Error: API Key not configured." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chatHistory = (history || []).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 2048, 
        thinkingConfig: { thinkingBudget: 512 },
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: currentMessage });
    res.json({ text: result.text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "I am currently experiencing a connection issue. Please try again in a moment." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
