"use client";

import React from "react";
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function PaymentsOverviewCard() {
  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Payments Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Collected */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <BanknotesIcon className="h-8 w-8 text-green-500 dark:text-green-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total Collected
          </p>
          <h3 className="text-xl font-bold">₦2,450,000</h3>
        </div>

        {/* Token Sales */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Token Sales
          </p>
          <h3 className="text-xl font-bold">₦1,280,000</h3>
        </div>

        {/* Outstanding */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 flex flex-col items-start">
          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Outstanding
          </p>
          <h3 className="text-xl font-bold">₦520,000</h3>
        </div>
      </div>
    </div>
  );
}
