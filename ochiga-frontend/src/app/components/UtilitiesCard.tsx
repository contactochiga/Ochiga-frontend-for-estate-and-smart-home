"use client";

import { BoltIcon, WifiIcon, FireIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function UtilitiesCard() {
  const utilities = [
    { name: "Electricity", icon: BoltIcon, color: "text-yellow-400" },
    { name: "Internet", icon: WifiIcon, color: "text-blue-400" },
    { name: "Water", icon: FireIcon, color: "text-red-400" },
    { name: "More", icon: EllipsisHorizontalIcon, color: "text-gray-400" },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 shadow-md">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Utilities</h2>
      <div className="grid grid-cols-4 gap-3">
        {utilities.map((util) => {
          const Icon = util.icon;
          return (
            <button
              key={util.name}
              className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl py-4 hover:shadow-lg transition"
            >
              <Icon className={`h-6 w-6 ${util.color}`} />
              <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">
                {util.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
