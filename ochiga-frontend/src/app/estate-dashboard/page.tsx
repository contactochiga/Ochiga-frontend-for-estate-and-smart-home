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
  time?: string; // only user messages will have timestamps
};

export default function EstateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const createId = () => Math.random().toString(36).substring(2, 9);

  // ======================================================
  // Handle Chat + Panel REPLACEMENT Logic
  // ======================================================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const panel = detectEstatePanelType(message);

    // ======================================================
    // PANEL REQUEST LOGIC — clean replacement + NO timestamps
    // ======================================================
    if (panel) {
      setMessages((prev) => {
        const cleaned = prev.filter((m) => m.panel !== panel);

        const newAssistant: ChatMessage = {
          role: "assistant",
          content: "",
          panel,
          id: createId(),
        };

        return [...cleaned, newAssistant];
      });

      setInput("");

      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);

      return;
    }

    // ======================================================
    // NORMAL USER MESSAGE — timestamp ONLY here
    // ======================================================
    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      panel: null,
      id: createId(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  // ======================================================
  // PANEL RENDER
  // ======================================================
  const renderPanel = (panel: string | null | undefined) => {
    switch (panel) {
      case "estate_devices":
        return <EstateDevicePanel />;
      case "estate_power":
        return <EstatePowerPanel />;
      case "estate_accounting":
        return <EstateAccountingPanel />;
      case "estate_community":
        return <EstateCommunityPanel />;
      default:
        return null;
    }
  };

  // ======================================================
  // UI RENDER
  // ======================================================
  return (
    <LayoutWrapper>
      {/* 🔹 NEW Hamburger menu behaviour (full push + blur) */}
      <HamburgerMenu />

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden transition-all duration-500">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col max-w-[80%]">

                  {/* ========== USER CHAT BUBBLE + TIMESTAMP ========== */}
                  {msg.role === "user" && msg.panel == null && (
                    <>
                      <div className="px-4 py-3 rounded-2xl bg-blue-600 text-white text-sm md:text-base shadow-sm rounded-br-none">
                        {msg.content}
                      </div>

                      <div className="text-[10px] text-gray-400 mt-1 mb-2 px-2">
                        {msg.time}
                      </div>
                    </>
                  )}

                  {/* ========== ASSISTANT CHAT BUBBLE (NO TIMESTAMP) ========== */}
                  {msg.role === "assistant" && msg.panel == null && (
                    <div className="px-4 py-3 rounded-2xl bg-gray-900 text-gray-100 border border-gray-700 text-sm md:text-base shadow-sm rounded-bl-none">
                      {msg.content}
                    </div>
                  )}

                  {/* ========== PANEL (No timestamp) ========== */}
                  {msg.role === "assistant" && msg.panel && (
                    <div className="mt-1">
                      {renderPanel(msg.panel)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion Cards */}
        <DynamicSuggestionCard
          suggestions={[]}
          isTyping={input.trim().length > 0}
          onSend={handleSend}
        />

        {/* Footer Input */}
        <EstateChatFooter
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </main>
    </LayoutWrapper>
  );
}
