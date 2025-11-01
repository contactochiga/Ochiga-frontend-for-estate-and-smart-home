"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaMicrophone,
  FaRobot,
  FaPlug,
  FaLightbulb,
  FaFan,
  FaWallet,
} from "react-icons/fa";
import { useDashboard } from "../../context/DashboardContext";

export default function OchigaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hello! I’m Ochiga AI — your smart estate assistant." },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [contextView, setContextView] = useState<"devices" | "wallet" | null>(null);
  const [mounted, setMounted] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { devices, wallet, toggleDevice, updateWallet } = useDashboard();

  // ---------------------------
  // Mount Check for Portal
  // ---------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------------------------
  // Speech Recognition
  // ---------------------------
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const speech = event.results[0][0].transcript;
        handleSend(speech);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleMic = () => {
    if (!recognitionRef.current)
      return alert("Speech recognition not supported in this browser.");
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // ---------------------------
  // Text-To-Speech
  // ---------------------------
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-NG"; // Nigerian English accent if supported
    synth.speak(utter);
  };

  // ---------------------------
  // Handle Send
  // ---------------------------
  const handleSend = async (userInput?: string) => {
    const text = userInput || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setAiTyping(true);
    setContextView(null);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.reply || "I'm here to help!";
        setMessages((prev) => [...prev, { from: "ai", text: reply }]);
        speak(reply);
      } else {
        throw new Error("Backend not reachable");
      }
    } catch {
      const aiResponse = processCommands(text);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
      speak(aiResponse);
    } finally {
      setAiTyping(false);
    }
  };

  // ---------------------------
  // Local Logic
  // ---------------------------
  const processCommands = (inputText: string) => {
    const lower = inputText.toLowerCase();

    // Toggle devices
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

    // Wallet
    if (lower.includes("wallet")) {
      setContextView("wallet");
      if (lower.includes("balance"))
        return `💰 Your wallet balance is ₦${wallet.balance}.`;
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

    // Greetings
    if (lower.includes("hello") || lower.includes("hi"))
      return "👋 Hello! How can I assist you today?";

    // Device Status
    if (lower.includes("status") || lower.includes("devices")) {
      setContextView("devices");
      return "Here’s your device status:";
    }

    return "🤖 Got it 👍 — I’ll keep learning your preferences.";
  };

  // ---------------------------
  // Contextual Components
  // ---------------------------
  const DeviceOverview = () => (
    <div className="mt-3 grid grid-cols-2 gap-3 text-sm animate-fadeIn">
      {Object.entries(devices).map(([room, state]: any) => (
        <div
          key={room}
          className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col space-y-1 shadow-sm hover:shadow-md transition"
        >
          <div className="font-semibold text-gray-900 dark:text-gray-100 capitalize">{room}</div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <FaLightbulb className={`${state.light ? "text-yellow-400" : "text-gray-400"}`} />
            <span>Light: {state.light ? "ON" : "OFF"}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <FaFan className={`${state.fan ? "text-blue-400" : "text-gray-400"}`} />
            <span>Fan: {state.fan ? "ON" : "OFF"}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <FaPlug className={`${state.ac ? "text-green-400" : "text-gray-400"}`} />
            <span>AC: {state.ac ? "ON" : "OFF"}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const WalletOverview = () => (
    <div className="mt-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-md animate-fadeIn">
      <div className="flex items-center space-x-3">
        <FaWallet size={22} />
        <div>
          <div className="text-xs uppercase opacity-80">Wallet Balance</div>
          <div className="text-lg font-semibold">₦{wallet.balance}</div>
        </div>
      </div>
    </div>
  );

  // ---------------------------
  // Main UI (with Portal)
  // ---------------------------
  const chatInterface = (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-fadeIn"
        >
          <FaRobot size={22} />
        </button>
      )}

      {isOpen && (
        <div
          className="
            w-[400px] max-w-[90vw]
            h-[550px] max-h-[80vh]
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            rounded-2xl shadow-2xl flex flex-col
            overflow-hidden transition-all animate-slideUp
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="flex items-center space-x-2">
              <FaRobot />
              <span className="font-semibold text-sm">Ochiga AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-lg focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.from === "ai"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                } animate-fadeIn`}
              >
                {msg.text}
              </div>
            ))}

            {aiTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-xs animate-pulse">
                <FaRobot />
                <span>Ochiga is thinking...</span>
              </div>
            )}

            {contextView === "devices" && <DeviceOverview />}
            {contextView === "wallet" && <WalletOverview />}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-200 dark:border-gray-700 px-3 py-2 bg-gray-50 dark:bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Talk to Ochiga..."
              className="flex-1 bg-transparent p-2 text-gray-800 dark:text-gray-100 text-sm outline-none placeholder-gray-500"
            />
            <button
              onClick={handleMic}
              className={`p-2 rounded-full transition ${
                listening
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (!mounted) return null;
  return createPortal(chatInterface, document.body);
}
