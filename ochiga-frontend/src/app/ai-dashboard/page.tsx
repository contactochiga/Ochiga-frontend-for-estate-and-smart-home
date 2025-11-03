"use client";

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import HamburgerMenu from "./components/HamburgerMenu";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import ChatFooter from "./components/ChatFooter";

/* -----------------------------
   Module Panels (placeholders)
   Replace with real widgets later
----------------------------- */

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

const RoomPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-sky-300 font-semibold">🚪 Room Monitoring</p>
    <div className="text-sm">Living Room — Temp: 26°C • Humidity: 48%</div>
  </div>
);

const VisitorsPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-yellow-300 font-semibold">👥 Visitor Access</p>
    <div className="flex gap-2">
      <button className="bg-yellow-600 px-3 py-1 rounded-full">Allow</button>
      <button className="bg-gray-700 px-3 py-1 rounded-full">Deny</button>
    </div>
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
   Main Dashboard component
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

  /* -----------------
     Speech recognition init
  -----------------*/
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
    recognition.onerror = () => setListening(false);

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
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const detectPanelType = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("cctv") || t.includes("camera")) return "cctv";
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

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages([...userMsgs, assistantMsg]);
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
      <HamburgerMenu />

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

      <DynamicSuggestionCard
        suggestions={suggestions}
        onSelect={(s) => handleSend(s, false)}
      />

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
