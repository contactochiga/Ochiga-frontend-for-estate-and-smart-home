"use client";

import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChatFooter({
  input,
  setInput,
  listening,
  onMicClick,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  listening: boolean;
  onMicClick: () => void;
  onSend: () => void;
}) {
  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3 fixed bottom-0">
      <div className="max-w-3xl mx-auto flex items-center space-x-3">
        {/* Input / Listening area */}
        <div className="flex-1 relative">
          {listening ? (
            <div className="flex items-center justify-center bg-gray-800 border border-gray-700 rounded-full h-10 overflow-hidden relative">
              <motion.div
                className="absolute w-full h-full flex items-center justify-center gap-1 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] bg-blue-400 rounded-full"
                    animate={{
                      height: [6, 20, 8],
                      opacity: [0.6, 1, 0.7],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
              <span className="absolute text-gray-400 text-xs right-4 italic">
                Listening...
              </span>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Ask Ochiga AI anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* 🎤 Mic button */}
        <button
          onClick={onMicClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            listening
              ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <FaMicrophone />
        </button>

        {/* 🚀 Send button */}
        <button
          onClick={onSend}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          <FaPaperPlane className="text-white text-sm" />
        </button>
      </div>
    </footer>
  );
}
