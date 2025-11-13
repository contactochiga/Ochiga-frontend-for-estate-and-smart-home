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
  DeviceDiscoveryPanel, // ✅ NEW
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

  const [activePanel, setActivePanel] = useState<string | null>(null); // 🆕 Track panel from voice commands
  const { listening, startListening, stopListening } = useSpeechRecognition(handleSend);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      chatRef.current.scrollTop = scrollHeight;
      setShowScrollDown(false);
    } else {
      setShowScrollDown(true);
    }
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

  // 🆕 Handler to receive structured actions from ChatFooter
  const handleAction = (actions: Array<{ type: string; action: string; target: string }>) => {
    actions.forEach((a) => {
      if (a.type === "device" && a.action === "discover" && a.target === "devices") {
        setActivePanel("devices");
        const msg: ChatMessage = {
          role: "assistant",
          content: "Scanning for nearby devices…",
          panel: "devices",
        };
        setMessages((prev) => [...prev, msg]);
      }
      // You can handle other structured actions here similarly
    });
  };

  function handleSend(text?: string, spoken = false) {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsgs = [...messages, { role: "user", content: message }];
    setMessages(userMsgs);
    setInput("");

    setTimeout(() => {
      const panel = detectPanelType(message);
      let reply = `Okay — I processed: "${message}".`;

      const panelReplies: Record<string, string> = {
        lights: "Turning on the lights in the requested area.",
        wallet: "Opening wallet controls for you.",
        cctv: "Loading CCTV preview for the requested camera.",
        visitors: "Opening visitor access controls.",
        estate: "Showing estate overview and status.",
        home: "Showing home controls and scenes.",
        room: "Here is the room monitoring panel.",
        payments: "Payments panel ready.",
        utilities: "Utilities dashboard opened.",
        community: "Community hub opened.",
        notifications: "Notifications panel opened.",
        health: "Health monitoring panel opened.",
        message: "Messaging panel opened.",
        iot: "IoT devices panel ready.",
        assistant: "Assistant configuration panel opened.",
        ai: "Assistant configuration panel opened.",
        devices: "Scanning for nearby devices...", // ✅ NEW
      };

      if (panel && panelReplies[panel]) reply = panelReplies[panel];

      // Scroll to last message of same panel
      if (panel) {
        const lastIndex = userMsgs.findIndex((m) => m.panel === panel);
        if (lastIndex !== -1 && messageRefs.current[lastIndex]) {
          messageRefs.current[lastIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages((prev) => [...prev, assistantMsg]);
      if (spoken) speak(reply);

      // Update active panel if detected
      if (panel) setActivePanel(panel);
    }, 500);
  }

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
    "Connect new device", // ✅ NEW
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
                  {msg.panel === "devices" && <DeviceDiscoveryPanel />} {/* ✅ NEW */}
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
        onAction={handleAction} // 🆕 Pass structured actions to dashboard
      />
    </LayoutWrapper>
  );
}
