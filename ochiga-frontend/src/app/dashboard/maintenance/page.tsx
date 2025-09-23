"use client";

import { useState } from "react";

export default function UtilitiesPage() {
  const [activeTab, setActiveTab] = useState<"maintenance" | "utilities">("maintenance");

  return (
    <div className="p-6">
      {/* 🔹 Tab Header */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("maintenance")}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === "maintenance"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Maintenance Requests
        </button>

        <button
          onClick={() => setActiveTab("utilities")}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === "utilities"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Utilities
        </button>
      </div>

      {/* 🔹 Tab Content */}
      <div className="mt-4">
        {activeTab === "maintenance" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Submit a Maintenance Request
            </h2>
            {/* Form Placeholder */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter issue title"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
              <textarea
                placeholder="Describe the issue..."
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}

        {activeTab === "utilities" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Utilities Management
            </h2>
            {/* Utility Placeholder */}
            <ul className="space-y-2">
              <li className="p-3 border rounded-lg dark:border-gray-700">💡 Electricity Bill</li>
              <li className="p-3 border rounded-lg dark:border-gray-700">🚰 Water Bill</li>
              <li className="p-3 border rounded-lg dark:border-gray-700">🔥 Gas Usage</li>
              <li className="p-3 border rounded-lg dark:border-gray-700">🌐 Internet</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
