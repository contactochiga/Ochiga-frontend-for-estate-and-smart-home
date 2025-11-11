"use client";

import { useState, useRef, useEffect } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";
import { speak } from "./utils/speak";
import { detectPanelType } from "./utils/panelDetection";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
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
} from "./components/Panels";

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

  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (text?: string, spoken = false) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsgs = [...messages, { role: "user", content: message }];
    setMessages(userMsgs);
    setInput("");

    setTimeout(() => {
      const panel = detectPanelType(message);
      let reply = `Okay — I processed: "${message}".`;
      if (panel === "lights") reply = "Turning on the lights in the requested area.";
      if (panel === "wallet") reply = "Opening wallet controls for you.";
      if (panel === "cctv") reply = "Loading CCTV preview for the requested camera.";
      if (panel === "visitors") reply = "Opening visitor access controls.";
      if (panel === "estate") reply = "Showing estate overview and status.";
      if (panel === "home") reply = "Showing home controls and scenes.";
      if (panel === "room") reply = "Here is the room monitoring panel.";
      if (panel === "payments") reply = "Payments panel ready.";
      if (panel === "utilities") reply = "Utilities dashboard opened.";
      if (panel === "community") reply = "Community hub opened.";
      if (panel === "notifications") reply = "Notifications panel opened.";
      if (panel === "health") reply = "Health monitoring panel opened.";
      if (panel === "message") reply = "Messaging panel opened.";
      if (panel === "iot") reply = "IoT devices panel ready.";
      if (panel === "assistant" || panel === "ai") reply = "Assistant configuration panel opened.";

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages([...userMsgs, assistantMsg]);

      if (spoken) speak(reply);
    }, 500);
  };

  const detectPanelType = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("cctv") || t.includes("camera")) return "cctv";
    if (t.includes("light")) return "lights";
    if (t.includes("wallet") || t.includes("fund")) return "wallet";
    if (t.includes("visitor")) return "visitors";
    if (t.includes("estate")) return "estate";
    if (t.includes("home")) return "home";
    if (t.includes("room")) return "room";
    if (t.includes("payment")) return "payments";
    if (t.includes("utility")) return "utilities";
    if (t.includes("community")) return "community";
    if (t.includes("notification")) return "notifications";
    if (t.includes("health")) return "health";
    if (t.includes("message")) return "message";
    if (t.includes("iot")) return "iot";
    if (t.includes("assistant") || t.includes("ai")) return "assistant";
    return null;
  };

  const { listening, toggleListening } = useSpeechRecognition(handleSend);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu />
      </header>

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm transition-all duration-300 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <DynamicSuggestionCard suggestions={suggestions} onSend={handleSend} />
      <ChatFooter input={input} setInput={setInput} listening={listening} onMicClick={toggleListening} onSend={() => handleSend(undefined, false)} />
    </div>
  );
}
