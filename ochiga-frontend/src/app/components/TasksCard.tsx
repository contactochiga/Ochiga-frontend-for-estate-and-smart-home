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
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Tasks & Requests</h2>
        <button className="text-sm text-rose-600 hover:underline">
          View All
        </button>
      </div>

      <ul className="space-y-3">
        {mockTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b last:border-none pb-2"
          >
            <span className="text-gray-700 text-sm">{task.title}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : task.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
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
