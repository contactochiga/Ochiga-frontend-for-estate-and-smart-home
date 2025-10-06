"use client";

import { useState } from "react";
import {
  BoltIcon,
  WifiIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaTint } from "react-icons/fa";

export default function UtilitiesCard() {
  const [activeUtility, setActiveUtility] = useState<string | null>(null);

  const utilities = [
    { name: "Electricity", icon: BoltIcon, color: "text-yellow-500" },
    { name: "Internet", icon: WifiIcon, color: "text-blue-500" },
    { name: "Water", icon: FaTint, color: "text-cyan-500" },
    { name: "More", icon: EllipsisHorizontalIcon, color: "text-gray-400" },
  ];

  const getFormFields = (utility: string) => {
    switch (utility) {
      case "Electricity":
        return [
          { type: "text", placeholder: "Meter Number" },
          { type: "number", placeholder: "Amount (₦)" },
        ];
      case "Internet":
        return [
          { type: "text", placeholder: "Account ID" },
          { type: "number", placeholder: "Amount (₦)" },
        ];
      case "Water":
        return [
          { type: "text", placeholder: "Customer ID" },
          { type: "number", placeholder: "Amount (₦)" },
        ];
      case "More":
        return [
          { type: "text", placeholder: "Service Reference" },
          { type: "number", placeholder: "Amount (₦)" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Utilities Outer Card */}
      <div className="w-full animate-slideUp">
        <div
          className="rounded-md p-5 shadow-md
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-gray-100 transition-colors"
        >
          {/* Header */}
          <h2 className="text-sm font-semibold mb-4">Utilities</h2>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-3">
            {utilities.map((util) => {
              const Icon = util.icon;
              return (
                <button
                  key={util.name}
                  onClick={() => setActiveUtility(util.name)}
                  className="flex flex-col items-center justify-center 
                             bg-gray-50 dark:bg-gray-800 rounded-md 
                             shadow hover:shadow-md hover:scale-[1.05] 
                             transition-transform duration-200
                             aspect-square p-2"
                >
                  <Icon className={`h-6 w-6 ${util.color}`} />
                  <span className="text-[11px] mt-2 font-medium text-gray-700 dark:text-gray-300">
                    {util.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Centered Modal */}
      {activeUtility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-md w-full max-w-md p-6 shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {activeUtility} Payment
              </h2>
              <button
                onClick={() => setActiveUtility(null)}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Dynamic Form */}
            <form className="flex flex-col gap-3">
              {getFormFields(activeUtility).map((field, idx) => (
                <input
                  key={idx}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              ))}

              <button
                type="submit"
                className="w-full bg-[#800000] hover:bg-[#a00000] text-white py-2 rounded-md text-sm font-medium transition"
              >
                Pay {activeUtility}
              </button>
            </form>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.25s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
