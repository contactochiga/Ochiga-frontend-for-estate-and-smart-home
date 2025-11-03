"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard"; // ✅ only this import remains

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I’m Ochiga AI — how can I assist you today?" },
  ]);
  const [userActions, setUserActions] = useState<string[]>([]); // 🧠 tracks user patterns
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // --- Auto-scroll to bottom ---
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // --- Voice mic handler (simplified) ---
  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      if (listening) recognition.stop();
      else recognition.start();
    } catch (err) {
      console.warn("mic toggle error", err);
    }
  };

  // --- Send message ---
  const handleSend = (text?: string, spoken = false) => {
    const message = (text ?? input).trim();
    if (!message) return;

    // track this as a user action for smart suggestions
    setUserActions((prev) => [...prev, message]);

    const newMsgs = [...messages, { role: "user", content: message }];
    setMessages(newMsgs);
    setInput("");
    setIsTyping(false);

    // mock AI reply
    setTimeout(() => {
      const reply = `Got it — "${message}" received!`;
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    }, 600);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Chat area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 pt-10 pb-36 space-y-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-sm md:text-base transition-all duration-300 ${
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

      {/* 🧠 Smart Suggestion Card */}
      <DynamicSuggestionCard
        userActions={userActions}
        onSelect={(s) => handleSend(s, false)}
        isTyping={isTyping}
      />

      {/* Footer input */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3 fixed bottom-0">
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
            onChange={(e) => {
              setInput(e.target.value);
              setIsTyping(e.target.value.trim().length > 0);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSend(undefined, false)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleSend(undefined, false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <FaPaperPlane className="text-white text-sm" />
          </button>
        </div>
      </footer>
    </div>
  );
}
