"use client";

import { useState } from "react";

export default function HomePanel() {
  const [expanded, setExpanded] = useState(false);

  const rooms = [
    { name: "Living Room", devices: 5, status: "Active" },
    { name: "Bedroom", devices: 3, status: "Active" },
    { name: "Kitchen", devices: 4, status: "Idle" },
  ];

  const estateServices = [
    { name: "Security Patrol", status: "On Duty" },
    { name: "Water Supply", status: "Stable" },
    { name: "Power Backup", status: "Generator On" },
  ];

  const user = { name: "Ochiga Resident", estate: "Pearl View Estate", unit: "B-12" };

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-emerald-300 font-semibold">🏠 Home Overview</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-gray-400 hover:text-gray-200 transition"
        >
          {expanded ? "Hide" : "View Details"}
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-full text-white">
          Doors
        </button>
        <button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-full text-white">
          Lights
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-gray-300">
          Scenes
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-3 space-y-3">
          {/* User Info */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-emerald-400 font-medium mb-1 text-[11px]">👤 Resident</p>
            <p className="text-gray-300 text-[11px]">
              {user.name} — {user.unit}
            </p>
            <p className="text-gray-400 text-[11px]">{user.estate}</p>
          </div>

          {/* Rooms Section */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-emerald-400 font-medium mb-1 text-[11px]">🏘️ Rooms</p>
            <div className="space-y-1">
              {rooms.map((r, i) => (
                <div key={i} className="flex justify-between text-gray-300 text-[11px]">
                  <span>{r.name}</span>
                  <span
                    className={`${
                      r.status === "Active" ? "text-emerald-400" : "text-gray-500"
                    }`}
                  >
                    {r.devices} devices ({r.status})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Estate Services */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-emerald-400 font-medium mb-1 text-[11px]">🏢 Estate Services</p>
            <div className="space-y-1">
              {estateServices.map((s, i) => (
                <div key={i} className="flex justify-between text-gray-300 text-[11px]">
                  <span>{s.name}</span>
                  <span className="text-gray-400">{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
