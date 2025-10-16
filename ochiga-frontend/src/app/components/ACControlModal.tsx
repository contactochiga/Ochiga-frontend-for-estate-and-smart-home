// src/app/components/ACControlModal.tsx
"use client";

import React, { useState } from "react";

type ACControlProps = {
  deviceId: string;
  onClose?: () => void;
  className?: string;
};

const MAROON = "#800000";

export default function ACControlModal({ deviceId, onClose, className = "" }: ACControlProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; text: string }>(null);

  // UI state
  const [powerOn, setPowerOn] = useState(false);
  const [mode, setMode] = useState<"cool" | "heat" | "fan" | "auto" | "dry">("cool");
  const [swing, setSwing] = useState(false);
  const [temp, setTemp] = useState<number>(22);
  const [fan, setFan] = useState<"auto" | "low" | "medium" | "high">("auto");
  const [timer, setTimer] = useState<number | null>(null); // minutes
  const [sleepOn, setSleepOn] = useState(false);
  const [ecoOn, setEcoOn] = useState(false);

  async function sendACCommand(action: string, value?: any) {
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

      setStatus({ ok: true, text: "AC command sent" });
      setTimeout(() => setStatus(null), 1600);
      return await res.json().catch(() => ({}));
    } catch (err: any) {
      setStatus({ ok: false, text: err?.message || "Network error" });
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setBusy(false);
    }
  }

  // Small helpers that update local state and call the API
  const togglePower = async () => {
    const next = !powerOn;
    setPowerOn(next);
    await sendACCommand("power", { on: next });
  };

  const changeMode = async (m: typeof mode) => {
    setMode(m);
    await sendACCommand("mode", { mode: m });
  };

  const toggleSwing = async () => {
    const next = !swing;
    setSwing(next);
    await sendACCommand("swing", { on: next });
  };

  const adjustTemp = async (delta: number) => {
    const next = Math.min(30, Math.max(16, temp + delta));
    setTemp(next);
    await sendACCommand("set-temp", { temperature: next });
  };

  const changeFan = async (f: typeof fan) => {
    setFan(f);
    await sendACCommand("fan", { speed: f });
  };

  const setTimerMinutes = async (mins: number | null) => {
    setTimer(mins);
    await sendACCommand("timer", { minutes: mins });
  };

  const toggleSleep = async () => {
    const next = !sleepOn;
    setSleepOn(next);
    await sendACCommand("sleep", { on: next });
  };

  const toggleEco = async () => {
    const next = !ecoOn;
    setEcoOn(next);
    await sendACCommand("eco", { on: next });
  };

  // small UI helpers
  const modeList: Array<{ key: typeof mode; label: string }> = [
    { key: "cool", label: "Cool" },
    { key: "heat", label: "Heat" },
    { key: "fan", label: "Fan" },
    { key: "auto", label: "Auto" },
    { key: "dry", label: "Dry" },
  ];

  const fanOptions: Array<typeof fan> = ["auto", "low", "medium", "high"];

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AC Control</h3>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePower}
              disabled={busy}
              className="maroon-click flex items-center gap-2 px-3 py-1.5 border rounded-lg select-none transition"
              style={{ borderColor: MAROON, background: powerOn ? `${MAROON}10` : "transparent" }}
            >
              <span className={`w-2 h-2 rounded-full ${powerOn ? "bg-green-500" : "bg-gray-300"}`} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Power</span>
            </button>

            <button
              onClick={() => onClose?.()}
              className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm dark:border-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main display (taller) */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 flex flex-col gap-3">
          {/* Top row: Mode badges */}
          <div className="flex gap-2 flex-wrap">
            {modeList.map((m) => (
              <button
                key={m.key}
                onClick={() => changeMode(m.key)}
                disabled={busy}
                className={`maroon-click px-3 py-1 rounded-lg border text-sm transition select-none ${
                  mode === m.key
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 font-medium"
                    : "border-transparent bg-transparent text-gray-600 dark:text-gray-300"
                }`}
                style={{ borderColor: mode === m.key ? undefined : "transparent" }}
                title={m.label}
              >
                {m.label}
              </button>
            ))}
            {/* Swing */}
            <button
              onClick={toggleSwing}
              disabled={busy}
              className={`maroon-click ml-auto px-3 py-1 rounded-lg border text-sm transition select-none ${
                swing ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" : "border-transparent text-gray-600 dark:text-gray-300"
              }`}
              style={{ borderColor: swing ? undefined : "transparent" }}
            >
              Swing
            </button>
          </div>

          {/* Big center: Temp display and control */}
          <div className="flex items-center justify-between">
            {/* Temp controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTemp(-1)}
                disabled={busy}
                className="maroon-click px-3 py-2 rounded-lg border text-xl select-none transition"
                style={{ borderColor: MAROON }}
                title="Lower temperature"
              >
                −
              </button>

              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-500 dark:text-gray-300">Set Temp</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{temp}°C</div>
              </div>

              <button
                onClick={() => adjustTemp(1)}
                disabled={busy}
                className="maroon-click px-3 py-2 rounded-lg border text-xl select-none transition"
                style={{ borderColor: MAROON }}
                title="Increase temperature"
              >
                +
              </button>
            </div>

            {/* Fan speed (vertical stack) */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Fan</div>
              <div className="flex gap-2">
                {fanOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => changeFan(f)}
                    disabled={busy}
                    className={`maroon-click px-2 py-1 rounded-md border text-sm select-none transition ${
                      fan === f ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" : "border-transparent text-gray-600 dark:text-gray-300"
                    }`}
                    style={{ borderColor: fan === f ? undefined : "transparent" }}
                  >
                    {f === "auto" ? "Auto" : f[0].toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status / small text */}
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {powerOn ? "AC is ON" : "AC is OFF"} • Mode: {mode.toUpperCase()} • Fan: {fan.toUpperCase()}
          </div>
        </div>

        {/* Controls row (timer / sleep / eco) */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => setTimerMinutes(timer === null ? 60 : null)}
            disabled={busy}
            className={`maroon-click px-3 py-2 rounded-lg border text-sm select-none transition ${
              timer !== null ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" : "border-transparent text-gray-600 dark:text-gray-300"
            }`}
            style={{ borderColor: timer !== null ? undefined : "transparent" }}
          >
            Timer {timer ? `${timer}m` : ""}
          </button>

          <button
            onClick={toggleSleep}
            disabled={busy}
            className={`maroon-click px-3 py-2 rounded-lg border text-sm select-none transition ${
              sleepOn ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" : "border-transparent text-gray-600 dark:text-gray-300"
            }`}
            style={{ borderColor: sleepOn ? undefined : "transparent" }}
          >
            Sleep
          </button>

          <button
            onClick={toggleEco}
            disabled={busy}
            className={`maroon-click px-3 py-2 rounded-lg border text-sm select-none transition ${
              ecoOn ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" : "border-transparent text-gray-600 dark:text-gray-300"
            }`}
            style={{ borderColor: ecoOn ? undefined : "transparent" }}
          >
            ECO
          </button>
        </div>

        {/* Bottom row: Back / Apply / Close */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { onClose?.(); }}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm dark:border-gray-700"
          >
            Back
          </button>

          <button
            onClick={async () => {
              // apply current settings in one shot
              await sendACCommand("apply-settings", { powerOn, mode, swing, temp, fan, timer, sleepOn, ecoOn });
              setStatus({ ok: true, text: "Settings applied" });
              setTimeout(() => setStatus(null), 1400);
            }}
            disabled={busy}
            className="maroon-click flex-1 px-3 py-2 rounded-lg border text-sm font-semibold select-none transition"
            style={{ borderColor: MAROON, background: "transparent" }}
          >
            Apply
          </button>

          <button
            onClick={() => onClose?.()}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm dark:border-gray-700"
          >
            Close
          </button>
        </div>

        {/* Status toast */}
        <div className="mt-4 h-6">
          {status && (
            <div className={`inline-block px-3 py-1 text-sm rounded-md ${status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {status.text}
            </div>
          )}
        </div>
      </div>

      {/* small CSS to make maroon show only while clicked (active) */}
      <style jsx>{`
        .maroon-click:active {
          border-color: ${MAROON} !important;
          color: ${MAROON} !important;
          background: rgba(128, 0, 0, 0.04) !important;
        }
      `}</style>
    </div>
  );
}
