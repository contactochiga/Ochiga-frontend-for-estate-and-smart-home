"use client";

import { ChevronRightIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function CommunityCard() {
  const updates = [
    { title: "Reminder", message: "Community meeting on Saturday at 4:00 PM" },
    { title: "Notice", message: "Pool maintenance tomorrow morning." },
  ];

  return (
    <div className="rounded-2xl p-5 shadow-xl 
      bg-white/70 dark:bg-gray-800/60 
      backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 
      transition">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Community
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Latest updates
        </span>
      </div>

      {/* Updates list */}
      <div className="space-y-3">
        {updates.map((u, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl 
              bg-gray-100/70 dark:bg-gray-700/50 
              hover:bg-gray-200 dark:hover:bg-gray-600/70 
              transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{u.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.message}</p>
              </div>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>

      {/* See more */}
      <button className="w-full mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
        See more
      </button>
    </div>
  );
}
