"use client";

import { useRef, useState, useEffect } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";
import LayoutWrapper from "./layout/LayoutWrapper";

import {
  EstatePanel,
  HomePanel,
  RoomPanel,
  VisitorsPanel,
  PaymentsPanel,
  UtilitiesPanel,
  CommunityPanel,
  NotificationsPanel,
  HealthPanel,
  MessagePanel,
  IoTPanel,
  DeviceDiscoveryPanel,
} from "./components/Panels";

import { detectPanelType } from "./utils/panelDetection";
import { speak } from "./utils/speak";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
  panelTag?: string | null;
  time: string;
};

export default function EstateDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      role: "assistant",
      content: "Welcome to your Estate Dashboard! How can I assist you today?",
      panel: null,
      panelTag: null,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const createId = () => Math.random().toString(36).substring(2, 9);

  const isAtBottom = () => {
    if (!chatRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    return scrollTop + clientHeight >= scrollHeight - 100;
  };

  useEffect(() => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowScrollDown(!atBottom);
  }, [messages]);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowScrollDown(!atBottom);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior });
    setShowScrollDown(false);
  };

  const createMessage = (role: "user" | "assistant", content: string, panel: string | null = null) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return {
      id: createId(),
      role,
      content,
      panel,
      panelTag: panel,
      time: now,
    };
  };

  const appendPanelBlock = (userText: string, assistantReply: string, panel: string) => {
    const userMsg = createMessage("user", userText, panel);
    const assistantMsg = createMessage("assistant", assistantReply, panel);
    const panelMsg = createMessage("assistant", "", panel);

    setMessages((prev) => [...prev, userMsg, assistantMsg, panelMsg]);
    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  };

  const handleSend = (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText) return;

    setInput("");

    const panel = detectPanelType(messageText);

    if (panel) {
      const exists = messages.some((m) => m.panelTag === panel);
      if (!exists) appendPanelBlock(messageText, `Opened ${panel} panel.`, panel);
      setActivePanel(panel);
    } else {
      const userMsg = createMessage("user", messageText);
      const assistantMsg = createMessage("assistant", `Processed: "${messageText}"`);
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    }

    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 100);
  };

  const suggestions = [
    "View estate overview",
    "Check room status",
    "Schedule visitor",
    "Make payment",
    "Check utilities",
    "Add new device",
  ];

  const renderPanel = (panel: string | null | undefined) => {
    switch (panel) {
      case "estate":
        return <EstatePanel />;
      case "home":
        return <HomePanel />;
      case "room":
        return <RoomPanel />;
      case "visitors":
        return <VisitorsPanel />;
      case "payments":
        return <PaymentsPanel />;
      case "utilities":
        return <UtilitiesPanel />;
      case "community":
        return <CommunityPanel />;
      case "notifications":
        return <NotificationsPanel />;
      case "health":
        return <HealthPanel />;
      case "message":
        return <MessagePanel />;
      case "iot":
        return <IoTPanel />;
      case "devices":
        return <DeviceDiscoveryPanel />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isAtBottom()) scrollToBottom("auto");
  }, [messages.length]);

  return (
    <LayoutWrapper menuOpen={menuOpen}>
      {/* HAMBURGER */}
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu onToggle={(o: boolean) => setMenuOpen(o)} />
      </header>

      {/* FIXED PAGE */}
      <div className="fixed inset-0 flex flex-col w-full h-full">
        {/* CHAT + PANELS */}
        <main
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            transform: menuOpen ? "translateX(70%)" : "translateX(0)",
            filter: menuOpen ? "blur(2px)" : "none",
            transition: "all 0.5s",
          }}
        >
          <div
            ref={chatRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
          >
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {messages.map((msg, i) => {
                const isPanelBlock = Boolean(msg.panel);
                return (
                  <div
                    key={msg.id}
                    ref={(el) => (messageRefs.current[i] = el)}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex flex-col max-w-[80%]">
                      {msg.content && (
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                          }`}
                        >
                          {msg.content}
                          {msg.role === "user" && (
                            <span className="text-[10px] text-gray-300 ml-2">{msg.time}</span>
                          )}
                        </div>
                      )}
                      {isPanelBlock && <div className="mt-1 w-full">{renderPanel(msg.panel)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* DYNAMIC SUGGESTION CARD */}
        <div className="w-full px-4 z-40 pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <DynamicSuggestionCard suggestions={suggestions} onSend={handleSend} isTyping={input.length > 0} />
          </div>
        </div>

        {/* CHAT FOOTER FULL WIDTH */}
        <div className="w-full px-4 py-2 bg-gray-900 border-t border-gray-700 flex justify-center items-center z-50">
          <ChatFooter input={input} setInput={setInput} onSend={() => handleSend()} />
        </div>
      </div>

      {showScrollDown && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          ↓
        </button>
      )}
    </LayoutWrapper>
  );
}
