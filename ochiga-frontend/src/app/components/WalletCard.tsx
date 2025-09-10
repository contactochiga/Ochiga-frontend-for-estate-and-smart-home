"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function WalletCardModern() {
  const [walletBalance] = useState(500000);
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      <div
        className="rounded-2xl p-6 text-white shadow-xl 
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   dark:from-indigo-700 dark:to-purple-800 
                   flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        {/* Left Section: Balance + Eye */}
        <div>
          <p className="text-xs uppercase opacity-80">Wallet Balance</p>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-3xl font-bold tracking-wide">
              {showBalance ? `₦${walletBalance.toLocaleString()}` : "••••••"}
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition flex items-center justify-center"
            >
              {showBalance ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Right Section: Fund Wallet */}
        <div className="flex items-center">
          <button
            className="bg-white text-indigo-600 dark:text-indigo-700 
                       px-4 py-2 rounded-lg font-semibold flex items-center gap-1 
                       shadow hover:bg-gray-100 transition"
          >
            <BanknotesIcon className="h-5 w-5" />
            Fund Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
