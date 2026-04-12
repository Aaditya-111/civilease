"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { ChatAssistant } from "@/components/shared/ChatAssistant";
import AuthModal from "@/components/shared/AuthModal";

export default function AuthWrapper({ children }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("civileaseUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <>
      <Navbar 
        onSignInClick={() => setIsAuthOpen(true)} 
        user={user} 
        onSignOut={() => {
          localStorage.removeItem("civileaseUser");
          setUser(null);
        }}
      />
      <main className="flex-1 pt-20">{children}</main>
      <ChatAssistant />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </>
  );
}
