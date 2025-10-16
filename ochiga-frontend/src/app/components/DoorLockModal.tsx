"use client";

import { useEffect, useState } from "react";
import { MdLock, MdLockOpen, MdVideocam } from "react-icons/md";

type DoorLockModalProps = {
  deviceId: string;
  onClose?: () => void;
};

export default function DoorLockModal({ deviceId, onClose }: DoorLockModalProps) {
  const [locked, setLocked] = useState(true);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [animating, setAnimating] = useState(false);

  // Simulate WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("wss://example.com/doorlock");
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.deviceId === deviceId && data.status)
          setLocked(data.status === "locked");
      } catch {}
    };
    setSocket(ws);
    return () => ws.close();
  }, [deviceId]);

  const sendCommand = (action: "lock" | "unlock") => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    socket.send(JSON.stringify({ deviceId, action }));
    setLocked(action === "lock");
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 relative transition-all">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
      >
        ✕
      </button>

      {/* Camera Preview */}
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto flex items-center justify-center mb-5 relative overflow-hidden">
        <MdVideocam className="text-gray-500 text-3xl" />
        {connected && (
          <span className="absolute inset-0 rounded-full border-2 border-[#800000]/40 animate-pulse"></span>
        )}
      </div>

      {/* Lock Status */}
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <div
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500
            ${locked ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}
            ${animating ? "scale-105" : "scale-100"}
          `}
        >
          {locked ? (
            <MdLock className="text-4xl text-gray-700 dark:text-gray-200" />
          ) : (
            <MdLockOpen className="text-4xl text-gray-700 dark:text-gray-200" />
          )}
          {connected && (
            <span className="absolute w-28 h-28 border border-[#800000]/40 rounded-full animate-ping opacity-30"></span>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {locked ? "Door is locked" : "Door is unlocked"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => sendCommand("unlock")}
          className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 
            ${
              !locked
                ? "bg-[#800000] text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          Unlock
        </button>
        <button
          onClick={() => sendCommand("lock")}
          className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 
            ${
              locked
                ? "bg-[#800000] text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          Lock
        </button>
      </div>

      {/* Connection Status */}
      <div className="text-center mt-5 text-xs text-gray-500 dark:text-gray-400">
        {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>
    </div>
  );
}
