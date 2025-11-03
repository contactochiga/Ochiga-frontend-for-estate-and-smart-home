// ochiga-frontend/src/app/ai-dashboard/page.tsx (or AIDashboard.tsx)
// Full updated dashboard with panels shown as individual cards in a scrollable panels view.

"use client";

import { useEffect, useRef, useState } from "react";
import ChatFooter from "./components/ChatFooter";
import DynamicSuggestionCard from "./components/DynamicSuggestionCard";
import HamburgerMenu from "./components/HamburgerMenu";

/* -----------------------------
   Dynamic Panels (15)
   ----------------------------- */

/* 1) Light Control */
const LightControl = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [mode, setMode] = useState<"On" | "Off" | "Dim" | null>(null);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>
        <div className="text-[11px] text-gray-400">{mode ?? "Idle"}</div>
      </div>

      <div className="flex items-center gap-2">
        {(["On", "Off", "Dim"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              onAction?.(`lights:${m.toLowerCase()}`);
            }}
            className={`px-3 py-1 rounded-full transition ${
              mode === m ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

/* 2) Wallet */
const WalletPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [showTx, setShowTx] = useState(false);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>
        <div className="text-[11px] text-gray-400">₦ 12,400</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction?.("wallet:add_funds")}
          className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-white"
        >
          Add Funds
        </button>
        <button
          onClick={() => setShowTx((s) => !s)}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full"
        >
          {showTx ? "Hide" : "Transactions"}
        </button>
      </div>

      {showTx && (
        <div className="mt-3 text-xs text-gray-300 border-t border-gray-700 pt-2 space-y-1">
          <div>• ₦2,000 — Electricity</div>
          <div>• ₦500 — Security</div>
          <div>• ₦200 — Water</div>
        </div>
      )}
    </div>
  );
};

/* 3) CCTV */
const CCTVPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [activeCam, setActiveCam] = useState<number | null>(1);
  const cameras = [
    { id: 1, name: "Front Gate" },
    { id: 2, name: "Backyard" },
    { id: 3, name: "Living Room" },
    { id: 4, name: "Garage" },
  ];

  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="mb-2 text-red-400 font-semibold">📹 CCTV</p>
        <div className="text-[11px] text-gray-400">Live • {cameras.find((c) => c.id === activeCam)?.name}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => {
              setActiveCam(cam.id);
              onAction?.(`cctv:view:${cam.id}`);
            }}
            className={`aspect-video bg-black rounded-md border border-gray-700 flex items-center justify-center text-[11px] cursor-pointer transition ${
              activeCam === cam.id ? "ring-2 ring-red-400" : "hover:bg-gray-800"
            }`}
          >
            {cam.name}
          </div>
        ))}
      </div>

      <div className="mt-3 bg-black/50 rounded-md border border-gray-700 p-2 text-[11px] text-gray-300">
        <div className="aspect-video bg-gray-950 flex items-center justify-center rounded">
          <span>{activeCam ? `Streaming: ${cameras.find((c) => c.id === activeCam)?.name}` : "Select camera"}</span>
        </div>
      </div>
    </div>
  );
};

/* 4) Estate Overview */
const EstatePanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const stats = [
    { label: "Units", value: 12 },
    { label: "Occupied", value: 10 },
    { label: "Alerts", value: 1 },
    { label: "Managers", value: 2 },
  ];
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-indigo-300 font-semibold">🏘️ Estate Overview</p>
      <div className="grid grid-cols-2 gap-2 text-[13px]">
        {stats.map((s) => (
          <div key={s.label} className="flex justify-between">
            <div className="text-gray-300">{s.label}</div>
            <div className="font-semibold text-gray-100">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onAction?.("estate:open")} className="bg-indigo-600 px-3 py-1 rounded-full text-white">
          Open Estate
        </button>
        <button onClick={() => onAction?.("estate:report")} className="bg-gray-700 px-3 py-1 rounded-full">
          Report Issue
        </button>
      </div>
    </div>
  );
};

/* 5) Home Controls */
const HomePanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const scenes = ["Morning", "Evening", "Away"];
  const [activeScene, setActiveScene] = useState<string | null>(null);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-emerald-300 font-semibold">🏠 Home Controls</p>

      <div className="flex gap-2">
        {["Doors", "Lights", "Scenes"].map((s) => (
          <button key={s} onClick={() => onAction?.(`home:${s.toLowerCase()}`)} className="bg-emerald-600 px-3 py-1 rounded-full text-white">
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 items-center">
        {scenes.map((sc) => (
          <button
            key={sc}
            onClick={() => {
              setActiveScene(sc);
              onAction?.(`home:scene:${sc.toLowerCase()}`);
            }}
            className={`px-3 py-1 rounded-full ${activeScene === sc ? "bg-emerald-500 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}
          >
            {sc}
          </button>
        ))}
        <div className="text-[11px] text-gray-400 ml-2">{activeScene ? `${activeScene} active` : "No scene"}</div>
      </div>
    </div>
  );
};

