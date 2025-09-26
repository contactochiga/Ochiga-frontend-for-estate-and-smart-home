"use client";

import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

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
    <div className="rounded-xl shadow-lg p-5 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white transition hover:shadow-xl cursor-pointer">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
        <h2 className="text-lg font-semibold">House {houseNumber}</h2>
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            status === "Paid"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Owner Info */}
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Owner:</span> {owner}
        </p>
        <p className="text-sm">
          <span className="font-medium">Balance:</span> ₦
          {balance.toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => window.open(`tel:${phoneNumber}`)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-800/50"
        >
          <PhoneIcon className="h-4 w-4" />
          Call
        </button>
        <button
          onClick={() => window.open(`mailto:${email}`)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
        >
          <EnvelopeIcon className="h-4 w-4" />
          Email
        </button>
        <button
          onClick={() => alert(`Edit ${houseNumber}`)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-800/50"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );
}
