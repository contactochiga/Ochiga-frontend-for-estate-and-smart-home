"use client";

import React, { useState } from "react";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    alert(`Clicked task: ${task.title}`);
  };

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white transition hover:shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700/50 pb-2 mb-4">
        <h2 className="text-lg font-semibold">Tasks & Requests</h2>
        <button className="text-sm font-medium text-rose-700 dark:text-rose-400 hover:underline">
          View All
        </button>
      </div>

      {/* Tasks List */}
      <ul className="space-y-3">
        {mockTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleClick(task)}
            className="flex justify-between items-center bg-gray-50 dark:bg-black/30 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-black/50 transition"
          >
            <span className="text-sm font-medium">{task.title}</span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                task.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  : task.status === "In Progress"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
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
