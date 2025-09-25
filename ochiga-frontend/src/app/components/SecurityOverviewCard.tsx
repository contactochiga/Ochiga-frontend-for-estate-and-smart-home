"use client";

import {
  ShieldCheckIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function SecurityOverviewCard() {
  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Security Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Guards on Duty */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <ShieldCheckIcon className="h-8 w-8 text-green-500 dark:text-green-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Guards on Duty</p>
          <h3 className="text-xl font-bold">12</h3>
        </div>

        {/* CCTV Status */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <VideoCameraIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">CCTV Active</p>
          <h3 className="text-xl font-bold">45/50</h3>
        </div>

        {/* Alerts */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Recent Alerts</p>
          <h3 className="text-xl font-bold">3</h3>
        </div>
      </div>
    </div>
  );
}
