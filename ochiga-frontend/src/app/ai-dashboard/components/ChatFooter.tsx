"use client";

import { useEffect, useState } from "react";
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
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3 fixed bottom-0">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2">
          {/* Left Mic / Listening Button */}
          <button
            onClick={onMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              listening
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FaMicrophone />
          </button>

          {/* Input field */}
          <input
            type="text"
            placeholder="Ask Ochiga AI anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 outline-none px-2 text-sm"
          />

          {/* Right Dynamic Button */}
          <button
            onClick={onSend}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            {isTyping ? (
              <FaPaperPlane className="text-white text-sm" />
            ) : (
              <motion.div
                className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"
              />
            )}
          </button>
        </div>

        {/* Listening wave overlay */}
        {listening && (
          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 bg-blue-400 rounded-full"
                  animate={{ height: [4, 16, 4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </footer>
  );
}
