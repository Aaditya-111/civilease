import { useState } from "react";

export function useGemini() {
  const [result, setResult] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("civileaseResult");
        return stored ? JSON.parse(stored) : null;
      } catch (err) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function analyze(text, language) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      const json = await res.json();

      if (!json.success || !json.data) {
        setError(json.error || "An unexpected error occurred.");
        return false;
      } else {
        setResult(json.data);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("civileaseResult", JSON.stringify(json.data));
          sessionStorage.setItem("civileaseRawText", text);
        }
        return true;
      }

    } catch (e) {
      console.error("Backend Request Error:", e);
      setError("Failed to reach the HuggingFace backend analyzer. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Optional: A helper to clear if we return home
  const resetResult = () => {
    setResult(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("civicEaseResult");
    }
  };

  return { result, loading, error, analyze, resetResult };
}
