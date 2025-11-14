"use client";

import { useRef, useState, useEffect } from "react";
import LayoutWrapper from "./layout/LayoutWrapper";

import EstateDevicePanel from "./components/panels/EestateDevicePanel";
import EstatePowerPanel from "./components/panels/EstatePowerPanel";
import EstateAccountingPanel from "./components/panels/EstateAccountingPanel";
import EstateCommunityPanel from "./components/panels/EstateCommunityPanel";

import HamburgerMenu from "./components/HamburgerMenu";
import EstateChatFooter from "./components/EstateChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";

import { detectEstatePanelType } from "./utils/estatePanelDetection";
import { FaArrowDown } from "react-icons/fa";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
  panelTag?: string | null;
  time: string;
};

export default function EstateDashboard() {
  const createId = () => Math.random().toString(36).substring(2, 9);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      role: "assistant",
      content: "Welcome, Estate Admin! How can I assist you today?",
      panel: null,
      panelTag: null,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const nowTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isAtBottom = () => {
    if (!chatRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    return scrollTop + clientHeight >= scrollHeight - 100;
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior,
    });
    setShowScrollDown(false);
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

  const movePanelGroupToBottom = (panelTag: string) => {
    setMessages((prev) => {
      const group = prev.filter((m) => m.panelTag === panelTag);
      if (!group.length) return prev;

      const rest = prev.filter((m) => m.panelTag !== panelTag);
      const t = nowTime();
      const updatedGroup = group.map((m) => ({
        ...m,
        time: t,
        id: createId(),
      }));
      return [...rest, ...updatedGroup];
    });

    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  };

  const appendPanelGroup = (
    userText: string,
    assistantText: string,
    panel: string
  ) => {
    const tag = panel;
    const t = nowTime();

    const userMsg: ChatMessage = {
      id: createId(),
      role: "user",
      content: userText,
      panel: null,
      panelTag: tag,
      time: t,
    };

    const assistantMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: assistantText,
      panel: null,
      panelTag: tag,
      time: t,
    };

    const panelMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: "",
      panel,
      panelTag: tag,
      time: t,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg, panelMsg]);

    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  };

  function handleSend(text?: string) {
    const messageText = (text ?? input).trim();
    if (!messageText) return;

    setInput("");

    const panel = detectEstatePanelType(messageText);
    if (panel) {
      const reply =
        panel === "estate_devices"
          ? "Estate device panel opened."
          : panel === "estate_power"
          ? "Estate power control opened."
          : panel === "estate_accounting"
          ? "Estate accounting opened."
          : panel === "estate_community"
          ? "Estate community panel opened."
          : `Opened ${panel}.`;

      const exists = messages.some((m) => m.panelTag === panel);
      if (exists) movePanelGroupToBottom(panel);
      else appendPanelGroup(messageText, reply, panel);
      return;
    }

    const t = nowTime();
    const userMsg: ChatMessage = {
      id: createId(),
      role: "user",
      content: messageText,
      panel: null,
      panelTag: null,
      time: t,
    };
    const assistantMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: `Okay — I processed: "${messageText}".`,
      panel: null,
      panelTag: null,
      time: t,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  }

  const renderPanel = (panel: string | null | undefined) => {
    switch (panel) {
      case "estate_devices":
        return (
          <EstateDevicePanel
            devices={[]}
            onAction={(id, action) => handleSend(`Device ${id} ${action}`)}
          />
        );
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

  return (
    <LayoutWrapper>
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu />
      </header>

      <main className="flex flex-col h-full relative">
        {/* CHAT SCROLL AREA */}
        <div
          ref={chatRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-40 space-y-4 scroll-smooth"
          style={{ paddingBottom: "170px" }}
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => {
              const isPanelBlock = Boolean(msg.panel);

              return (
                <div
                  key={msg.id}
                  ref={(el) => (messageRefs.current[i] = el)}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex flex-col max-w-[80%]">
                    {/* NORMAL MESSAGES */}
                    {!isPanelBlock && (
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm relative break-words ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none self-end"
                            : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none self-start"
                        }`}
                      >
                        <div>{msg.content}</div>

                        {msg.role === "user" && (
                          <div className="text-[10px] text-gray-300 opacity-80 absolute right-2 bottom-1">
                            {msg.time}
                          </div>
                        )}
                      </div>
                    )}

                    {/* PANEL BLOCK */}
                    {isPanelBlock && (
                      <div className="mt-1 w-full">
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 shadow-sm">
                          {renderPanel(msg.panel)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SCROLL TO BOTTOM */}
        {showScrollDown && (
          <button
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-32 right-6 z-50 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg"
          >
            <FaArrowDown />
          </button>
        )}

        {/* FIXED SUGGESTION CARD */}
        <div className="fixed bottom-20 left-0 w-full px-4 z-40">
          <DynamicSuggestionCard
            suggestions={[]}
            onSend={handleSend}
            isTyping={input.trim().length > 0}
          />
        </div>

        {/* FIXED FOOTER */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <EstateChatFooter
            input={input}
            setInput={setInput}
            onSend={() => handleSend()}
            onAction={(actions, msg) => {}}
          />
        </div>
      </main>
    </LayoutWrapper>
  );
}
