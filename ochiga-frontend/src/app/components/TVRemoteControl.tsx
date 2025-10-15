// src/components/TVRemoteControl.tsx
"use client";

import React, { useState } from "react";

type TVRemoteProps = {
  deviceId: string; // backend device id
  onClose?: () => void;
  className?: string;
};

const MAROON = "#800000"; // thin accent border only

export default function TVRemoteControl({ deviceId, onClose, className = "" }: TVRemoteProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);

  async function sendTVCommand(action: string, value?: any) {
    if (busy) return;
    setBusy(true);
    setStatus(null);

    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = `${BASE.replace(/\/$/, "")}/iot/devices/${encodeURIComponent(deviceId)}/control`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, value }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText || "Error");
        throw new Error(text || `Status ${res.status}`);
      }

      const data = await res.json().catch(() => ({}));
      setStatus({ ok: true, text: "Command sent" });
      // optional: return data
      setTimeout(() => setStatus(null), 1800);
      return data;
    } catch (err: any) {
      console.error("TV command error:", err);
      setStatus({ ok: false, text: (err && err.message) || "Network error" });
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setBusy(false);
    }
  }

  const btnClass =
    "flex items-center justify-center rounded-lg border px-3 py-2 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 transition";
  const iconClass = "text-lg";

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">TV Remote</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => sendTVCommand("power")}
              disabled={busy}
              aria-label="Power"
              className={`${btnClass} border-[1.5px]`}
              style={{ borderColor: MAROON, background: "transparent" }}
            >
              {/* simple power icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="2">
                <path d="M12 2v10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.2 6.4a9 9 0 1 0 13.6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => onClose?.()}
              aria-label="Close"
              className={`${btnClass} border border-gray-200`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Trackpad + nav */}
        <div className="grid grid-cols-3 gap-3 items-center mb-4">
          {/* Left column: volume */}
          <div className="flex flex-col gap-2 items-center">
            <button
              onClick={() => sendTVCommand("volume_up")}
              disabled={busy}
              aria-label="Volume up"
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➕
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Vol</div>
            <button
              onClick={() => sendTVCommand("volume_down")}
              disabled={busy}
              aria-label="Volume down"
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➖
            </button>
          </div>

          {/* Middle column: D-pad / trackpad */}
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-rows-3 gap-2">
              <button
                onClick={() => sendTVCommand("up")}
                disabled={busy}
                aria-label="Up"
                className={`${btnClass} w-40 h-10`}
                style={{ borderColor: MAROON }}
              >
                ↑
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => sendTVCommand("left")}
                  disabled={busy}
                  aria-label="Left"
                  className={`${btnClass} w-10 h-10`}
                  style={{ borderColor: MAROON }}
                >
                  ←
                </button>

                {/* Central OK button (styled circle) */}
                <button
                  onClick={() => sendTVCommand("ok")}
                  disabled={busy}
                  aria-label="OK"
                  className={`flex items-center justify-center w-14 h-14 rounded-full border-[1.5px] ${btnClass}`}
                  style={{ borderColor: MAROON, background: "transparent" }}
                >
                  <div style={{ width: 34, height: 34 }} className="flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={MAROON}>
                      <circle cx="12" cy="12" r="10" fill={MAROON} opacity="0.06" />
                      <path d="M12 8v8M8 12h8" stroke={MAROON} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => sendTVCommand("right")}
                  disabled={busy}
                  aria-label="Right"
                  className={`${btnClass} w-10 h-10`}
                  style={{ borderColor: MAROON }}
                >
                  →
                </button>
              </div>

              <button
                onClick={() => sendTVCommand("down")}
                disabled={busy}
                aria-label="Down"
                className={`${btnClass} w-40 h-10`}
                style={{ borderColor: MAROON }}
              >
                ↓
              </button>
            </div>
          </div>

          {/* Right column: channel */}
          <div className="flex flex-col gap-2 items-center">
            <button
              onClick={() => sendTVCommand("channel_up")}
              disabled={busy}
              aria-label="Channel up"
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➕
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ch</div>
            <button
              onClick={() => sendTVCommand("channel_down")}
              disabled={busy}
              aria-label="Channel down"
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➖
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => sendTVCommand("mute")}
            disabled={busy}
            aria-label="Mute"
            className={`${btnClass} flex-1 py-2`}
            style={{ borderColor: MAROON }}
          >
            🔇 Mute
          </button>

          <button
            onClick={() => sendTVCommand("home")}
            disabled={busy}
            aria-label="Home"
            className={`${btnClass} flex-1 py-2`}
            style={{ borderColor: MAROON }}
          >
            🏠 Home
          </button>

          <button
            onClick={() => sendTVCommand("back")}
            disabled={busy}
            aria-label="Back"
            className={`${btnClass} flex-1 py-2`}
            style={{ borderColor: MAROON }}
          >
            ↩ Back
          </button>
        </div>

        {/* Status toast */}
        <div className="mt-4 h-6">
          {status && (
            <div
              className={`inline-block px-3 py-1 text-sm rounded-md ${
                status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {status.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
