"use client";

import React from "react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode</span>
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md">
            Toggle
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notifications</span>
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md">
            Toggle
          </button>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
}
