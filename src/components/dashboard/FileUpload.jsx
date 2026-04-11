"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGemini } from "@/hooks/useGemini";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

import { SUPPORTED_LANGUAGES } from "@/lib/constants";

export function FileUpload({ sampleText = "" }) {
  const router = useRouter();
  const { analyze, loading, error } = useGemini();
  const [isHovering, setIsHovering] = useState(false);
  const [mode, setMode] = useState("file"); // "file" or "text"
  const [textModeInput, setTextModeInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].value);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  // Handle incoming samples from the home page
  useEffect(() => {
    if (sampleText) {
      setTextModeInput(sampleText);
      setMode("text");
    }
  }, [sampleText]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const processFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setFileName(file.name);
    setUploadingPdf(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setTextModeInput(data.text);
      } else {
        alert(data.error || "Failed to extract text from PDF.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while parsing the document.");
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    
    if (mode !== "file") return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!textModeInput.trim()) {
      alert("No text to analyze. Please upload a PDF or enter text.");
      return;
    }

    const langObj = SUPPORTED_LANGUAGES.find(l => l.value === language);
    localStorage.setItem("selectedLanguage", JSON.stringify(langObj));

    const success = await analyze(textModeInput, language);
    if (success) {
      router.push("/document"); // navigate to results
    }
  };

  const loadingSteps = [
    "Reading your document...",
    "Identifying document type...",
    "Extracting legal requirements...",
    "Translating to your language...",
    "Building your action plan...",
    "Almost ready..."
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setCurrentStep(0);
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 3000);
    } else {
      setCurrentStep(0);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-8 gov-shadow gov-border relative z-30">
      
      {loading && (
        <div className="absolute inset-x-8 inset-y-8 bg-white z-50 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tighter mb-4">
              {loadingSteps[currentStep]}
            </h3>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
              Please wait while CivilEase AI processes your file
            </p>
        </div>
      )}

      <div className="flex gap-1 mb-8 p-1 bg-surface rounded-lg">
        <button
          onClick={() => setMode("file")}
          className={`flex-1 py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
            mode === "file" 
              ? "bg-primary text-white shadow-md" 
              : "text-text-muted hover:bg-white/50"
          }`}
        >
          Upload PDF
        </button>
        <button
          onClick={() => setMode("text")}
          className={`flex-1 py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
            mode === "text" 
              ? "bg-primary text-white shadow-md" 
              : "text-text-muted hover:bg-white/50"
          }`}
        >
          Paste Text
        </button>
      </div>

      {mode === "file" ? (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center p-14 border-2 border-dashed rounded-xl transition-all ${
            isHovering ? "border-secondary bg-secondary/5" : "border-primary/20 bg-surface/50"
          }`}
        >
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {uploadingPdf ? (
            <div className="flex flex-col items-center">
               <FileText className="w-12 h-12 text-primary opacity-20 mb-4" />
               <p className="text-primary font-bold">Scanning PDF...</p>
            </div>
          ) : fileName ? (
            <>
              <FileText className="w-12 h-12 text-primary mb-4" />
              <p className="text-primary font-bold">{fileName}</p>
              <p className="text-xs text-text-muted mt-2">Document ready for analysis</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-12 h-12 text-primary/30 mb-4" />
              <p className="text-primary font-medium">Click or drag PDF analysis</p>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mt-2">Supported: Official Notices, Forms, Orders</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <textarea
            value={textModeInput}
            onChange={(e) => setTextModeInput(e.target.value)}
            placeholder="Paste document text here for instant simplification..."
            className="w-full h-56 p-5 bg-surface border border-border rounded-xl text-text-main placeholder-text-muted/50 focus:outline-none focus:border-primary resize-none text-sm leading-relaxed"
          />
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-border pt-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Target Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-border text-primary font-bold rounded-md px-4 py-2 text-xs focus:outline-none focus:border-primary appearance-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading || uploadingPdf || !textModeInput.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-md font-bold text-sm uppercase tracking-widest shadow-lg shadow-secondary/20 transition-all font-headlines"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <span>Simplify Now</span>
              <FileText className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
