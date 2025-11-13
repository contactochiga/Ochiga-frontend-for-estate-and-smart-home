// ochiga-frontend/src/app/ai-dashboard/components/AssistantPanel.tsx

import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useDashboard } from "../context/DashboardContext";
import MiniTab from "./MiniTab";

type Props = {
  onClose: () => void;
  speak: (text: string) => void;
};

export default function AssistantPanel({ onClose, speak }: Props) {
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: "Hello — how can Ochiga help your estate today?" },
  ]);
  const [input, setInput] = useState("");
  const [mini, setMini] = useState<null | { id: string; content: string }>(null);
  const [typing, setTyping] = useState(false);
  const { devices, wallet, toggleDevice, updateWallet } = useDashboard();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, mini]);

  const send = async (text?: string) => {
    const t = text ?? input;
    if (!t.trim()) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    // show mini-tab or fetch backend
    setTyping(true);

    // simple local command demo
    if (/toggle .*light/i.test(t)) {
      const room = Object.keys(devices).find((r) => t.toLowerCase().includes(r.toLowerCase()));
      if (room) {
        toggleDevice(room, "light");
        const reply = `✅ ${room} light toggled.`;
        await delayedReply(reply);
        // open mini remote
        setMini({ id: "remote:" + room, content: `Remote controls for ${room}` });
        return;
      }
    }

    // generic reply simulation
    await delayedReply("Got it. Executing your command now.");

    function delayedReply(text: string) {
      return new Promise<void>((res) => {
        setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { from: "ai", text }]);
          speak(text);
          res();
        }, 700);
      });
    }
  };

  return (
    <div className="w-[95vw] max-w-3xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-3">
          <FaRobot />
          <div className="font-semibold">Ochiga AI Assistant</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10">Close</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900"} px-4 py-2 rounded-2xl max-w-[80%]`}>{m.text}</div>
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaRobot /> <span>Ochiga is thinking...</span>
          </div>
        )}

        {mini && (
          <div className="mt-2">
            <MiniTab id={mini.id} title={mini.content} onClose={() => setMini(null)}>
              {/* Pass actual controls here: remote buttons, CCTV placeholder */}
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 rounded bg-gray-800 text-white" onClick={() => alert("Toggle light")}>Toggle Light</button>
                <button className="p-2 rounded bg-gray-800 text-white" onClick={() => alert("Show CCTV")}>Show CCTV</button>
              </div>
            </MiniTab>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 bg-white dark:bg-gray-800">
        <button
          onClick={() => {/* hook to orb long-press or separate speech control */}}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <FaMicrophone />
        </button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1 bg-transparent outline-none" placeholder="Say 'turn on living room light' or type..." />
        <button onClick={() => send()} className="p-3 rounded-full bg-blue-600 text-white"><FaPaperPlane /></button>
      </div>
    </div>
  );
}
