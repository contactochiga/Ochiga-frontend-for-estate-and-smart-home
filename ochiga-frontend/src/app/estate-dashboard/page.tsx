"use client";

import { useState } from "react";
import LayoutWrapper from "../ai-dashboard/layout/LayoutWrapper"; // reuse same layout
import CreateHomePanel from "./components/panels/CreateHomePanel";
import AssignResidentPanel from "./components/panels/AssignResidentPanel";
import { detectPanelType } from "../ai-dashboard/utils/panelDetection";
import { FaArrowDown } from "react-icons/fa";
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
  const [homes, setHomes] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([
    { id: "u1", name: "Alice" },
    { id: "u2", name: "Bob" },
  ]);

  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);

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
      const panel = detectPanelType(message);
      let reply = `Okay — I processed: "${message}".`;

      if (panel === "create_home") reply = "Opening Create Home panel...";
      if (panel === "assign_resident") reply = "Opening Assign Resident panel...";

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages((prev) => [...prev, assistantMsg]);

      // scroll to bottom
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
