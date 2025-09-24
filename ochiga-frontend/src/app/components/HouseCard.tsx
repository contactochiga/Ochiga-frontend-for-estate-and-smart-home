"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface HouseCardProps {
  houseNumber: string;
  owner: string;
  status: "Paid" | "Unpaid" | "Pending";
  balance: number;
  phoneNumber?: string;
  email?: string;
  electricityMeter?: string;
  waterMeter?: string;
  rentStatus?: "Paid" | "Unpaid" | "Pending";
  serviceChargeStatus?: "Paid" | "Unpaid" | "Pending";
}

export default function HouseCard({
  houseNumber,
  owner,
  status,
  balance,
  phoneNumber,
  email,
  electricityMeter,
  waterMeter,
  rentStatus,
  serviceChargeStatus,
}: HouseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-full max-w-sm">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            House {houseNumber}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Owner: {owner}
          </p>
        </div>
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
      </div>

      {/* Balance */}
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
          <p className="text-sm text-gray-500">Outstanding</p>
        </span>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          ₦{balance?.toLocaleString() ?? "0"}
        </span>
      </div>

      {/* Expand/Collapse */}
      <button
        className="mt-4 text-blue-600 flex items-center text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            Hide Details <ChevronUpIcon className="w-4 h-4 ml-1" />
          </>
        ) : (
          <>
            See More <ChevronDownIcon className="w-4 h-4 ml-1" />
          </>
        )}
      </button>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {phoneNumber ?? "—"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {email ?? "—"}
          </p>
          <p>
            <span className="font-medium">Service Charge:</span>{" "}
            {serviceChargeStatus ?? "N/A"}
          </p>
          <p>
            <span className="font-medium">Rent:</span>{" "}
            {rentStatus ?? "N/A"}
          </p>
          <p>
            <span className="font-medium">Electricity Meter:</span>{" "}
            {electricityMeter ?? "—"}
          </p>
          <p>
            <span className="font-medium">Water Meter:</span>{" "}
            {waterMeter ?? "—"}
          </p>
        </div>
      )}
    </div>
  );
}
