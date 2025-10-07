"use client";

import React from "react";
import { Group } from "../types";

type GroupsCardProps = {
  groups: Group[];
  toggleJoinGroup: (id: number) => void;
};

export default function GroupsCard({ groups, toggleJoinGroup }: GroupsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 space-y-4 border border-gray-100 dark:border-gray-700">
      {/* Title */}
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
        Groups you may like
      </h2>

      {/* Groups list */}
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {group.name}
              </p>
              <p className="text-xs text-gray-500">
                {group.members} members
              </p>
            </div>

            <button
              onClick={() => toggleJoinGroup(group.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                group.joined
                  ? "border-[#800000] text-[#800000] bg-transparent dark:border-[#a05252] dark:text-[#d87f7f] cursor-default"
                  : "bg-[#800000] text-white hover:bg-[#660000] dark:bg-[#800000] dark:hover:bg-[#990000] border-transparent"
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
