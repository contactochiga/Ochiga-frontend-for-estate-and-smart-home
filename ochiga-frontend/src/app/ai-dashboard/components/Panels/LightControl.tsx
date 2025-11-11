"use client";

import { useState } from "react";

export default function LightControl() {
  const [active, setActive] = useState<"on" | "off" | "dim" | null>(null);
  const [dimLevel, setDimLevel] = useState(50);

  const handleToggle = (mode: "on" | "off" | "dim") => {
    // If clicking Dim again, toggle it off
    if (active === mode && mode === "dim") {
      setActive(null);
      return;
    }
    setActive(mode);
  };

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>

      {/* Toggle Buttons */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => handleToggle("on")}
          className={`px-3 py-1 rounded-full transition ${
            active === "on"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          On
        </button>

        <button
          onClick={() => handleToggle("off")}
          className={`px-3 py-1 rounded-full transition ${
            active === "off"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          Off
        </button>

        <button
          onClick={() => handleToggle("dim")}
          className={`px-3 py-1 rounded-full transition ${
            active === "dim"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          Dim
        </button>
      </div>

      {/* Embedded Dimmer Slider */}
      {active === "dim" && (
        <div className="mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300">
          <input
            type="range"
            min={0}
            max={100}
            value={dimLevel}
            onChange={(e) => setDimLevel(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <p className="text-gray-400 text-[10px] mt-1 text-right">
            {dimLevel}% brightness
          </p>
        </div>
      )}
    </div>
  );
}
