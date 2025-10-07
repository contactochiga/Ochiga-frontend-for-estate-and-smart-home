"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: "Your preferences have been updated.",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          App Settings
        </h1>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Enable Notifications
            </label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-5 h-5 accent-[#800000]"
            />
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme Preference
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-maroon-600 outline-none"
            >
              <option value="system">System Default</option>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-maroon-600 outline-none"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="sw">Swahili</option>
              <option value="ig">Igbo</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-[#800000] to-black text-white rounded-lg font-medium shadow-md hover:opacity-90 transition"
          >
            Save Settings
          </button>
        </div>
      </motion.div>
    </main>
  );
}
