import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import type { Post } from "../types";

export default function PinnedPostCard({ post }: { post: Post }) {
  return (
    <article className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:via-black dark:to-gray-900 shadow-md border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
          <UserCircleIcon className="h-6 w-6" />
        </div>

        {/* Post Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {post.author}
              <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                Pinned
              </span>
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt || "").toLocaleDateString()}
            </span>
          </div>

          <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>
        </div>
      </div>
    </article>
  );
}
