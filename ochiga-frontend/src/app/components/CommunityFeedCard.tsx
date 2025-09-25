"use client";

import { useState } from "react";
import { ChatBubbleLeftIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  {
    id: 4,
    author: "Resident - Amaka",
    content: "Can we get a cleaner assigned to Block D’s lobby more frequently?",
    createdAt: "2025-09-26",
  },
  {
    id: 5,
    author: "Estate Admin",
    content: "Security patrol schedule updated. Check the portal for details.",
    createdAt: "2025-09-27",
  },
];

export default function CommunityFeedCard() {
  const [posts, setPosts] = useState(initialPosts);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleShare = (post: FeedPost) => {
    alert(`Shared: "${post.content}"`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Community Feed
        </h2>
        <span className="text-sm text-gray-500">{posts.length} updates</span>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.slice(0, visibleCount).map((post) => (
          <div
            key={post.id}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {post.author}
              </h3>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {post.content}
            </p>

            {/* Actions */}
            <div className="flex space-x-4 mt-2 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>Comment</span>
              </button>
              <button
                onClick={() => handleShare(post)}
                className="flex items-center space-x-1 hover:text-green-600"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="flex items-center space-x-1 hover:text-red-600"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < posts.length && (
        <div className="mt-4">
          <button
            onClick={() => setVisibleCount(posts.length)}
            className="text-sm text-red-700 dark:text-red-400 font-medium hover:underline"
          >
            ← View More
          </button>
        </div>
      )}
    </div>
  );
}
