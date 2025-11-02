"use client";

import { useState } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";

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
      {/* MAIN AREA (empty center for now) */}
      <main className="flex-1 flex items-center justify-center">
        {/* We’ll add the AI orb here later in Step 2 */}
        <h1 className="text-gray-500 text-sm tracking-widest uppercase">
          Ochiga AI Interface
        </h1>
      </main>

      {/* SUGGESTION CHIPS */}
      <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* FOOTER BAR (ChatGPT-style) */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
              listening
                ? "bg-red-600 animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.4)]"
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
