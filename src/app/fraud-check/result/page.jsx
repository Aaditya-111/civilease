"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFraudCheck } from "@/hooks/useFraudCheck";
import { ShieldAlert, ShieldCheck, ArrowLeft, AlertTriangle, Crosshair, HelpCircle, Activity } from "lucide-react";

export default function FraudResultPage() {
  const router = useRouter();
  const { fraudResult } = useFraudCheck();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !fraudResult) {
      router.push("/fraud-check");
    }
  }, [fraudResult, router, hasMounted]);

  if (!hasMounted || !fraudResult) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="text-xl font-bold text-zinc-800 animate-pulse flex items-center gap-4">
           <Activity className="animate-spin text-red-600" /> Compiling Forensic Analysis...
        </div>
      </div>
    );
  }

  // Determine colors based on risk
  const getRiskColor = (level) => {
    switch (level?.toUpperCase()) {
      case "CRITICAL": return "text-red-700 bg-red-100 border-red-200";
      case "HIGH": return "text-orange-700 bg-orange-100 border-orange-200";
      case "MEDIUM": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "LOW": return "text-emerald-700 bg-emerald-100 border-emerald-200";
      default: return "text-zinc-700 bg-zinc-100 border-zinc-200";
    }
  };

  const getRiskHexIcon = (level) => {
    switch (level?.toUpperCase()) {
      case "CRITICAL": return <ShieldAlert className="w-16 h-16 text-red-600" />;
      case "HIGH": return <AlertTriangle className="w-16 h-16 text-orange-600" />;
      case "MEDIUM": return <HelpCircle className="w-16 h-16 text-yellow-600" />;
      case "LOW": return <ShieldCheck className="w-16 h-16 text-emerald-600" />;
      default: return <ShieldAlert className="w-16 h-16 text-zinc-600" />;
    }
  };

  const riskColorClass = getRiskColor(fraudResult.risk_level);

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto pb-32">
        
        {/* Header Section */}
        <div className="mb-10 flex space-x-4 items-center">
            <button onClick={() => router.push("/fraud-check")} className="p-2 bg-white text-zinc-600 rounded-full shadow hover:bg-zinc-100 transition-all"><ArrowLeft className="w-6 h-6" /></button>
            <span className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded">Fraud Analysis Report</span>
        </div>

        {/* Global Verdict Card */}
        <div className={`rounded-2xl p-10 md:p-14 border ${riskColorClass} shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12`}>
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 opacity-10 blur-2xl">
                {getRiskHexIcon(fraudResult.risk_level)}
            </div>

            <div className="flex-shrink-0 bg-white p-6 rounded-3xl shadow-lg border border-black/5">
                {getRiskHexIcon(fraudResult.risk_level)}
            </div>

            <div className="flex-1 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-black/10 text-xs font-black uppercase tracking-widest mb-4">
                    Risk Level: {fraudResult.risk_level}
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-snug mb-4 text-inherit">
                    {fraudResult.verdict}
                </h1>
                <p className="text-lg opacity-90 font-medium">
                    Analysis Confidence: {fraudResult.confidence_percentage}% • Score: {fraudResult.overall_risk_score}/100
                </p>
            </div>
        </div>

        {/* Detailed Explanation */}
        <div className="mt-10 bg-white p-10 rounded-xl shadow border border-zinc-200">
           <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Detailed Intelligence Summary</h2>
           <p className="text-xl leading-relaxed text-zinc-800 font-medium">{fraudResult.detailed_summary}</p>
        </div>

        {/* Grid layout for remaining info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            
            {/* Left Column */}
            <div className="space-y-10">
                {/* Red Flags */}
                <div className="bg-white p-8 rounded-xl shadow border-t-4 border-t-red-500 border border-zinc-200">
                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-zinc-900 mb-6">
                        <AlertTriangle className="text-red-500 w-6 h-6" /> Detected Red Flags
                    </h3>
                    
                    {fraudResult.red_flags?.length > 0 ? (
                        <div className="space-y-4">
                            {fraudResult.red_flags.map((flag, idx) => (
                                <div key={idx} className="p-4 bg-red-50 border border-red-100 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-red-900 ">{flag.category}</span>
                                        <span className="text-[9px] font-black tracking-widest uppercase bg-red-200 text-red-800 px-2 py-0.5 rounded">{flag.severity}</span>
                                    </div>
                                    <p className="text-red-800/80 text-sm mb-2">{flag.description}</p>
                                    <p className="text-xs text-red-900 bg-white p-2 rounded border border-red-100 italic">" {flag.evidence} "</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg text-zinc-500 italic text-center">
                            No critical red flags detected.
                        </div>
                    )}
                </div>

                {/* Urgency Manipulation */}
                <div className="bg-white p-8 rounded-xl shadow border border-zinc-200">
                     <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-zinc-900 mb-6">
                        <Crosshair className="text-zinc-600 w-6 h-6" /> Psychological Tactics
                    </h3>
                    <div className={`p-4 rounded-lg border ${fraudResult.urgency_manipulation?.detected ? 'bg-orange-50 border-orange-100' : 'bg-zinc-50 border-zinc-100'}`}>
                        {fraudResult.urgency_manipulation?.detected ? (
                            <>
                                <p className="text-orange-900 font-bold mb-3">Manipulative tactics detected:</p>
                                <ul className="list-disc pl-5 text-orange-800/80 space-y-1 mb-4">
                                    {fraudResult.urgency_manipulation?.tactics?.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                                <p className="text-sm text-orange-900/70">{fraudResult.urgency_manipulation?.details}</p>
                            </>
                        ) : (
                            <p className="text-zinc-500">No unusual psychological manipulation detected.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-10">
                {/* Authenticity Matrix */}
                <div className="bg-zinc-900 text-white p-8 rounded-xl shadow border border-zinc-800">
                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-white mb-8">
                        <ShieldCheck className="text-emerald-500 w-6 h-6" /> Quality & Authenticity Matrix
                    </h3>
                    
                    <div className="space-y-6">
                        {Object.entries(fraudResult.authenticity_analysis || {}).map(([key, data], idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{key.replace('_', ' ')}</span>
                                    <span className={`font-black ${data.score > 70 ? 'text-emerald-400' : data.score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {data.score}/100
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
                                    <div 
                                        className={`h-full ${data.score > 70 ? 'bg-emerald-500' : data.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${data.score}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">{data.details}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-emerald-50 p-8 rounded-xl shadow border border-emerald-100">
                    <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-emerald-900 mb-6">
                         Action Plan
                    </h3>
                    <div className="space-y-3">
                        {fraudResult.what_to_do_next?.map((step, idx) => (
                            <div key={idx} className="flex gap-4 p-4 bg-white border border-emerald-100 rounded-lg">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                    {idx + 1}
                                </span>
                                <p className="text-emerald-900 text-sm font-medium">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
}
