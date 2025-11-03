"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
  userActions?: string[];
  onSelect: (suggestion: string) => void;
  isTyping: boolean;
}

/**
 * DynamicSuggestionCard
 * Minimal version:
 * - Only displays adaptive suggestion chips (no headers or labels)
 * - Learns from userActions to show relevant quick commands
 */
export default function DynamicSuggestionCard({ userActions = [], onSelect, isTyping }: Props) {
  const [notifications, setNotifications] = useState<string[]>([]);

  // default static suggestions
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

  // Compose adaptive suggestions
  const suggestions = useMemo(() => {
    const recent = userActions.length > 0 ? userActions[userActions.length - 1] : null;
    const combined: string[] = [];

    if (recent) {
      const repeat = `Repeat: "${recent}"`;
      combined.push(repeat);
    }

    for (const s of defaultSuggestions) {
      const normalized = s.toLowerCase();
      if (recent && recent.toLowerCase().includes(normalized.split(" ")[0])) continue;
      if (!combined.some((c) => c.toLowerCase() === s.toLowerCase())) combined.push(s);
      if (combined.length >= 6) break;
    }

    return combined.slice(0, 6);
  }, [userActions, defaultSuggestions]);

  // Add simple notification logic (background use only)
  useEffect(() => {
    if (!userActions || userActions.length === 0) return;
    const last = userActions[userActions.length - 1];
    setNotifications((prev) => [`Executed: ${last}`, ...prev].slice(0, 5));
  }, [userActions]);

  // hide when typing
  if (isTyping) return null;

  return (
    <div className="w-full px-4 mb-2">
      <div className="max-w-3xl mx-auto">
        <div className="w-full flex flex-wrap justify-center gap-2 animate-fadeIn">
          {suggestions.map((s, i) => (
            <button
              key={`${s}-${i}`}
              onClick={() => onSelect(s)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
              title={s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
