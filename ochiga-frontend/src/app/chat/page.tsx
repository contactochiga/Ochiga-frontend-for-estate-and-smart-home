"use client";

import { useState } from "react";
import ChatFooter from "./ChatFooter";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);

  const handleMicClick = () => {
    // Start or stop voice recognition here
    setListening((prev) => !prev);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    // Call your AI or backend API here
  };

  return (
    <div className="relative h-screen w-screen bg-gray-950 text-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.role === "user" ? "bg-blue-700 self-end" : "bg-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <ChatFooter
        input={input}
        setInput={setInput}
        listening={listening}
        onMicClick={handleMicClick}
        onSend={handleSend}
      />
    </div>
  );
}
