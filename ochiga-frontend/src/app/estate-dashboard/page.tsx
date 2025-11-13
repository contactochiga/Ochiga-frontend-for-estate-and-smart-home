"use client";

import { useState, useRef } from "react";
import LayoutWrapper from "./layout/LayoutWrapper";

import EstateDevicePanel from "./components/panels/EstateDevicePanel";
import EstatePowerPanel from "./components/panels/EstatePowerPanel";
import EstateAccountingPanel from "./components/panels/EstateAccountingPanel";
import EstateCommunityPanel from "./components/panels/EstateCommunityPanel";

import { detectEstatePanelType } from "./utils/estatePanelDetection";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
};

export default function EstateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Welcome, Estate Admin! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  // =======================
  // Chat Handling
  // =======================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const panel = detectEstatePanelType(message);
      let reply = `Okay — I processed: "${message}".`;

      if (panel === "estate_devices") reply = "Estate device panel opened.";
      if (panel === "estate_power") reply = "Estate power control panel opened.";
      if (panel === "estate_accounting") reply = "Estate accounting panel opened.";
      if (panel === "estate_community") reply = "Estate community panel opened.";

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages((prev) => [...prev, assistantMsg]);

      // Scroll to bottom
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
      }, 300);
    }, 300);
  };

  return (
    <LayoutWrapper>
      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                data-panel={msg.panel || ""}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Panels */}
                  {msg.panel === "estate_devices" && <EstateDevicePanel />}
                  {msg.panel === "estate_power" && <EstatePowerPanel />}
                  {msg.panel === "estate_accounting" && <EstateAccountingPanel />}
                  {msg.panel === "estate_community" && <EstateCommunityPanel />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <footer className="fixed bottom-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full outline-none"
              placeholder="Type a command or message..."
            />
            <button
              onClick={() => handleSend()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-medium"
            >
              Send
            </button>
          </div>
        </footer>
      </main>
    </LayoutWrapper>
  );
}
