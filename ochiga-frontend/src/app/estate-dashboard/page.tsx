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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const createId = () => Math.random().toString(36).substring(2, 9);

  // ======================================================
  // HANDLE SEND — PANEL BLOCK REPLACEMENT SYSTEM
  // ======================================================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const panel = detectEstatePanelType(message);
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // ======================================================
    // PANEL REQUEST — Replace whole block
    // ======================================================
    if (panel) {
      setMessages((prev) => {
        // Remove ANY old blocks for this panel
        const cleaned = prev.filter((m) => m.panel !== panel);

        // Create FRESH user bubble
        const userMsg: ChatMessage = {
          role: "user",
          content: message,
          id: createId(),
          panel: null,
          time: now,
        };

        // Create FRESH assistant bubble
        const assistantMsg: ChatMessage = {
          role: "assistant",
          content: `Processing "${message}"...`,
          id: createId(),
          panel: null,
          time: now,
        };

        // Create FRESH panel block
        const panelMsg: ChatMessage = {
          role: "assistant",
          content: "",
          id: createId(),
          panel,
          time: now,
        };

        return [...cleaned, userMsg, assistantMsg, panelMsg];
      });

      setInput("");

      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 120);

      return;
    }

    // ======================================================
    // NORMAL CHAT MESSAGE
    // ======================================================
    const userMsg: ChatMessage = {
      role: "user",
      content: message,
      id: createId(),
      panel: null,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  // ======================================================
  // PANEL RENDER SYSTEM
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
  // UI
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
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[80%]">

                  {/* CHAT BUBBLES */}
                  {msg.panel == null && (
                    <>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>

                      <div className="text-[10px] text-gray-400 mt-1 mb-2 px-2">
                        {msg.time}
                      </div>
                    </>
                  )}

                  {/* PANEL */}
                  {msg.role === "assistant" && msg.panel && (
                    <div className="mt-1">{renderPanel(msg.panel)}</div>
                  )}
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
