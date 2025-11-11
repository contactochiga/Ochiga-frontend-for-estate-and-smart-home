"use client";

import { useEffect, useRef, useState } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";

/* -----------------------------
   Module Panels (with interactivity)
   ----------------------------- */

const LightControl = () => {
  const [active, setActive] = useState<"on" | "off" | "dim" | null>(null);

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActive("on")}
          className={`px-3 py-1 rounded-full ${
            active === "on"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          On
        </button>
        <button
          onClick={() => setActive("off")}
          className={`px-3 py-1 rounded-full ${
            active === "off"
              ? "bg-red-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Off
        </button>
        <button
          onClick={() => setActive("dim")}
          className={`px-3 py-1 rounded-full ${
            active === "dim"
              ? "bg-yellow-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Dim
        </button>
      </div>
    </div>
  );
};

const WalletPanel = () => {
  const [clicked, setClicked] = useState<"add" | "transactions" | null>(null);
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Balance:</span>
          <span className="font-semibold text-green-400">₦ 0.00</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setClicked("add")}
            className={`px-3 py-1 rounded-full ${
              clicked === "add"
                ? "bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            Add Funds
          </button>
          <button
            onClick={() => setClicked("transactions")}
            className={`px-3 py-1 rounded-full ${
              clicked === "transactions"
                ? "bg-gray-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

const CCTVPanel = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-red-400 font-semibold">📹 CCTV Feed</p>

      {/* Main Feed */}
      <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700 mb-2">
        Main Live Feed (Primary Camera)
      </div>

      {/* Expandable Feeds */}
      {expanded && (
        <div className="grid grid-cols-2 gap-2 animate-fadeIn">
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
            Camera 2
          </div>
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
            Camera 3
          </div>
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
            Camera 4
          </div>
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
            Camera 5
          </div>
        </div>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 hover:text-blue-300 text-xs"
        >
          {expanded ? "− View Less" : "+ View More"}
        </button>
      </div>
    </div>
  );
};

const VisitorsPanel = () => {
  const [active, setActive] = useState<"allow" | "deny" | null>(null);
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-yellow-300 font-semibold">👥 Visitor Access</p>
      <div className="flex gap-2">
        <button
          onClick={() => setActive("allow")}
          className={`px-3 py-1 rounded-full ${
            active === "allow"
              ? "bg-yellow-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Allow
        </button>
        <button
          onClick={() => setActive("deny")}
          className={`px-3 py-1 rounded-full ${
            active === "deny"
              ? "bg-red-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

/* ---- Other Panels (Unchanged) ---- */

const EstatePanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-indigo-300 font-semibold">🏘️ Estate Overview</p>
    <div className="grid grid-cols-2 gap-2">
      <div className="text-xs">Units</div>
      <div className="font-semibold">12</div>
      <div className="text-xs">Active Alerts</div>
      <div className="font-semibold text-red-400">1</div>
    </div>
  </div>
);

const HomePanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-emerald-300 font-semibold">🏠 Home Controls</p>
    <div className="flex gap-2">
      <button className="bg-emerald-600 px-3 py-1 rounded-full text-white">Doors</button>
      <button className="bg-emerald-600 px-3 py-1 rounded-full text-white">Lights</button>
      <button className="bg-gray-700 px-3 py-1 rounded-full">Scenes</button>
    </div>
  </div>
);

/* (Room, Payments, Utilities, etc. remain unchanged) */

const RoomPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-sky-300 font-semibold">🚪 Room Monitoring</p>
    <div className="text-sm">Living Room — Temp: 26°C • Humidity: 48%</div>
  </div>
);

const PaymentsPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-rose-300 font-semibold">💸 Payments</p>
    <div className="text-sm">Last payment: ₦0.00 • Next due: —</div>
  </div>
);

const UtilitiesPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-amber-300 font-semibold">⚡ Utilities</p>
    <div className="grid grid-cols-2 gap-2">
      <div className="text-xs">Electricity</div>
      <div className="font-semibold">OK</div>
      <div className="text-xs">Water</div>
      <div className="font-semibold">OK</div>
    </div>
  </div>
);

const CommunityPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-violet-300 font-semibold">🏘️ Community</p>
    <div className="text-sm">Events: 2 • Messages: 4</div>
  </div>
);

const NotificationsPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-rose-400 font-semibold">🔔 Notifications</p>
    <div className="text-sm">No critical notifications</div>
  </div>
);

const HealthPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-pink-300 font-semibold">🏥 Health Monitoring</p>
    <div className="text-sm">All sensors nominal</div>
  </div>
);

const MessagePanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-cyan-300 font-semibold">✉️ Messaging</p>
    <div className="text-sm">Open messages / send announcement</div>
  </div>
);

const IoTPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-lime-300 font-semibold">🔌 IoT Devices</p>
    <div className="text-sm">3 devices online • Manage devices</div>
  </div>
);

const AiPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-indigo-200 font-semibold">🧠 AI / Assistant</p>
    <div className="text-sm">Assistant mode • Training status</div>
  </div>
);

const AssistantPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-sky-200 font-semibold">🤖 Assistant Layer</p>
    <div className="text-sm">Smart automations • Shortcuts</div>
  </div>
);

/* -----------------------------
   Main Dashboard Component
   ----------------------------- */

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

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

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
      {/* Header with Hamburger */}
      <header className="absolute top-4 left-4 z-50">
        <HamburgerMenu />
      </header>

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* Chat area */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth">
          <div class
