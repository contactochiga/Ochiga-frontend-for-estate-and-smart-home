"use client";

import { useState, useEffect } from "react";
import { MdPowerSettingsNew, MdAcUnit, MdAir, MdAutorenew, MdSwapVert } from "react-icons/md";

type ACControlModalProps = {
  deviceId: string;
  onClose: () => void;
};

const MAROON = "#800000";

export default function ACControlModal({ deviceId, onClose }: ACControlModalProps) {
  const [power, setPower] = useState(true);
  const [temperature, setTemperature] = useState(22);
  const [mode, setMode] = useState("cool");
  const [fanSpeed, setFanSpeed] = useState("auto");
  const [swing, setSwing] = useState(true);
  const [connected, setConnected] = useState(false);

  // WebSocket simulation (visual indicator only)
  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleCommand = (cmd: string, value?: any) => {
    // Simulate haptic + action
    if (navigator.vibrate) navigator.vibrate(30);
    console.log("AC Command:", cmd, value);
  };

  const changeTemp = (delta: number) => {
    setTemperature((t) => {
      const newTemp = Math.min(30, Math.max(16, t + delta));
      handleCommand("temperature", newTemp);
      return newTemp;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MdAcUnit className="text-cyan-400" /> AC Control
        </h3>
        <button
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Connection indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            connected ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`}
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {connected ? "Connected via WebSocket" : "Connecting..."}
        </span>
      </div>

      {/* Temperature */}
      <div className="flex flex-col items-center mb-5">
        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">
          {temperature}°C
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Set Temperature</p>
        <div className="flex gap-5 mt-3">
          <button
            onClick={() => changeTemp(-1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center text-lg text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
          >
            −
          </button>
          <button
            onClick={() => changeTemp(1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center text-lg text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
          >
            ＋
          </button>
        </div>
      </div>

      {/* Mode and Fan Speed */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => {
            const nextMode =
              mode === "cool"
                ? "heat"
                : mode === "heat"
                ? "dry"
                : mode === "dry"
                ? "fan"
                : "cool";
            setMode(nextMode);
            handleCommand("mode", nextMode);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
        >
          <MdAutorenew className="text-xl mb-1" />
          <span className="capitalize">{mode} mode</span>
        </button>

        <button
          onClick={() => {
            const nextSpeed =
              fanSpeed === "auto"
                ? "low"
                : fanSpeed === "low"
                ? "medium"
                : fanSpeed === "medium"
                ? "high"
                : "auto";
            setFanSpeed(nextSpeed);
            handleCommand("fan_speed", nextSpeed);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
        >
          <MdAir className="text-xl mb-1" />
          <span className="capitalize">{fanSpeed} fan</span>
        </button>
      </div>

      {/* Swing + Power */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => {
            setSwing((s) => !s);
            handleCommand("swing", !swing);
          }}
          className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
        >
          <MdSwapVert className="text-xl mb-1" />
          <span>{swing ? "Swing On" : "Swing Off"}</span>
        </button>

        <button
          onClick={() => {
            setPower((p) => !p);
            handleCommand("power", !power);
          }}
          className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border text-sm transition ${
            power
              ? "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
              : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
          }`}
        >
          <MdPowerSettingsNew
            className={`text-xl mb-1 ${
              power ? "text-[#800000]" : "text-gray-500 dark:text-gray-400"
            }`}
          />
          <span>{power ? "Power On" : "Power Off"}</span>
        </button>
      </div>
    </div>
  );
}
