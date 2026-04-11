"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send } from "lucide-react";

export function ChatAssistant({ documentContext = "", documentType = "" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 25000);
    return () => clearTimeout(timer);
  }, []);

  // Hide the global layout instance if we are on the document page
  // The document page explicitly renders its own instance with the documentContext prop
  if (!documentContext && pathname?.includes("/document")) {
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const currentHistory = [...messages];
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          documentContext,
          history: currentHistory,
          language: JSON.parse(localStorage.getItem("selectedLanguage"))?.value || "English"
        }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages([...newHistory, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newHistory, { role: "assistant", content: "Sorry, I received an empty response." }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages([...newHistory, { role: "assistant", content: "Sorry, an error occurred while sending your message. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[24px] right-[24px] z-[200] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[400px] h-[500px] bg-white border border-border shadow-2xl flex flex-col rounded overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-4 py-3 text-white flex justify-between items-center">
            <span className="font-bold">CivilEase Assistant</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-white">
            {messages.length === 0 && (
              <p className="text-text-muted text-center text-sm mt-4">
                Namaste! How can I help you today?
              </p>
            )}
            
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`mb-4 max-w-[80%] p-3 text-sm rounded ${
                  m.role === "user" 
                    ? "self-end bg-secondary text-white rounded-tr-none" 
                    : "self-start bg-gray-100 text-primary font-medium rounded-tl-none border border-border/50"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="mb-4 self-start bg-gray-100 text-primary font-medium border border-border/50 p-3 text-sm rounded rounded-tl-none">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={documentType ? `Ask me anything about your ${documentType} notice...` : "Ask me anything about this document..."}
              className="flex-1 border border-border rounded px-3 py-2 text-sm text-text-main focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-secondary text-white p-2 rounded hover:bg-opacity-90 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hint Pop-up */}
      {showHint && !isOpen && (
        <div className="absolute bottom-[70px] right-0 mb-2 w-48 bg-secondary text-white p-3 rounded-xl shadow-xl animate-float text-xs font-bold transition-all">
          <div className="relative">
            Hey! Need any help with this document?
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(false);
              }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-secondary flex items-center justify-center border border-secondary"
            >
              <X className="w-2.5 h-2.5" />
            </button>
            {/* Arrow */}
            <div className="absolute -bottom-4 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-secondary"></div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowHint(false);
        }}
        className="w-14 h-14 rounded-full bg-secondary text-primary flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7 text-primary" />}
      </button>
    </div>
  );
}
