"use client";

import { useState } from "react";

export default function EstatePanel() {
  const [expanded, setExpanded] = useState(false);

  const estateSummary = {
    totalUnits: 48,
    occupiedUnits: 43,
    activeAlerts: 1,
    pendingTickets: 3,
  };

  const residents = [
    { name: "Ochiga", unit: "B-12", status: "Active" },
    { name: "Chioma", unit: "C-03", status: "Active" },
    { name: "Michael", unit: "A-08", status: "Away" },
  ];

  const services = [
    { name: "Security Patrol", status: "On Duty" },
    { name: "Water Supply", status: "Stable" },
    { name: "Power Backup", status: "Generator On" },
    { name: "Internet Uptime", status: "98%" },
  ];

  const facilities = [
    { name: "Clubhouse", status: "Open" },
    { name: "Gym", status: "Closed" },
    { name: "Pool", status: "Open" },
  ];

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-indigo-300 font-semibold">🏘️ Estate Overview</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-gray-400 hover:text-gray-200 transition"
        >
          {expanded ? "Hide" : "View Details"}
        </button>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-2 mt-2 text-gray-300">
        <div>Units</div>
        <div className="font-semibold">{estateSummary.totalUnits}</div>
        <div>Occupied</div>
        <div className="font-semibold text-emerald-400">
          {estateSummary.occupiedUnits}
        </div>
        <div>Active Alerts</div>
        <div className="font-semibold text-red-400">
          {estateSummary.activeAlerts}
        </div>
        <div>Pending Tickets</div>
        <div className="font-semibold text-yellow-400">
          {estateSummary.pendingTickets}
        </div>
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-3 space-y-3">
          {/* Residents */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-indigo-400 font-medium mb-1 text-[11px]">👥 Residents</p>
            <div className="space-y-1">
              {residents.map((r, i) => (
                <div key={i} className="flex justify-between text-gray-300 text-[11px]">
                  <span>{r.name}</span>
                  <span
                    className={`${
                      r.status === "Active" ? "text-emerald-400" : "text-gray-500"
                    }`}
                  >
                    {r.unit} ({r.status})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-indigo-400 font-medium mb-1 text-[11px]">⚙️ Estate Services</p>
            <div className="space-y-1">
              {services.map((s, i) => (
                <div key={i} className="flex justify-between text-gray-300 text-[11px]">
                  <span>{s.name}</span>
                  <span className="text-gray-400">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
            <p className="text-indigo-400 font-medium mb-1 text-[11px]">🏢 Facilities</p>
            <div className="space-y-1">
              {facilities.map((f, i) => (
                <div key={i} className="flex justify-between text-gray-300 text-[11px]">
                  <span>{f.name}</span>
                  <span
                    className={`${
                      f.status === "Open" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
