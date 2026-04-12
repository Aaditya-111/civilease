"use client";

import { useState } from "react";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";

export const useSpeech = () => {
  const [speaking, setSpeaking] = useState(false);

  const speak = (text, languageValue) => {
    if (speaking) {
      stop();
      return;
    }

    const language = SUPPORTED_LANGUAGES.find(l => l.value === languageValue);
    const speechCode = language?.speechCode || "en-US";

    // Use Native Web Speech API
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechCode;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking, loading: false };
};
