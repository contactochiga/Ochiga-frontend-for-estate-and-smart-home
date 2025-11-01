"use client";

import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useDashboard } from "../../context/DashboardContext";

export default function OchigaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello 👋 I'm Ochiga AI, your smart estate assistant." },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const {
    notifications,
    hasNewNotif,
    sidebarOpen,
    profileOpen,
    searchOpen,
    resident,
    wallet,
    devices,
    utilities,
    visitors,
    communityEvents,
    markNotifRead,
    toggleDevice,
    updateWallet,
    updateUtility,
    addVisitor,
    removeVisitor,
    addCommunityEvent,
    removeCommunityEvent,
    updateResident,
  } = useDashboard();

  // Initialize browser speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const speech = event.results[0][0].transcript;
        setInput(speech);
        handleSend(speech);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleMic = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported.");
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handleSend = async (userInput?: string) => {
    const text = userInput || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    // AI response with multi-command execution
    setTimeout(() => {
      const aiResponse = processCommands(text);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
    }, 300);
  };

  // ---------------------------
  // Multi-command processor
  // ---------------------------
  const processCommands = (inputText: string): string => {
    const commands = inputText.split(/,| and /i).map((cmd) => cmd.trim());
    const responses: string[] = [];

    for (let cmd of commands) {
      const response = executeSingleCommand(cmd);
      responses.push(response);
    }

    return responses.join(" | ");
  };

  const executeSingleCommand = (query: string): string => {
    const lower = query.toLowerCase();

    // --- DEVICE CONTROL ---
    if (lower.includes("toggle")) {
      const room = Object.keys(devices).find((r) => lower.includes(r.toLowerCase()));
      if (room) {
        if (lower.includes("light")) toggleDevice(room, "light");
        if (lower.includes("fan")) toggleDevice(room, "fan");
        if (lower.includes("ac")) toggleDevice(room, "ac");
        return `✅ Toggled device(s) in ${room}.`;
      }
      return "Please specify the room for the device toggle.";
    }

    // --- WALLET ---
    if (lower.includes("wallet")) {
      if (lower.includes("balance")) return `💰 Your wallet balance is ₦${wallet.balance}.`;
      if (lower.includes("fund") || lower.includes("add money")) {
        const amountMatch = query.match(/\d+/);
        const amount = amountMatch ? parseInt(amountMatch[0]) : 0;
        if (amount > 0) {
          updateWallet(amount);
          return `💵 Added ₦${amount} to your wallet.`;
        }
        return "Please specify the amount to fund your wallet.";
      }
    }

    // --- VISITOR MANAGEMENT ---
    if (lower.includes("add visitor")) {
      const nameMatch = query.match(/visitor (.+)/i);
      if (nameMatch) {
        const visitor = { id: Date.now().toString(), name: nameMatch[1], scheduledTime: new Date().toISOString() };
        addVisitor(visitor);
        return `👤 Visitor ${visitor.name} added.`;
      }
      return "Please provide the visitor's name.";
    }
    if (lower.includes("remove visitor")) {
      const idMatch = query.match(/\d+/);
      if (idMatch) {
        removeVisitor(idMatch[0]);
        return `❌ Visitor ${idMatch[0]} removed.`;
      }
      return "Please provide the visitor ID to remove.";
    }

    // --- COMMUNITY EVENTS ---
    if (lower.includes("add event")) {
      const titleMatch = query.match(/event (.+)/i);
      if (titleMatch) {
        const event = { id: Date.now().toString(), title: titleMatch[1], time: new Date().toISOString() };
        addCommunityEvent(event);
        return `📅 Community event '${event.title}' added.`;
      }
      return "Please provide the event title.";
    }
    if (lower.includes("remove event")) {
      const idMatch = query.match(/\d+/);
      if (idMatch) {
        removeCommunityEvent(idMatch[0]);
        return `❌ Community event ${idMatch[0]} removed.`;
      }
      return "Please provide the event ID to remove.";
    }

    // --- RESIDENT INFO ---
    if (lower.includes("resident") && lower.includes("update")) {
      const nameMatch = query.match(/name (.+)/i);
      if (nameMatch) {
        updateResident({ name: nameMatch[1] });
        return `👤 Resident name updated to ${nameMatch[1]}.`;
      }
      return "Please specify the resident information to update.";
    }

    // --- DASHBOARD CONTEXT ---
    if (lower.includes("notifications") && hasNewNotif)
      return `🔔 You have ${notifications.length} new notifications.`;
    if (lower.includes("sidebar") && sidebarOpen) return "The sidebar is open.";
    if (lower.includes("profile") && profileOpen) return "Your profile panel is open.";
    if (lower.includes("search") && searchOpen) return "The search input is active.";

    // --- GENERAL GREETINGS ---
    if (lower.includes("hello") || lower.includes("hi"))
      return "👋 Hello! How can I assist you with your estate today?";

    return "🤖 Got it 👍 — I'm learning your patterns to serve you better.";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform transform hover:scale-110"
      >
        <FaRobot size={22} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col z-50">
          <div className="flex items-center justify-between bg-blue-600 text-white p-3 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <FaRobot />
              <span className="font-semibold text-sm">Ochiga AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-xs"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.from === "ai"
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                    : "bg-blue-600 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center p-3 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={handleMic}
              className={`p-2 rounded-full ${
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
              placeholder="Ask Ochiga..."
              className="flex-1 mx-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
