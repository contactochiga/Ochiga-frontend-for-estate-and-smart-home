"use client";

import { useState } from "react";

type Complaint = {
  id: number;
  title: string;
  resident: string;
  status: "New" | "In Progress" | "Resolved";
};

export default function ComplaintsPage() {
  const [complaints] = useState<Complaint[]>([
    { id: 1, title: "Broken streetlight", resident: "Jane Doe", status: "New" },
    { id: 2, title: "Water leakage", resident: "John Smith", status: "In Progress" },
  ]);

  return (
    <main className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold">Resident Complaints</h1>

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-gray-500">By {c.resident}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  c.status === "New"
                    ? "bg-red-200 text-red-800"
                    : c.status === "In Progress"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
