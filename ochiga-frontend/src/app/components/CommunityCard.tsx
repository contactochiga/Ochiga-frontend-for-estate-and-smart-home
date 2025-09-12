"use client";

import Link from "next/link";
import { ChevronRightIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function CommunityCard() {
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
            <Link
              key={i}
              href="/dashboard/community"
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
            </Link>
          ))}
        </div>

        {/* See more */}
        <Link
          href="/dashboard/community"
          className="w-full block mt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline text-center"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
