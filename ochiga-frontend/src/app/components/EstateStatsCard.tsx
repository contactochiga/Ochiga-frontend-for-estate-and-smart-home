// src/app/manager-dashboard/components/EstateStatsCard.tsx
"use client";

import {
  UsersIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function EstateStatsCard() {
  const stats = [
    {
      label: "Active Residents",
      value: "126 / 150",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      label: "Pending Requests",
      value: "6",
      icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    },
    {
      label: "Security Alerts",
      value: "0",
      icon: <BellAlertIcon className="h-6 w-6" />,
    },
    {
      label: "Wallet Balance",
      value: "₦2.3M",
      icon: <BanknotesIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Estate Overview</h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
          >
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              {stat.icon}
            </div>
            <div>
              <p className="font-bold text-base">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
