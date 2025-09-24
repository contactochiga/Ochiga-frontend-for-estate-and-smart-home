"use client";

import { useState } from "react";
import { PencilIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface HouseCardProps {
  houseNumber: string;
  owner: string;
  status: "Paid" | "Unpaid" | "Pending";
  balance: number;
  phoneNumber: string;
  email: string;
  rentStatus: "Paid" | "Unpaid" | "Pending";
  serviceChargeStatus: "Paid" | "Unpaid" | "Pending";
  electricityMeter: string;
  waterMeter: string;
}

export default function HouseCard({
  houseNumber,
  owner,
  status,
  balance,
  phoneNumber,
  email,
  rentStatus,
  serviceChargeStatus,
  electricityMeter,
  waterMeter,
}: HouseCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      {/* Edit button top-right */}
      <button
        className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
        aria-label="Edit"
      >
        <PencilIcon className="h-4 w-4 text-gray-600" />
      </button>

      {/* Title + status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">House {houseNumber}</h2>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-500 text-sm">Owner: {owner}</p>

      {/* Balance */}
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-600">
          💰 Outstanding
        </span>
        <span className="font-semibold">₦{balance.toLocaleString()}</span>
      </div>

      {/* Toggle details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-blue-600 text-sm mt-2"
      >
        {showDetails ? "Hide Details ▲" : "Show Details ▼"}
      </button>

      {/* Expanded details */}
      {showDetails && (
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          <p>
            Phone: <a href={`tel:${phoneNumber}`} className="text-blue-600">{phoneNumber}</a>
          </p>
          <p>
            Email: <a href={`mailto:${email}`} className="text-blue-600">{email}</a>
          </p>
          <p>Service Charge: {serviceChargeStatus}</p>
          <p>Rent: {rentStatus}</p>
          <p>Electricity Meter: {electricityMeter}</p>
          <p>Water Meter: {waterMeter}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
        >
          <PhoneIcon className="h-4 w-4" /> Call
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
        >
          <EnvelopeIcon className="h-4 w-4" /> Email
        </a>
      </div>
    </div>
  );
}
