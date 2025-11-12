"use client";

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ChatFooterProps {
  input: string;
  setInput: (v: string) => void;
  listening: boolean;
  onMicClick: () => void;
  onSend: () => void;
}

export default function ChatFooter({
  input,
  setInput,
  listening,
  onMicClick,
  onSend,
}: ChatFooterProps) {
  const [showSend, setShowSend] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowSend(input.trim().length > 0);
  }, [input]);

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3 fixed bottom-0 z-50">
      <div className="max-w-3xl mx-auto flex items-center space-x-3">
        {/* Input / Voice Wave */}
        <div className="flex-1 relative">
          <AnimatePresence>
            {listening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center bg-gray-800 border border-gray-700 rounded-full h-12 overflow-hidden relative"
              >
                <motion.div
                  className="absolute w-full h-full flex items-center justify-center gap-1 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
              </motion.div>
            ) : (
              <motion.input
                key="input"
                ref={inputRef}
                type="text"
                placeholder="Ask Ochiga AI anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && showSend && onSend()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mic Button */}
        <button
          onClick={onMicClick}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            listening
              ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <FaMicrophone className="text-white" />
        </button>

        {/* Dynamic Send / Mic Button */}
        <button
          onClick={showSend ? onSend : onMicClick}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            showSend
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {showSend ? (
            <FaPaperPlane className="text-white" />
          ) : (
            <FaMicrophone className="text-white" />
          )}
        </button>
      </div>
    </footer>
  );
}