/* 6) Room Monitor */
const RoomPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [temp, setTemp] = useState(26);
  const [hum, setHum] = useState(48);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="mb-2 text-sky-300 font-semibold">🚪 Room Monitoring</p>
        <div className="text-[11px] text-gray-400">Living Room</div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="text-[13px]">
          Temp: <span className="font-semibold">{temp}°C</span>
        </div>
        <div className="text-[13px]">
          Humidity: <span className="font-semibold">{hum}%</span>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={() => { setTemp((t) => t + 1); onAction?.("room:temp_up"); }} className="bg-sky-600 px-3 py-1 rounded-full text-white">▲</button>
          <button onClick={() => { setTemp((t) => t - 1); onAction?.("room:temp_down"); }} className="bg-gray-700 px-3 py-1 rounded-full">▼</button>
        </div>
      </div>
    </div>
  );
};

/* 7) Visitors Access */
const VisitorsPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", at: "10:24" },
    { id: 2, name: "Aisha", at: "09:12" },
  ]);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-yellow-300 font-semibold">👥 Visitor Access</p>
      <div className="space-y-2">
        {requests.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-gray-800/40 p-2 rounded">
            <div>
              <div className="font-semibold text-gray-100 text-xs">{r.name}</div>
              <div className="text-[11px] text-gray-400">Requested at {r.at}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setRequests((s) => s.filter((x) => x.id !== r.id)); onAction?.(`visitor:allow:${r.id}`); }} className="bg-yellow-600 px-3 py-1 rounded-full">Allow</button>
              <button onClick={() => { setRequests((s) => s.filter((x) => x.id !== r.id)); onAction?.(`visitor:deny:${r.id}`); }} className="bg-gray-700 px-3 py-1 rounded-full">Deny</button>
            </div>
          </div>
        ))}
        {requests.length === 0 && <div className="text-[12px] text-gray-400">No pending requests</div>}
      </div>
    </div>
  );
};

/* 8) Payments */
const PaymentsPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const invoices = [
    { id: 1, title: "Electricity", amount: 2000, due: "Nov 10" },
    { id: 2, title: "Security", amount: 500, due: "Nov 15" },
  ];
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-rose-300 font-semibold">💸 Payments</p>
      <div className="space-y-2 text-[12px]">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex justify-between items-center bg-gray-800/40 p-2 rounded">
            <div>
              <div className="font-semibold text-gray-100">{inv.title}</div>
              <div className="text-gray-400 text-[11px]">Due {inv.due}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-green-400">₦{inv.amount}</div>
              <button onClick={() => onAction?.(`payments:pay:${inv.id}`)} className="bg-rose-500 px-3 py-1 rounded-full text-white text-[12px]">Pay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 9) Utilities */
const UtilitiesPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [status] = useState({ electricity: "OK", water: "OK", gas: "N/A" });
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-amber-300 font-semibold">⚡ Utilities</p>
      <div className="grid grid-cols-2 gap-2 text-[13px]">
        <div>Electricity</div>
        <div className="font-semibold">{status.electricity}</div>
        <div>Water</div>
        <div className="font-semibold">{status.water}</div>
        <div>Gas</div>
        <div className="font-semibold">{status.gas}</div>
      </div>
      <div className="mt-2 text-[11px] text-gray-400">Last checked 5m ago</div>
    </div>
  );
};

