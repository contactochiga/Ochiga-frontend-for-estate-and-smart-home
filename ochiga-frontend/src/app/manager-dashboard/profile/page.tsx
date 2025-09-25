"use client";

import { useState } from "react";
import { UserCircleIcon, KeyIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const [name, setName] = useState("John Manager");
  const [email, setEmail] = useState("manager@ochiga.com");
  const [phone, setPhone] = useState("+234 801 234 5678");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <UserCircleIcon className="w-7 h-7 text-green-600" />
        My Profile
      </h1>

      {/* Profile Card */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-4">
          <UserCircleIcon className="w-16 h-16 text-gray-400" />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </section>

      {/* Security */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <KeyIcon className="w-5 h-5" /> Security
        </h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Change Password
        </button>
      </section>

      {/* Activity Log */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <ClockIcon className="w-5 h-5" /> Recent Activity
        </h2>
        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-6">
          <li>Last login: 2 hours ago</li>
          <li>Password changed: 3 weeks ago</li>
          <li>Profile updated: 1 month ago</li>
        </ul>
      </section>
    </main>
  );
}
