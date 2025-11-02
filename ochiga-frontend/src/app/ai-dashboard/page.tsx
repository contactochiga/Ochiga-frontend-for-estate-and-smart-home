"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaRobot, FaPaperPlane } from "react-icons/fa";

export default function AIDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hello, I’m Ochiga AI — your smart estate assistant." },
  ]);
  const [input, setInput] = useState("");

  const toggleListening = () => setListening((p) => !p);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "✅ Got it! I’m processing your request...",
        },
      ]);
    }, 800);
  };

  // --- Voice animation loop ---
  useEffect(() => {
    if (!listening) return;
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, [listening]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* --- Animated ORB --- */}
      <motion.div
        onClick={() => setIsOpen(true)}
        className={`relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
          listening
            ? "bg-blue-500/30 shadow-[0_0_40px_rgba(0,150,255,0.6)]"
            : "bg-gray-800/50 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
        }`}
        animate={{
          scale: listening ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: listening ? 0.8 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: isOpen ? "100px" : "140px",
          height: isOpen ? "100px" : "140px",
        }}
      >
        <FaRobot size={36} className={listening ? "text-blue-400" : "text-gray-300"} />
        {listening && (
          <motion.span
            className="absolute w-[180px] h-[180px] rounded-full border border-blue-400/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* --- Floating Chat Interface --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 200, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 200, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-12 right-6 md:right-12 w-[90vw] max-w-[420px] h-[70vh] bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <FaRobot className="text-blue-400" />
                <span className="font-semibold text-sm">Ochiga AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-200">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-200 border border-gray-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center border-t border-gray-700 bg-gray-800/80 px-3 py-2">
              <button
                onClick={toggleListening}
                className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 transition ${
                  listening
                    ? "bg-red-600 animate-pulse"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <FaMicrophone />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Ochiga AI..."
                className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-400 outline-none"
              />

              <button
                onClick={handleSend}
                className="ml-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
