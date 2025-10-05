"use client";

import React from "react";
import { Group } from "../types"; // ✅ Corrected import path

type GroupsCardProps = {
  groups: Group[];
  toggleJoinGroup: (id: number) => void;
};

export default function GroupsCard({ groups, toggleJoinGroup }: GroupsCardProps) {
  return (
    <div className="rounded-xl shadow-md p-5 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:via-black dark:to-gray-900 text-gray-900 dark:text-gray-100 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-3">Groups you may like</h2>

      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-none"
          >
            <div>
              <p className="font-medium">{group.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {group.members} members
              </p>
            </div>

            <button
              onClick={() => toggleJoinGroup(group.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                group.joined
                  ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:opacity-80"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
              }`}
            >
              {group.joined ? "Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
