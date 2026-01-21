import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, AlertTriangle, Phone, ExternalLink, Sparkles, ArrowRight, Trash2, Settings, Download, X as XIcon, Volume2, Moon, Bird, Play } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import FlappyLlama from './FlappyLlama';

const CHAT_STORAGE_KEY = 'amigo_chat_history';

const SUGGESTED_TOPICS = [
  "I'm feeling anxious about exams",
  "I feel lonely and isolated",
  "I can't sleep properly",
  "I'm having a panic attack",
  "How do I manage burnout?",
  "I need to talk to a counselor"
];

const FEELING_OPTIONS = [
  { label: 'Anxious', emoji: '😰' },
  { label: 'Stressed', emoji: '😫' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Lonely', emoji: '😔' },
  { label: 'Okay', emoji: '😌' },
  { label: 'Overwhelmed', emoji: '😵‍💫' }
];

// Custom Cute Kiwi Icon - Updated color for light mode
const KiwiIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5c-5 0-9 4-9 9 0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9" />
    <path d="M19 14c2.5 0 3 2.5 3 2.5" />
    <circle cx="16" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <path d="M10 20l-1.5 3" />
    <path d="M14 20l1.5 3" />
  </svg>
);

interface ChatbotProps {
  onNavigateToResources: (category: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onNavigateToResources }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        } catch (e) {
          console.error("Error parsing chat history:", e);
        }
      }
    }
    return [{
      id: '1',
      text: "Hi there. I'm Kiwi, your digital companion. Whether you're feeling stressed, lonely, or just need to vent, I'm here to listen without judgment. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    }];
  });
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isTyping]);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your conversation history? This cannot be undone.")) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        text: "Hi there. I'm Kiwi, your digital companion. Whether you're feeling stressed, lonely, or just need to vent, I'm here to listen without judgment. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => `[${m.timestamp.toLocaleString()}] ${m.sender}: ${m.text}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kiwi-chat-history-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    // Automatically open game when AI starts thinking
    setIsGameOpen(true);

    const aiResponseText = await sendMessageToAI(messages, textToSend);

    setIsLoading(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isCrisisMessage = (text: string) => {
    return text.includes("1800-123-HELP") || 
           text.toLowerCase().includes("suicide") || 
           text.toLowerCase().includes("emergency room") ||
           text.toLowerCase().includes("immediate danger");
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\[\[LINK:[^\]]+\]\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('[[LINK:') && part.endsWith(']]')) {
        const category = part.replace('[[LINK:', '').replace(']]', '');
        return (
          <button
            key={index}
            onClick={() => onNavigateToResources(category)}
            className="inline-flex items-center gap-1.5 mx-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-all align-middle -mt-0.5 group"
          >
            <Sparkles size={12} className="text-blue-500" />
            View {category}
            <ArrowRight size={10} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/50 overflow-hidden backdrop-blur-md relative">
      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-full text-white shadow-md">
            <KiwiIcon size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-900 tracking-tight">Kiwi</h2>
            <p className="text-gray-500 text-xs font-medium">AI Wellness Companion</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button
             onClick={() => setIsGameOpen(true)}
             className="text-gray-500 hover:text-green-500 transition-colors p-2 hover:bg-green-50 rounded-full"
             title="Play Relaxing Game"
           >
             <Bird size={20} />
           </button>

           <button
            onClick={() => setIsProfileOpen(true)}
            className="text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="Chat Settings & Profile"
          >
            <Settings size={20} />
          </button>

          <button
            onClick={handleClearChat}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="Clear Chat History"
          >
            <Trash2 size={18} />
          </button>
          
          <div className="hidden sm:flex bg-orange-50 text-orange-600 border border-orange-100 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full items-center gap-1 font-bold">
            <AlertTriangle size={12} />
            <span>Not a Crisis Service</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2 animate-fade-in-up">
            <div
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 text-white shadow-sm mt-auto">
                    <KiwiIcon size={14} />
                  </div>
                )}
                
                <div
                  className={`px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' // iMessage blue
                      : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.sender === 'user' ? msg.text : renderMessageText(msg.text)}
                </div>
              </div>
            </div>

            {/* Dynamic Crisis Resource Card */}
            {msg.sender === 'ai' && isCrisisMessage(msg.text) && (
               <div className="max-w-[85%] sm:max-w-[70%] ml-11 animate-fade-in">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-sm">
                    <h4 className="flex items-center gap-2 text-red-600 font-bold text-sm mb-2">
                      <AlertTriangle size={16} />
                      Immediate Support Required
                    </h4>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      Your safety is our priority. Please connect with these resources immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-200">
                        <Phone size={16} />
                        Call 1800-123-HELP
                      </button>
                      <button className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                        <ExternalLink size={16} />
                        Emergency Booking
                      </button>
                    </div>
                  </div>
               </div>
            )}
          </div>
        ))}
        
        {/* Feeling Options */}
        {messages.length === 1 && !isLoading && !isTyping && (
          <div className="flex flex-col space-y-4 ml-11 animate-fade-in max-w-[90%] sm:max-w-[80%]">
             <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider ml-1">How are you feeling?</p>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {FEELING_OPTIONS.map((option) => (
                 <button
                   key={option.label}
                   onClick={() => handleSendMessage(`I am feeling ${option.label.toLowerCase()}`)}
                   className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md rounded-2xl transition-all group text-left"
                 >
                   <span className="text-2xl group-hover:scale-110 transition-transform">{option.emoji}</span>
                   <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{option.label}</span>
                 </button>
               ))}
             </div>
          </div>
        )}

        {(isLoading || isTyping) && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[75%] gap-3 items-end">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-sm">
                <KiwiIcon size={14} />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-gray-400 text-xs font-medium ml-1">
                  {isLoading ? "Thinking..." : "Typing..."}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {/* Suggested Topics Chips - Horizontal Scroll */}
        {!isLoading && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-gradient-right">
            {SUGGESTED_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(topic)}
                className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        <div className="relative flex items-end gap-2 bg-gray-50 p-1.5 rounded-[24px] border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all shadow-inner">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full resize-none bg-transparent p-3 text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none max-h-32 min-h-[44px] ml-1"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || isTyping || !inputText.trim()}
            className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          AI generated content may be inaccurate. Not a substitute for professional medical advice.
        </p>
      </div>

       {/* Profile Side Panel */}
       {isProfileOpen && (
        <div className="absolute inset-0 z-50 flex justify-end">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
             onClick={() => setIsProfileOpen(false)}
           ></div>
           
           {/* Panel */}
           <div className="relative w-full sm:w-80 h-full bg-white shadow-2xl border-l border-gray-100 overflow-y-auto flex flex-col">
              <div className="p-6 space-y-8 flex-1">
                 <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl text-gray-900 tracking-tight">Chat Profile</h3>
                    <button onClick={() => setIsProfileOpen(false)} className="text-gray-400 hover:text-gray-900 bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors">
                       <XIcon size={20} />
                    </button>
                 </div>

                 {/* User Info */}
                 <div className="flex flex-col items-center space-y-3 py-2">
                    <div className="w-24 h-24 rounded-full bg-gray-50 p-1 ring-2 ring-blue-100">
                       <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="text-center">
                       <p className="font-bold text-gray-900 text-lg">Alex Student</p>
                       <p className="text-sm text-gray-500 font-medium">alex@university.edu</p>
                    </div>
                 </div>

                 {/* Stats */}
                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-900">Total Messages</span>
                    <span className="text-2xl font-bold text-blue-600">{messages.length}</span>
                 </div>

                 {/* History Actions */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">History Management</h4>
                    <button 
                       onClick={handleExportChat}
                       className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-gray-700 text-sm font-semibold border border-gray-100 group shadow-sm bg-white"
                    >
                       <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Download size={18} />
                       </div>
                       Download Transcript
                    </button>
                     <button 
                       onClick={() => {
                          handleClearChat();
                          setIsProfileOpen(false);
                       }}
                       className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600 text-sm font-semibold border border-gray-100 group shadow-sm bg-white"
                    >
                       <div className="bg-red-50 text-red-500 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                          <Trash2 size={18} />
                       </div>
                       Clear Conversation
                    </button>
                 </div>
                 
                 {/* Preferences Mock */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Preferences</h4>
                     <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 text-gray-700">
                           <div className="bg-purple-50 text-purple-600 p-1.5 rounded-lg">
                              <Volume2 size={16} />
                           </div>
                           <span className="text-sm font-semibold">Sound Effects</span>
                        </div>
                        <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                           <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm transition-transform"></div>
                        </div>
                     </div>
                 </div>
              </div>

              {/* Panel Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                 <p className="text-xs text-gray-400 text-center font-medium">
                    AmiGo Chat v1.2 • Secure & Confidential
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* Game Overlay */}
      {isGameOpen && <FlappyLlama onClose={() => setIsGameOpen(false)} isThinking={isLoading} variant="overlay" />}
    </div>
  );
};

export default Chatbot;