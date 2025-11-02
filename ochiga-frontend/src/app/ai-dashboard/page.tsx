"use client";

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I’m Ochiga AI — how can I assist you today?" },
  ]);
  const [listening, setListening] = useState(false);
  const [autoListenReady, setAutoListenReady] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // 🧠 Init speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript) handleSend(transcript, true);
    };

    recognitionRef.current = recognition;
    setAutoListenReady(true);
  }, []);

  // 🗣️ Auto start once permission granted
  useEffect(() => {
    if (autoListenReady && recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  }, [autoListenReady]);

  // 📜 Auto-scroll chat
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    try {
      if (listening) recognitionRef.current.stop();
      else recognitionRef.current.start();
    } catch {}
  };

  const handleSend = (text?: string, spoken = false) => {
    const message = text ?? input;
    if (!message.trim()) return;

    const newMsgs = [...messages, { role: "user", content: message }];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      const reply = `Got it — processing your request: "${message}".`;
      const updated = [...newMsgs, { role: "assistant", content: reply }];
      setMessages(updated);

      if (spoken) {
        const synth = window.speechSynthesis;
        if (synth && !synth.speaking) {
          const utter = new SpeechSynthesisUtterance(reply);
          utter.lang = "en-US";
          utter.rate = 1;
          synth.speak(utter);
        }
      }
    }, 800);
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
      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* 🌀 Orb (listening animation) */}
        {listening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 opacity-40 blur-2xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-[spin_6s_linear_infinite]" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-700 
                              shadow-[0_0_25px_rgba(59,130,246,0.6)] animate-[pulse_3s_ease-in-out_infinite]
                              flex items-center justify-center text-center text-gray-100 font-light">
                Listening…
              </div>
              <div className="absolute w-44 h-44 rounded-full border border-cyan-400/30 animate-[ping_2s_ease-out_infinite]" />
              <div className="absolute w-40 h-40 rounded-full border border-blue-500/20 animate-[ping_3s_ease-out_infinite]" />
            </div>
          </div>
        )}

        {/* 💬 Chat container */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm md:text-base shadow-sm transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 🔘 Suggestions */}
      <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2 transition-opacity duration-500">
        {!listening &&
          suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s, false)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
            >
              {s}
            </button>
          ))}
      </div>

      {/* 🧠 Footer */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
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

          <input
            type="text"
            placeholder="Ask Ochiga AI anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleSend()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <FaPaperPlane className="text-white text-sm" />
          </button>
        </div>
      </footer>
    </div>
  );
}
