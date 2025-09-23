"use client";

import { useState } from "react";
import { BoltIcon, WifiIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaTint } from "react-icons/fa";

export default function UtilitiesCard() {
  const [activeUtility, setActiveUtility] = useState<string | null>(null);

  const utilities = [
    { name: "Electricity", icon: BoltIcon, color: "text-yellow-400" },
    { name: "Internet", icon: WifiIcon, color: "text-blue-400" },
    { name: "Water", icon: FaTint, color: "text-cyan-400" },
    { name: "More", icon: EllipsisHorizontalIcon, color: "text-gray-400" },
  ];

  // Dynamic fields for each utility
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
      <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8 animate-slideUp">
        <div
          className="rounded-2xl p-6 shadow-xl 
                     bg-gradient-to-r from-slate-100 to-gray-200 
                     dark:from-gray-800 dark:to-gray-900"
        >
          {/* Header */}
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-5">
            Utilities
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-4">
            {utilities.map((util) => {
              const Icon = util.icon;
              return (
                <button
                  key={util.name}
                  onClick={() => setActiveUtility(util.name)}
                  className="flex flex-col items-center justify-center 
                             bg-white dark:bg-gray-800 rounded-xl 
                             shadow hover:shadow-lg hover:scale-[1.05] 
                             transition-transform duration-200
                             aspect-square"
                >
                  <Icon className={`h-7 w-7 ${util.color}`} />
                  <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">
                    {util.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sheet Modal */}
      {activeUtility && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl w-full max-w-md p-6 animate-slideUp shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{activeUtility} Payment</h2>
              <button
                onClick={() => setActiveUtility(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Dynamic Form */}
            <form className="flex flex-col gap-4">
              {getFormFields(activeUtility).map((field, idx) => (
                <input
                  key={idx}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800"
                />
              ))}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Pay {activeUtility}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
