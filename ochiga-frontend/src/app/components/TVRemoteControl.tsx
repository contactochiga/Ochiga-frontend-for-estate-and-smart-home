"use client";

import React, { useState, useRef } from "react";

type TVRemoteProps = {
  deviceId: string;
  onClose?: () => void;
  className?: string;
};

const MAROON = "#800000"; // thin border accent

export default function TVRemoteControl({ deviceId, onClose, className = "" }: TVRemoteProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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
      setStatus({ ok: true, text: "Command sent" });
      setTimeout(() => setStatus(null), 1800);
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Network error" });
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setBusy(false);
    }
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    if (!lastPos.current) {
      lastPos.current = { x, y };
      return;
    }

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;

    if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      if (Math.abs(dx) > Math.abs(dy)) {
        sendTVCommand(dx > 0 ? "right" : "left");
      } else {
        sendTVCommand(dy > 0 ? "down" : "up");
      }
      lastPos.current = { x, y };
    }
  };

  const handleTap = () => sendTVCommand("ok");

  const btnClass =
    "flex items-center justify-center rounded-lg border px-3 py-2 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

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
              className={`${btnClass} border-[1.5px]`}
              style={{ borderColor: MAROON, background: "transparent" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="2">
                <path d="M12 2v10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.2 6.4a9 9 0 1 0 13.6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => onClose?.()}
              className={`${btnClass} border border-gray-200`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Square trackpad zone */}
        <div className="flex justify-center mb-6">
          <div
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onClick={handleTap}
            className="rounded-lg border-[1.5px] w-48 h-48 flex items-center justify-center relative select-none"
            style={{ borderColor: MAROON, background: "transparent" }}
          >
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: "linear-gradient(145deg, rgba(128,0,0,0.05), transparent 70%)",
              }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">Touch / Tap</span>
          </div>
        </div>

        {/* Volume + Channel controls remain same */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => sendTVCommand("volume_up")}
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➕
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400">Vol</div>
            <button
              onClick={() => sendTVCommand("volume_down")}
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➖
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => sendTVCommand("channel_up")}
              className={`${btnClass} w-12 h-12`}
              style={{ borderColor: MAROON }}
            >
              ➕
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400">Ch</div>
            <button
              onClick={() => sendTVCommand("channel_down")}
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
            className={`${btnClass} flex-1 py-2`}
            style={{ borderColor: MAROON }}
          >
            🔇 Mute
          </button>

          <button
            onClick={() => sendTVCommand("home")}
            disabled={busy}
            className={`${btnClass} flex-1 py-2`}
            style={{ borderColor: MAROON }}
          >
            🏠 Home
          </button>

          <button
            onClick={() => sendTVCommand("back")}
            disabled={busy}
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
