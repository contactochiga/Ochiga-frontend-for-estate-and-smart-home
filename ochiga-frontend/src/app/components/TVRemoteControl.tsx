"use client";

import React, { useState, useRef } from "react";

type TVRemoteProps = {
  deviceId: string;
  onClose?: () => void;
  className?: string;
};

const MAROON = "#800000";

export default function TVRemoteControl({
  deviceId,
  onClose,
  className = "",
}: TVRemoteProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  async function sendTVCommand(action: string, value?: any) {
    if (busy) return;
    setBusy(true);
    setStatus(null);

    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = `${BASE.replace(/\/$/, "")}/iot/devices/${encodeURIComponent(
      deviceId
    )}/control`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, value }),
        credentials: "include",
      });

      if (!res.ok) throw new Error(await res.text());
      setStatus({ ok: true, text: "Command sent" });
      setTimeout(() => setStatus(null), 1500);
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Network error" });
      setTimeout(() => setStatus(null), 2500);
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

  const btnBase =
    "flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 shadow-sm active:shadow-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition select-none disabled:opacity-50";

  const iconBtn = `${btnBase} w-10 h-10 active:border-[1.5px] active:border-[${MAROON}] active:text-[${MAROON}]`;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">TV Remote</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => sendTVCommand("power")}
              disabled={busy}
              className={iconBtn}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2v10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M5.2 6.4a9 9 0 1 0 13.6 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button onClick={() => onClose?.()} className={iconBtn}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trackpad */}
        <div className="flex justify-center mb-6">
          <div
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onClick={handleTap}
            className="w-48 h-48 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 flex items-center justify-center relative select-none active:border-[1.5px] active:border-[${MAROON}] transition"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">Touch / Tap</span>
          </div>
        </div>

        {/* Volume & Channel */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => sendTVCommand("volume_up")}
              className={iconBtn}
            >
              <span className="text-lg font-semibold">+</span>
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400">Volume</div>
            <button
              onClick={() => sendTVCommand("volume_down")}
              className={iconBtn}
            >
              <span className="text-lg font-semibold">−</span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => sendTVCommand("channel_up")}
              className={iconBtn}
            >
              <span className="text-lg font-semibold">+</span>
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400">Channel</div>
            <button
              onClick={() => sendTVCommand("channel_down")}
              className={iconBtn}
            >
              <span className="text-lg font-semibold">−</span>
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => sendTVCommand("mute")}
            disabled={busy}
            className={`${iconBtn} flex-1`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 9v6h4l5 5V4l-5 5H9z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => sendTVCommand("home")}
            disabled={busy}
            className={`${iconBtn} flex-1`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
          </button>

          <button
            onClick={() => sendTVCommand("back")}
            disabled={busy}
            className={`${iconBtn} flex-1`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className="mt-4 text-center">
            <div
              className={`inline-block px-3 py-1 text-sm rounded-md ${
                status.ok
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {status.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
