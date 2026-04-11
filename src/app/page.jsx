"use client";

import { FileUpload } from "@/components/dashboard/FileUpload";
import { useState } from "react";
import { FileText, Scale, BadgeInfo } from "lucide-react";

export default function Home() {
  const [activeSample, setActiveSample] = useState("");

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const samples = [
    {
      title: "Property Tax Notice",
      icon: <FileText className="w-5 h-5" />,
      text: `BRUHAT BENGALURU MAHANAGARA PALIKE
Property Tax Demand Notice — Financial Year 2025-26

To: Sri Ramesh Kumar Sharma
Property No: BBMP/KR/2024/04471
Site No. 14, 3rd Cross, Rajajinagar, Bengaluru - 560010

This notice is issued under Section 114 of the Karnataka Municipal Corporations Act, 1976, to inform you that a sum of Rs. 14,500/- (Rupees Fourteen Thousand Five Hundred Only) is outstanding as property tax for the financial year 2025-26. The amount includes the base tax of Rs. 12,200/- and library cess of Rs. 2,300/-.

You are hereby directed to pay the full outstanding amount on or before 31st May 2025 at the designated BBMP ward office or through the official online portal at bbmptax.karnataka.gov.in. Failure to remit payment within the stipulated period shall attract a penalty interest of 2% per month. 

In the event of continued non-payment beyond 60 days, the competent authority reserves the right to initiate attachment proceedings against the property. The property owner is advised to produce this notice along with previous tax paid receipts at the time of payment.

Reference: BBMP/ARO/WD34/2025/1147
Issued by: Assistant Revenue Officer, Ward No. 34, Rajajinagar`
    },
    {
      title: "Court Summons",
      icon: <Scale className="w-5 h-5" />,
      text: "IN THE COURT OF THE CIVIL JUDGE (SR. DIVISION), NEW DELHI. Civil Suit No. 892/2024. You are hereby summoned to appear in this court on 21st April 2024 at 10:30 AM to answer the claims of the plaintiff. Failure to appear will result in the case being decided ex-parte in your absence."
    },
    {
      title: "Ration Card Application",
      icon: <BadgeInfo className="w-5 h-5" />,
      text: "Department of Food and Civil Supplies. Application Status: PENDING. Requirement: The applicant (UIDAI: 89XX-XXXX) has failed to provide a valid income certificate for the current fiscal year. Please visit the Circle Office (Ward 14) with original Aadhar and updated Bank Passbook to proceed with E-KYC verification."
    }
  ];

  return (
    <>
      <section className="relative min-h-[850px] flex items-center bg-white overflow-hidden pt-12">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface border border-border">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-primary font-bold text-[10px] tracking-[0.2em] uppercase">Digital India Initiative</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-primary">
              Simplifying <span className="text-secondary text-stroke-primary">Governance</span> for Every Citizen.
            </h1>
            <p className="text-xl text-text-muted leading-relaxed max-w-lg">
              Upload any legal notice or government form. We translate complex bureaucracy into plain language and actionable steps.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => handleScrollTo('upload-section')}
                className="px-10 py-5 bg-secondary text-white rounded-md font-bold text-lg shadow-xl shadow-secondary/20 transition-all hover:-translate-y-1"
              >
                Start Your Analysis
              </button>
              <button 
                onClick={() => handleScrollTo('how-it-works')}
                className="px-10 py-5 bg-white text-primary border-2 border-primary rounded-md font-bold text-lg hover:bg-surface transition-all"
              >
                How it Works
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute -inset-20 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 w-[550px] h-[550px] flex items-center justify-center">
              {/* Primary 3D Image */}
              <img 
                src="/hero-building.png" 
                alt="Government Civil Infrastructure" 
                className="w-[450px] h-[450px] object-contain relative z-20 animate-float"
              />
              
              {/* Floating Assets removed for cleaner code in this turn */}
              <div className="absolute top-0 -left-10 w-32 h-32 bg-white rounded-2xl shadow-2xl border border-secondary/20 p-4 flex items-center justify-center animate-float-delayed z-30">
                 <span className="material-symbols-outlined text-6xl text-primary opacity-20">architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="upload-section" className="py-24 bg-surface border-y border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-4">Try a Sample Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              {samples.map((sample, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl border border-border group hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => {
                    setActiveSample(sample.text);
                    handleScrollTo('upload-section');
                  }}
                >
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {sample.icon}
                  </div>
                  <h4 className="font-bold text-primary text-sm mb-3">{sample.title}</h4>
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded group-hover:bg-primary group-hover:text-white transition-all">
                    Try Sample
                  </button>
                </div>
              ))}
            </div>
          </div>
          <FileUpload sampleText={activeSample} />
        </div>
      </section>

      <section id="how-it-works" className="py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-16">
          <div className="p-10 bg-surface rounded-2xl navy-border-left gov-shadow space-y-6">
            <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-xl">
              <span className="material-symbols-outlined text-3xl">summarize</span>
            </div>
            <h3 className="text-2xl font-bold">Plain Language</h3>
            <p className="text-text-muted leading-relaxed">Complex administrative jargon is stripped away, focusing only on the specific actions you need to take.</p>
          </div>
          <div className="p-10 bg-surface rounded-2xl navy-border-left gov-shadow space-y-6">
            <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-xl">
              <span className="material-symbols-outlined text-3xl">account_tree</span>
            </div>
            <h3 className="text-2xl font-bold">Visual Flows</h3>
            <p className="text-text-muted leading-relaxed">See your administrative journey mapped out visually, from document submission to final approval.</p>
          </div>
          <div className="p-10 bg-surface rounded-2xl navy-border-left gov-shadow space-y-6">
            <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-xl">
              <span className="material-symbols-outlined text-3xl">record_voice_over</span>
            </div>
            <h3 className="text-2xl font-bold">Voice Guidance</h3>
            <p className="text-text-muted leading-relaxed">Accessibility integrated using AI-powered narration in your own regional language dialect.</p>
          </div>
        </div>
      </section>

      <section className="py-40 bg-primary-dark relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">Empowering 1.4 Billion Indian Citizens</h2>
          <p className="text-2xl text-white/70 leading-relaxed font-light">CivilEase bridges the information gap, making public services more transparent and accessible through AI intelligence.</p>
          <button 
            onClick={() => handleScrollTo('upload-section')}
            className="px-16 py-6 bg-secondary text-white rounded-md font-black text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
             Analyze Your first Document
          </button>
        </div>
      </section>
    </>
  );
}
