// src/app/manager-dashboard/components/EstateStatsCard.tsx
"use client";

import { UsersIcon, BellAlertIcon, WrenchScrewdriverIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function EstateStatsCard() {
  const stats = [
    {
      label: "Active Residents",
      value: "126 / 150",
      icon: <UsersIcon className="h-6 w-6 text-white" />,
    },
    {
      label: "Pending Requests",
      value: "6",
      icon: <WrenchScrewdriverIcon className="h-6 w-6 text-white" />,
    },
    {
      label: "Security Alerts",
      value: "0",
      icon: <BellAlertIcon className="h-6 w-6 text-white" />,
    },
    {
      label: "Wallet Balance",
      value: "₦2.3M",
      icon: <BanknotesIcon className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-[#800000] to-black shadow-md">
      <h2 className="text-white text-lg font-semibold mb-4">Estate Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3"
          >
            <div className="p-2 bg-white/20 rounded-lg">{stat.icon}</div>
            <div>
              <p className="text-white font-bold text-base">{stat.value}</p>
              <p className="text-gray-200 text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
