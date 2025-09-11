"use client";

import { useState } from "react";
import { ChevronRightIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function CommunityCard() {
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null);

  const updates = [
    { title: "Reminder", message: "Community meeting on Saturday at 4:00 PM" },
    { title: "Notice", message: "Pool maintenance tomorrow morning." },
  ];

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      <div
        className="rounded-2xl p-6 shadow-xl 
                   bg-gradient-to-r from-slate-100 to-gray-200 
                   dark:from-gray-800 dark:to-gray-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Community
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Latest updates
          </span>
        </div>

        {/* Updates list */}
        <div className="space-y-3">
          {updates.map((u, i) => (
            <button
              key={i}
              onClick={() => setSelectedUpdate(u)}
              className="w-full flex items-center justify-between p-3 rounded-xl 
                         bg-white dark:bg-gray-800 
                         shadow hover:shadow-lg hover:scale-[1.02] 
                         transition-transform duration-200"
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-full 
                             bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {u.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {u.message}
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </button>
          ))}
        </div>

        {/* See more */}
        <button className="w-full mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          See more
        </button>
      </div>

      {/* Slide-up panel */}
      {selectedUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {selectedUpdate.title}
              </h3>
              <button
                onClick={() => setSelectedUpdate(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {selectedUpdate.message}
            </p>
            <p className="mt-4 text-xs text-gray-400">
              (Here you could show full community post, comments, or reply options.)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
