"use client";

import { useState } from "react";
import { PlusIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

type Staff = {
  id: number;
  name: string;
  role: string;
  duty: "On Duty" | "Off Duty";
  rating: number;
};

export default function StaffPage() {
  const [staffList] = useState<Staff[]>([
    { id: 1, name: "Security A", role: "Security", duty: "On Duty", rating: 4 },
    { id: 2, name: "Cleaner B", role: "Cleaner", duty: "Off Duty", rating: 5 },
  ]);

  return (
    <main className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Estate Staff</h1>
        <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md">
          <PlusIcon className="h-5 w-5 mr-1" /> Add Staff
        </button>
      </div>

      <div className="grid gap-4">
        {staffList.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-500">{s.role}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${s.duty === "On Duty" ? "text-green-600" : "text-gray-500"}`}>
                {s.duty}
              </p>
              <p className="text-sm text-yellow-500 flex items-center justify-end">
                {Array.from({ length: s.rating }).map((_, i) => (
                  <CheckBadgeIcon key={i} className="h-4 w-4" />
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
