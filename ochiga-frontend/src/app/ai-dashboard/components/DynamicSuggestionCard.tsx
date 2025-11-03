"use client";

import { useMemo, useState, useEffect } from "react";

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

/**
 * DynamicSuggestionCard
 * - Displays quick actions
 * - Dynamically shows alert/notification overlay
 * - Auto-hides when typing or scrolling
 */
export default function DynamicSuggestionCard({
  suggestions = [],
  onSend,
  isTyping,
  notification,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  // Default static suggestions
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

  // Handle visibility when typing
  useEffect(() => {
    if (isTyping) setVisible(false);
    else setVisible(true);
  }, [isTyping]);

  // Hide suggestions when scrolling
  useEffect(() => {
    const handleScroll = () => setVisible(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle notification visibility
  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 7000); // auto-hide after 7s
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      {/* 🔔 Dynamic Notification Overlay */}
      {showNotification && notification && (
        <div className="fixed bottom-28 left-0 w-full z-40 flex justify-center px-4 animate-fadeInUp">
          <div className="max-w-sm w-full bg-gray-900/90 border border-gray-800 backdrop-blur-md rounded-2xl p-4 shadow-xl flex flex-col items-start text-gray-200">
            <span className="text-sm font-semibold mb-1">
              {notification.title}
            </span>
            {notification.description && (
              <p className="text-xs text-gray-400 mb-2">
                {notification.description}
              </p>
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
        </div>
      )}

      {/* ⚡ Quick Suggestion Bubbles */}
      {visible && (
        <div className="fixed bottom-20 left-0 w-full z-30 px-4 transition-opacity duration-300">
          <div className="max-w-3xl mx-auto">
            <div className="w-full flex flex-wrap justify-center gap-2 animate-fadeIn">
              {displayList.map((s, i) => (
                <button
                  key={`${s}-${i}`}
                  onClick={() => onSend(s)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
                  title={s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
