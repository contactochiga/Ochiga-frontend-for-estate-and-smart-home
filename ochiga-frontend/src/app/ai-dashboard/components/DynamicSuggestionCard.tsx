"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
  userActions?: string[]; // made optional ✅
  onSelect: (suggestion: string) => void;
  isTyping: boolean;
}

/**
 * DynamicSuggestionCard
 *
 * - Shows a row of suggestion chips above the chat footer.
 * - Adapts suggestions based on recent userActions (most recent action promoted).
 * - Hides while user is typing (isTyping).
 * - Can flip between suggestions and a lightweight notifications area.
 */
export default function DynamicSuggestionCard({ userActions = [], onSelect, isTyping }: Props) {
  const [mode, setMode] = useState<"suggestions" | "notifications">("suggestions");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<number>>(new Set());

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

  // Compose suggestions: put recent action first (if any), then defaults without duplicates
  const suggestions = useMemo(() => {
    const recent = userActions.length > 0 ? userActions[userActions.length - 1] : null;
    const combined: string[] = [];

    if (recent) {
      const repeat = `Repeat: "${recent}"`;
      combined.push(repeat);
    }

    for (const s of defaultSuggestions) {
      // avoid adding duplicates (case-insensitive)
      const normalized = s.toLowerCase();
      if (recent && recent.toLowerCase().includes(normalized.split(" ")[0])) {
        continue;
      }
      if (!combined.some((c) => c.toLowerCase() === s.toLowerCase())) combined.push(s);
      if (combined.length >= 6) break;
    }

    // pad with defaults if short
    for (const s of defaultSuggestions) {
      if (combined.length >= 6) break;
      if (!combined.includes(s)) combined.push(s);
    }

    return combined.slice(0, 6);
  }, [userActions, defaultSuggestions]);

  // When user performs actions, add small notification entries
  useEffect(() => {
    if (!userActions || userActions.length === 0) return;
    const last = userActions[userActions.length - 1];

    setNotifications((prev) => {
      const next = [`Executed: ${last}`, ...prev].slice(0, 5);
      return next;
    });

    setMode("notifications");
    const t = setTimeout(() => setMode("suggestions"), 2200);
    return () => clearTimeout(t);
  }, [userActions]);

  const dismissNotification = (index: number) => {
    setDismissedIds((prev) => new Set(prev).add(index));
  };

  // hide card while typing
  if (isTyping) return null;

  return (
    <div className="w-full px-4 mb-2">
      <div className="max-w-3xl mx-auto">
        <div className="bg-transparent rounded-lg p-1">
          {/* Header / mode toggle */}
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="text-xs text-gray-300 uppercase tracking-wider">Quick actions</div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode("suggestions")}
                aria-pressed={mode === "suggestions"}
                className={`px-2 py-1 text-xs rounded-md transition ${
                  mode === "suggestions" ? "bg-gray-800 text-white" : "text-gray-400"
                }`}
              >
                Suggestions
              </button>

              <button
                onClick={() => setMode("notifications")}
                aria-pressed={mode === "notifications"}
                className={`px-2 py-1 text-xs rounded-md transition ${
                  mode === "notifications" ? "bg-gray-800 text-white" : "text-gray-400"
                }`}
              >
                Notifications
              </button>
            </div>
          </div>

          {/* Suggestions view */}
          {mode === "suggestions" && (
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
          )}

          {/* Notifications view */}
          {mode === "notifications" && (
            <div className="w-full flex flex-col gap-2 animate-fadeIn">
              {notifications.length === 0 && (
                <div className="text-xs text-gray-400 px-3 py-2">No notifications</div>
              )}

              {notifications.map((n, idx) => {
                if (dismissedIds.has(idx)) return null;
                return (
                  <div
                    key={`${n}-${idx}`}
                    className="flex items-center justify-between bg-gray-900/60 border border-gray-700 rounded-md px-3 py-2"
                  >
                    <div className="text-xs text-gray-200 truncate">{n}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelect(n.replace(/^Executed:\s*/, ""))}
                        className="text-xs text-cyan-300 hover:underline"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => dismissNotification(idx)}
                        className="text-xs text-gray-400"
                        aria-label="Dismiss notification"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
