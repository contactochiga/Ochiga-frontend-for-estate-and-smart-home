"use client";

import { MdOutlineLightbulb } from "react-icons/md";

interface DeviceCardProps {
  name: string;
  location: string;
  status: boolean; // true = On, false = Off
  icon?: React.ReactNode;
  onToggle?: () => void;
}

export default function DeviceCard({
  name,
  location,
  status,
  icon = <MdOutlineLightbulb />,
  onToggle,
}: DeviceCardProps) {
  return (
    <div
      className="rounded-2xl p-5 shadow-md 
      bg-white text-gray-900 
      dark:bg-[#1f1f1f] dark:text-gray-100 
      transition-colors duration-300 hover:shadow-xl"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Icon */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-blue-500 text-2xl">
          {icon}
        </div>

        {/* Futuristic Toggle */}
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
            status ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
              status ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
      </div>
    </div>
  );
}
