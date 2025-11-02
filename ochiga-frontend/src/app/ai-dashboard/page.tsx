"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane, FaBars } from "react-icons/fa";

/* -----------------------------
   Module Panels (placeholders)
   ----------------------------- */
// (keep your existing LightControl, WalletPanel, CCTVPanel, etc. unchanged)
/// ——— all your panels stay exactly as you posted them ———

// 👇 I’ll collapse to focus on new logic
// ------------------------------------------------------------
const LightControl = () => (/* same as your code */);
const WalletPanel = () => (/* same as your code */);
const CCTVPanel = () => (/* same as your code */);
const EstatePanel = () => (/* same as your code */);
const HomePanel = () => (/* same as your code */);
const RoomPanel = () => (/* same as your code */);
const VisitorsPanel = () => (/* same as your code */);
const PaymentsPanel = () => (/* same as your code */);
const UtilitiesPanel = () => (/* same as your code */);
const CommunityPanel = () => (/* same as your code */);
const NotificationsPanel = () => (/* same as your code */);
const HealthPanel = () => (/* same as your code */);
const MessagePanel = () => (/* same as your code */);
const IoTPanel = () => (/* same as your code */);
const AiPanel = () => (/* same as your code */);
const AssistantPanel = () => (/* same as your code */);
// ------------------------------------------------------------

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
  const [menuOpen, setMenuOpen] = useState(false);

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  /* ----------------- Speech Recognition ----------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    if (silenceTimer.current) window.clearTimeout(silenceTimer.current);
    silenceTimer.current = window.setTimeout(() => recognition.stop(), 1800);
  };

  /* ----------------- Chat Scroll ----------------- */
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  /* ----------------- Command Classifier ----------------- */
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
    if (t.includes("utility") || t.includes("water")) return "utilities";
    if (t.includes("community")) return "community";
    if (t.includes("notification")) return "notifications";
    if (t.includes("health")) return "health";
    if (t.includes("message")) return "message";
    if (t.includes("iot") || t.includes("device")) return "iot";
    if (t.includes("assistant") || t.includes("ai")) return "assistant";
    return null;
  };

  /* ----------------- Handle Send ----------------- */
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
      if (panel === "cctv") reply = "Loading CCTV preview.";
      if (panel === "visitors") reply = "Opening visitor access controls.";
      if (panel === "estate") reply = "Showing estate overview.";
      if (panel === "home") reply = "Showing home controls.";
      if (panel === "room") reply = "Here is the room monitoring panel.";
      if (panel === "payments") reply = "Payments panel ready.";
      if (panel === "utilities") reply = "Utilities dashboard opened.";
      if (panel === "community") reply = "Community hub opened.";
      if (panel === "notifications") reply = "Notifications panel opened.";
      if (panel === "health") reply = "Health monitoring panel opened.";
      if (panel === "message") reply = "Messaging panel opened.";
      if (panel === "iot") reply = "IoT devices panel ready.";
      if (panel === "assistant" || panel === "ai") reply = "Assistant panel opened.";

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages([...userMsgs, assistantMsg]);

      if (spoken) {
        const synth = window.speechSynthesis;
        if (synth && !synth.speaking) synth.speak(new SpeechSynthesisUtterance(reply));
      }
    }, 400);
  };

  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    try {
      listening ? recognition.stop() : recognition.start();
    } catch {}
  };

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  /* ----------------- Render ----------------- */
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">

      {/* Hamburger Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-4 left-4 z-40 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-lg border border-gray-700"
      >
        <FaBars className="text-lg" />
      </button>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-lg border-r border-gray-800 transform transition-transform duration-500 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } w-[92%] sm:w-[300px] p-5 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-cyan-400">Ochiga Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Close ✕
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">🏠 Home</button>
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">💡 Lights</button>
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">📹 CCTV</button>
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">💳 Wallet</button>
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">👥 Visitors</button>
          <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800">⚙️ Settings</button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* listening orb + chat etc → exactly as your original code */}
        {/* ... keep everything from your original AIDashboard here unchanged ... */}
      </main>

      {/* Footer, suggestions → unchanged */}
    </div>
  );
}
