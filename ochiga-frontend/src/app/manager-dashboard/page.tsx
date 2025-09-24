"use client";

import { UserIcon, HomeIcon, QrCodeIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

interface HouseCardProps {
  houseId: string;
  type: string; // e.g. "3-Bedroom Duplex"
  block: string; // e.g. "Block B"
  status: "Occupied" | "Vacant";
  resident?: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  balance: number;
  lastPayment?: string;
  qrCodeUrl?: string;
}

export default function HouseCard({
  houseId,
  type,
  block,
  status,
  resident,
  balance,
  lastPayment,
  qrCodeUrl,
}: HouseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border dark:border-gray-700 hover:shadow-lg transition">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">House {houseId}</h2>
          <p className="text-sm text-gray-500">
            {type} • {block}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Occupied"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Resident Section */}
      {resident ? (
        <div className="mt-4 flex items-center space-x-3">
          {resident.avatar ? (
            <img
              src={resident.avatar}
              alt={resident.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
          ) : (
            <UserIcon className="w-12 h-12 p-2 rounded-full bg-gray-100 text-gray-600" />
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{resident.name}</p>
            <p className="text-xs text-gray-500">{resident.email}</p>
            <p className="text-xs text-gray-500">{resident.phone}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center space-x-2 text-gray-400">
          <HomeIcon className="w-6 h-6" />
          <p className="text-sm italic">No resident assigned</p>
        </div>
      )}

      {/* Financial Section */}
      <div className="mt-6 flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Outstanding Balance</p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              ₦{balance.toLocaleString()}
            </p>
          </div>
        </div>
        {lastPayment && (
          <p className="text-xs text-gray-500">Last paid: {lastPayment}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end space-x-3">
        {qrCodeUrl && (
          <a
            href={qrCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
          >
            <QrCodeIcon className="w-5 h-5 mr-1" />
            QR Code
          </a>
        )}
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
}
