// src/app/components/ResidentCommunityCard.tsx
"use client";

import { useState } from "react";
import {
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

interface CommunityUpdate {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

const initialUpdates: CommunityUpdate[] = [
  {
    id: 1,
    title: "Reminder",
    message: "Community meeting on Saturday at 4:00 PM",
    createdAt: "2025-09-23",
  },
  {
    id: 2,
    title: "Notice",
    message: "Pool maintenance tomorrow morning.",
    createdAt: "2025-09-25",
  },
];

export default function ResidentCommunityCard() {
  const [updates] = useState(initialUpdates);
  const [expanded, setExpanded] = useState(false);

  const visibleUpdates = expanded ? updates : updates.slice(0, 2);

  const handleShare = (update: CommunityUpdate) => {
    alert(`Shared: "${update.message}"`);
  };

  return (
    <div className="rounded-2xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        <h2 className="text-lg font-semibold">Community</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {updates.length} updates
        </span>
      </div>

      {/* Updates */}
      <div className="space-y-4">
        {visibleUpdates.map((u) => (
          <div
            key={u.id}
            className="p-3 rounded-lg bg-gray-50 dark:bg-black/40"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{u.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(u.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
            <p className="mt-1 text-sm">{u.message}</p>

            {/* Actions */}
            <div className="flex space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>Comment</span>
              </button>
              <button
                onClick={() => handleShare(u)}
                className="flex items-center space-x-1 hover:text-green-600 dark:hover:text-green-400"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-rose-700 dark:text-rose-400 font-medium hover:underline"
        >
          {expanded ? "↑ Collapse" : "← View More"}
        </button>
      </div>
    </div>
  );
}
