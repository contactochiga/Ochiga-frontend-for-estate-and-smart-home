"use client";

import { useState } from "react";
import {
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Cog6ToothIcon className="w-7 h-7 text-green-600" />
        Estate Settings
      </h1>

      {/* General Info */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">General Info</h2>
        <input
          type="text"
          placeholder="Estate Name"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
        <input
          type="text"
          placeholder="Contact Email"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
      </section>

      {/* Preferences */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Preferences</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <BellIcon className="w-5 h-5" /> Notifications
          </span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            {darkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            Dark Mode
          </span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </section>

      {/* Access Control */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5" /> Access Control
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage estate staff and roles.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          + Add Staff
        </button>
      </section>
    </main>
  );
}
