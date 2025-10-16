"use client";

import React, { useState, useEffect } from "react";

const MAROON = "#800000";

type Props = {
  deviceId: string;
  isLocked: boolean;
  onLockChange: (val: boolean) => void;
  onClose: () => void;
};

export default function DoorLockModal({ deviceId, isLocked, onLockChange, onClose }: Props) {
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [lockState, setLockState] = useState(isLocked);

  async function toggleLock(lock: boolean) {
    if (busy) return;
    setBusy(true);

    if ("vibrate" in navigator) navigator.vibrate(25);

    try {
      const res = await fetch(`/api/devices/${deviceId}/lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: lock ? "lock" : "unlock" }),
      });
      if (!res.ok) throw new Error(await res.text());
      onLockChange(lock);
      setLockState(lock);
      setStatusMsg(lock ? "Door locked" : "Door unlocked");
    } catch {
      setStatusMsg("Connection error");
    } finally {
      setBusy(false);
      setTimeout(() => setStatusMsg(""), 2500);
    }
  }

  useEffect(() => {
    const ws = new WebSocket(`wss://ochiga-devices.example/ws/${deviceId}`);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data?.status) {
        const lock = data.status === "locked";
        setLockState(lock);
        onLockChange(lock);
      }
    };
    return () => ws.close();
  }, [deviceId, onLockChange]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 animate-slideUp">
        {/* Header / State bar */}
        <div
          className={`rounded-t-3xl py-3 text-center font-semibold text-sm tracking-wide ${
            lockState
              ? "bg-gradient-to-r from-green-600 to-green-800 text-white"
              : "bg-gradient-to-r from-[#800000] to-black text-white"
          }`}
        >
          {lockState ? "🔒 Locked" : "🔓 Unlocked"}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center gap-5">
          <div className="relative">
            <div
              className={`absolute inset-0 blur-xl transition-all ${
                lockState
                  ? "bg-green-500/10"
                  : "bg-[#800000]/20 animate-pulse-slow"
              }`}
            ></div>
            <svg
              className={`w-20 h-20 relative z-10 transition-transform ${
                lockState
                  ? "text-green-600 scale-100"
                  : "text-[#800000] scale-105"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 11V7a5 5 0 0 1 10 0v4m-1 10H8a2 2 0 0 1-2-2v-6h12v6a2 2 0 0 1-2 2z"
              />
            </svg>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => toggleLock(true)}
              disabled={busy}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all border ${
                lockState
                  ? "bg-green-600 text-white border-green-700"
                  : "border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              🔒 Lock
            </button>
            <button
              onClick={() => toggleLock(false)}
              disabled={busy}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all border ${
                !lockState
                  ? "bg-gradient-to-r from-[#800000] to-black text-white border-none shadow-md"
                  : "border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              🔓 Unlock
            </button>
          </div>

          {/* Status message */}
          {statusMsg && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {statusMsg}
            </p>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="mt-5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}
