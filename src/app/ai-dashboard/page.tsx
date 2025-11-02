"use client";

import { useState } from "react";
import { FaMicrophone, FaRobot } from "react-icons/fa";
import OchigaAssistant from "../components/OchigaAssistant";

export default function Dashboard() {
  const [listening, setListening] = useState(false);

  const handleMicClick = () => {
    // We'll hook this into speech recognition later
    setListening((prev) => !prev);
  };

  return (
    <div className="relative h-screen w-full flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-gray-700 bg-opacity-40 backdrop-blur-sm">
        <h1 className="text-xl font-semibold tracking-wide">
          Ochiga Smart Estate
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm opacity-75">Smart Dashboard</span>
          <FaRobot className="text-blue-400 text-xl" />
        </div>
      </header>

      {/* MAIN SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Welcome to your Smart Estate Control
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Ask Ochiga AI to control your home, check device status, manage
            energy, or view wallet — all through natural voice or chat.
          </p>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "Turn on the living room light",
            "Show device status",
            "Fund my wallet ₦5000",
            "Lock all doors",
          ].map((suggestion, idx) => (
            <button
              key={idx}
              className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-2 rounded-full border border-gray-700 transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </main>

      {/* MICROPHONE */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button
          onClick={handleMicClick}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            listening
              ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.6)] animate-pulse"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg"
          }`}
        >
          <FaMicrophone size={24} />
          {listening && (
            <span className="absolute w-20 h-20 rounded-full border-2 border-red-400 opacity-50 animate-ping" />
          )}
        </button>
      </div>

      {/* OCHIGA ASSISTANT CHAT */}
      <OchigaAssistant />
    </div>
  );
}
