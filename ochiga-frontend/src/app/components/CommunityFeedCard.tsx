"use client";

import { useState } from "react";
import {
  ChatBubbleLeftIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface FeedPost {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const initialPosts: FeedPost[] = [
  {
    id: 1,
    author: "Estate Admin",
    content: "Reminder: Maintenance checks scheduled for Block A tomorrow.",
    createdAt: "2025-09-20",
  },
  {
    id: 2,
    author: "Resident - John D.",
    content: "Water supply issue reported in Sector C. Please attend to it.",
    createdAt: "2025-09-22",
  },
  {
    id: 3,
    author: "Estate Admin",
    content: "Community party scheduled for 13th Sept at the sports arena 🎉",
    createdAt: "2025-09-25",
  },
];

export default function CommunityFeedCard() {
  const [posts, setPosts] = useState(initialPosts);
  const [expanded, setExpanded] = useState(false);

  const visiblePosts = expanded ? posts : posts.slice(0, 3);

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleShare = (post: FeedPost) => {
    alert(`Shared: "${post.content}"`);
  };

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        <h2 className="text-lg font-semibold">Community Feed</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {posts.length} updates
        </span>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="p-3 rounded-lg bg-gray-50 dark:bg-black/40"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{post.author}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
            <p className="mt-1 text-sm">{post.content}</p>

            {/* Actions */}
            <div className="flex space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>Comment</span>
              </button>
              <button
                onClick={() => handleShare(post)}
                className="flex items-center space-x-1 hover:text-green-600 dark:hover:text-green-400"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="flex items-center space-x-1 hover:text-red-600 dark:hover:text-red-400"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
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
