"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFraudCheck } from "@/hooks/useFraudCheck";
import { UploadCloud, FileText, Loader2, ShieldAlert } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";

export function FraudUpload() {
  const router = useRouter();
  const { checkFraud, loading, error } = useFraudCheck();
  const [isHovering, setIsHovering] = useState(false);
  const [mode, setMode] = useState("file"); // "file" or "text"
  const [textModeInput, setTextModeInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].value);
  const [uploadingPdf, setUploadingPdf] = useState(false);

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
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", JSON.stringify(langObj));
    }

    const success = await checkFraud(textModeInput, language);
    if (success) {
      router.push("/fraud-check/result");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-8 gov-shadow gov-border relative z-30 border-t-[6px] border-t-red-600">
        <div className="flex items-center gap-3 mb-6 bg-red-50 p-4 rounded-lg border border-red-100">
            <ShieldAlert className="w-8 h-8 text-red-600" />
            <div>
                <h3 className="font-bold text-red-800 uppercase tracking-widest text-sm">FraudShield Protection</h3>
                <p className="text-xs text-red-600/80 mt-1">Upload a document to run a forensic authenticity scan.</p>
            </div>
        </div>

      <div className="flex gap-1 mb-8 p-1 bg-surface rounded-lg">
        <button
          onClick={() => setMode("file")}
          className={`flex-1 py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
            mode === "file" 
              ? "bg-red-600 text-white shadow-md shadow-red-600/20" 
              : "text-text-muted hover:bg-white/50"
          }`}
        >
          Upload PDF
        </button>
        <button
          onClick={() => setMode("text")}
          className={`flex-1 py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
            mode === "text" 
              ? "bg-red-600 text-white shadow-md shadow-red-600/20" 
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
            isHovering ? "border-red-600 bg-red-50/50" : "border-primary/20 bg-surface/50"
          }`}
        >
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {uploadingPdf ? (
            <Loader2 className="w-12 h-12 text-red-600 mb-4 animate-spin" />
          ) : fileName ? (
            <>
              <FileText className="w-12 h-12 text-red-600 mb-4" />
              <p className="text-primary font-bold">{fileName}</p>
              <p className="text-xs text-text-muted mt-2">Document ready for fraud scan</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-12 h-12 text-primary/30 mb-4" />
              <p className="text-primary font-medium">Click or drag PDF for forensic scan</p>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mt-2">Supported: Official Notices, Forms, Orders</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <textarea
            value={textModeInput}
            onChange={(e) => setTextModeInput(e.target.value)}
            placeholder="Paste document text here for instant fraud screening..."
            className="w-full h-56 p-5 bg-surface border border-border rounded-xl text-text-main placeholder-text-muted/50 focus:outline-none focus:border-red-600/50 resize-none text-sm leading-relaxed"
          />
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-border pt-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Target Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-border text-primary font-bold rounded-md px-4 py-2 text-xs focus:outline-none focus:border-red-600 appearance-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading || uploadingPdf || !textModeInput.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-md font-bold text-sm uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all font-headlines"
        >
          {loading ? (
            "Scanning..."
          ) : (
            <>
              <span>Scan For Fraud</span>
              <ShieldAlert className="w-4 h-4" />
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
