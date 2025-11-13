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
  onVoiceAssist?: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const brandColor = "#e11d48"; // Ochiga Maroon Red

  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  // 🎙️ Start / Stop Mic Recording (Speech-to-Text)
  const handleMicClick = () => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!isRecording) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;

      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  };

  // 🚀 Dual-purpose Send / Talk Button
  const handleMainButtonClick = () => {
    if (isTyping && input.trim()) {
      // Send text (typed or transcribed)
      onSend();
    } else {
      // 🗣️ Talk-back mode (only if no text)
      setIsTalking(true);
      onVoiceAssist?.();

      // Ochiga Assistant talks back
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(
        "Hello, I’m Ochiga Assistant. How can I help you?"
      );
      utter.lang = "en-US";
      utter.rate = 1;
      synth.speak(utter);

      setTimeout(() => {
        setIsTalking(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3 fixed bottom-0 z-50">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2 shadow-inner overflow-hidden">

          {/* 🎤 Mic / Stop Button */}
          <button
            onClick={handleMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)] scale-110"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isRecording ? (
              <FaStop className="text-white text-sm" />
            ) : (
              <FaMicrophone className="text-white text-sm" />
            )}
          </button>

          {/* ✏️ Input / Waveform Area */}
          <div className="relative flex-1 h-10 flex items-center">
            {!isRecording ? (
              <input
                type="text"
                placeholder="Ask Ochiga AI anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                className="w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none px-2 text-sm"
              />
            ) : (
              // 🩸 Waveform Animation During Recording
              <div className="absolute inset-0 flex items-center overflow-hidden px-2">
                <motion.div
                  className="flex gap-[2px]"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                >
                  {[...Array(120)].map((_, i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${8 + ((i % 8) - 4) * 0.5}px`,
                        backgroundColor: brandColor,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                  {[...Array(120)].map((_, i) => (
                    <div
                      key={`loop-${i}`}
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${8 + ((i % 8) - 4) * 0.5}px`,
                        backgroundColor: brandColor,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </div>

          {/* 🧠 Jelly Button (Dual Function) */}
          <button
            onClick={handleMainButtonClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isTalking
                ? "bg-red-600 shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-110"
                : isTyping
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isTyping ? (
              <FaPaperPlane className="text-white text-sm" />
            ) : isTalking ? (
              // 🎙️ Talking Blob Animation
              <motion.div
                className="w-6 h-6 bg-gradient-to-r from-[#e11d48] to-[#b91c1c] rounded-full"
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "40% 60% 70% 30% / 50% 60% 30% 60%",
                    "70% 30% 50% 50% / 60% 40% 60% 40%",
                    "50% 50% 30% 70% / 40% 60% 40% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                  ],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />
            ) : (
              // 🫧 Idle Jelly Blob
              <motion.div
                className="w-5 h-5 bg-gradient-to-r from-[#9ca3af] to-[#6b7280] rounded-full"
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "50% 50% 70% 30% / 60% 50% 40% 50%",
                    "70% 30% 50% 50% / 50% 60% 40% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
