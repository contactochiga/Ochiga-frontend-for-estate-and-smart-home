"use client";

import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import TopBar from "../components/TopBar";

export default function AIDashboard() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I’m Ochiga AI — how can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Mock AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Got it! I’m processing your request...",
        },
      ]);
    }, 700);
  };

  const handleMicClick = () => {
    setListening((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* ✅ TOP BAR */}
      <TopBar />

      {/* ✅ MAIN CHAT AREA */}
      <main className="flex-1 overflow-y-auto px-4 md:px-12 py-24 space-y-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm md:text-base ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ✅ CHAT INPUT BAR (ChatGPT-style) */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center px-4 py-3 space-x-3">
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

          <input
            type="text"
            placeholder="Ask Ochiga AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full flex items-center justify-center"
          >
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
}
