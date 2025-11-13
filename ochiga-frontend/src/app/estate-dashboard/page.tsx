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
  time: string;
};

export default function EstateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome, Estate Admin! How can I assist you today?",
      id: "welcome",
      panel: null,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const createId = () => Math.random().toString(36).substring(2, 9);

  // ======================================================
  // Handle Chat + Panel Reuse Logic
  // ======================================================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      panel: null,
      id: createId(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const panel = detectEstatePanelType(message);

      // If message is for a panel
      const existingIndex = messages.findIndex((m) => m.panel === panel);

      if (existingIndex !== -1 && panel) {
        const existingMessage = messages[existingIndex];

        // ✨ Update timestamp only
        const updatedMessage = {
          ...existingMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        // ✨ Move message to bottom (latest)
        setMessages((prev) => {
          const newList = prev.filter((m) => m.id !== existingMessage.id);
          newList.push(updatedMessage);
          return newList;
        });

        // ✨ Bounce & scroll to updated panel
        setTimeout(() => {
          const el = document.querySelector(`[data-id='${existingMessage.id}']`);
          if (el) {
            el.classList.add("bounce-panel");
            setTimeout(() => el.classList.remove("bounce-panel"), 700);

            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 80);

        return;
      }

      // Otherwise create NEW PANEL MESSAGE
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
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }, 250);
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
            {messages.map((msg) => (
              <div
                key={msg.id}
                data-id={msg.id}
                data-panel={msg.panel || ""}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[80%]">
                  {/* CHAT BUBBLE */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* TIMESTAMP */}
                  <div className="text-[10px] text-gray-400 mt-1 mb-2 px-2">
                    {msg.time}
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

        {/* Suggestion Card */}
        <DynamicSuggestionCard
          suggestions={[]}
          isTyping={input.trim().length > 0}
          onSend={handleSend}
        />

        {/* Footer */}
        <EstateChatFooter input={input} setInput={setInput} onSend={handleSend} />
      </main>
    </LayoutWrapper>
  );
}
