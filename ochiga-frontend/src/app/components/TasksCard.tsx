"use client";

import React from "react";

type Task = {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Done";
};

const mockTasks: Task[] = [
  { id: 1, title: "Fix water pump in Block A", status: "Pending" },
  { id: 2, title: "Approve visitor request - Mr. Okafor", status: "In Progress" },
  { id: 3, title: "Clean estate park area", status: "Done" },
];

export default function TasksCard() {
  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tasks & Requests</h2>
        <button className="text-sm text-rose-600 dark:text-rose-400 hover:underline">
          View All
        </button>
      </div>

      <ul className="space-y-3">
        {mockTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 last:border-none pb-2"
          >
            <span className="text-sm">{task.title}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "Pending"
                  ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                  : task.status === "In Progress"
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
              }`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
