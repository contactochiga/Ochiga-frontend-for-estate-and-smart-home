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
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
};

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I’m Ochiga AI — how can I assist you today?" },
  ]);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { listening, startListening, stopListening } = useSpeechRecognition(handleSend);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setShowScrollDown(scrollTop + clientHeight < scrollHeight - 50);
  }, [messages]);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setShowScrollDown(scrollTop + clientHeight < scrollHeight - 50);
  };

  const scrollToBottom = () => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    setShowScrollDown(false);
  };

  const handleMicClick = () => (listening ? stopListening() : startListening());

  // Unified action handler
  const handleAction = (actions: Array<{ type: string; action: string; target: string }>, userMessage?: string) => {
    const newMessages: ChatMessage[] = [];

    actions.forEach((a) => {
      let reply = "I didn’t quite get that. Can you say it again?";
      let panel: string | null = null;

      switch (a.type) {
        case "device":
          if (a.action === "turn_on" && a.target === "light") {
            reply = "Turning on the lights.";
            panel = "lights";
          }
          if (a.action === "turn_on" && a.target === "ac") {
            reply = "Switching on the AC.";
            panel = "lights"; // Or AC panel if separate
          }
          if (a.action === "open" && a.target === "door") {
            reply = "Opening the door now.";
            panel = null;
          }
          if (a.action === "turn_on" && a.target === "camera") {
            reply = "Turning on your security cameras.";
            panel = "cctv";
          }
          if (a.action === "discover" && a.target === "devices") {
            reply = "Scanning for nearby devices…";
            panel = "devices";
          }
          break;

        case "schedule":
          if (a.action === "create" && a.target === "visitor") {
            reply = "Sure. What time should I schedule your visitor?";
            panel = "visitors";
          }
          break;

        case "info":
          if (a.action === "query" && a.target === "status") {
            reply = "Your home is secure, power is stable, and the network is strong.";
            panel = null;
          }
          break;

        case "system":
          if (a.action === "shutdown" && a.target === "assistant") {
            reply = "Alright. Ochiga Assistant signing off.";
            panel = null;
          }
          break;
      }

      if (userMessage) {
        newMessages.push({ role: "user", content: userMessage });
      }

      newMessages.push({ role: "assistant", content: reply, panel });

      if (panel) setActivePanel(panel);
    });

    setMessages((prev) => [...prev, ...newMessages]);

    if (newMessages.length > 0) speak(newMessages[newMessages.length - 1].content);
  };

  // Unified send handler for typed and spoken messages
  function handleSend(text?: string, spoken = false) {
    const message = (text ?? input).trim();
    if (!message) return;

    setInput("");

    // Detect panel type for simple commands
    const panel = detectPanelType(message);

    // Map simple text commands to structured actions
    const actions: Array<{ type: string; action: string; target: string }> = [];

    if (message.toLowerCase().includes("light")) actions.push({ type: "device", action: "turn_on", target: "light" });
    if (message.toLowerCase().includes("ac") || message.toLowerCase().includes("air conditioner"))
      actions.push({ type: "device", action: "turn_on", target: "ac" });
    if (message.toLowerCase().includes("door")) actions.push({ type: "device", action: "open", target: "door" });
    if (message.toLowerCase().includes("camera")) actions.push({ type: "device", action: "turn_on", target: "camera" });
    if (message.toLowerCase().includes("visitor")) actions.push({ type: "schedule", action: "create", target: "visitor" });
    if (message.toLowerCase().includes("status")) actions.push({ type: "info", action: "query", target: "status" });
    if (message.toLowerCase().includes("shut down") || message.toLowerCase().includes("sleep"))
      actions.push({ type: "system", action: "shutdown", target: "assistant" });
    if (
      message.toLowerCase().includes("connect device") ||
      message.toLowerCase().includes("add device") ||
      message.toLowerCase().includes("scan devices") ||
      message.toLowerCase().includes("discover device") ||
      message.toLowerCase().includes("pair device") ||
      message.toLowerCase().includes("new device")
    )
      actions.push({ type: "device", action: "discover", target: "devices" });

    if (actions.length) {
      handleAction(actions, message);
    } else {
      // Fallback reply if no structured action
      const replyMsg: ChatMessage = { role: "assistant", content: `Okay — I processed: "${message}".`, panel };
      setMessages((prev) => [...prev, { role: "user", content: message }, replyMsg]);
      if (spoken) speak(replyMsg.content);
      if (panel) setActivePanel(panel);
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
                key={i}
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

                  {/* Panel injection */}
                  {msg.panel === "lights" && <LightControl />}
                  {msg.panel === "wallet" && <WalletPanel />}
                  {msg.panel === "cctv" && <CCTVPanel />}
                  {msg.panel === "estate" && <EstatePanel />}
                  {msg.panel === "home" && <HomePanel />}
                  {msg.panel === "room" && <RoomPanel />}
                  {msg.panel === "visitors" && <VisitorsPanel />}
                  {msg.panel === "payments" && <PaymentsPanel />}
                  {msg.panel === "utilities" && <UtilitiesPanel />}
                  {msg.panel === "community" && <CommunityPanel />}
                  {msg.panel === "notifications" && <NotificationsPanel />}
                  {msg.panel === "health" && <HealthPanel />}
                  {msg.panel === "message" && <MessagePanel />}
                  {msg.panel === "iot" && <IoTPanel />}
                  {msg.panel === "assistant" && <AssistantPanel />}
                  {msg.panel === "ai" && <AiPanel />}
                  {msg.panel === "devices" && <DeviceDiscoveryPanel />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-6 z-50 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition"
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
