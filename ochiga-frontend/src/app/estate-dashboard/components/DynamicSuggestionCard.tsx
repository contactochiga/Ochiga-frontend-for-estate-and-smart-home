// ochiga-frontend/src/app/estate-dashboard/components/DynamicSuggestionCard.tsx
"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  payload?: string; // what gets sent to assistant/back-end (defaults to title)
}

interface Props {
  suggestions?: Suggestion[]; // if present, overrides contextual suggestions
  onSend: (payload: string) => void;
  isTyping?: boolean;
  notification?: EstateNotification | null;
  estateStatus?: {
    power?: "on" | "off";
    gate?: "open" | "closed";
    waterLevel?: "low" | "normal";
    maintenance?: boolean;
  };
  activePanel?: PanelKey; // current panel context (devices / power / accounting / community)
  assistantActive?: boolean; // if assistant is currently speaking/listening -> dim suggestions
}

/**
 * DynamicSuggestionCard (ChatGPT-style white suggestion cards)
 * - Shows up to 5 two-line cards
 * - Context-aware via activePanel or estateStatus
 * - Hides when typing or when user scrolls down; shows on scroll up or near bottom
 * - Notification overlay support (floating)
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

  // scroll direction detection
  const lastY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const hideTimer = useRef<number | null>(null);

  // ----------------------------
  // Contextual suggestion generation
  // ----------------------------
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

  const devicesSuggestions = useMemo<Suggestion[]>(
    () => [
      { id: "d1", title: "View CCTV Feed", subtitle: "entrance camera", payload: "view_cctv_entrance" },
      { id: "d2", title: "Turn on corridor lights", subtitle: "Block A corridors", payload: "turn_on_corridor_lights" },
      { id: "d3", title: "Check device status", subtitle: "control room", payload: "check_device_status" },
      { id: "d4", title: "Lock admin door", subtitle: "night mode", payload: "lock_admin_door" },
      { id: "d5", title: "Restart access panel", subtitle: "main gate", payload: "restart_access_panel" },
    ],
    []
  );

  const powerSuggestions = useMemo<Suggestion[]>(
    () => [
      { id: "p1", title: "Switch to Backup Power", subtitle: "during outage", payload: "switch_backup_power" },
      { id: "p2", title: "Check Generator", subtitle: "generator status", payload: "check_generator" },
      { id: "p3", title: "Turn off Generator", subtitle: "stop backup", payload: "turn_off_generator" },
      { id: "p4", title: "View Electricity Usage", subtitle: "this week", payload: "view_electricity_usage" },
      { id: "p5", title: "Reset Smart Meter", subtitle: "house 14B", payload: "reset_smart_meter_14B" },
    ],
    []
  );

  const accountingSuggestions = useMemo<Suggestion[]>(
    () => [
      { id: "a1", title: "View Unpaid Invoices", subtitle: "residents", payload: "view_unpaid_invoices" },
      { id: "a2", title: "Fund Estate Wallet", subtitle: "for utilities", payload: "fund_wallet" },
      { id: "a3", title: "Send Payment Reminder", subtitle: "to residents", payload: "send_payment_reminder" },
      { id: "a4", title: "Check Service Charge", subtitle: "summary", payload: "check_service_charge" },
      { id: "a5", title: "Generate Report", subtitle: "treasurer", payload: "generate_financial_report" },
    ],
    []
  );

  const communitySuggestions = useMemo<Suggestion[]>(
    () => [
      { id: "c1", title: "Post Announcement", subtitle: "to residents", payload: "post_announcement" },
      { id: "c2", title: "Approve Visitor", subtitle: "house 5A", payload: "approve_visitor_5A" },
      { id: "c3", title: "View Resident List", subtitle: "alphabetical", payload: "view_residents" },
      { id: "c4", title: "Schedule Event", subtitle: "estate weekend", payload: "schedule_event" },
      { id: "c5", title: "Message Security", subtitle: "urgent", payload: "message_security" },
    ],
    []
  );

  // choose which suggestion list to display
  const displayList: Suggestion[] = useMemo(() => {
    if (suggestions && suggestions.length > 0) {
      return suggestions.slice(0, 5);
    }

    // estateStatus priorities (if present)
    if (estateStatus) {
      const dynamic: Suggestion[] = [];
      if (estateStatus.power === "off") dynamic.push({ id: "dyn-power", title: "Switch to Backup Power", subtitle: "power is down", payload: "switch_backup_power" });
      if (estateStatus.gate === "open") dynamic.push({ id: "dyn-gate", title: "Lock Estate Gate", subtitle: "gate is open", payload: "lock_estate_gate" });
      if (estateStatus.waterLevel === "low") dynamic.push({ id: "dyn-water", title: "Activate Borehole Pump", subtitle: "water level low", payload: "activate_pump" });
      if (estateStatus.maintenance) dynamic.push({ id: "dyn-maint", title: "View Maintenance Tasks", subtitle: "ongoing tasks", payload: "view_maintenance" });

      if (dynamic.length > 0) return dynamic.slice(0, 5);
    }

    // panel-based suggestions
    switch (activePanel) {
      case "devices":
        return devicesSuggestions.slice(0, 5);
      case "power":
        return powerSuggestions.slice(0, 5);
      case "accounting":
        return accountingSuggestions.slice(0, 5);
      case "community":
        return communitySuggestions.slice(0, 5);
      default:
        return baseSuggestions.slice(0, 5);
    }
  }, [suggestions, estateStatus, activePanel, baseSuggestions, devicesSuggestions, powerSuggestions, accountingSuggestions, communitySuggestions]);

  // ----------------------------
  // Visibility logic: scroll up = show, scroll down = hide; also hide while typing
  // ----------------------------
  useEffect(() => {
    if (isTyping || assistantActive) {
      setVisible(false);
      return;
    }
    // else keep visible check
    setVisible(true);
  }, [isTyping, assistantActive]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - (lastY.current || 0);

      // user scrolling down -> hide
      if (delta > 10) {
        setVisible(false);
      } else if (delta < -10) {
        // user scrolling up -> show
        setVisible(true);
      } else {
        // minimal movement: if near bottom show
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 220;
        if (nearBottom) setVisible(true);
      }

      lastY.current = currentY;

      // debounce small movements
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        // if user stopped scrolling and is at bottom, ensure visible
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

  // ----------------------------
  // Notification auto-hide
  // ----------------------------
  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const t = window.setTimeout(() => setShowNotification(false), 7000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  // small helper to call onSend with payload string
  const handleClick = (s: Suggestion) => {
    const payload = s.payload ?? s.title;
    onSend(payload);
  };

  return (
    <>
      {/* Notification overlay (floating) */}
      <AnimatePresence>
        {showNotification && notification && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.32 }}
            className="fixed bottom-28 left-0 w-full z-40 flex justify-center px-4 pointer-events-auto"
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
                  <div className="ml-4">
                    <button
                      onClick={notification.onAction}
                      className="px-3 py-1 rounded-full bg-red-600 text-white text-sm shadow-sm hover:bg-red-700"
                    >
                      {notification.actionLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion cards */}
      <AnimatePresence>
        {visible && displayList.length > 0 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-16 left-0 w-full z-30 flex justify-center px-4 pointer-events-none"
          >
            <div
              className={`w-full max-w-3xl pointer-events-auto flex flex-wrap gap-3 justify-center items-center`}
            >
              {displayList.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => handleClick(s)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto max-w-[46%] md:max-w-[30%] lg:max-w-[22%] bg-white rounded-2xl shadow-sm border border-gray-200 p-3 text-left transition`}
                  style={{
                    opacity: assistantActive ? 0.6 : 1,
                  }}
                >
                  <div className="font-medium text-sm text-gray-900 leading-tight">{s.title}</div>
                  {s.subtitle && (
                    <div className="text-xs text-gray-500 mt-1">{s.subtitle}</div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
