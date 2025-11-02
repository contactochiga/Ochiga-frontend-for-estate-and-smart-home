// components/OrbAssistant.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AssistantPanel from "./AssistantPanel";
import { useSpeech } from "./useSpeech";

export default function OrbAssistant() {
  const [open, setOpen] = useState(false);
  const { listening, lastTranscript, start, stop, speak, setLastTranscript } = useSpeech();
  const [speaking, setSpeaking] = useState(false);
  const holdTimer = useRef<number | null>(null);

  // auto-handle incoming transcript (fire event)
  useEffect(() => {
    if (!lastTranscript) return;
    // Emit the transcript to panel or handle directly
    // For demo we open panel and send transcript as user message
    setOpen(true);
    // you could forward transcript via context or event bus
    setLastTranscript(null);
  }, [lastTranscript, setLastTranscript]);

  const handleMouseDown = () => {
    // long press -> start listening
    holdTimer.current = window.setTimeout(() => start(), 600);
  };
  const handleMouseUp = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
      // if not listening yet, interpret as tap -> toggle panel
      if (!listening) setOpen((v) => !v);
      else stop();
    }
  };

  // speak wrapper that sets speaking state
  const speakAndNotify = (text: string) => {
    setSpeaking(true);
    const utter = speak(text);
    if (utter) {
      utter.onend = () => setSpeaking(false);
    } else {
      setTimeout(() => setSpeaking(false), 1500);
    }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="flex items-end justify-center h-full pb-20 pointer-events-none">
          {/* Orb container */}
          <div className="pointer-events-auto">
            <AnimatePresence>
              {!open && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl`}
                  style={{
                    background: "radial-gradient(circle at 30% 20%, #4f46e5, #06b6d4)",
                  }}
                >
                  <span className={`absolute inset-0 rounded-full ${listening ? "animate-ping bg-white/10" : ""}`} />
                  <FaRobot size={22} />
                  {/* small listening dot */}
                  {listening && <span className="absolute -bottom-1 right-0 w-3 h-3 bg-red-500 rounded-full" />}
                  {speaking && <span className="absolute -top-1 left-0 w-3 h-3 bg-yellow-300 rounded-full" />}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Assistant panel: expands from orb -- controlled by `open` */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-end justify-center md:items-center pointer-events-auto"
          >
            <AssistantPanel
              onClose={() => setOpen(false)}
              speak={(t: string) => speakAndNotify(t)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
