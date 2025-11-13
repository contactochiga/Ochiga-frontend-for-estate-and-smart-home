"use client";

import { useState } from "react";

export default function RoomPanel() {
  const [expanded, setExpanded] = useState(false);

  const rooms = [
    {
      name: "Living Room",
      temp: "26°C",
      humidity: "48%",
      motion: "Active",
      lightLevel: "Bright",
      devices: ["TV", "Light", "AC"],
    },
    {
      name: "Bedroom",
      temp: "24°C",
      humidity: "52%",
      motion: "Idle",
      lightLevel: "Dim",
      devices: ["Light", "Fan"],
    },
    {
      name: "Kitchen",
      temp: "28°C",
      humidity: "45%",
      motion: "Active",
      lightLevel: "Medium",
      devices: ["Light", "Extractor"],
    },
  ];

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sky-300 font-semibold">🚪 Room Monitoring</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-gray-400 hover:text-gray-200 transition"
        >
          {expanded ? "Hide" : "View Details"}
        </button>
      </div>

      {/* Quick Summary */}
      <div className="mt-2 text-sm text-gray-300">
        Living Room — Temp: 26°C • Humidity: 48%
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-3 space-y-3">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-2"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sky-400 text-[12px]">
                  {room.name}
                </p>
                <span
                  className={`text-[11px] ${
                    room.motion === "Active" ? "text-emerald-400" : "text-gray-500"
                  }`}
                >
                  {room.motion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-300">
                <div>Temp</div>
                <div className="text-gray-200 font-semibold">{room.temp}</div>
                <div>Humidity</div>
                <div className="text-gray-200 font-semibold">{room.humidity}</div>
                <div>Light</div>
                <div className="text-gray-200 font-semibold">{room.lightLevel}</div>
              </div>

              <div className="mt-2 text-[11px] text-gray-400">
                Devices:{" "}
                <span className="text-gray-200">
                  {room.devices.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