/* 10) Community (interactive posts) */
const CommunityPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [active, setActive] = useState<number | null>(null);
  const posts = [
    { id: 1, author: "Jane D", content: "Maintenance tomorrow 10AM", image: null, video: null },
    { id: 2, author: "Security", content: "Suspicious vehicle reported", image: "/community/car.jpg", video: null },
    { id: 3, author: "Admin", content: "Meeting recorded", image: null, video: "/community/meeting.mp4" },
  ];

  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-violet-300 font-semibold">🏘️ Community Hub</p>

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            onClick={() => { setActive(active === p.id ? null : p.id); onAction?.(`community:open:${p.id}`); }}
            className={`bg-gray-800/40 border border-gray-700 rounded-lg p-2 cursor-pointer transition ${active === p.id ? "ring-2 ring-violet-400" : "hover:bg-gray-800"}`}
          >
            <div className="font-semibold text-gray-100 text-xs">{p.author}</div>
            <div className="text-gray-300 text-[13px]">{p.content}</div>

            {active === p.id && (
              <>
                {p.image && <img src={p.image} alt="post" className="mt-2 rounded-md border border-gray-700" />}
                {p.video && <video controls className="mt-2 rounded-md border border-gray-700 w-full" src={p.video} />}
                <div className="mt-2 flex gap-3 text-[12px] text-gray-400">
                  <button className="hover:text-violet-300">❤️ Like</button>
                  <button className="hover:text-violet-300">💬 Comment</button>
                  <button className="hover:text-violet-300">🔁 Share</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* 11) Notifications */
const NotificationsPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [items, setItems] = useState([
    { id: 1, text: "Gate opened by keypad", time: "2m" },
    { id: 2, text: "New visitor request", time: "10m" },
  ]);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-rose-400 font-semibold">🔔 Notifications</p>
      <div className="space-y-2 text-[12px]">
        {items.map((it) => (
          <div key={it.id} className="flex justify-between items-center bg-gray-800/40 p-2 rounded">
            <div className="text-gray-300">{it.text}</div>
            <div className="text-gray-400 text-[11px]">{it.time}</div>
          </div>
        ))}
        <div className="mt-2">
          <button onClick={() => { setItems([]); onAction?.("notifications:clear"); }} className="bg-rose-500 px-3 py-1 rounded-full text-white text-[12px]">
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

/* 12) Health Monitoring */
const HealthPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [status] = useState({ sensors: 12, nominal: true });
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-pink-300 font-semibold">🏥 Health Monitoring</p>
      <div className="flex justify-between items-center text-[13px]">
        <div>Sensors</div>
        <div className="font-semibold">{status.sensors}</div>
      </div>
      <div className="mt-2 text-[11px] text-gray-400">{status.nominal ? "All nominal" : "Attention required"}</div>
    </div>
  );
};

