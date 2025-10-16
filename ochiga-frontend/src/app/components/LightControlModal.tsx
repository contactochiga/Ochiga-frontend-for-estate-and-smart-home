"use client";

import { useState, useEffect } from "react";
import {
  MdLightbulbOutline,
  MdPowerSettingsNew,
  MdWbSunny,
  MdNightlight,
  MdAutoAwesome,
} from "react-icons/md";

type LightControlModalProps = {
  deviceId: string;
  onClose: () => void;
};

const MAROON = "#800000";

export default function LightControlModal({ deviceId, onClose }: LightControlModalProps) {
  const [power, setPower] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [colorTemp, setColorTemp] = useState(3500);
  const [connected, setConnected] = useState(false);

  // Simulate WebSocket visual connection
  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleCommand = (cmd: string, value?: any) => {
    console.log("Light Command:", cmd, value);
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const changeBrightness = (delta: number) => {
    setBrightness((b) => {
      const newB = Math.min(100, Math.max(0, b + delta));
      handleCommand("brightness", newB);
      return newB;
    });
  };

  const changeColorTemp = (delta: number) => {
    setColorTemp((c) => {
      const newC = Math.min(6500, Math.max(2500, c + delta * 250));
      handleCommand("color_temp", newC);
      return newC;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MdLightbulbOutline className="text-yellow-400" /> Light Control
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

      {/* Power toggle */}
      <div className="flex items-center justify-center mb-5">
        <button
          onClick={() => {
            setPower((p) => !p);
            handleCommand("power", !power);
          }}
          className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center active:border-[1.5px] active:border-[#800000]"
        >
          <MdPowerSettingsNew
            className={`text-2xl ${
              power ? "text-[#800000]" : "text-gray-500 dark:text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Brightness control */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Brightness</span>
          <span>{brightness}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={brightness}
          onChange={(e) => {
            const val = Number(e.target.value);
            setBrightness(val);
            handleCommand("brightness", val);
          }}
          className="w-full accent-[#800000] cursor-pointer"
        />
      </div>

      {/* Color temperature */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Color Temperature</span>
          <span>{colorTemp}K</span>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => changeColorTemp(-1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center active:border-[1.5px] active:border-[#800000]"
          >
            <MdNightlight />
          </button>
          <button
            onClick={() => changeColorTemp(1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center active:border-[1.5px] active:border-[#800000]"
          >
            <MdWbSunny />
          </button>
        </div>
      </div>

      {/* Quick Scenes */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Relax", icon: "💤" },
          { name: "Focus", icon: "💡" },
          { name: "Movie", icon: "🎬" },
        ].map((scene) => (
          <button
            key={scene.name}
            onClick={() => handleCommand("scene", scene.name.toLowerCase())}
            className="flex flex-col items-center justify-center py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 active:border-[1.5px] active:border-[#800000]"
          >
            <span className="text-lg mb-1">{scene.icon}</span>
            {scene.name}
          </button>
        ))}
      </div>
    </div>
  );
}
