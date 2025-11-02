"use client";

import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./components/HamburgerMenu";
import ChatLayout from "./components/ChatLayout"; // ✅ imported chat footer

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I’m Ochiga AI — how can I assist you today?" },
  ]);

  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      <HamburgerMenu />

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden pb-60">
        {/* ✅ added bottom padding so content doesn't hide behind footer */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-10 pt-20 pb-10 space-y-4 scroll-smooth">
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

      {/* ✅ fixed footer chat */}
      <ChatLayout />
    </div>
  );
}
