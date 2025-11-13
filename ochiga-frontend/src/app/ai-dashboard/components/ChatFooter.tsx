"use client";

import { useEffect, useState } from "react";
import { FaMicrophone, FaStop, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChatFooter({
  input,
  setInput,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const brandColor = "#e11d48"; // Ochiga Maroon Red

  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setIsTranscribing(true);

      setTimeout(() => {
        setInput("Transcribed voice input...");
        setIsTranscribing(false);
      }, 2000);
    }
  };

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3 fixed bottom-0 z-50">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2 shadow-inner overflow-hidden">

          {/* 🎙️ Mic / Stop Button */}
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
                placeholder={
                  isTranscribing
                    ? "Transcribing voice input..."
                    : "Ask Ochiga AI anything…"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                disabled={isTranscribing}
                className={`w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none px-2 text-sm transition-all ${
                  isTranscribing ? "opacity-60" : ""
                }`}
              />
            ) : (
              // 🎧 Calm, Straight Linear Flow (like a voice note)
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
                        height: `${8 + ((i % 8) - 4) * 0.5}px`, // very subtle variation
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

          {/* 🚀 Send Button */}
          <button
            onClick={onSend}
            disabled={isTranscribing || (!isTyping && !input.trim())}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isTranscribing
                ? "bg-gray-700 animate-pulse"
                : isTyping
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-700"
            }`}
          >
            {isTranscribing ? (
              <motion.div
                className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : isTyping ? (
              <FaPaperPlane className="text-white text-sm" />
            ) : (
              <motion.div
                className="w-5 h-5 rounded-full bg-gray-600"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
              />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
