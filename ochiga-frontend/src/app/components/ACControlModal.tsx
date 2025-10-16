"use client";
import { useState, useEffect } from "react";

export default function ACControlModal({ isOpen, onClose }) {
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState("cool");
  const [power, setPower] = useState(false);
  const [fanSpeed, setFanSpeed] = useState("medium");
  const [wsStatus, setWsStatus] = useState("disconnected");

  useEffect(() => {
    const ws = new WebSocket("wss://ochiga-smart-ws.example.com");
    ws.onopen = () => setWsStatus("connected");
    ws.onclose = () => setWsStatus("disconnected");
    ws.onerror = () => setWsStatus("error");
    ws.onmessage = (msg) => console.log("AC Update:", msg.data);

    return () => ws.close();
  }, []);

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const togglePower = () => {
    setPower(!power);
    vibrate();
  };

  const increaseTemp = () => {
    setTemperature((prev) => Math.min(prev + 1, 30));
    vibrate();
  };

  const decreaseTemp = () => {
    setTemperature((prev) => Math.max(prev - 1, 16));
    vibrate();
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    vibrate();
  };

  const changeFanSpeed = (speed) => {
    setFanSpeed(speed);
    vibrate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-[90%] max-w-md p-6 border border-gray-300 dark:border-gray-700 shadow-xl flex flex-col items-center space-y-5 h-[80vh] justify-between relative">

        {/* WebSocket Indicator */}
        <div className="absolute top-3 right-4 flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              wsStatus === "connected"
                ? "bg-green-500"
                : wsStatus === "error"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {wsStatus}
          </span>
        </div>

        {/* Power */}
        <button
          onClick={togglePower}
          className={`px-6 py-2 rounded-md border border-[#800000] text-[#800000] text-sm font-medium transition-all ${
            power ? "bg-[#800000]/10" : "bg-transparent"
          }`}
        >
          {power ? "Turn Off" : "Turn On"}
        </button>

        {/* Temperature Display */}
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-gray-900 dark:text-gray-50">
            {temperature}°
          </div>
          <div className="flex mt-3 space-x-5">
            <button
              onClick={decreaseTemp}
              className="px-5 py-3 border border-[#800000] rounded-md text-[#800000] font-semibold text-lg"
            >
              –
            </button>
            <button
              onClick={increaseTemp}
              className="px-5 py-3 border border-[#800000] rounded-md text-[#800000] font-semibold text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Mode Control */}
        <div className="flex space-x-3">
          {["cool", "heat", "fan", "auto"].map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-3 py-2 text-sm rounded-md border ${
                mode === m
                  ? "border-[#800000] text-[#800000]"
                  : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Fan Speed */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Fan Speed
          </span>
          <div className="flex space-x-3">
            {["low", "medium", "high"].map((s) => (
              <button
                key={s}
                onClick={() => changeFanSpeed(s)}
                className={`px-4 py-2 rounded-md border text-sm ${
                  fanSpeed === s
                    ? "border-[#800000] text-[#800000]"
                    : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-md border border-[#800000] text-[#800000] font-medium text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
