"use client";

import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("User said:", input);
    setInput("");
  };

  const handleMicClick = () => {
    setListening((prev) => !prev);
  };

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* MAIN AREA */}
      <main className="flex-1 flex items-center justify-center relative">
        {/* AI Orb — appears only when listening */}
        {listening && (
          <div className="absolute flex items-center justify-center">
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 animate-pulse">
              {/* Inner glow wave */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-400 opacity-50 blur-2xl animate-ping" />
              <div className="absolute inset-2 rounded-full bg-gray-950/60 backdrop-blur-sm flex items-center justify-center text-center text-gray-200 text-sm">
                Listening...
              </div>
            </div>
          </div>
        )}

        {/* Idle State Text */}
        {!listening && (
          <h1 className="text-gray-500 text-sm tracking-widest uppercase transition-opacity duration-500">
            Ochiga AI Interface
          </h1>
        )}
      </main>

      {/* SUGGESTION CHIPS */}
      <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2 transition-opacity duration-500">
        {!listening &&
          suggestions.map((s, idx) => (
            <button
              key={idx}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
            >
              {s}
            </button>
          ))}
      </div>

      {/* FOOTER BAR */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              listening
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaMicrophone />
          </button>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Ask Ochiga AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <FaPaperPlane className="text-white text-sm" />
          </button>
        </div>
      </footer>
    </div>
  );
}
