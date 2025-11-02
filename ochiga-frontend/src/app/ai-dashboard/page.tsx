"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";

/* -------------------------------------
   All your existing panels unchanged
   ------------------------------------- */
const LightControl = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>
    <div className="flex items-center gap-2">
      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-white">On</button>
      <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Off</button>
      <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Dim</button>
    </div>
  </div>
);
const WalletPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Balance:</span>
        <span className="font-semibold text-green-400">₦ 0.00</span>
      </div>
      <div className="flex gap-2">
        <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-white">Add Funds</button>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Transactions</button>
      </div>
    </div>
  </div>
);
const CCTVPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-red-400 font-semibold">📹 CCTV Feed</p>
    <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
      Live Feed Placeholder
    </div>
  </div>
);
// ... [keep all your other panels here exactly as before]

/* -------------------------------------
   Main Dashboard
   ------------------------------------- */
type ChatMessage = { role: "user" | "assistant"; content: string; panel?: string | null };

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

  /* --- Voice Recognition --- */
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
  const resetSilenceTimer = (rec: any) => {
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    silenceTimer.current = window.setTimeout(() => rec.stop(), 1800);
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  /* --- Text detection logic (unchanged) --- */
  const detectPanelType = (t: string) => {
    const l = t.toLowerCase();
    if (l.includes("light")) return "lights";
    if (l.includes("wallet")) return "wallet";
    if (l.includes("cctv")) return "cctv";
    return null;
  };

  /* --- Message handling --- */
  const handleSend = (text?: string, spoken = false) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const userMsgs = [...messages, { role: "user", content: msg }];
    setMessages(userMsgs);
    setInput("");
    setTimeout(() => {
      const panel = detectPanelType(msg);
      let reply = `Okay — I processed: "${msg}".`;
      if (panel === "lights") reply = "Turning on the lights in the requested area.";
      if (panel === "wallet") reply = "Opening wallet controls for you.";
      if (panel === "cctv") reply = "Loading CCTV preview for the requested camera.";
      const botMsg = { role: "assistant", content: reply, panel };
      setMessages([...userMsgs, botMsg]);
      if (spoken) {
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(reply);
        utter.lang = "en-US";
        synth.speak(utter);
      }
    }, 500);
  };
  const handleMicClick = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) rec.stop();
    else rec.start();
  };

  const suggestions = [
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ];

  /* --- Render --- */
  return (
    <div
      className={`relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden transition-transform duration-500 ease-in-out ${
        menuOpen ? "translate-x-[80%]" : "translate-x-0"
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          <FaBars size={20} />
        </button>
        <h1 className="text-lg font-light tracking-wide text-gray-300">Ochiga AI</h1>
        <div className="w-6" />
      </header>

      {/* Slide Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-500 z-50 ${
          menuOpen ? "translate-x-0 w-[94%]" : "-translate-x-full w-[94%]"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-gray-200">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-300 text-sm">
            <button className="w-full text-left hover:text-white">🏠 Buildings / Estates</button>
            <button className="w-full text-left hover:text-white">⚙️ Automation Controls</button>
            <button className="w-full text-left hover:text-white">💬 AI Chat</button>
          </nav>
          <div className="p-5 border-t border-gray-800 space-y-3 text-sm text-gray-400">
            <button className="w-full text-left hover:text-white">👤 Profile & Settings</button>
            <button className="w-full text-left hover:text-red-400">🚪 Logout</button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {listening && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 opacity-40 blur-2xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-spin-custom" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-700 shadow-[0_0_25px_rgba(59,130,246,0.6)] animate-pulse-custom flex items-center justify-center text-center text-gray-100 font-light">
                Listening…
              </div>
            </div>
          </div>
        )}

        {/* Chat */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-32 space-y-4 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                  {msg.panel === "lights" && <LightControl />}
                  {msg.panel === "wallet" && <WalletPanel />}
                  {msg.panel === "cctv" && <CCTVPanel />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Suggestion Chips */}
      <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSend(s, false)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          <button
            onClick={handleMicClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              listening
                ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaMicrophone />
          </button>

          <input
            type="text"
            placeholder="Ask Ochiga AI anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(undefined, false)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleSend(undefined, false)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <FaPaperPlane className="text-white text-sm" />
          </button>
        </div>
      </footer>
    </div>
  );
}
