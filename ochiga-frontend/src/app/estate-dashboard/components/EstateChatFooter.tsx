"use client";

import { useEffect, useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function EstateChatFooter({
  input,
  setInput,
  onSend,
  onAction, // For estate commands (devices, power, accounting, community)
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onAction?: (actions: Array<{ type: string; action: string; target: string }>, transcript?: string) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const brandColor = "#e11d48";

  useEffect(() => {
    const savedVoice = localStorage.getItem("ochigaVoice");
    if (savedVoice) setSelectedVoice(savedVoice);
  }, []);

  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  const vibrate = (duration = 80) => {
    if (navigator.vibrate) navigator.vibrate(duration);
  };

  // Estate-specific command parser
  const handleCommand = (transcript: string) => {
    const actions: Array<{ type: string; action: string; target: string }> = [];
    const msg = transcript.toLowerCase();

    // Devices
    if (msg.includes("light") || msg.includes("gate") || msg.includes("door") || msg.includes("camera") || msg.includes("cctv") || msg.includes("ac") || msg.includes("security")) {
      actions.push({ type: "device", action: "control", target: "estate_devices" });
    }

    // Power/Utilities
    if (msg.includes("power") || msg.includes("electricity") || msg.includes("water") || msg.includes("utility")) {
      actions.push({ type: "power", action: "control", target: "estate_power" });
    }

    // Accounting
    if (msg.includes("account") || msg.includes("billing") || msg.includes("payment") || msg.includes("service charge") || msg.includes("invoice") || msg.includes("debt")) {
      actions.push({ type: "accounting", action: "query", target: "estate_accounting" });
    }

    // Community
    if (msg.includes("community") || msg.includes("resident") || msg.includes("visitor") || msg.includes("announcement") || msg.includes("event")) {
      actions.push({ type: "community", action: "view", target: "estate_community" });
    }

    if (actions.length && onAction) onAction(actions, transcript);
    return actions;
  };

  const startConversation = () => {
    vibrate(120);
    setIsTalking(true);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      setIsTalking(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setInput(transcript);
      handleCommand(transcript);
      setIsTalking(false);
    };

    recognition.onerror = () => setIsTalking(false);
    recognition.onend = () => setIsTalking(false);
  };

  const handleMicClick = () => {
    vibrate(60);
    if (!isRecording) {
      startConversation();
      setIsRecording(true);
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  };

  const handleMainButtonClick = () => {
    if (isTyping && input.trim()) {
      vibrate(40);
      onSend();
    } else {
      if (!selectedVoice) {
        setShowVoiceModal(true);
        return;
      }
      startConversation();
    }
  };

  const handleVoiceSelect = (voiceName: string) => {
    setSelectedVoice(voiceName);
    localStorage.setItem("ochigaVoice", voiceName);
    setShowVoiceModal(false);
  };

  return (
    <>
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-80 text-center">
            <h3 className="text-white text-lg font-semibold mb-3">Choose Your Assistant Voice</h3>
            <div className="flex justify-center gap-4 mb-4">
              {["Samantha", "Daniel"].map((voice) => (
                <button
                  key={voice}
                  onClick={() => handleVoiceSelect(voice)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedVoice === voice ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {voice}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowVoiceModal(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Estate Chat Footer */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3 fixed bottom-0 z-50">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2 shadow-inner overflow-hidden">
            <button
              onClick={handleMicClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isRecording ? "bg-red-600 scale-110 shadow-lg" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isRecording ? <FaStop className="text-white text-sm" /> : <FaMicrophone className="text-white text-sm" />}
            </button>

            <div className="relative flex-1 h-10 flex items-center">
              {!isRecording ? (
                <input
                  type="text"
                  placeholder="Ask estate AI assistant…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSend()}
                  className="w-full bg-transparent text-gray-100 placeholder-gray-400 outline-none px-2 text-sm"
                />
              ) : (
                <div className="absolute inset-0 flex items-center overflow-hidden px-2">
                  <motion.div
                    className="flex gap-[2px]"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  >
                    {[...Array(120)].map((_, i) => (
                      <div
                        key={i}
                        className="w-[2px] rounded-full"
                        style={{ height: `${8 + ((i % 8) - 4) * 0.5}px`, backgroundColor: brandColor, opacity: 0.7 }}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            <button
              onClick={handleMainButtonClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isTalking ? "bg-red-600 scale-110 shadow-lg" : isTyping ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isTyping ? <FaPaperPlane className="text-white text-sm" /> : <motion.div className="w-5 h-5 bg-gradient-to-r from-[#9ca3af] to-[#6b7280] rounded-full animate-pulse" />}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
