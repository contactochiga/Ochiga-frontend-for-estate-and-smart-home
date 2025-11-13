"use client";

import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot, FaPlug, FaLightbulb, FaFan, FaWallet } from "react-icons/fa";
import { useDashboard } from "../../context/DashboardContext";

// fix browser SpeechRecognition typing
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function OchigaAssistant() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hello! I’m Ochiga AI — your smart estate assistant." },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [contextView, setContextView] = useState<"devices" | "wallet" | null>(null);

  const recognitionRef = useRef<any>(null);
  const { devices, wallet, toggleDevice, updateWallet } = useDashboard();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping, contextView]);

  // Init SpeechRecognition
  useEffect(() => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Recognition) {
      const recognition = new Recognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onresult = (e: any) => {
        const speech = e.results[0][0].transcript;
        handleSend(speech);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    setListening(true);
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // Text to speech
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-NG";
    setAiSpeaking(true);
    utter.onend = () => setAiSpeaking(false);
    synth.speak(utter);
  };

  // Process local commands
  const processCommands = (inputText: string) => {
    const lower = inputText.toLowerCase();

    if (lower.includes("toggle")) {
      const room = Object.keys(devices).find((r) => lower.includes(r.toLowerCase()));
      if (room) {
        if (lower.includes("light")) toggleDevice(room, "light");
        if (lower.includes("fan")) toggleDevice(room, "fan");
        if (lower.includes("ac")) toggleDevice(room, "ac");
        setContextView("devices");
        return `✅ Toggled device(s) in ${room}.`;
      }
      return "Please specify the room for the device toggle.";
    }

    if (lower.includes("wallet")) {
      setContextView("wallet");
      if (lower.includes("balance")) return `💰 Your wallet balance is ₦${wallet.balance}.`;
      if (lower.includes("fund") || lower.includes("add money")) {
        const amountMatch = inputText.match(/\d+/);
        const amount = amountMatch ? parseInt(amountMatch[0]) : 0;
        if (amount > 0) {
          updateWallet(amount);
          return `💵 Added ₦${amount} to your wallet.`;
        }
        return "Please specify the amount to fund your wallet.";
      }
    }

    if (lower.includes("hello") || lower.includes("hi")) return "👋 Hello! How can I assist you today?";
    if (lower.includes("status") || lower.includes("devices")) {
      setContextView("devices");
      return "Here’s your device status:";
    }

    return "🤖 Got it 👍 — I’ll keep learning your preferences.";
  };

  // handle send
  const handleSend = async (userInput?: string) => {
    const text = userInput || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setAiTyping(true);
    setContextView(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.reply || "I'm here to help!";
        setMessages((prev) => [...prev, { from: "ai", text: reply }]);
        speak(reply);
      } else throw new Error("Backend not reachable");
    } catch {
      const aiResponse = processCommands(text);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
      speak(aiResponse);
    } finally {
      setAiTyping(false);
    }
  };

  // Device + wallet context cards
  const DeviceOverview = () => (
    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
      {Object.entries(devices).map(([room, state]: any) => (
        <div key={room} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="font-semibold capitalize">{room}</div>
          <div className="flex items-center space-x-2 text-xs">
            <FaLightbulb className={state.light ? "text-yellow-400" : "text-gray-400"} />
            <span>Light: {state.light ? "ON" : "OFF"}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <FaFan className={state.fan ? "text-blue-400" : "text-gray-400"} />
            <span>Fan: {state.fan ? "ON" : "OFF"}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <FaPlug className={state.ac ? "text-green-400" : "text-gray-400"} />
            <span>AC: {state.ac ? "ON" : "OFF"}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const WalletOverview = () => (
    <div className="mt-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <FaWallet size={22} />
        <div>
          <div className="text-xs uppercase opacity-80">Wallet Balance</div>
          <div className="text-lg font-semibold">₦{wallet.balance}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.from === "ai"
                ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                : "bg-blue-600 text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {aiTyping && (
          <div className="flex items-center space-x-2 text-gray-500 text-xs">
            <FaRobot />
            <span>Ochiga is thinking...</span>
          </div>
        )}
        {contextView === "devices" && <DeviceOverview />}
        {contextView === "wallet" && <WalletOverview />}
        <div ref={messagesEndRef} />
      </div>

      {/* input bar */}
      <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800">
        <button
          onClick={listening ? stopListening : startListening}
          className={`p-3 rounded-full transition ${
            listening
              ? "bg-red-600 text-white animate-pulse"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          }`}
        >
          <FaMicrophone />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type or speak to Ochiga..."
          className="flex-1 bg-transparent p-2 text-sm outline-none placeholder-gray-500 dark:placeholder-gray-400"
        />

        <button
          onClick={() => handleSend()}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          <FaPaperPlane size={14} />
        </button>
      </div>
    </div>
  );
}
