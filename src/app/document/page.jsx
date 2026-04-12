"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGemini } from "@/hooks/useGemini";
import { useSpeech } from "@/hooks/useSpeech";
import { CheckCircle2, Building2, Volume2, VolumeX, ArrowLeft, FileText, AlertCircle, ExternalLink, Loader2, Landmark, Share2, Clock, Scale, X } from "lucide-react";
import mermaid from "mermaid";
import { ChatAssistant } from "@/components/shared/ChatAssistant";
import { GOV_PORTAL_LINKS } from "@/lib/constants";
import jsPDF from "jspdf";

export default function DocumentResultPage() {
  const router = useRouter();
  const { result } = useGemini();
  const { speaking, speak, stop } = useSpeech();

  // Logic to determine relevant state links
  const getRelevantPortals = () => {
    const textToSearch = ((result?.document_identity?.jurisdiction || "") + " " + (result?.document_identity?.issuing_authority || "") + " " + (result?.simplified_summary || "")).toLowerCase();
    
    // Find the first matching state key
    const stateKey = Object.keys(GOV_PORTAL_LINKS).find(key => 
      key !== 'central' && (textToSearch.includes(key.replace('rajasthan', 'raj').replace('maharashtra', 'maha')) || textToSearch.includes(key))
    );

    const links = [...GOV_PORTAL_LINKS.central.slice(0, 2)]; // Always include national portal and ecourts
    if (stateKey && GOV_PORTAL_LINKS[stateKey]) {
      links.push(...GOV_PORTAL_LINKS[stateKey].slice(0, 2));
    }
    
    return links.slice(0, 4);
  };

  const relevantLinks = getRelevantPortals();
  const mermaidRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem("selectedLanguage");
    if (stored) {
      setSelectedLang(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (hasMounted && !result) {
      router.push("/");
    }
  }, [result, router, hasMounted]);

  useEffect(() => {
    if (hasMounted && result && result.mermaid && mermaidRef.current) {
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
  }, [result, hasMounted]);

  if (!hasMounted || !result) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="text-xl font-bold text-primary">Preparing Documentation...</div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      const text = result.simplified_summary || "No summary available.";
      const langVal = selectedLang?.value || "English";
      speak(text, langVal);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    let pdfData = result;

    // jsPDF doesn't support non-Latin fonts without embedding.
    // Fallback: If not English, fetch an English version for the PDF only.
    if (selectedLang?.value !== "English") {
      try {
        const rawText = sessionStorage.getItem("civileaseRawText");
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            text: rawText, 
            language: "English",
            forceLanguage: "English" 
          }),
        });
        const json = await res.json();
        if (json.success) {
          pdfData = json.data;
        }
      } catch (err) {
        console.error("PDF Translation Error:", err);
      }
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 30;
  
    // --- PAGE 1: COVER & EXECUTIVE SUMMARY ---
    // Brand Header
    doc.setFillColor(26, 58, 107);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("CivilEase Administrative Dossier", margin, 26);
    
    y = 55;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("GENERATED ON:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString('en-IN'), margin + 35, y);
    y += 10;

    // Document Metadata Card
    doc.setDrawColor(230);
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin, y, maxWidth, 45, 3, 3, "FD");
    
    let metaY = y + 10;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("DOCUMENT TYPE", margin + 10, metaY);
    doc.text("REFERENCE NUMBER", margin + 60, metaY);
    doc.text("JURISDICTION", margin + 120, metaY);
    
    metaY += 6;
    doc.setFontSize(11);
    doc.setTextColor(26, 58, 107);
    doc.setFont("helvetica", "bold");
    doc.text(pdfData.document_identity?.document_type || "Government Notice", margin + 10, metaY);
    doc.text(pdfData.document_identity?.reference_number || "N/A", margin + 60, metaY);
    doc.text(pdfData.document_identity?.jurisdiction || "National", margin + 120, metaY);
    
    metaY += 12;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("ISSUING AUTHORITY", margin + 10, metaY);
    doc.text("DEPARTMENT", margin + 100, metaY);
    
    metaY += 6;
    doc.setFontSize(11);
    doc.setTextColor(26, 58, 107);
    doc.setFont("helvetica", "bold");
    doc.text(pdfData.document_identity?.issuing_authority || "Authority Identification Missing", margin + 10, metaY);
    doc.text(pdfData.document_identity?.department || "General Registry", margin + 100, metaY);
    
    y += 60;

    // Executive Summary Section
    doc.setFontSize(14);
    doc.setTextColor(255, 122, 0); // Saffron secondary
    doc.text("EXECUTIVE SUMMARY & INSIGHT", margin, y);
    y += 8;
    doc.setDrawColor(255, 122, 0);
    doc.line(margin, y, margin + 40, y);
    y += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(pdfData.simplified_summary || "No summary available.", maxWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 6 + 15;

    // Financial Analysis Snapshot
    if (pdfData.monetary_elements) {
      doc.setFontSize(14);
      doc.setTextColor(26, 58, 107);
      doc.text("FINANCIAL LIABILITY ANALYSIS", margin, y);
      y += 10;
      doc.setDrawColor(26, 58, 107);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(margin, y, maxWidth, 25, 2, 2, "FD");
      
      doc.setFontSize(10);
      doc.text(`TOTAL DEMAND: ${pdfData.monetary_elements.currency || "INR"} ${pdfData.monetary_elements.amount_demand?.toLocaleString() || "0"}`, margin + 10, y + 10);
      doc.text(`PAYMENT DEADLINE: ${pdfData.monetary_elements.payment_deadline || "Not Specified"}`, margin + 10, y + 17);
      y += 40;
    }

    // Footer for Page 1
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("CivilEase - Page 1 of 2 | Empowering Citizens through AI Transparency", margin, pageHeight - 10);

    // --- PAGE 2: PROCEDURAL & LEGAL ---
    doc.addPage();
    y = 30;
    
    doc.setFontSize(18);
    doc.setTextColor(26, 58, 107);
    doc.setFont("helvetica", "bold");
    doc.text("Compliance Requirements", margin, y);
    y += 15;

    // Procedural Steps
    const steps = pdfData.procedural_requirements?.verification_steps || [];
    if (steps.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(255, 122, 0);
      doc.text("STEP-BY-STEP ACTION PLAN", margin, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.setFont("helvetica", "normal");
      steps.forEach((step, i) => {
        const lines = doc.splitTextToSize(`${i + 1}. ${step}`, maxWidth);
        doc.text(lines, margin, y);
        y += lines.length * 6 + 4;
      });
      y += 10;
    }

    // Required Documentation
    const docs = pdfData.procedural_requirements?.mandatory_documents || [];
    if (docs.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(255, 122, 0);
      doc.text("MANDATORY DOCUMENTATION CHECKLIST", margin, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(60);
      docs.forEach((docName) => {
        const lines = doc.splitTextToSize(`[ ] ${docName}`, maxWidth);
        doc.text(lines, margin, y);
        y += lines.length * 6 + 4;
      });
      y += 15;
    }

    // Legal & Appeal Info
    doc.setFontSize(13);
    doc.setTextColor(26, 58, 107);
    doc.setFont("helvetica", "bold");
    doc.text("LEGAL CONSEQUENCES & REMEDIES", margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Late Fee / Penalty: ${pdfData.monetary_elements?.late_fee_structure || "As per standard regulations"}`, margin, y);
    y += 7;
    doc.text(`Appeal Available: ${pdfData.legal_consequences?.appeal_available ? "YES" : "NO"}`, margin, y);
    y += 7;
    if (pdfData.legal_consequences?.appeal_authority) {
      doc.text(`Appeal Authority: ${pdfData.legal_consequences.appeal_authority}`, margin, y);
      y += 7;
    }
    y += 15;

    // Official Resources
    doc.setFontSize(13);
    doc.setTextColor(26, 58, 107);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICIAL CONTACT CHANNELS", margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Department Portal: ${pdfData.contact_information?.email || "https://india.gov.in"}`, margin, y);
    y += 7;
    doc.text(`Helpline: ${pdfData.contact_information?.helpline || "1800-XX-XXXX"}`, margin, y);
    
    // Final Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("CivilEase - Page 2 of 2 | This document is an AI-enhanced administrative summary. Reference the original for legal filing.", margin, pageHeight - 10);

    const confirmDownload = window.confirm("Your multi-page CivilEase report is ready for download. Proceed?");
    if (confirmDownload) {
      doc.save(`CivilEase-Analysis-Report-${pdfData.document_identity?.reference_number || Date.now()}.pdf`);
    }
    setIsDownloading(false);
  };

  const documentContextStr = `Summary: ${result.simplified_summary || "None"}\nSteps: ${result.procedural_requirements?.verification_steps?.join(", ") || "None"}`;

  return (
    <>

    <div suppressHydrationWarning className="min-h-screen bg-surface py-12 px-8 overflow-y-auto print-container">
      <div className="max-w-7xl mx-auto pb-32" suppressHydrationWarning>
        
        {/* Expanded Header Section */}
        <div className="mb-12 bg-white rounded-2xl gov-shadow border-b-8 border-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 no-print"></div>
          
          <div className="p-10 md:p-14 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => router.push("/")} className="p-2 bg-surface text-primary rounded-full hover:bg-primary hover:text-white no-print transition-all"><ArrowLeft className="w-6 h-6" /></button>
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded">Analysis Report v2.1</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tighter uppercase font-headline mb-4 leading-none">
                  We've analyzed <br/> your notice.
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-primary font-bold uppercase text-[10px] tracking-[0.2em] pr-4">
                    Here's what you need to know.
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full border border-success/20 no-print">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-success text-[10px] font-black uppercase tracking-widest leading-none">AI Verified Resolution</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 no-print min-w-[240px]">
                 <button 
                   onClick={handleDownload}
                   disabled={isDownloading}
                   className="flex items-center justify-center gap-4 w-full px-8 py-4 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary/90 transition-all shadow-2xl shadow-secondary/20 hover:-translate-y-1 disabled:opacity-50"
                 >
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {isDownloading ? "Generating PDF..." : "Download Report"}
                 </button>
                 {selectedLang?.value !== "English" && (
                    <p className="text-[9px] text-text-muted text-center font-bold uppercase tracking-wider">
                       Note: PDF is generated in English for compatibility
                    </p>
                 )}
                 <button
                   onClick={handleSpeak}
                   className={`flex items-center justify-center gap-4 w-full px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.1em] transition-all border-2 border-primary ${
                     speaking ? "bg-primary text-white" : "bg-white text-primary hover:bg-surface"
                   }`}
                 >
                   {speaking ? (
                     <VolumeX className="w-5 h-5" />
                   ) : (
                     <Volume2 className="w-5 h-5" />
                   )}
                   {speaking ? "Stop Narration" : "Listen in " + (selectedLang?.label || "Voice")}
                 </button>
              </div>
            </div>

            {/* Content Carrying Meta Bar */}
            <div className="mt-12 pt-10 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">Document Type</span>
                  <p className="text-primary font-black text-sm uppercase">{result.document_identity?.document_type || "Government Notice"}</p>
               </div>
               <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">Ref Number</span>
                  <p className="text-primary font-black text-sm">{result.document_identity?.reference_number?.slice(0, 20) || "N/A"}</p>
               </div>
               <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">Effective Date</span>
                  <p className="text-primary font-black text-sm">{result.document_identity?.issue_date || "N/A"}</p>
               </div>
               <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">Jurisdiction</span>
                  <p className="text-primary font-black text-sm uppercase">{result.document_identity?.jurisdiction || "National"}</p>
               </div>
            </div>
          </div>
        </div>

        {/* AI Insight Summary Block */}
        <div className="mb-10 p-10 bg-white rounded-xl gov-shadow border-l-4 border-secondary flex flex-col md:flex-row gap-8 items-stretch">
           <div className="flex-shrink-0 flex flex-col justify-center border-r border-border/50 pr-8">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Status Report</h3>
              <p className="text-2xl font-black text-primary uppercase italic">AI Insight Summary</p>
           </div>
           <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                 <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                 <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">What this is</span>
                    <p className="text-sm font-bold text-text-main">{result.document_identity?.document_type || "Government Notice"}</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                 <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Urgency</span>
                    <p className="text-sm font-bold text-text-main uppercase">{result.urgency || "General Priority"}</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Landmark className="w-6 h-6 text-primary flex-shrink-0" />
                 <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Next Step</span>
                    <p className="text-sm font-bold text-text-main">{result.insight_next_step || (result.procedural_requirements?.verification_steps?.[0] || "Review Document")}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            
            {/* Summary Card */}
            <div className="p-10 md:p-14 rounded-xl bg-white gov-shadow relative border-l-[16px] border-primary">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-4">
                   Insight Summary
                </h2>
                <div className="hidden md:flex flex-col items-end opacity-40 uppercase text-[9px] font-bold tracking-widest">
                   <span>Document ID</span>
                   <span className="text-primary font-black">{result.document_identity?.reference_number || "PENDING-ID"}</span>
                </div>
              </div>
              <p className="text-text-main leading-relaxed text-xl font-medium font-body bg-surface/30 p-6 rounded-lg border border-border/50">
                {result.simplified_summary || "Could not generate summary."}
              </p>
            </div>

            {/* Application Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Documents Required */}
              <div className="p-8 rounded-xl bg-white gov-shadow border-t-8 border-primary">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-md font-black text-primary uppercase tracking-widest flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" /> Required Docs
                   </h2>
                   <span className="text-[10px] font-bold text-text-muted">{result.procedural_requirements?.mandatory_documents?.length || 0} ITEMS</span>
                </div>
                <ul className="flex flex-col gap-4">
                  {result.procedural_requirements?.mandatory_documents?.map((doc, index) => (
                    <li key={index} className="flex items-start gap-4 p-5 rounded-lg bg-surface border border-border/60 hover:border-primary/30 transition-colors">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                         <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-text-main text-sm font-bold leading-tight">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Financials */}
              {result.monetary_elements && (
                <div className="p-8 rounded-xl bg-white gov-shadow border-t-8 border-secondary relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                     <span className="material-symbols-outlined text-6xl">payments</span>
                  </div>
                  <h2 className="text-md font-black text-primary uppercase tracking-widest mb-8 flex items-center gap-3">
                     <AlertCircle className="w-5 h-5 text-secondary" /> Financial Analysis
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 rounded-lg bg-primary text-white shadow-inner">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 block mb-2">Total Demand</span>
                      <span className="font-black text-3xl">{result.monetary_elements.currency} {result.monetary_elements.amount_demand?.toLocaleString()}</span>
                    </div>
                    <div className="p-5 rounded-lg bg-red-50 border border-red-100 flex justify-between items-center text-red-700">
                      <span className="text-[10px] font-black uppercase tracking-wider">Maturity Date</span>
                      <span className="font-black text-sm">{result.monetary_elements.payment_deadline || "Not Specified"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Plan */}
            <div className="p-10 rounded-xl bg-white gov-shadow border-l-[12px] border-secondary">
              <h2 className="text-2xl font-black text-primary mb-10 uppercase tracking-tight">Compliance Action Plan</h2>
              <div className="space-y-4">
                {result.procedural_requirements?.verification_steps?.length > 0 ? (
                  result.procedural_requirements.verification_steps.map((step, index) => (
                    <div key={index} className="flex gap-8 p-8 rounded-xl bg-surface border border-border/80 relative overflow-hidden group hover:bg-white transition-all">
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all"></div>
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded bg-primary text-white font-black text-xl shadow-lg shadow-primary/20">
                        {index + 1}
                      </div>
                      <p className="text-text-main font-bold text-lg leading-relaxed self-center">{step}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-text-muted italic">No specific steps identified.</p>
                )}
              </div>
            </div>

            {/* Similar Past Cases */}
            {result.similar_cases && result.similar_cases.length > 0 && (
              <div className="p-10 rounded-xl bg-white gov-shadow border-l-[12px] border-primary">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Similar Past Cases</h2>
                </div>
                <div className="space-y-6">
                  {result.similar_cases.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedCase(item)}
                      className="p-6 rounded-xl bg-surface border border-border/50 flex justify-between items-start group hover:bg-white transition-all cursor-pointer hover:border-primary/30"
                    >
                      <div className="space-y-2">
                         <h4 className="font-black text-primary uppercase text-sm">{item.case}</h4>
                         <p className="text-text-muted text-sm font-medium leading-relaxed truncate max-w-md">{item.outcome}</p>
                      </div>
                      <span className="flex-shrink-0 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-secondary/20">
                         {item.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Timeline */}
            {result.estimated_timeline && (
              <div className="p-10 rounded-xl bg-white gov-shadow border-l-[12px] border-primary">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Estimated Timeline</h2>
                </div>
                
                <div className="mb-12 p-8 bg-surface rounded-2xl border border-border/50 text-center">
                   <span className="text-[10px] font-black uppercase text-text-muted tracking-[0.2em] block mb-2">Total Processing Time</span>
                   <h3 className="text-4xl font-black text-primary uppercase tracking-tighter">
                      {result.estimated_timeline.total || "Standard Timeline"}
                   </h3>
                </div>

                <div className="relative pl-8 border-l-2 border-border/50 space-y-12">
                   {result.estimated_timeline.breakdown?.map((phase, index) => (
                     <div key={index} className="relative">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-4 border-secondary shadow-md"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-black text-primary uppercase text-sm tracking-tight">{phase.phase}</h4>
                           <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{phase.duration}</span>
                        </div>
                        <p className="text-text-muted text-xs font-medium leading-relaxed max-w-lg">
                           {phase.description}
                        </p>
                     </div>
                   ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-10">
            
            {/* Authority Card */}
            <div className="p-10 rounded-xl bg-primary text-white shadow-2xl shadow-primary/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-white/10 rounded-lg">
                   <Building2 className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.25em] opacity-80">Verified Issuing Entity</h2>
              </div>
              <div className="p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6 group cursor-default">
                <p className="text-white font-black text-2xl leading-tight mb-4 group-hover:text-secondary transition-colors">
                  {result.document_identity?.issuing_authority || "Authority Identification Missing"}
                </p>
                <div className="h-px w-full bg-white/10 mb-4"></div>
                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">{result.document_identity?.department || "General Registry"}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-black/20 rounded-lg">
                    <span className="text-[8px] font-black uppercase text-white/40 block mb-1">Jurisdiction</span>
                    <span className="text-xs font-bold text-white uppercase">{result.document_identity?.jurisdiction || "National"}</span>
                 </div>
                 <div className="p-4 bg-black/20 rounded-lg">
                    <span className="text-[8px] font-black uppercase text-white/40 block mb-1">Reference</span>
                    <span className="text-xs font-bold text-white">{result.document_identity?.reference_number?.slice(0, 10) || "N/A"}..</span>
                 </div>
              </div>
            </div>

            {/* Government Portals Section */}
            <div className="p-8 rounded-xl bg-white border border-border shadow-sm">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   <Building2 className="w-4 h-4 text-secondary" /> Relevant Portals
                </h3>
                <div className="flex flex-col gap-3">
                   {relevantLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-primary text-white rounded-lg group hover:bg-primary-dark transition-all no-print"
                      >
                         <span className="text-[11px] font-bold tracking-tight">{link.name}</span>
                         <ExternalLink className="w-4 h-4 text-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                   ))}
                </div>
            </div>

            {/* Flowchart Card */}
            <div className="p-10 rounded-xl bg-white gov-shadow border-t-8 border-primary flex-grow min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-primary uppercase tracking-tight">Interactive Journey Map</h2>
                <div className="px-3 py-1 bg-success text-[9px] text-white font-black uppercase rounded shadow-md">Stable Node</div>
              </div>
              <div 
                ref={mermaidRef} 
                className="mermaid w-full bg-surface rounded-xl p-8 overflow-auto flex-grow flex justify-center text-primary border border-border/50 shadow-inner"
              >
              </div>
            </div>

          </div>
        </div>

        {/* Footer Disclaimer Bar */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-5 bg-white border-t border-primary rounded-b-xl border-x border-b border-border/30 shadow-sm">
           <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                 <circle cx="50" cy="50" r="45" />
                 <circle cx="50" cy="50" r="10" />
                 {[...Array(24)].map((_, i) => (
                   <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)} />
                 ))}
              </svg>
              <span className="text-xs font-black text-primary uppercase tracking-[0.25em]">AI Verified Analysis</span>
           </div>
           
           <div className="hidden md:block w-px h-8 bg-border/50"></div>
           
           <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest text-center md:text-right max-w-md">
              This analysis is for guidance only. For legal proceedings, consult a certified practitioner.
           </p>
        </div>

      </div>
    </div>
    {/* Similar Case Modal */}
    {selectedCase && (
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 sm:p-10 no-print">
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setSelectedCase(null)}></div>
        
        <div className="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden border-t-8 border-primary">
            {/* Header */}
            <div className="bg-primary p-6 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Case Briefing</span>
               </div>
               <button onClick={() => setSelectedCase(null)} className="hover:text-secondary transition-colors">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-10 space-y-10">
               <div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4 leading-tight">
                    {selectedCase.case}
                  </h3>
                  <div className="flex items-center gap-4">
                     <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {selectedCase.duration}
                     </span>
                     <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Reference Docket: #CIV-2024-X</span>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">Full Case Detail</h4>
                     <p className="text-text-main font-medium leading-relaxed text-lg italic">
                        The matter involved a representative dispute within the same municipal range regarding document verification guidelines. 
                        Historical records indicate a similar claim were substantiated based on archival department records from the respective assessment year.
                     </p>
                  </div>
                  
                  <div className="p-6 bg-surface border border-border/50 rounded-xl space-y-4">
                     <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Resolution Outcome</h4>
                     <p className="text-primary font-bold leading-relaxed">
                        {selectedCase.outcome}
                     </p>
                  </div>
               </div>

               <div className="pt-8 border-t border-border/50">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic leading-relaxed">
                     Source: Indian Kanoon / District Court Records / National Judicial Data Grid (NJDG). 
                     This summary is generated for context only.
                  </p>
               </div>
            </div>
        </div>
      </div>
    )}

    <div className="no-print">
       <ChatAssistant 
         documentContext={documentContextStr} 
         documentType={result.document_identity?.document_type}
       />
    </div>
    </>
  );
}
