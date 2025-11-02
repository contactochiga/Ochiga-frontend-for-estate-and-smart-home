"use client";

import { useState, useEffect } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  // --- SUGGESTIONS ---
  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  // --- HANDLE SEND ---
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
      speak(aiResponse);
    }, 1000);
  };

  // --- HANDLE MIC CLICK ---
  const handleMicClick = () => {
    if (speaking) return; // prevent while speaking
    setListening((prev) => !prev);
  };

  // --- BASIC MOCK AI LOGIC ---
  const getAIResponse = (msg: string) => {
    msg = msg.toLowerCase();
    if (msg.includes("light")) return "The living room lights have been turned on.";
    if (msg.includes("fund")) return "Your wallet has been successfully funded.";
    if (msg.includes("lock")) return "All doors are now locked securely.";
    if (msg.includes("cctv")) return "Displaying CCTV feed now.";
    return "Okay, I've done that for you.";
  };

  // --- SPEECH SYNTHESIS ---
  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => setSpeaking(false);
  };

  // --- UI ---
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden transition-all duration-700">
      {/* MAIN AREA */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* --- AI ORB --- */}
        {(listening || speaking) && (
          <div
            className={`absolute flex items-center justify-center transition-opacity duration-700 ${
              listening || speaking ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
              {/* outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 opacity-40 blur-2xl animate-pulse-custom" />
              {/* rotating halo */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-spin-custom" />
              {/* breathing orb */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-700 
                              shadow-[0_0_25px_rgba(59,130,246,0.6)] animate-pulse-custom
                              flex items-center justify-center text-center text-gray-100 font-light">
                {listening ? "Listening…" : "Speaking…"}
              </div>
            </div>
          </div>
        )}

        {/* --- CHAT HISTORY --- */}
        {!listening && !speaking && (
          <div className="flex flex-col w-full max-w-2xl h-full overflow-y-auto px-6 py-10 space-y-3 scrollbar-thin">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm uppercase tracking-widest mt-20">
                Ochiga AI Interface
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- SUGGESTION CHIPS --- */}
      {!listening && !speaking && (
        <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInput(s)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            disabled={speaking}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              listening
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaMicrophone />
          </button>

          {/* Input */}
          <input
            type="text"
            placeholder="Ask Ochiga AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={speaking}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={speaking}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FaPaperPlane className="text-white text-sm" />
          </button>
        </div>
      </footer>
    </div>
  );
}
