"use client";

import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./components/HamburgerMenu";
import ChatLayout from "./components/ChatLayout";
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
  AssistantPanel,
  AiPanel,
} from "@/components/panels";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
};

export default function AIDashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I’m Ochiga AI — how can I assist you today?",
    },
  ]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

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
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  const resetSilenceTimer = (recognition: any) => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
    }
    silenceTimer.current = window.setTimeout(() => {
      try {
        recognition.stop();
      } catch {}
    }, 1800);
  };

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const detectPanelType = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("cctv")) return "cctv";
    if (t.includes("light")) return "lights";
    if (t.includes("wallet")) return "wallet";
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

  const handleSend = (text?: string, spoken = false) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsgs = [...messages, { role: "user", content: message }];
    setMessages(userMsgs);
    setInput("");

    setTimeout(() => {
      const panel = detectPanelType(message);
      let reply = `Okay — I processed: "${message}".`;
      const responses: any = {
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
      };
      if (responses[panel]) reply = responses[panel];

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
        } catch {}
      }
    }, 500);
  };

  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      listening ? recognition.stop() : recognition.start();
    } catch {}
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      <HamburgerMenu />

      <main className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-40">
        <div ref={chatRef} className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
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

                {/* Dynamic panels */}
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
      </main>

      {/* Fixed Chat Footer */}
      <ChatLayout
        input={input}
        setInput={setInput}
        listening={listening}
        handleSend={handleSend}
        handleMicClick={handleMicClick}
      />
    </div>
  );
}
