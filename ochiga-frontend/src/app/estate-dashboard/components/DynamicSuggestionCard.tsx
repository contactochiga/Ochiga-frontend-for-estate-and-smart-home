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
 * ChatGPT-style white cards with icons and smart visibility
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

  // ---------- Contextual suggestions ----------
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
      { id: "d2", title: "Turn on Corridor Lights", subtitle: "Block A corridors", payload: "turn_on_corridor_lights" },
      { id: "d3", title: "Check Device Status", subtitle: "control room", payload: "check_device_status" },
      { id: "d4", title: "Lock Admin Door", subtitle: "night mode", payload: "lock_admin_door" },
      { id: "d5", title: "Restart Access Panel", subtitle: "main gate", payload: "restart_access_panel" },
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

  // pick which list to show
  const displayList: Suggestion[] = useMemo(() => {
    if (suggestions?.length) return suggestions.slice(0, 5);

    if (estateStatus) {
      const dyn: Suggestion[] = [];
      if (estateStatus.power === "off")
        dyn.push({ id: "dyn1", title: "Switch to Backup Power", subtitle: "power is down", payload: "switch_backup_power" });
      if (estateStatus.gate === "open")
        dyn.push({ id: "dyn2", title: "Lock Estate Gate", subtitle: "gate is open", payload: "lock_estate_gate" });
      if (estateStatus.waterLevel === "low")
        dyn.push({ id: "dyn3", title: "Activate Borehole Pump", subtitle: "water low", payload: "activate_pump" });
      if (estateStatus.maintenance)
        dyn.push({ id: "dyn4", title: "View Maintenance Tasks", subtitle: "ongoing tasks", payload: "view_maintenance" });
      if (dyn.length) return dyn.slice(0, 5);
    }

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
  }, [suggestions, estateStatus, activePanel, devicesSuggestions, powerSuggestions, accountingSuggestions, communitySuggestions, baseSuggestions]);

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

  // icon resolver
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

  return (
    <>
      {/* Notification */}
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
                  <button
                    onClick={notification.onAction}
                    className="px-3 py-1 rounded-full bg-red-600 text-white text-sm shadow-sm hover:bg-red-700"
                  >
                    {notification.actionLabel}
                  </button>
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
            <div className="w-full max-w-3xl pointer-events-auto flex flex-wrap gap-3 justify-center items-center">
              {displayList.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => handleClick(s)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full sm:w-auto max-w-[46%] md:max-w-[30%] lg:max-w-[22%] bg-white rounded-2xl shadow-sm border border-gray-200 p-3 text-left flex items-start gap-2 transition`}
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
