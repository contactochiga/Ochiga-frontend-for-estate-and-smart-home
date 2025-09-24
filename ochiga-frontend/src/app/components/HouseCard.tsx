"use client";

import React from "react";

interface HouseCardProps {
  houseNumber: string;
  owner: string;
  status: string;
  balance: number;
  phoneNumber: string;
  email: string;
}

export default function HouseCard({
  houseNumber,
  owner,
  status,
  balance,
  phoneNumber,
  email,
}: HouseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer">
      {/* House Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          House {houseNumber}
        </h2>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Owner + Balance */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        Owner: {owner}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Balance: ₦{balance.toLocaleString()}
      </p>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => window.open(`tel:${phoneNumber}`)}
          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
        >
          📞 Call
        </button>
        <button
          onClick={() => window.open(`mailto:${email}`)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
        >
          ✉️ Email
        </button>
        <button
          onClick={() => alert(`Edit ${houseNumber}`)}
          className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
}
