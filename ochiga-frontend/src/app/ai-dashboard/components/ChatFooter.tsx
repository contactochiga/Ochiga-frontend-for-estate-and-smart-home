"use client";

import { useEffect, useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChatFooter({
  input,
  setInput,
  onSend,
  onVoiceAssist,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onVoiceAssist?: (userText: string) => Promise<string> | string;
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceGender, setVoiceGender] = useState<"female" | "male">("female");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const brandColor = "#e11d48";

  /* ---------------------- 🎛 Load & Remember Voice Choice ---------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("ochigaVoice");
    if (saved === "male" || saved === "female") setVoiceGender(saved);

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const toggleVoice = () => {
    const next = voiceGender === "female" ? "male" : "female";
    setVoiceGender(next);
    localStorage.setItem("ochigaVoice", next);
  };

  /* ---------------------------- 🧠 Input Watcher ---------------------------- */
  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  /* --------------------------- 🎤 Speech Capture --------------------------- */
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const userText = event.results[0][0].transcript;
      setTranscript(userText);
      setInput(userText);
      setIsListening(false);

      // 🧠 Optional AI response (use callback if connected)
      let responseText = "Okay, I heard you say: " + userText;
      if (onVoiceAssist) {
        const res = await onVoiceAssist(userText);
        if (typeof res === "string") responseText = res;
      }

      speakResponse(responseText);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  /* --------------------------- 🔊 Voice Talkback --------------------------- */
  const speakResponse = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // pick a voice by gender
    const filtered = voices.filter((v) =>
      voiceGender === "female"
        ? /female|woman|Samantha|Google US English/i.test(v.name)
        : /male|man|Daniel|Google UK English/i.test(v.name)
    );
    const selectedVoice = filtered[0] || voices[0];

    setIsSpeaking(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = selectedVoice;
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = voiceGender === "female" ? 1.1 : 0.9;
    utter.onend = () => setIsSpeaking(false);
    synth.speak(utter);
  };

  const handleSend = () => {
    if (input.trim()) onSend();
  };

  /* ------------------------------- 🧠 Render ------------------------------- */
  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3 fixed bottom-0 z-50">
      <div className="max-w-3xl mx-auto relative flex flex-col gap-1 items-center">
        {/* 🔘 Voice selector */}
        <button
          onClick={toggleVoice}
          className="text-xs text-gray-400 hover:text-white transition-all mb-1"
        >
          🎙 Voice:{" "}
          <span className="font-semibold text-red-400">
            {voiceGender === "female" ? "Female" : "Male"}
          </span>
        </button>

        {/* 💬 Input Row */}
        <div className="relative flex items-center w-full bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2 shadow-inner overflow-hidden">
          {/* 🎤 MIC / STOP */}
          <button
            onClick={toggleListening}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isListening
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isListening ? (
              <FaStop className="text-white text-sm" />
            ) : (
              <FaMicrophone className="text-white text-sm" />
            )}
          </button>

          {/* 📝 Textbox / Transcript */}
          <input
            type="text"
            placeholder={
              isListening
                ? "Listening…"
                : transcript
                ? transcript
                : "Ask Ochiga AI anything…"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isListening || isSpeaking}
            className="w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none px-2 text-sm transition-all"
          />

          {/* 🪼 Jelly Button */}
          <button
            onClick={() => {
              if (isTyping) handleSend();
              else toggleListening();
            }}
            disabled={isListening || isSpeaking}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 relative overflow-hidden ${
              isListening || isSpeaking
                ? "bg-red-600"
                : isTyping
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {(isListening || isSpeaking) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{ backgroundColor: brandColor }}
              />
            )}
            {!isTyping ? (
              <motion.div
                className="w-4 h-4 bg-white rounded-full z-10"
                animate={
                  isListening || isSpeaking
                    ? { scale: [1, 1.4, 1], opacity: [0.9, 1, 0.9] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            ) : (
              <FaPaperPlane className="text-white text-sm z-10" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
