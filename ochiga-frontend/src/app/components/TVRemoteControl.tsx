// src/app/components/TVRemoteControl.tsx
"use client";

import React, { useState, useRef } from "react";

type TVRemoteProps = {
  deviceId: string;
  onClose?: () => void;
  className?: string;
};

const MAROON = "#800000";

export default function TVRemoteControl({ deviceId, onClose, className = "" }: TVRemoteProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);
  const [hoverDir, setHoverDir] = useState<"up" | "down" | "left" | "right" | null>(null);

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

      if (!res.ok) throw new Error(await res.text());
      setStatus({ ok: true, text: `Sent: ${action}` });
      setTimeout(() => setStatus(null), 1800);
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Error" });
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setBusy(false);
    }
  }

  const btnClass =
    "flex items-center justify-center rounded-lg border px-3 py-2 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

  // trackpad ref
  const trackpadRef = useRef<HTMLDivElement>(null);

  const handleTrackpadMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = trackpadRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (Math.max(absX, absY) < 30) {
      setHoverDir(null);
      return;
    }

    if (absX > absY) {
      setHoverDir(x > 0 ? "right" : "left");
    } else {
      setHoverDir(y > 0 ? "down" : "up");
    }
  };

  const handleClick = () => {
    sendTVCommand("ok");
  };

  const handleLeave = () => {
    setHoverDir(null);
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Smart TV Remote</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => sendTVCommand("power")}
              disabled={busy}
              aria-label="Power"
              className={`${btnClass} border-[1.5px]`}
              style={{ borderColor: MAROON, background: "transparent" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="2">
                <path d="M12 2v10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.2 6.4a9 9 0 1 0 13.6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button onClick={() => onClose?.()} aria-label="Close" className={`${btnClass} border border-gray-200`}>
              ✕
            </button>
          </div>
        </div>

        {/* Volume / Trackpad / Channel */}
        <div className="grid grid-cols-3 gap-3 items-center mb-6">
          {/* Volume */}
          <div className="flex flex-col gap-2 items-center">
            <button onClick={() => sendTVCommand("volume_up")} disabled={busy} className={`${btnClass} w-12 h-12`} style={{ borderColor: MAROON }}>
              🔊
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Vol</div>
            <button onClick={() => sendTVCommand("volume_down")} disabled={busy} className={`${btnClass} w-12 h-12`} style={{ borderColor: MAROON }}>
              🔉
            </button>
          </div>

          {/* Trackpad */}
          <div
            ref={trackpadRef}
            onMouseMove={handleTrackpadMove}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            className="relative flex items-center justify-center w-40 h-40 rounded-full border-[1.5px] mx-auto cursor-pointer select-none transition-all"
            style={{
              borderColor: MAROON,
              background: "radial-gradient(circle, rgba(128,0,0,0.05) 0%, transparent 70%)",
            }}
          >
            {/* Hover Direction Highlight */}
            {hoverDir && (
              <div
                className={`absolute w-full h-full rounded-full transition-all duration-150`}
                style={{
                  background:
                    hoverDir === "up"
                      ? "linear-gradient(to top, rgba(128,0,0,0.1), transparent)"
                      : hoverDir === "down"
                      ? "linear-gradient(to bottom, rgba(128,0,0,0.1), transparent)"
                      : hoverDir === "left"
                      ? "linear-gradient(to left, rgba(128,0,0,0.1), transparent)"
                      : "linear-gradient(to right, rgba(128,0,0,0.1), transparent)",
                }}
              ></div>
            )}

            <div className="absolute flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-800/50">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">OK</span>
            </div>
          </div>

          {/* Channel */}
          <div className="flex flex-col gap-2 items-center">
            <button onClick={() => sendTVCommand("channel_up")} disabled={busy} className={`${btnClass} w-12 h-12`} style={{ borderColor: MAROON }}>
              🔼
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ch</div>
            <button onClick={() => sendTVCommand("channel_down")} disabled={busy} className={`${btnClass} w-12 h-12`} style={{ borderColor: MAROON }}>
              🔽
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => sendTVCommand("mute")} disabled={busy} className={`${btnClass} flex-1 py-2`} style={{ borderColor: MAROON }}>
            🔇 Mute
          </button>

          <button onClick={() => sendTVCommand("home")} disabled={busy} className={`${btnClass} flex-1 py-2`} style={{ borderColor: MAROON }}>
            🏠 Home
          </button>

          <button onClick={() => sendTVCommand("back")} disabled={busy} className={`${btnClass} flex-1 py-2`} style={{ borderColor: MAROON }}>
            ↩ Back
          </button>
        </div>

        {/* Status Toast */}
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
