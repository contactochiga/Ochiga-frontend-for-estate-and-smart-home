"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Settings
      </h1>

      {/* 🔹 Account Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              defaultValue="johndoe@email.com"
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+234 812 345 6789"
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Preferences */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Preferences
        </h2>
        <div className="space-y-3">
          {/* Dark Mode */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="h-4 w-4"
            />
            <span className="text-gray-700 dark:text-gray-300">Enable Dark Mode</span>
          </label>

          {/* Notifications */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="h-4 w-4"
            />
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
              className="h-4 w-4"
            />
            <span className="text-gray-700 dark:text-gray-300">SMS Notifications</span>
          </label>
        </div>
      </div>

      {/* 🔹 Security */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Security
        </h2>
        <div className="space-y-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Change Password
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
            Setup 2FA (Coming Soon)
          </button>
        </div>
      </div>

      {/* 🔹 Danger Zone */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-red-200 dark:border-red-700">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
        <button className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
}
