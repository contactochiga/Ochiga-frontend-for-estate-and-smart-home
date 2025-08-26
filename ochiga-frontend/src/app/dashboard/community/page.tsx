"use client";

import { useState } from "react";

export default function CommunityPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "General Meeting",
      content: "All residents are invited for the estate general meeting on Saturday 31st at 12 PM.",
      date: "2025-08-20",
    },
    {
      id: 2,
      title: "Water Supply Notice",
      content: "Water supply will be temporarily unavailable from 9 AM – 2 PM tomorrow due to maintenance.",
      date: "2025-08-22",
    },
  ]);

  const [groups] = useState([
    { id: 1, name: "Gym & Fitness Club", members: 25 },
    { id: 2, name: "Parents Forum", members: 40 },
    { id: 3, name: "Security Watch", members: 18 },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Community
      </h1>

      {/* Announcements */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">📢 Announcements</h2>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {a.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{a.content}</p>
              <p className="text-xs text-gray-400 mt-2">📅 {a.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Groups */}
      <section>
        <h2 className="text-lg font-semibold mb-3">👥 Groups</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <div
              key={g.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{g.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{g.members} members</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
