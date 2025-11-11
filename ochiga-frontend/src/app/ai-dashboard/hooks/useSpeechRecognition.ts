import { useEffect, useRef, useState } from "react";

export const useSpeechRecognition = (onResult: (text: string) => void) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<number | null>(null);

  const resetSilenceTimer = (recognition: any) => {
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    silenceTimer.current = window.setTimeout(() => {
      try { recognition.stop(); } catch {}
    }, 1800);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      resetSilenceTimer(recognition);
    };

    recognition.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript) onResult(transcript);
      resetSilenceTimer(recognition);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = (err: any) => {
      console.warn("Speech recognition error", err);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try { listening ? recognition.stop() : recognition.start(); } 
    catch (err) { console.warn("mic toggle error", err); }
  };

  return { listening, toggleListening };
};
