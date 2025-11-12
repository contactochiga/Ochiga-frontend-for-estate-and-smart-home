"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  suggestions?: string[];
  onSend: (suggestion: string) => void;
  isTyping?: boolean;
  notification?: {
    type: "alert" | "video" | "access" | "message";
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;
}

export default function DynamicSuggestionCard({
  suggestions = [],
  onSend,
  isTyping,
  notification,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const lastScrollY = useRef(0);

  const defaultSuggestions = useMemo(
    () => [
      "Turn on living room lights",
      "Fund my wallet",
      "View CCTV feed",
      "Check device status",
      "Lock all doors",
    ],
    []
  );

  const displayList = suggestions.length > 0 ? suggestions : defaultSuggestions;

  // Hide suggestions while typing
  useEffect(() => {
    if (isTyping) setVisible(false);
    else setVisible(true);
  }, [isTyping]);

  // Scroll-aware visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up → show
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Notification auto-hide
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-28 left-0 w-full z-40 flex justify-center px-4"
          >
            <div className="max-w-sm w-full bg-gray-900/90 border border-gray-800 backdrop-blur-md rounded-2xl p-4 shadow-xl flex flex-col items-start text-gray-200">
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

      {/* ⚡ Suggestion Bubbles */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-0 w-full z-30 px-4"
          >
            <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
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
