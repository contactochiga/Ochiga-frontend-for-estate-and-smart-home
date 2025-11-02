"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function ChatLayout() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    // Simulated AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "AI response coming soon..." },
      ]);
    }, 600);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="h-60 overflow-y-auto space-y-3 pb-3 scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm md:text-[15px] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="relative flex items-center gap-3 pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Ochiga AI..."
            className="flex-1 bg-gray-900 border border-gray-700 text-gray-200 text-sm md:text-base rounded-full px-4 py-2 focus:outline-none focus:border-blue-600 transition-all"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
          >
            <FaPaperPlane size={14} />
          </button>
          <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-blue-400 transition">
            <FaMicrophone size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
