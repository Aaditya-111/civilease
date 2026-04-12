"use client";

import { Shield, Cpu, Users, Smartphone, Globe, Landmark } from "lucide-react";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "AI Document Simplifier",
      desc: "Instant breakdown of complex legal notices into citizen-friendly summaries and action steps.",
      icon: <Cpu className="w-10 h-10" />,
      tag: "FLAGSHIP"
    },
    {
      title: "Regional Voice Guidance",
      desc: "Native language narration for all government documents, ensuring accessibility for all demographics.",
      icon: <Smartphone className="w-10 h-10" />,
      tag: "ACCESSIBILITY"
    },
    {
      title: "Interactive Journey Maps",
      desc: "Visual flowcharts that guide citizens through every step of a government process in real-time.",
      icon: <Globe className="w-10 h-10" />,
      tag: "VISUAL"
    },
    {
      title: "Security Verified API",
      desc: "Enterprise-grade document parsing for government departments and municipal bodies.",
      icon: <Shield className="w-10 h-10" />,
      tag: "ENTERPRISE"
    },
    {
      title: "Community Assistance",
      desc: "Distributed support systems for ward-level compliance and citizen local aid.",
      icon: <Users className="w-10 h-10" />,
      tag: "SOCIAL"
    },
    {
      title: "Governance Integration",
      desc: "Direct bridges between citizen inquiries and municipal department clarifications.",
      icon: <Landmark className="w-10 h-10" />,
      tag: "GOV-TECH"
    }
  ];

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-primary/20 mb-6 inline-block">
                Platform Solutions
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter uppercase mb-8 leading-none">
                Empowering <br/> The Citizenry.
            </h1>
            <p className="max-w-2xl mx-auto text-text-muted text-lg font-medium leading-relaxed">
                CivilEase provides a suite of advanced AI technologies designed to simplify governance and clarify the citizen-state relationship.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, i) => (
                <div key={i} className="group p-10 bg-white rounded-3xl gov-shadow border border-border/50 hover:border-secondary transition-all hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        {s.icon}
                    </div>
                    <span className="text-[9px] font-black text-secondary tracking-widest uppercase mb-4 block">{s.tag}</span>
                    <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tighter">{s.title}</h3>
                    <p className="text-text-muted font-medium text-sm leading-relaxed">{s.desc}</p>
                    <div className="mt-8 pt-8 border-t border-border/50 flex items-center justify-between">
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary flex items-center gap-2 transition-colors">
                            Learn More <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