/* 13) Messaging */
const MessagePanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [convos] = useState([
    { id: 1, title: "Admin", last: "Meeting summary posted" },
    { id: 2, title: "Security", last: "Check gate camera" },
  ]);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-cyan-300 font-semibold">✉️ Messaging</p>
      <div className="space-y-2">
        {convos.map((c) => (
          <div key={c.id} className="bg-gray-800/40 p-2 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold text-gray-100 text-xs">{c.title}</div>
              <div className="text-gray-300 text-[12px]">{c.last}</div>
            </div>
            <button onClick={() => onAction?.(`message:open:${c.id}`)} className="bg-cyan-500 px-3 py-1 rounded-full text-white text-[12px]">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 14) IoT Devices */
const IoTPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Thermostat", online: true },
    { id: 2, name: "Garage Sensor", online: true },
    { id: 3, name: "Pool Pump", online: false },
  ]);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-lime-300 font-semibold">🔌 IoT Devices</p>
      <div className="space-y-2">
        {devices.map((d) => (
          <div key={d.id} className="flex justify-between items-center bg-gray-800/40 p-2 rounded">
            <div className="text-[12px]">
              <div className="font-semibold text-gray-100">{d.name}</div>
              <div className="text-gray-400 text-[11px]">{d.online ? "Online" : "Offline"}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onAction?.(`iot:toggle:${d.id}`)} className="bg-lime-600 px-3 py-1 rounded-full text-white text-[12px]">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 15) Assistant / Automations */
const AssistantPanel = ({ onAction }: { onAction?: (msg: string) => void }) => {
  const [autos] = useState([
    { id: 1, name: "Good Night", enabled: true },
    { id: 2, name: "Away Mode", enabled: false },
  ]);
  return (
    <div className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-sky-200 font-semibold">🤖 Assistant & Automations</p>
      <div className="space-y-2">
        {autos.map((a) => (
          <div key={a.id} className="flex justify-between items-center bg-gray-800/40 p-2 rounded text-[13px]">
            <div>
              <div className="font-semibold text-gray-100">{a.name}</div>
              <div className="text-gray-400 text-[11px]">{a.enabled ? "Enabled" : "Disabled"}</div>
            </div>
            <button onClick={() => onAction?.(`assistant:toggle:${a.id}`)} className="bg-sky-500 px-3 py-1 rounded-full text-white text-[12px]">Toggle</button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -----------------------------
   Main Dashboard component
   Panels appear in a dedicated scrollable panels area (cards)
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

  // active panel id string (matches keys used in detectPanelType)
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimer = useRef<number | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

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
    // auto-scroll chat when messages change
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  /* -----------------
     Panel detector (same as your previous logic)
     returns a string key for the panel to open
     -----------------*/
  const detectPanelType = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("cctv") || t.includes("camera") || t.includes("feed")) return "cctv";
    if (t.includes("light") || t.includes("lights") || t.includes("lamp")) return "lights";
    if (t.includes("wallet") || t.includes("fund") || t.includes("balance") || t.includes("pay")) return "wallet";
    if (t.includes("visitor") || t.includes("guest") || t.includes("access")) return "visitors";
    if (t.includes("estate") || t.includes("building") || t.includes("units")) return "estate";
    if (t.includes("home") || t.includes("house")) return "home";
    if (t.includes("room") || t.includes("temperature") || t.includes("monitor")) return "room";
    if (t.includes("payment") || t.includes("invoice")) return "payments";
    if (t.includes("utility") || t.includes("electric") || t.includes("water") || t.includes("gas") || t.includes("bill")) return "utilities";
    if (t.includes("community") || t.includes("event") || t.includes("notice")) return "community";
    if (t.includes("notification") || t.includes("alert")) return "notifications";
    if (t.includes("health") || t.includes("medical")) return "health";
    if (t.includes("message") || t.includes("announce")) return "message";
    if (t.includes("iot") || t.includes("device") || t.includes("toggle")) return "iot";
    if (t.includes("assistant") || t.includes("ai") || t.includes("automation")) return "assistant";
    return null;
  };

  /* -----------------
     handleSend: adds user message, assistant reply, and opens panel if detected
     -----------------*/
  const handleSend = (text?: string, spoken = false) => {
    const message = (text ?? input).trim();
    if (!message) return;
    const userMsgs = [...messages, { role: "user", content: message }];
    setMessages(userMsgs);
    setInput("");

    // minimal simulated thinking
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
      if (panel === "assistant") reply = "Assistant configuration panel opened.";

      const assistantMsg: ChatMessage = { role: "assistant", content: reply, panel };
      setMessages([...userMsgs, assistantMsg]);

      // if panel detected -> open it in panels area
      if (panel) {
        setActivePanel(panel);
        // scroll panels area into view mildly
        setTimeout(() => {
          panelsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
      }

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
    }, 450);
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

  /* map panel key -> rendered panel card component */
  const renderPanelByKey = (key: string | null) => {
    const commonProps = { onAction: (msg: string) => {
      // when panels perform actions we also add a short message and (optionally) open related panel
      setMessages((m) => [...m, { role: "assistant", content: `Action: ${msg}` }]);
    } };

    switch (key) {
      case "lights":
        return <LightControl {...commonProps} />;
      case "wallet":
        return <WalletPanel {...commonProps} />;
      case "cctv":
        return <CCTVPanel {...commonProps} />;
      case "estate":
        return <EstatePanel {...commonProps} />;
      case "home":
        return <HomePanel {...commonProps} />;
      case "room":
        return <RoomPanel {...commonProps} />;
      case "visitors":
        return <VisitorsPanel {...commonProps} />;
      case "payments":
        return <PaymentsPanel {...commonProps} />;
      case "utilities":
        return <UtilitiesPanel {...commonProps} />;
      case "community":
        return <CommunityPanel {...commonProps} />;
      case "notifications":
        return <NotificationsPanel {...commonProps} />;
      case "health":
        return <HealthPanel {...commonProps} />;
      case "message":
        return <MessagePanel {...commonProps} />;
      case "iot":
        return <IoTPanel {...commonProps} />;
      case "assistant":
        return <AssistantPanel {...commonProps} />;
      default:
        return null;
    }
  };

  /* small helper to open a panel from the panels grid (or suggestion clicks) */
  const openPanel = (key: string) => {
    setActivePanel(key);
    setTimeout(() => panelsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Top bar / hamburger */}
      <header className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <HamburgerMenu />
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-between relative overflow-hidden">
        {/* Panels area - scrollable horizontally on small or stacked on larger screens */}
        <div ref={panelsRef} className="w-full pt-20 px-4 md:px-10">
          <div className="max-w-3xl mx-auto">
            {/* Small title row + grid of available panels */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-300 uppercase tracking-wide">Modules</div>
              <div className="text-[12px] text-gray-400">Tap to open • Active: <span className="text-gray-100 font-medium">{activePanel ?? "none"}</span></div>
            </div>

            {/* Grid of small quick cards to open any module */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { key: "lights", label: "Lights", icon: "💡" },
                { key: "wallet", label: "Wallet", icon: "💳" },
                { key: "cctv", label: "CCTV", icon: "📹" },
                { key: "estate", label: "Estate", icon: "🏘️" },
                { key: "home", label: "Home", icon: "🏠" },
                { key: "room", label: "Room", icon: "🚪" },
                { key: "visitors", label: "Visitors", icon: "👥" },
                { key: "payments", label: "Payments", icon: "💸" },
                { key: "utilities", label: "Utilities", icon: "⚡" },
                { key: "community", label: "Community", icon: "🏘️" },
                { key: "notifications", label: "Notifications", icon: "🔔" },
                { key: "health", label: "Health", icon: "🏥" },
                { key: "message", label: "Message", icon: "✉️" },
                { key: "iot", label: "IoT", icon: "🔌" },
                { key: "assistant", label: "Assistant", icon: "🤖" },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => openPanel(p.key)}
                  className={`w-full text-left p-2 rounded-lg transition border border-gray-700 ${activePanel === p.key ? "bg-gray-800 ring-1 ring-cyan-400" : "bg-gray-900/50 hover:bg-gray-800"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-sm">{p.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-100">{p.label}</div>
                      <div className="text-[11px] text-gray-400">Open {p.label} tools</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active panel card (big) */}
            {activePanel ? (
              <div className="mb-6">
                {renderPanelByKey(activePanel)}
              </div>
            ) : (
              <div className="mb-6 text-[13px] text-gray-400">No module open — ask the assistant or tap a module above.</div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-10 pt-2 pb-32 space-y-4 scroll-smooth">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col max-w-[80%]">
                  <div className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-sm transition-all duration-300 ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none"}`}>
                    {msg.content}
                  </div>

                  {/* show a small hint under assistant messages pointing to an opened module */}
                  {msg.role === "assistant" && msg.panel && (
                    <div className="mt-2 text-[12px] text-gray-400">
                      Opened module: <span className="text-gray-200 font-medium">{msg.panel}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Suggestion chips (fixed above footer) */}
      <DynamicSuggestionCard suggestions={suggestions} onSend={(s) => handleSend(s, false)} />

      {/* Footer */}
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
