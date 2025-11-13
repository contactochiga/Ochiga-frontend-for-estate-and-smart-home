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

type PanelKey = "devices" | "power" | "accounting" | "community" | null;

export interface EstateNotification {
  type: "alert" | "video" | "access" | "message" | "energy" | "maintenance";
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface Suggestion {
  id: string;
  title: string;
  subtitle?: string;
  payload?: string;
}

interface Props {
  suggestions?: Suggestion[];
  onSend: (payload: string) => void;
  isTyping?: boolean;
  notification?: EstateNotification | null;
  estateStatus?: {
    power?: "on" | "off";
    gate?: "open" | "closed";
    waterLevel?: "low" | "normal";
    maintenance?: boolean;
  };
  activePanel?: PanelKey;
  assistantActive?: boolean;
}

/**
 * DynamicSuggestionCard
 * ChatGPT-style suggestion cards + notification overlay
 */
export default function DynamicSuggestionCard({
  suggestions,
  onSend,
  isTyping = false,
  notification = null,
  estateStatus,
  activePanel = null,
  assistantActive = false,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const hideTimer = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ---------- Base & Contextual Suggestions ----------
  const baseSuggestions = useMemo<Suggestion[]>(
    () => [
      { id: "s1", title: "Unlock Main Gate", subtitle: "for visitor entry", payload: "unlock_gate" },
      { id: "s2", title: "Turn on Street Lights", subtitle: "estate road lights", payload: "turn_on_street_lights" },
      { id: "s3", title: "View CCTV Feed", subtitle: "entrance camera", payload: "view_cctv_entrance" },
      { id: "s4", title: "Check Power Status", subtitle: "estate power supply", payload: "check_power" },
      { id: "s5", title: "Fund Estate Wallet", subtitle: "for utilities", payload: "fund_wallet" },
    ],
    []
  );

  const displayList: Suggestion[] = suggestions?.length
    ? suggestions.slice(0, 5)
    : baseSuggestions;

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
      else {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 220;
        if (nearBottom) setVisible(true);
      }
      lastY.current = currentY;

      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 220;
        if (nearBottom && !isTyping && !assistantActive) setVisible(true);
      }, 220);
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

  const handleClick = (s: Suggestion) => {
    const payload = s.payload ?? s.title;
    onSend(payload);
  };

  // ---------- Icons ----------
  const getIcon = (s: Suggestion) => {
    const key = s.payload?.toLowerCase() ?? "";
    if (key.includes("light") || key.includes("device")) return <FiCpu size={16} className="text-gray-500" />;
    if (key.includes("power") || key.includes("generator") || key.includes("meter")) return <FiZap size={16} className="text-gray-500" />;
    if (key.includes("wallet") || key.includes("invoice") || key.includes("payment")) return <FiDollarSign size={16} className="text-gray-500" />;
    if (key.includes("resident") || key.includes("visitor") || key.includes("announcement")) return <FiUsers size={16} className="text-gray-500" />;
    if (key.includes("camera") || key.includes("cctv")) return <FiCamera size={16} className="text-gray-500" />;
    if (key.includes("gate") || key.includes("lock")) return <FiLock size={16} className="text-gray-500" />;
    if (key.includes("security")) return <FiShield size={16} className="text-gray-500" />;
    if (key.includes("home")) return <FiHome size={16} className="text-gray-500" />;
    return <FiKey size={16} className="text-gray-500" />;
  };

  // ---------- Auto-scroll slow drift ----------
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollDirection = 1; // 1 = right, -1 = left
    const scrollSpeed = 0.4; // px per frame
    let rafId: number;

    const animateScroll = () => {
      if (!scrollContainer) return;

      scrollContainer.scrollLeft += scrollSpeed * scrollDirection;

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 2
      ) {
        scrollDirection = -1;
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollDirection = 1;
      }

      rafId = requestAnimationFrame(animateScroll);
    };

    rafId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(rafId);
  }, [visible, isTyping]);

  return (
    <>
      {/* 🔔 Notification Overlay */}
      <AnimatePresence>
        {showNotification && notification && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.32 }}
            // position above suggestion bar and above footer: use safe-area calc
            style={{
              bottom: `calc(96px + env(safe-area-inset-bottom))`,
              zIndex: 70,
            } as React.CSSProperties}
            className="fixed left-0 w-full flex justify-center px-4 pointer-events-auto"
          >
            <div className="max-w-3xl w-full bg-white rounded-2xl p-4 shadow-lg border border-gray-200 text-gray-800">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold">{notification.title}</div>
                  {notification.description && (
                    <div className="text-sm text-gray-500 mt-1">{notification.description}</div>
                  )}
                </div>
                {notification.actionLabel && (
                  <button
                    onClick={notification.onAction}
                    className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm shadow-sm hover:bg-blue-700"
                  >
                    {notification.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💡 Suggestion Cards - Horizontal Scroll */}
      <AnimatePresence>
        {visible && displayList.length > 0 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.28 }}
            // place directly above the footer (64px) + safe-area inset, and ensure it's ABOVE the footer z-index
            style={{
              bottom: `calc(74px + env(safe-area-inset-bottom))`,
              zIndex: 60,
            } as React.CSSProperties}
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
                  className="flex-none min-w-[220px] bg-white rounded-2xl shadow-sm border border-gray-200 p-3 text-left flex items-start gap-2 transition scroll-snap-align-start"
                  style={{
                    opacity: assistantActive ? 0.6 : 1,
                  }}
                >
                  {getIcon(s)}
                  <div className="flex flex-col">
                    <div className="font-medium text-sm text-gray-900 leading-tight">{s.title}</div>
                    {s.subtitle && <div className="text-xs text-gray-500 mt-0.5">{s.subtitle}</div>}
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
