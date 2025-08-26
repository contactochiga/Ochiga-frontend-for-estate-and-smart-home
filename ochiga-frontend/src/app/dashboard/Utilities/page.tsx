"use client";

import { useState } from "react";
import {
  WrenchScrewdriverIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function UtilitiesPage() {
  const [tab, setTab] = useState<"bills" | "maintenance">("bills");

  const bills = [
    { id: 1, name: "Electricity", amount: "₦15,000", status: "Unpaid" },
    { id: 2, name: "Water", amount: "₦5,000", status: "Paid" },
    { id: 3, name: "Security Levy", amount: "₦7,500", status: "Unpaid" },
  ];

  const maintenance = [
    { id: 1, issue: "Leaking tap", status: "Pending" },
    { id: 2, issue: "Streetlight not working", status: "Resolved" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
        <WrenchScrewdriverIcon className="h-7 w-7 text-blue-600 mr-2" />
        Utilities
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("bills")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tab === "bills"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Bills
        </button>
        <button
          onClick={() => setTab("maintenance")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tab === "maintenance"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Maintenance
        </button>
      </div>

      {/* Bills Section */}
      {tab === "bills" && (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {bill.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {bill.amount}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  bill.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bill.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Maintenance Section */}
      {tab === "maintenance" && (
        <div className="space-y-4">
          {maintenance.map((req) => (
            <div
              key={req.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {req.issue}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  req.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
