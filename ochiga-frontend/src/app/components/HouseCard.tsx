"use client";

import React from "react";

interface HouseCardProps {
  houseNumber: string;
  owner: string;
  status: "Paid" | "Unpaid" | "Pending";
  balance: number;
}

export default function HouseCard({
  houseNumber,
  owner,
  status,
  balance,
}: HouseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        House {houseNumber}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">Owner: {owner}</p>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Paid"
              ? "bg-green-100 text-green-700"
              : status === "Unpaid"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          ₦{balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
