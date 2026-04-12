"use client";

import { useState } from "react";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! I am your CivilEase assistant. How can I help you with government procedures today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I've noted your query about '" + input + "'. Our specialized AI is processing typical Indian government timelines for this. Is there a specific document reference number I should look at?" 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl z-[150] transition-transform active:scale-95 group"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] bg-white rounded-2xl gov-shadow border border-border z-[150] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-white">
            <h3 className="text-lg font-bold">CivilEase Support</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-70">Official Citizen Assistant</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  m.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white text-text-main border border-border rounded-tl-none gov-shadow"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 text-sm focus:outline-none placeholder:text-text-muted/50"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-secondary text-white rounded-md hover:bg-secondary/90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
