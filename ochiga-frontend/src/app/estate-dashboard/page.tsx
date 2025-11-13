"use client";

import { useState, useRef } from "react";
import LayoutWrapper from "../ai-dashboard/layout/LayoutWrapper"; // reuse same layout
import CreateHomePanel from "./components/panels/CreateHomePanel";
import AssignResidentPanel from "./components/panels/AssignResidentPanel";
import EstateDevicePanel from "./components/panels/EstateDevicePanel";
import EstateCCTVPanel from "./components/panels/EstateCCTVPanel";
import EstateLightingPanel from "./components/panels/EstateLightingPanel";
import EstatePowerPanel from "./components/panels/EstatePowerPanel";
import EstateAccountingPanel from "./components/panels/EstateAccountingPanel";
import EstateCommunityPanel from "./components/panels/EstateCommunityPanel";
import { detectEstatePanelType } from "./utils/estatePanelDetection"; // updated detection
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  panel?: string | null;
};

export default function EstateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Welcome, Estate Admin! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  // Sample estate data
  const [homes, setHomes] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([
    { id: "u1", name: "Alice" },
    { id: "u2", name: "Bob" },
  ]);
  const [devices, setDevices] = useState([
    { id: "d1", name: "Main Gate", type: "toggle", status: "OFF" },
    { id: "d2", name: "Lobby Lights", type: "toggle", status: "ON" },
  ]);
  const [cameras, setCameras] = useState([
    { id: "c1", name: "Gate Camera", feedUrl: "" },
    { id: "c2", name: "Lobby Camera", feedUrl: "" },
  ]);
  const [lights, setLights] = useState([
    { id: "l1", location: "Street 1", status: "ON" },
    { id: "l2", location: "Street 2", status: "OFF" },
  ]);
  const [powerDevices, setPowerDevices] = useState([
    { id: "p1", name: "Water Pump", type: "water", status: "ON" },
    { id: "p2", name: "Main Power", type: "power", status: "OFF" },
  ]);
  const [residents, setResidents] = useState([
    { id: "r1", name: "Alice", balance: 1000 },
    { id: "r2", name: "Bob", balance: 0 },
  ]);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // =======================
  // Panel Handlers
  // =======================
  const handleCreateHome = (home: { name: string; type: string; description?: string }) => {
    const newHome = { ...home, id: `h${Date.now()}` };
    setHomes((prev) => [...prev, newHome]);
    handleSend(`Home "${home.name}" has been created successfully.`);
  };

  const handleAssignResident = (homeId: string, userId: string) => {
    const home = homes.find((h) => h.id === homeId)?.name;
    const user = users.find((u) => u.id === userId)?.name;
    handleSend(`Resident "${user}" has been assigned to home "${home}".`);
  };

  const handleDeviceAction = (deviceId: string, action: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, status: action === "TOGGLE" ? (d.status === "ON" ? "OFF" : "ON") : action } : d
      )
    );
    handleSend(`Device "${deviceId}" set to ${action}`);
  };

  const handleLightAction = (lightId: string, action: string) => {
    setLights((prev) =>
      prev.map((l) => (l.id === lightId ? { ...l, status: action } : l))
    );
    handleSend(`Light "${lightId}" set to ${action}`);
  };

  const handlePowerAction = (deviceId: string, action: string) => {
    setPowerDevices((prev) =>
      prev.map((p) =>
        p.id === deviceId ? { ...p, status: action === "TOGGLE" ? (p.status === "ON" ? "OFF" : "ON") : action } : p
      )
    );
    handleSend(`Power/Water device "${deviceId}" toggled`);
  };

  const handleAccountingAction = (residentId: string, action: string) => {
    if (action === "SEND_REMINDER") handleSend(`Reminder sent to resident "${residentId}"`);
  };

  const handleCommunityAction = (residentId: string, action: string) => {
    if (action === "MESSAGE") handleSend(`Message sent to resident "${residentId}"`);
  };

  // =======================
  // Chat Handling
  // =======================
  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsgs = [...messages, { role: "user", content: message }];
    setMessages(userMsgs);
    setInput("");

    setTimeout(() => {
      const panel = detectEstatePanelType(message); // updated detection
      let reply = `Okay — I processed: "${message}".`;

      switch (panel) {
        case "create_home":
          reply = "Opening Create Home panel...";
          break;
        case "assign_resident":
          reply = "Opening Assign Resident panel...";
          break;
        case "estate_devices":
          reply = "Opening Estate Devices panel...";
          break;
        case "estate_cctv":
          reply = "Opening CCTV panel...";
          break;
        case "estate_lighting":
          reply = "Opening Lighting panel...";
          break;
        case "estate_power":
          reply = "Opening Power/Water panel...";
          break;
        case "estate_accounting":
          reply = "Opening Accounting panel...";
          break;
        case "estate_community":
          reply = "Opening Community panel...";
          break;
      }

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages((prev) => [...prev, assistantMsg]);

      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
      }, 300);
    }, 300);
  };

  return (
    <LayoutWrapper>
      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        <div
          ref={chatRef}
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
                    className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Panels */}
                  {msg.panel === "create_home" && <CreateHomePanel onCreate={handleCreateHome} />}
                  {msg.panel === "assign_resident" && (
                    <AssignResidentPanel homes={homes} users={users} onAssign={handleAssignResident} />
                  )}
                  {msg.panel === "estate_devices" && (
                    <EstateDevicePanel devices={devices} onAction={handleDeviceAction} />
                  )}
                  {msg.panel === "estate_cctv" && (
                    <EstateCCTVPanel cameras={cameras} onAction={(id) => handleSend(`Viewing camera ${id}`)} />
                  )}
                  {msg.panel === "estate_lighting" && (
                    <EstateLightingPanel lights={lights} onAction={handleLightAction} />
                  )}
                  {msg.panel === "estate_power" && (
                    <EstatePowerPanel powerDevices={powerDevices} onAction={handlePowerAction} />
                  )}
                  {msg.panel === "estate_accounting" && (
                    <EstateAccountingPanel residents={residents} onAction={handleAccountingAction} />
                  )}
                  {msg.panel === "estate_community" && (
                    <EstateCommunityPanel residents={users} onAction={handleCommunityAction} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Footer */}
        <div className="fixed bottom-0 w-full z-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full bg-gray-800 text-white px-4 py-3 outline-none"
            placeholder="Type a command or message..."
          />
        </div>
      </main>
    </LayoutWrapper>
  );
}
