//ochiga-frontend/src/app/ai-dashboard/components
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function useSpeech() {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);

  useEffect(() => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) return;
    const rec = new Rec();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setLastTranscript(text);
    };
    rec.onend = () => {
      setListening(false);
    };
    recognitionRef.current = rec;
  }, []);

  const start = () => {
    const rec = recognitionRef.current;
    if (!rec) throw new Error("Speech API not supported");
    setListening(true);
    rec.start();
  };
  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const speak = (text: string, lang = "en-NG") => {
    if (!("speechSynthesis" in window)) return;
    const s = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    s.speak(u);
    return u;
  };

  return { listening, lastTranscript, start, stop, speak, setLastTranscript };
}
