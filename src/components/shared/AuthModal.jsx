"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState("signin"); // "signin" or "signup"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (tab === "signup" && !formData.name)) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = {
      name: tab === "signup" ? formData.name : formData.email.split("@")[0],
      email: formData.email
    };

    localStorage.setItem("civileaseUser", JSON.stringify(userData));
    onAuthSuccess(userData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60" 
        onClick={onClose}
      ></div>

      {/* Card */}
      <div className="relative bg-white w-full max-w-md p-8 rounded-none shadow-2xl z-10 border-t-8 border-secondary">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-primary"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex gap-8 border-b border-border mb-8">
          <button 
            onClick={() => setTab("signin")}
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] ${tab === "signin" ? "text-primary border-b-4 border-primary" : "text-text-muted opacity-50"}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setTab("signup")}
            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] ${tab === "signup" ? "text-primary border-b-4 border-primary" : "text-text-muted opacity-50"}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {tab === "signup" && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Full Name</label>
              <input 
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Citizen Name"
                className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Email Address</label>
            <input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com"
              className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Password</label>
            <input 
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-secondary text-white font-black uppercase tracking-widest text-xs py-4 hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/10"
          >
            {tab === "signin" ? "Enter Platform" : "Join CivilEase"}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-text-muted leading-relaxed font-medium">
          By continuing, you agree to access official document analysis services under Digital India compliance norms.
        </p>
      </div>
    </div>
  );
}
