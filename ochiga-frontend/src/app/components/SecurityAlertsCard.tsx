"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function SecurityAlertsCard() {
  const alerts = [
    { id: 1, type: "Gate breach attempt", level: "Critical" },
    { id: 2, type: "Unauthorized parking", level: "Moderate" },
  ];

  return (
    <div className="rounded-2xl p-5 shadow-md bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
        <span>Security Alerts</span>
      </h2>

      {alerts.length > 0 ? (
        <ul className="space-y-3">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex justify-between items-center bg-gray-50 dark:bg-black/40 hover:bg-gray-100 dark:hover:bg-white/10 p-3 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              <span className="text-sm">{alert.type}</span>
              <span
                className={`text-xs font-bold ${
                  alert.level === "Critical"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {alert.level}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No active alerts 🎉
        </p>
      )}
    </div>
  );
}
