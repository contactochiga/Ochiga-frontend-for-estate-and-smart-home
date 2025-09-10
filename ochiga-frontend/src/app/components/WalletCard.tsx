"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function WalletCardModern() {
  const [walletBalance] = useState(500000);
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-2xl p-5 text-white shadow-xl flex justify-between items-center">
      <div>
        <p className="text-xs uppercase opacity-80">Wallet Balance</p>
        <h2 className="text-3xl font-bold tracking-wide mt-1">
          {showBalance ? `₦${walletBalance.toLocaleString()}` : "••••••"}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Toggle Balance */}
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
        >
          {showBalance ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </button>

        {/* Fund Wallet */}
        <button className="bg-white text-indigo-600 dark:text-indigo-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-1 shadow hover:bg-gray-100 transition">
          <BanknotesIcon className="h-5 w-5" />
          Fund Wallet
        </button>
      </div>
    </div>
  );
}
