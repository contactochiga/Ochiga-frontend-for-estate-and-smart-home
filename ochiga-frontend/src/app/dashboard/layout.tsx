"use client";

import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useDashboard } from "../context/DashboardContext";

export default function OchigaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello 👋 I'm Ochiga AI, your smart estate assistant." },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ✅ Dashboard state access
  const {
    notifications,
    hasNewNotif,
    addNotification,
    markNotifRead,
    sidebarOpen,
    profileOpen,
    searchOpen,
    setSidebarOpen,
    setProfileOpen,
    setSearchOpen,
  } = useDashboard();

  // ✅ Initialize voice recognition
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

    const newMessages = [...messages, { from: "user", text }];
    setMessages(newMessages);
    setInput("");

    // ✅ Simulated AI response
    setTimeout(() => {
      const aiResponse = getSmartResponse(text);
      setMessages((prev) => [...prev, { from: "ai", text: aiResponse }]);
    }, 800);
  };

  const getSmartResponse = (query: string): string => {
    const lower = query.toLowerCase();

    // Example: integrate dashboard awareness
    if (lower.includes("notifications")) {
      if (notifications.length === 0) return "You have no notifications right now.";
      markNotifRead();
      return `You have ${notifications.length} notifications.`;
    }
    if (lower.includes("sidebar") || lower.includes("menu")) {
      return sidebarOpen ? "Sidebar is open." : "Sidebar is closed.";
    }
    if (lower.includes("profile")) {
      return profileOpen ? "Profile menu is open." : "Profile menu is closed.";
    }
    if (lower.includes("search")) {
      return searchOpen ? "Search bar is active." : "Search bar is closed.";
    }
    if (lower.includes("light") || lower.includes("device"))
      return "I can control your smart devices for you — which room should I adjust?";
    if (lower.includes("wallet"))
      return "Your wallet balance is ₦42,300. Would you like to fund it?";
    if (lower.includes("visitor"))
      return "You currently have no scheduled visitors today.";
    if (lower.includes("community"))
      return "There’s a community event at 6 PM — Smart Estate Hall.";
    if (lower.includes("hello") || lower.includes("hi"))
      return "Hello! How can I make your estate life easier today?";

    return "Got it 👍 — I'm learning from your patterns to serve you better.";
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
