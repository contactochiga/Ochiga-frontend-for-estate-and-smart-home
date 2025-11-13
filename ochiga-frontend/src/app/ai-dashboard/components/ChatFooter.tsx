"use client";

import { useEffect, useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChatFooter({
  input,
  setInput,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [shouldContinue, setShouldContinue] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const brandColor = "#e11d48";

  // 🧠 Load stored voice
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const savedVoice = localStorage.getItem("ochigaVoice");
    if (savedVoice) setSelectedVoice(savedVoice);
  }, []);

  // ✍🏽 Detect typing
  useEffect(() => {
    setIsTyping(input.trim().length > 0);
  }, [input]);

  // 📱 Vibration helper
  const vibrate = (duration = 80) => {
    if (navigator.vibrate) navigator.vibrate(duration);
  };

  // 🧠 Speak with selected voice
  const speak = (text: string, callback?: () => void) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);

    // 🎙️ Optional: customize accent later (Nigerian English style)
    utter.lang = "en-NG"; // fallback Nigerian English variant
    utter.rate = 1;
    utter.pitch = 1;
    utter.voice =
      synth
        .getVoices()
        .find((v) => v.name === selectedVoice) || null;

    utter.onend = () => {
      setIsTalking(false);
      callback?.();
    };
    synth.speak(utter);
  };

  // 🎧 Start continuous interaction
  const startConversation = async () => {
    vibrate(120);
    setIsTalking(true);
    setShouldContinue(true);

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    // 🗣️ Greet once
    speak("Hi, this is Ochiga Assistant. How can I help you today?", () => {
      recognition.start();
    });

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();

      // Don’t leave residual text
      setInput("");
      console.log("🎤 You said:", transcript);

      // 🔧 Simple intent logic
      let reply = "I didn’t quite get that. Can you say it again?";
      if (transcript.includes("light")) reply = "Okay, the light has been turned on.";
      else if (transcript.includes("visitor"))
        reply = "Sure. What time should I schedule your visitor?";
      else if (transcript.includes("status"))
        reply = "Your home is secure, power is stable, and the network is strong.";
      else if (transcript.includes("camera"))
        reply = "Turning on your security cameras now.";
      else if (transcript.includes("shut down") || transcript.includes("sleep")) {
        reply = "Alright. Ochiga Assistant signing off.";
        setShouldContinue(false);
      }

      // 🎤 Speak reply then continue listening if not shutting down
      speak(reply, () => {
        if (shouldContinue) {
          setTimeout(() => {
            recognition.start();
          }, 1000);
        } else {
          recognition.stop();
          vibrate(150);
          setIsTalking(false);
        }
      });
    };

    recognition.onerror = () => {
      recognition.stop();
      if (shouldContinue) {
        setTimeout(() => recognition.start(), 1000);
      } else {
        setIsTalking(false);
      }
    };

    recognition.onend = () => {
      if (shouldContinue) {
        recognition.start();
      }
    };
  };

  // 🎙️ Mic (manual speech-to-text for typing)
  const handleMicClick = () => {
    vibrate(60);

    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!isRecording) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;

      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  };

  // 🚀 Main Jelly Button (Talk / Send)
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
  };

  return (
    <>
      {/* 🔊 Voice Selection Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-80 text-center">
            <h3 className="text-white text-lg font-semibold mb-3">
              Choose Your Assistant Voice
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              {["Samantha", "Daniel"].map((voice) => (
                <button
                  key={voice}
                  onClick={() => handleVoiceSelect(voice)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedVoice === voice
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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

      {/* 🌊 Chat Footer */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 px-4 py-3 fixed bottom-0 z-50">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 gap-2 shadow-inner overflow-hidden">
            {/* 🎤 Mic Button */}
            <button
              onClick={handleMicClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isRecording
                  ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)] scale-110"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isRecording ? (
                <FaStop className="text-white text-sm" />
              ) : (
                <FaMicrophone className="text-white text-sm" />
              )}
            </button>

            {/* ✏️ Input / Waveform */}
            <div className="relative flex-1 h-10 flex items-center">
              {!isRecording ? (
                <input
                  type="text"
                  placeholder="Ask Ochiga AI anything…"
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
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                  >
                    {[...Array(120)].map((_, i) => (
                      <div
                        key={i}
                        className="w-[2px] rounded-full"
                        style={{
                          height: `${8 + ((i % 8) - 4) * 0.5}px`,
                          backgroundColor: brandColor,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                    {[...Array(120)].map((_, i) => (
                      <div
                        key={`loop-${i}`}
                        className="w-[2px] rounded-full"
                        style={{
                          height: `${8 + ((i % 8) - 4) * 0.5}px`,
                          backgroundColor: brandColor,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            {/* 🧠 Jelly Button */}
            <button
              onClick={handleMainButtonClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isTalking
                  ? "bg-red-600 shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-110"
                  : isTyping
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isTyping ? (
                <FaPaperPlane className="text-white text-sm" />
              ) : isTalking ? (
                <motion.div
                  className="w-6 h-6 bg-gradient-to-r from-[#e11d48] to-[#b91c1c] rounded-full"
                  animate={{
                    borderRadius: [
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                      "40% 60% 70% 30% / 50% 60% 30% 60%",
                      "70% 30% 50% 50% / 60% 40% 60% 40%",
                      "50% 50% 30% 70% / 40% 60% 40% 60%",
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <motion.div
                  className="w-5 h-5 bg-gradient-to-r from-[#9ca3af] to-[#6b7280] rounded-full"
                  animate={{
                    borderRadius: [
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                      "50% 50% 70% 30% / 60% 50% 40% 50%",
                      "70% 30% 50% 50% / 50% 60% 40% 60%",
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
