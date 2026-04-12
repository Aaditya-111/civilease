"use client";

import { Scale, FileCheck, Landmark, ShieldCheck, Search, Award } from "lucide-react";

export default function GovernancePage() {
  const pillars = [
    { title: "Transparency", desc: "Open access to document interpretation and procedural logic.", icon: <Search/> },
    { title: "Accountability", desc: "Clear identification of responsible government departments.", icon: <ShieldCheck/> },
    { title: "Inclusion", desc: "Multilingual tools that ensure no citizen is left behind.", icon: <Award/> }
  ];

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <div className="flex-1">
                <div className="w-16 h-2 bg-secondary mb-8"></div>
                <h1 className="text-7xl md:text-8xl font-black text-primary tracking-tighter uppercase mb-10 leading-none">
                    Digital <br/> Sovereignty.
                </h1>
                <p className="text-xl text-text-muted font-medium leading-relaxed mb-10">
                    Our governance framework is built on the pillars of the Indian digital identity, ensuring trust, privacy, and absolute clarity in every interaction.
                </p>
                <div className="flex gap-4">
                    <button className="bg-primary text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">Read Charter</button>
                    <button className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest">Compliance</button>
                </div>
            </div>
            <div className="w-full lg:w-1/3 grid grid-cols-1 gap-6">
                {pillars.map((p, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl gov-shadow border-l-8 border-primary flex items-center gap-6">
                        <div className="text-secondary">{p.icon}</div>
                        <div>
                            <h3 className="font-black text-primary uppercase text-sm">{p.title}</h3>
                            <p className="text-xs text-text-muted font-medium">{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="p-14 bg-white rounded-3xl gov-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"></div>
                <Scale className="w-12 h-12 text-secondary mb-8" />
                <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-6">Legal Framework</h2>
                <p className="text-text-muted font-medium leading-relaxed mb-8 text-lg">
                    CivilEase operates within the ambit of the Information Technology Act and the latest Indian Govt. Digital Personal Data Protection (DPDP) norms.
                </p>
                <div className="space-y-4">
                    {["End-to-end Encryption", "Consent-based analysis", "No persistent storage of citizen documents"].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-primary">
                            <FileCheck className="w-5 h-5 text-success" /> {f}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-14 bg-primary text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                 <Landmark className="w-12 h-12 text-secondary mb-8" />
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Departmental Hub</h2>
                 <p className="text-white/70 font-medium leading-relaxed mb-10 text-lg">
                    We maintain secure data bridges with municipal and central portals to ensure that the procedural text analyzed is always current and authoritative.
                 </p>
                 <button className="bg-secondary text-primary px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all">Connect Department</button>
            </div>
        </div>
      </div>
    </div>
  );
}
