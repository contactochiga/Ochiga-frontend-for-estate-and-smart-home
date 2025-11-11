"use client";

import { useState } from "react";

export default function LightControl() {
  const [active, setActive] = useState<"on" | "off" | "dim" | null>(null);
  const [dimLevel, setDimLevel] = useState(50);

  const handleToggle = (mode: "on" | "off" | "dim") => {
    setActive(mode);
  };

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>

      {/* Buttons */}
      <div className="flex items-center gap-2">
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

        <div className="relative">
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

          {/* Dimmer slider (appears only when active) */}
          {active === "dim" && (
            <div className="absolute top-9 left-0 bg-gray-800 border border-gray-700 rounded-lg p-2 w-36 shadow-lg animate-fadeIn">
              <input
                type="range"
                min={0}
                max={100}
                value={dimLevel}
                onChange={(e) => setDimLevel(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <p className="text-gray-400 text-[10px] mt-1 text-right">
                {dimLevel}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
