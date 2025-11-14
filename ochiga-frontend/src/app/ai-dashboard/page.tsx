"use client";

import { useRef, useState, useEffect } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";
import LayoutWrapper from "./layout/LayoutWrapper";

import useSpeechRecognition from "./hooks/useSpeechRecognition";

import {
  LightControl,
  WalletPanel,
  CCTVPanel,
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
  AiPanel,
  AssistantPanel,
  DeviceDiscoveryPanel,
} from "./components/Panels";

import { detectPanelType } from "./utils/panelDetection";
import { speak } from "./utils/speak";
import { FaArrowDown } from "react-icons/fa";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  panel?: string | null; // the panel this message *opens* (only for assistant panel block)
  panelTag?: string | null; // grouping tag used to move blocks (user + assistant + panel)
  time: string;
};

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      role: "assistant",
      content: "Hello! I’m Ochiga AI — how can I assist you today?",
      panel: null,
      panelTag: null,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { listening, startListening, stopListening } = useSpeechRecognition(handleSend);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // helper to create id
  const createId = () => Math.random().toString(36).substring(2, 9);

  // is user near bottom?
  const isAtBottom = () => {
    if (!chatRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    return scrollTop + clientHeight >= scrollHeight - 100;
  };

  // update showScrollDown whenever messages change
  useEffect(() => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowScrollDown(!atBottom);
  }, [messages]);

  // scroll handler for user manual scrolling
  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowScrollDown(!atBottom);
  };

  // scroll to bottom helper (smooth)
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior });
    setShowScrollDown(false);
  };

  const handleMicClick = () => (listening ? stopListening() : startListening());

  // MOVE existing panel block (user+assistant+panel) to bottom (update times)
  const movePanelBlockToBottom = (panelTag: string) => {
    setMessages((prev) => {
      // collect messages with panelTag
      const grouped = prev.filter((m) => m.panelTag === panelTag);
      if (!grouped.length) return prev; // nothing to do

      // remove those messages from original array
      const filtered = prev.filter((m) => m.panelTag !== panelTag);

      // update timestamps for moved group
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const updatedGroup = grouped.map((m) => ({ ...m, time: now }));

      return [...filtered, ...updatedGroup];
    });

    // after state update, scroll if user was at bottom
    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  };

  // Append a fresh panel block (user + assistant + panel)
  const appendPanelBlock = (userText: string, assistantReply: string, panel: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const tag = panel; // using panel string as tag (should be unique per panel)

    const userMsg: ChatMessage = {
      id: createId(),
      role: "user",
      content: userText,
      panel: null,
      panelTag: tag,
      time: now,
    };

    const assistantMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: assistantReply,
      panel: null,
      panelTag: tag,
      time: now,
    };

    const panelMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: "", // panel itself renders below the bubble
      panel,
      panelTag: tag,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg, panelMsg]);

    // scroll logic: auto scroll only if user at bottom
    setTimeout(() => {
      if (isAtBottom()) scrollToBottom();
      else setShowScrollDown(true);
    }, 120);
  };

  // Unified action handler
  const handleAction = (actions: Array<{ type: string; action: string; target: string }>, userMessage?: string) => {
    // we'll process each action sequentially; if panel commands exist we'll open/move them
    actions.forEach((a) => {
      let reply = "I didn’t quite get that. Can you say it again?";
      let panel: string | null = null;

      if (a.type === "device") {
        if (a.action === "turn_on" && a.target === "light") {
          reply = "Turning on the lights.";
          panel = "lights";
        } else if (a.action === "turn_on" && a.target === "ac") {
          reply = "Switching on the AC.";
          panel = "lights";
        } else if (a.action === "open" && a.target === "door") {
          reply = "Opening the door now.";
          panel = null;
        } else if (a.action === "turn_on" && a.target === "camera") {
          reply = "Turning on your security cameras.";
          panel = "cctv";
        } else if (a.action === "discover" && a.target === "devices") {
          reply = "Scanning for nearby devices…";
          panel = "devices";
        }
      } else if (a.type === "schedule") {
        if (a.action === "create" && a.target === "visitor") {
          reply = "Sure. What time should I schedule your visitor?";
          panel = "visitors";
        }
      } else if (a.type === "info") {
        if (a.action === "query" && a.target === "status") {
          reply = "Your home is secure, power is stable, and the network is strong.";
          panel = null;
        }
      } else if (a.type === "system") {
        if (a.action === "shutdown" && a.target === "assistant") {
          reply = "Alright. Ochiga Assistant signing off.";
          panel = null;
        }
      }

      // If userMessage provided, we will use it as the user's bubble content
      const userText = userMessage ?? `${a.action} ${a.target}`;

      // If this panel already exists (has a panelTag in messages), move that group to bottom
      if (panel) {
        const exists = messages.some((m) => m.panelTag === panel);
        if (exists) {
          movePanelBlockToBottom(panel);
        } else {
          appendPanelBlock(userText, reply, panel);
        }
        setActivePanel(panel);
      } else {
        // Non-panel reply: append user + assistant simple messages
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const userMsg: ChatMessage = {
          id: createId(),
          role: "user",
          content: userText,
          panel: null,
          panelTag: null,
          time: now,
        };
        const assistantMsg: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: reply,
          panel: null,
          panelTag: null,
          time: now,
        };
        setMessages((prev) => [...prev, userMsg, assistantMsg]);

        setTimeout(() => {
          if (isAtBottom()) scrollToBottom();
          else setShowScrollDown(true);
        }, 120);

        // speak response
        speak(reply);
      }
    });
  };

  // Unified send handler for typed and spoken messages
  function handleSend(text?: string, spoken = false) {
    const messageText = (text ?? input).trim();
    if (!messageText) return;

    setInput("");

    // detect panel intent
    const panel = detectPanelType(messageText);

    // map simple text commands to actions
    const actions: Array<{ type: string; action: string; target: string }> = [];
    const lower = messageText.toLowerCase();

    if (lower.includes("light")) actions.push({ type: "device", action: "turn_on", target: "light" });
    if (lower.includes("ac") || lower.includes("air conditioner")) actions.push({ type: "device", action: "turn_on", target: "ac" });
    if (lower.includes("door")) actions.push({ type: "device", action: "open", target: "door" });
    if (lower.includes("camera")) actions.push({ type: "device", action: "turn_on", target: "camera" });
    if (lower.includes("visitor")) actions.push({ type: "schedule", action: "create", target: "visitor" });
    if (lower.includes("status")) actions.push({ type: "info", action: "query", target: "status" });
    if (lower.includes("shut down") || lower.includes("sleep")) actions.push({ type: "system", action: "shutdown", target: "assistant" });
    if (
      lower.includes("connect device") ||
      lower.includes("add device") ||
      lower.includes("scan devices") ||
      lower.includes("discover device") ||
      lower.includes("pair device") ||
      lower.includes("new device")
    )
      actions.push({ type: "device", action: "discover", target: "devices" });

    if (actions.length) {
      handleAction(actions, messageText);
    } else {
      // fallback: just append user + assistant (and set active panel if detected)
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content: messageText,
        panel: null,
        panelTag: null,
        time: now,
      };
      const replyMsg: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: `Okay — I processed: "${messageText}".`,
        panel: panel ?? null,
        panelTag: panel ?? null,
        time: now,
      };

      // If panel detected and already exists, move existing; else append new pair (+ panel if panel exists)
      if (panel) {
        const exists = messages.some((m) => m.panelTag === panel);
        if (exists) {
          // move existing block to bottom
          movePanelBlockToBottom(panel);
        } else {
          // append user + assistant + panel block
          appendPanelBlock(messageText, replyMsg.content, panel);
          setActivePanel(panel);
        }
      } else {
        setMessages((prev) => [...prev, userMsg, replyMsg]);
        setTimeout(() => {
          if (isAtBottom()) scrollToBottom();
          else setShowScrollDown(true);
        }, 120);
        if (spoken) speak(replyMsg.content);
      }
    }
  }

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
    "Connect new device",
  ];

  // Render panel based on panel key
  const renderPanel = (panel: string | null | undefined) => {
    switch (panel) {
      case "lights":
        return <LightControl />;
      case "wallet":
        return <WalletPanel />;
      case "cctv":
        return <CCTVPanel />;
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
      case "assistant":
        return <AssistantPanel />;
      case "ai":
        return <AiPanel />;
      case "devices":
        return <DeviceDiscoveryPanel />;
      default:
        return null;
    }
  };

  // When messages state changes, if user is at bottom we auto-scroll
  useEffect(() => {
    if (isAtBottom()) {
      scrollToBottom("auto");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  return (
    <LayoutWrapper>
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu />
      </header>

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        <div
          ref={chatRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                ref={(el) => (messageRefs.current[i] = el)}
                data-panel={msg.panel || ""}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm transition-all duration-300 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* time stamp under bubble */}
                  <div className="text-[10px] text-gray-400 mt-1 mb-2 px-2">
                    {msg.time}
                  </div>

                  {/* Panel injection: only render when this message is the assistant panel block */}
                  {msg.panel && renderPanel(msg.panel)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showScrollDown && (
          <button
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-24 right-6 z-50 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition"
            aria-label="Scroll to latest message"
          >
            <FaArrowDown />
          </button>
        )}
      </main>

      <DynamicSuggestionCard suggestions={suggestions} onSend={handleSend} isTyping={input.length > 0} />
      <ChatFooter
        input={input}
        setInput={setInput}
        listening={listening}
        onMicClick={handleMicClick}
        onSend={() => handleSend(undefined, false)}
        onAction={handleAction} // Unified action handler
      />
    </LayoutWrapper>
  );
}
