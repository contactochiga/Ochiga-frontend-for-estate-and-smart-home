"use client";

import {
  UsersIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

export default function EstateStatsCard() {
  const stats = [
    {
      label: "Active Residents",
      value: "126 / 150",
      icon: UsersIcon,
      color: "bg-green-600",
    },
    {
      label: "Pending Requests",
      value: "6",
      icon: WrenchScrewdriverIcon,
      color: "bg-yellow-600",
    },
    {
      label: "Security Alerts",
      value: "0",
      icon: BellAlertIcon,
      color: "bg-red-600",
    },
    {
      label: "Visitor Approvals",
      value: "15",
      icon: IdentificationIcon,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="rounded-2xl p-5 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Estate Overview</h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 bg-gray-50 dark:bg-black/40 rounded-xl p-3"
          >
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-base">{stat.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
