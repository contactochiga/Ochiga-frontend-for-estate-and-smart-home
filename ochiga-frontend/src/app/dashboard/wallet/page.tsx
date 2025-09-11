"use client";

import { EyeIcon, EyeSlashIcon, BoltIcon, WifiIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { FaTint } from "react-icons/fa"; // water droplet
import { useState } from "react";

export default function WalletCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Wallet */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        {/* Balance */}
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Wallet Balance</span>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <EyeIcon className="h-5 w-5 text-white/80" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-white/80" />
            )}
          </button>
        </div>
        <h2 className="text-3xl font-bold mt-2">
          {showBalance ? "₦500,000" : "•••••••"}
        </h2>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <button className="text-sm underline opacity-90">Transaction history</button>
          <button className="px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow-md hover:shadow-lg transition">
            + Fund Wallet
          </button>
        </div>
      </div>

      {/* Utilities */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Utilities
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow hover:shadow-md transition">
            <BoltIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-xs mt-1">Electricity</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow hover:shadow-md transition">
            <WifiIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xs mt-1">Internet</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow hover:shadow-md transition">
            <FaTint className="h-6 w-6 text-cyan-500" />
            <span className="text-xs mt-1">Water</span>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow hover:shadow-md transition">
            <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
