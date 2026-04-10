"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-md border-b border-outline/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="text-2xl font-extrabold tracking-tight text-primary font-headline">
          <Link href="/">CivicEase</Link>
        </div>
        
        <div className="hidden md:flex gap-10 items-center">
          <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-headline text-sm uppercase tracking-widest" href="#">Platform</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Solutions</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Governance</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Resources</Link>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button className="px-5 py-2 text-on-surface-variant hover:text-primary transition-all font-headline font-bold text-sm">Sign In</button>
          <button className="px-8 py-3 bg-primary text-white rounded-full font-headline font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Get Started</button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden p-1"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 rounded bg-on-surface-variant transition-all duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-on-surface-variant transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-on-surface-variant transition-all duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-outline/10 md:hidden bg-white/95">
          <div className="flex flex-col gap-4 px-8 py-6">
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Platform</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Solutions</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Governance</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-headline text-sm uppercase tracking-widest" href="#">Resources</Link>
            <div className="mt-4 flex flex-col gap-3">
              <button className="w-full px-5 py-2 text-on-surface-variant hover:text-primary transition-all font-headline font-bold text-sm text-left">Sign In</button>
              <button className="w-full px-8 py-3 bg-primary text-white rounded-full font-headline font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
