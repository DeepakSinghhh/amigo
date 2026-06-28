import { Message } from "../types";

export const sendMessageToAI = async (history: Message[], currentMessage: string): Promise<string> => {
  try {
    const token = localStorage.getItem('chaitanya_token');
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        history,
        currentMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      return data.error;
    }
    
    return data.text || "I'm listening, but I'm having trouble processing that right now. Could you say it again?";

  } catch (error) {
    console.error("Gemini Backend Proxy Error:", error);
    return "I am currently experiencing a connection issue. Please try again in a moment, or reach out to the Campus Helpline (1800-123-HELP) if this is urgent.";
  }
};