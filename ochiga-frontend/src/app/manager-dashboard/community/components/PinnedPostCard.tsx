"use client";

import React from "react";
import type { Post } from "../types";

type Props = {
  post: Post;
};

export default function PinnedPostCard({ post }: Props) {
  // Format date nicely (e.g., 26 Sep 2025)
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(post.createdAt || ""));

  return (
    <div className="rounded-xl shadow-md p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {post.author}{" "}
          <span className="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded">
            Pinned
          </span>
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </span>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>
    </div>
  );
}
