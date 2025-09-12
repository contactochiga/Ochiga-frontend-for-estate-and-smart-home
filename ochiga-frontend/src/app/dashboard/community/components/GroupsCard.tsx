// src/app/dashboard/community/components/GroupsCard.tsx
"use client";

import React from "react";
import { Group } from "../../../types";

type GroupsCardProps = {
  groups: Group[];
  toggleJoinGroup: (id: number) => void;
};

export default function GroupsCard({ groups, toggleJoinGroup }: GroupsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Groups you may like
      </h2>

      <div className="space-y-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {group.name}
              </p>
              <p className="text-sm text-gray-500">{group.members} members</p>
            </div>

            <button
              onClick={() => toggleJoinGroup(group.id)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                group.joined
                  ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  : "bg-blue-500 text-white hover:bg-blue-600"
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
