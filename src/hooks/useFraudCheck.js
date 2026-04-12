import { useState } from "react";

export function useFraudCheck() {
  const [fraudResult, setFraudResult] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("civicEaseFraudResult");
        return stored ? JSON.parse(stored) : null;
      } catch (err) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkFraud(text, language) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      const json = await res.json();

      if (!json.success || !json.data) {
        setError(json.error || "An unexpected error occurred during fraud analysis.");
        return false;
      } else {
        setFraudResult(json.data);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("civicEaseFraudResult", JSON.stringify(json.data));
        }
        return true;
      }
    } catch (e) {
      console.error("Fraud Check Request Error:", e);
      setError("Failed to reach the fraud analysis backend. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const resetFraudResult = () => {
    setFraudResult(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("civicEaseFraudResult");
    }
  };

  return { fraudResult, loading, error, checkFraud, resetFraudResult };
}
