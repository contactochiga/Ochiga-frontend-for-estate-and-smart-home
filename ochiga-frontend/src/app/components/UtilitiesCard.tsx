"use client";

import { BoltIcon, WifiIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FaTint } from "react-icons/fa"; // Water droplet icon

export default function UtilitiesCard() {
  const utilities = [
    { name: "Electricity", icon: BoltIcon, color: "text-yellow-400" },
    { name: "Internet", icon: WifiIcon, color: "text-blue-400" },
    { name: "Water", icon: FaTint, color: "text-cyan-400" },
    { name: "More", icon: EllipsisHorizontalIcon, color: "text-gray-400" },
  ];

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      {/* Outer Card */}
      <div
        className="rounded-2xl p-6 shadow-xl 
                   bg-gradient-to-r from-slate-100 to-gray-200 
                   dark:from-gray-800 dark:to-gray-900"
      >
        {/* Header */}
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-5">
          Utilities
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4">
          {utilities.map((util) => {
            const Icon = util.icon;
            return (
              <button
                key={util.name}
                className="flex flex-col items-center justify-center 
                           bg-white dark:bg-gray-800 rounded-xl 
                           shadow hover:shadow-lg hover:scale-[1.05] 
                           transition-transform duration-200
                           aspect-square"
              >
                <Icon className={`h-7 w-7 ${util.color}`} />
                <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">
                  {util.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
