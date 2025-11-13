"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  suggestions?: string[];
  onSend: (suggestion: string) => void;
  isTyping?: boolean;
  notification?: {
    type: "alert" | "device" | "power" | "community";
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;
}

export default function EstateSuggestionCard({
  suggestions = [],
  onSend,
  isTyping = false,
  notification,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  // ----------------------------
  // Default estate-related suggestions
  // ----------------------------
  const defaultSuggestions = useMemo(
    () => [
      "Turn on gate lights",
      "Check water supply status",
      "View CCTV feed",
      "Lock all estate doors",
      "View resident list",
      "Generate service charge report",
      "Send community announcement",
    ],
    []
  );

  const displayList = suggestions.length > 0 ? suggestions : defaultSuggestions;

  // ----------------------------
  // Check viewport empty space
  // ----------------------------
  const checkViewportSpace = () => {
    if (isTyping) return setVisible(false);

    const footerOffset = 200; // buffer to avoid overlapping footer
    const scrollBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - footerOffset;

    setVisible(scrollBottom && displayList.length > 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      setVisible(false); // hide immediately while scrolling
      idleTimer.current = setTimeout(checkViewportSpace, 300); // show after short idle
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isTyping, displayList.length]);

  useEffect(() => {
    checkViewportSpace();
  }, [isTyping, displayList.length]);

  // ----------------------------
  // Notification auto-hide
  // ----------------------------
  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      {/* 🔔 Notification Overlay */}
      <AnimatePresence>
        {showNotification && notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-28 left-0 w-full z-40 flex justify-center px-4 pointer-events-auto"
          >
            <div className="max-w-3xl w-full bg-gray-900/90 border border-gray-800 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col items-start text-gray-200">
              <span className="text-sm font-semibold mb-1">{notification.title}</span>
              {notification.description && (
                <p className="text-xs text-gray-400 mb-2">{notification.description}</p>
              )}
              {notification.actionLabel && (
                <button
                  onClick={notification.onAction}
                  className="mt-1 w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded-full transition"
                >
                  {notification.actionLabel}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚡ Dynamic Suggestion Card */}
      <AnimatePresence>
        {visible && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 left-0 w-full z-30 flex justify-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-3 shadow-lg flex flex-wrap justify-center gap-2 text-gray-200 pointer-events-auto">
              {displayList.map((s, i) => (
                <motion.button
                  key={`${s}-${i}`}
                  onClick={() => onSend(s)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
                  title={s}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
