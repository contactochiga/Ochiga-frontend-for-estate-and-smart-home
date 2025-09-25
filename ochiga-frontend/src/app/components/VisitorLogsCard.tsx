"use client";

import { useState } from "react";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface VisitorLog {
  id: number;
  name: string;
  purpose: string;
  time: string;
  status: "In" | "Out";
}

const initialVisitors: VisitorLog[] = [
  { id: 1, name: "James O.", purpose: "Meeting Resident", time: "09:20 AM", status: "In" },
  { id: 2, name: "Delivery Rider", purpose: "Food Drop-off", time: "10:45 AM", status: "Out" },
  { id: 3, name: "Mary A.", purpose: "Family Visit", time: "12:15 PM", status: "In" },
];

export default function VisitorLogsCard() {
  const [visitors, setVisitors] = useState(initialVisitors);

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Visitor Logs</h2>

      <div className="space-y-3">
        {visitors.map((visitor) => (
          <div
            key={visitor.id}
            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-black/40 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <UserIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="font-medium">{visitor.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {visitor.purpose}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{visitor.time}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  visitor.status === "In"
                    ? "bg-green-100 text-green-600 dark:bg-green-600/30 dark:text-green-300"
                    : "bg-red-100 text-red-600 dark:bg-red-600/30 dark:text-red-300"
                }`}
              >
                {visitor.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
