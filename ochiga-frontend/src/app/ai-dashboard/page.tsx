"use client";

import { useEffect, useRef, useState } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";
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

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      resetSilenceTimer(recognition);
    };

    recognition.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript) {
        handleSend(transcript, true);
        resetSilenceTimer(recognition);
      }
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = (err: any) => {
      console.warn("recognition error", err);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // Silence timeout logic
  const resetSilenceTimer = (recognition: any) => {
    if (silenceTimer.current) {
      window.clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
    silenceTimer.current = window.setTimeout(() => {
      try {
        recognition.stop();
      } catch {}
    }, 1800);
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // Detect which panel user is referring to
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

  // Handle send message (typed or spoken)
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

      if (spoken) {
        try {
          const synth = window.speechSynthesis;
          if (synth && !synth.speaking) {
            const utter = new SpeechSynthesisUtterance(reply);
            utter.lang = "en-US";
            utter.rate = 1;
            synth.speak(utter);
          }
        } catch (err) {
          console.warn("speech synth error", err);
        }
      }
    }, 500);
  };

  // Handle mic
  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      listening ? recognition.stop() : recognition.start();
    } catch (err) {
      console.warn("mic toggle error", err);
    }
  };

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu />
      </header>

      {/* Main chat area */}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Suggestions + Footer */}
      <DynamicSuggestionCard suggestions={suggestions} onSend={handleSend} />
      <ChatFooter
        input={input}
        setInput={setInput}
        listening={listening}
        onMicClick={handleMicClick}
        onSend={() => handleSend(undefined, false)}
      />
    </div>
  );
}
