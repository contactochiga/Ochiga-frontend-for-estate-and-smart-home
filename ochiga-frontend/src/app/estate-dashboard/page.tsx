"use client";

import { useState, useRef } from "react";
import LayoutWrapper from "./layout/LayoutWrapper";

import EstateDevicePanel from "./components/panels/EstateDevicePanel";
import EstatePowerPanel from "./components/panels/EstatePowerPanel";
import EstateAccountingPanel from "./components/panels/EstateAccountingPanel";
import EstateCommunityPanel from "./components/panels/EstateCommunityPanel";

import HamburgerMenu from "./components/HamburgerMenu";
import EstateChatFooter from "./components/EstateChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";

import { detectEstatePanelType } from "./utils/estatePanelDetection";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
  id: string;
};

export default function EstateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome, Estate Admin! How can I assist you today?",
      id: "welcome",
    },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const createId = () => Math.random().toString(36).substring(2, 10);

  // ======================================================
  // Handle Chat + No Duplicate Panel Logic
  // ======================================================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      panel: null,
      id: createId(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const panel = detectEstatePanelType(message);

      if (panel) {
        // ================
        // 1️⃣ Check if panel already exists
        // ================
        const existingIndex = messages.findIndex((m) => m.panel === panel);

        if (existingIndex !== -1) {
          // Bounce + scroll to existing panel
          const existingId = messages[existingIndex].id;

          const el = document.querySelector(`[data-id='${existingId}']`);
          if (el) {
            el.classList.add("bounce-panel");
            setTimeout(() => el.classList.remove("bounce-panel"), 700);

            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }

          return;
        }
      }

      // ================
      // 2️⃣ Otherwise create NEW panel message
      // ================
      let reply = `Okay — I processed: "${message}".`;
      if (panel === "estate_devices") reply = "Estate device panel opened.";
      if (panel === "estate_power") reply = "Estate power control panel opened.";
      if (panel === "estate_accounting") reply = "Estate accounting panel opened.";
      if (panel === "estate_community") reply = "Estate community panel opened.";

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: reply,
        panel,
        id: createId(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }, 300);
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <LayoutWrapper>
      <HamburgerMenu />

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                data-id={msg.id}
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

                  {/* PANEL RENDERING */}
                  {msg.panel === "estate_devices" && <EstateDevicePanel />}
                  {msg.panel === "estate_power" && <EstatePowerPanel />}
                  {msg.panel === "estate_accounting" && <EstateAccountingPanel />}
                  {msg.panel === "estate_community" && <EstateCommunityPanel />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DynamicSuggestionCard
          suggestions={[]}
          isTyping={input.trim().length > 0}
          onSend={handleSend}
        />

        <EstateChatFooter input={input} setInput={setInput} onSend={handleSend} />
      </main>
    </LayoutWrapper>
  );
}
