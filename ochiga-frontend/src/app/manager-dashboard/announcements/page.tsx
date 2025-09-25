"use client";

import { useState } from "react";
import { MegaphoneIcon } from "@heroicons/react/24/outline";

type Announcement = {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "Water Maintenance", content: "Scheduled maintenance on Sat.", pinned: true },
    { id: 2, title: "Community Meeting", content: "Sun 4PM at the hall.", pinned: false },
  ]);

  return (
    <main className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Announcements</h1>
        <button className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md">
          <MegaphoneIcon className="h-5 w-5 mr-1" /> New Announcement
        </button>
      </div>

      <div className="grid gap-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">{a.title}</h2>
              {a.pinned && <span className="text-xs bg-yellow-300 px-2 rounded">Pinned</span>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{a.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
