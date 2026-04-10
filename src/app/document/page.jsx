"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGemini } from "@/hooks/useGemini";
import { useSpeech } from "@/hooks/useSpeech";
import { CheckCircle2, Building2, Volume2, VolumeX, ArrowLeft, FileText, Share2, AlertCircle } from "lucide-react";
import mermaid from "mermaid";
import { ChatAssistant } from "@/components/shared/ChatAssistant";

export default function DocumentResultPage() {
  const router = useRouter();
  const { result } = useGemini();
  const { speaking, speak, stop } = useSpeech();
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (!result) {
      router.push("/");
    }
  }, [result, router]);

  useEffect(() => {
    if (result && result.mermaid && mermaidRef.current) {
      try {
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'neutral',
          fontFamily: 'inherit'
        });
        
        mermaid.render('mermaid-svg-' + Date.now(), result.mermaid)
          .then(({ svg }) => {
            if (mermaidRef.current) mermaidRef.current.innerHTML = svg;
          })
          .catch((err) => {
            console.error("Mermaid syntax error:", err);
            if (mermaidRef.current) {
              mermaidRef.current.innerHTML = "<p class='text-text-muted italic p-4'>Information map simplified.</p>";
            }
          });
      } catch (err) {
        console.error("Mermaid init error:", err);
      }
    }
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="text-xl font-bold text-primary">Preparing Documentation...</div>
      </div>
    );
  }

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      speak(result.simplified_summary || "No summary available.", result.language || "English");
    }
  };

  const documentContextStr = `Summary: ${result.simplified_summary || "None"}\nSteps: ${result.procedural_requirements?.verification_steps?.join(", ") || "None"}`;

  return (
    <>
    <div className="min-h-screen bg-surface py-12 px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto pb-32">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-xl gov-shadow border-b-4 border-secondary">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <button onClick={() => router.push("/")} className="text-primary hover:text-secondary"><ArrowLeft className="w-6 h-6" /></button>
               <h1 className="text-4xl font-black text-primary tracking-tight">Analysis Result</h1>
            </div>
            <p className="text-text-muted font-medium ml-9 uppercase text-[10px] tracking-[0.2em]">Official Government Document Breakdown</p>
          </div>
          <div className="flex gap-4">
             <button
               onClick={handleSpeak}
               className={`flex items-center gap-3 px-8 py-3 rounded-md font-bold text-white transition-all shadow-lg ${
                 speaking ? "bg-primary" : "bg-secondary"
               }`}
             >
               {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
               {speaking ? "Stop Narration" : "Listen in " + result.language}
             </button>
             <button className="p-3 bg-white border-2 border-primary text-primary rounded-md hover:bg-surface transition-all">
                <Share2 className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-8">
            
            {/* Summary Card */}
            <div className="p-8 rounded-xl bg-white gov-shadow navy-border-left">
              <h2 className="text-xl font-black text-primary mb-5 flex items-center gap-3">
                <div className="w-2 h-6 bg-secondary rounded-full"></div>
                Executive Summary
              </h2>
              <p className="text-text-main leading-relaxed text-lg">
                {result.simplified_summary || "Could not generate summary."}
              </p>
            </div>

            {/* Application Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documents Required */}
              <div className="p-8 rounded-xl bg-white gov-shadow border-t-4 border-primary">
                <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                   <FileText className="w-5 h-5 text-secondary" /> Required Documents
                </h2>
                <ul className="flex flex-col gap-4">
                  {result.procedural_requirements?.mandatory_documents?.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-main text-sm font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Financials */}
              {result.monetary_elements && (
                <div className="p-8 rounded-xl bg-white gov-shadow border-t-4 border-secondary">
                  <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                     <AlertCircle className="w-5 h-5 text-secondary" /> Financial Obligations
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-surface border border-border flex justify-between items-center">
                      <span className="text-text-muted text-[10px] font-black uppercase tracking-wider">Demand</span>
                      <span className="text-primary font-black text-xl">{result.monetary_elements.currency} {result.monetary_elements.amount_demand}</span>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 flex justify-between items-center text-secondary">
                      <span className="text-[10px] font-black uppercase tracking-wider">Deadline</span>
                      <span className="font-black text-sm">{result.monetary_elements.payment_deadline || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Plan */}
            <div className="p-8 rounded-xl bg-white gov-shadow navy-border-left">
              <h2 className="text-xl font-black text-primary mb-6">Step-by-Step Action Plan</h2>
              <div className="flex flex-col gap-4">
                {result.procedural_requirements?.verification_steps?.length > 0 ? (
                  result.procedural_requirements.verification_steps.map((step, index) => (
                    <div key={index} className="flex gap-6 p-6 rounded-xl bg-surface border border-border">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-black shadow-md shadow-primary/20">
                        {index + 1}
                      </div>
                      <p className="text-text-main font-medium leading-relaxed self-center">{step}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-text-muted italic">No specific steps found.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-8">
            
            {/* Authority Card */}
            <div className="p-8 rounded-xl bg-primary text-white shadow-xl shadow-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-5 h-5 text-secondary" />
                <h2 className="text-[10px] font-black uppercase tracking-widest opacity-70">Issuing Authority</h2>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <p className="text-white font-black text-xl leading-snug">
                  {result.document_identity?.issuing_authority || "Unknown Entity"}
                </p>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-3">{result.document_identity?.department}</p>
              </div>
              
              {result.contact_information?.helpline && (
                 <div className="flex items-center gap-3 text-sm text-white/50 p-4 bg-black/10 rounded-lg">
                   <strong>Helpline:</strong> <span className="text-white font-bold">{result.contact_information.helpline}</span>
                 </div>
              )}
            </div>

            {/* Flowchart Card */}
            <div className="p-8 rounded-xl bg-white gov-shadow border-t-4 border-primary flex-grow min-h-[500px]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-primary">Process Flow</h2>
                <div className="px-3 py-1 bg-surface text-[10px] text-primary font-black uppercase rounded border border-border">Interactive</div>
              </div>
              <div 
                ref={mermaidRef} 
                className="mermaid w-full bg-surface rounded-xl p-8 overflow-auto flex justify-center text-primary border border-border/50"
              >
              </div>
            </div>

            {/* Legal Consequences */}
            {result.legal_consequences && (
              <div className="p-6 rounded-xl bg-red-50 border-l-[6px] border-red-600">
                <h3 className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-3">Notice of Penalty</h3>
                <p className="text-sm text-red-900 leading-relaxed font-bold italic">{result.legal_consequences.non_payment_penalty}</p>
              </div>
            )}
            
          </div>
      </div>
    </div>
  </div>
  <ChatAssistant documentContext={documentContextStr} />
  </>
);
}
