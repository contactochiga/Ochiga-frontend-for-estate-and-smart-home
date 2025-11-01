"use client";
import { useState } from "react";

export default function OchigaAssistant({ onCommand }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi! I’m Ochiga — your Smart Estate Assistant." },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();

    const aiReply = data.reply || "Hmm, I’ll need to think more about that.";
    setMessages((m) => [...m, { sender: "ai", text: aiReply }]);

    if (onCommand) onCommand(aiReply);
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3 z-50">
          <div className="h-64 overflow-y-auto space-y-2 mb-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "ai"
                    ? "bg-gray-100 dark:bg-gray-800 text-sm"
                    : "bg-blue-600 text-white text-sm self-end text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Ochiga..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
