"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

/* ----------------------------------------------------
   MODULE PLACEHOLDERS — Replace with real components later
---------------------------------------------------- */

const LightControl = () => (
  <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="font-semibold text-gray-300">Lighting Module</p>
    <p className="mt-1 text-gray-400">
      Controls for room lights, dimmers, ambience.
    </p>
  </div>
);

const SecurityControl = () => (
  <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="font-semibold text-gray-300">Security System</p>
    <p className="mt-1 text-gray-400">
      Door locks, sensors, perimeter scan info.
    </p>
  </div>
);

const EnvironmentMonitor = () => (
  <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="font-semibold text-gray-300">Environment Monitor</p>
    <p className="mt-1 text-gray-400">
      Temperature, humidity, air quality readings.
    </p>
  </div>
);

/* ----------------------------------------------------
   MAIN DASHBOARD COMPONENT
---------------------------------------------------- */

export default function AIHomeDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);

    // TODO: Replace with real backend call to AI agent
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Your AI response will appear here soon...",
        },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-950">
        <h1 className="text-xl font-bold tracking-wide">Ochiga AI Home Control</h1>
        <span className="text-sm text-gray-400">v1.0</span>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: CHAT PANEL */}
        <div className="w-full md:w-7/12 flex flex-col border-r border-gray-800">

          {/* CHAT STREAM */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[85%] ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600"
                    : "mr-auto bg-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-4 border-t border-gray-800 bg-gray-950 flex items-center gap-3">

            <button
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition"
            >
              <FaMicrophone size={17} />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask your AI to control or check anything…"
              className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 text-sm focus:outline-none"
            />

            <button
              onClick={sendMessage}
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
            >
              <FaPaperPlane size={15} />
            </button>
          </div>
        </div>

        {/* RIGHT: MODULES PANEL */}
        <div className="hidden md:flex w-5/12 flex-col overflow-y-auto p-4 bg-gray-950">

          <h2 className="text-lg font-semibold mb-3 text-gray-300">System Modules</h2>

          <div className="space-y-4">

            <LightControl />
            <SecurityControl />
            <EnvironmentMonitor />

          </div>
        </div>

      </div>
    </div>
  );
}
