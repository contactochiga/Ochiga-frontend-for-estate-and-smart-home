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

  // Draggable button state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

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

  // --- Draggable handlers ---
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    setPos({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.touches[0].clientX - pos.x,
      y: e.touches[0].clientY - pos.y,
    };
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    setPos({
      x: e.touches[0].clientX - offsetRef.current.x,
      y: e.touches[0].clientY - offsetRef.current.y,
    });
  };
  const handleTouchEnd = () => {
    draggingRef.current = false;
  };

  // Initialize speech recognition
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

    setTimeout(() => {
      const aiResponse = processCommands(text);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
    }, 300);
  };

  const processCommands = (inputText: string) => {
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

    // ... other command handlers remain unchanged ...

    if (lower.includes("hello") || lower.includes("hi"))
      return "👋 Hello! How can I assist you with your estate today?";

    return "🤖 Got it 👍 — I'm learning your patterns to serve you better.";
  };

  return (
    <>
      {/* Draggable Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform transform hover:scale-110"
        style={{ left: pos.x || undefined, top: pos.y || undefined }}
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
