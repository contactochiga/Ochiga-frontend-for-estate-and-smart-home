"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiCpu,
  FiUsers,
  FiDollarSign,
  FiCamera,
  FiLock,
  FiHome,
  FiShield,
  FiKey,
} from "react-icons/fi";

interface Props {
  onSend: (payload: string) => void;
  isTyping?: boolean;
  notification?: {
    type: "alert" | "video" | "access" | "message";
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;
  assistantActive?: boolean;
}

/**
 * RESIDENT DynamicSuggestionCard
 * EXACT estate UI + resident suggestions
 */
export default function ResidentDynamicSuggestionCard({
  onSend,
  isTyping = false,
  notification = null,
  assistantActive = false,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const hideTimer = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ---------- RESIDENT Suggestions ----------
  const residentSuggestions = useMemo(
    () => [
      { id: "r1", title: "Turn On Lights", subtitle: "living room bulbs", payload: "turn_on_living_room_lights" },
      { id: "r2", title: "Turn Off Lights", subtitle: "all rooms", payload: "turn_off_all_lights" },
      { id: "r3", title: "View CCTV Feed", subtitle: "living room camera", payload: "view_cctv_feed" },
      { id: "r4", title: "Check Device Status", subtitle: "smart home devices", payload: "check_device_status" },
      { id: "r5", title: "Lock All Doors", subtitle: "security lock", payload: "lock_all_doors" },
    ],
    []
  );

  const displayList = residentSuggestions;

  // ---------- Scroll visibility ----------
  useEffect(() => {
    if (isTyping || assistantActive) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, [isTyping, assistantActive]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - (lastY.current || 0);

      if (delta > 10) setVisible(false);
      else if (delta < -10) setVisible(true);

      lastY.current = currentY;

      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        if (!isTyping && !assistantActive) setVisible(true);
      }, 280);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [isTyping, assistantActive]);

  // ---------- Notification ----------
  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const t = window.setTimeout(() => setShowNotification(false), 7000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleClick = (s: any) => {
    const payload = s.payload ?? s.title;
    onSend(payload);
  };

  // ---------- Icons ----------
  const getIcon = (s: any) => {
    const key = s.payload?.toLowerCase() ?? "";
    if (key.includes("light")) return <FiCpu size={16} className="text-gray-400" />;
    if (key.includes("device")) return <FiCpu size={16} className="text-gray-400" />;
    if (key.includes("power")) return <FiZap size={16} className="text-gray-400" />;
    if (key.includes("camera")) return <FiCamera size={16} className="text-gray-400" />;
    if (key.includes("lock") || key.includes("door")) return <FiLock size={16} className="text-gray-400" />;
    if (key.includes("home")) return <FiHome size={16} className="text-gray-400" />;
    return <FiKey size={16} className="text-gray-400" />;
  };

  return (
    <>
      {/* 🔔 Notification */}
      <AnimatePresence>
        {showNotification && notification && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.32 }}
            style={{
              bottom: `calc(96px + env(safe-area-inset-bottom))`,
              zIndex: 70,
            }}
            className="fixed left-0 w-full flex justify-center px-4 pointer-events-auto"
          >
            <div className="max-w-3xl w-full bg-gray-900 text-gray-100 rounded-2xl p-4 shadow border border-gray-700 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-sm">{notification.title}</div>
                  {notification.description && (
                    <div className="text-xs text-gray-400 mt-1">{notification.description}</div>
                  )}
                </div>
                {notification.actionLabel && (
                  <button
                    onClick={notification.onAction}
                    className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs shadow hover:bg-blue-700 transition"
                  >
                    {notification.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⭐ Suggestion Row */}
      <AnimatePresence>
        {visible && !isTyping && displayList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.28 }}
            style={{
              bottom: `calc(84px + env(safe-area-inset-bottom))`,
              zIndex: 60,
            }}
            className="fixed left-0 right-0 px-4 pointer-events-none"
          >
            <div
              ref={scrollRef}
              className="w-full pointer-events-auto flex overflow-x-auto gap-3 hide-scrollbar"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {displayList.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => handleClick(s)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-none min-w-[220px] bg-gray-800 text-gray-100 rounded-2xl shadow border border-gray-700 p-3 text-left flex items-start gap-2 transition scroll-snap-align-start hover:bg-gray-750"
                  style={{
                    opacity: assistantActive ? 0.6 : 1,
                  }}
                >
                  {getIcon(s)}
                  <div className="flex flex-col">
                    <div className="font-medium text-sm leading-tight">{s.title}</div>
                    {s.subtitle && (
                      <div className="text-xs text-gray-400 mt-0.5">{s.subtitle}</div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
