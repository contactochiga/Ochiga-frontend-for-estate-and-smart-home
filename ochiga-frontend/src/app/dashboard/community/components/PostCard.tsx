// src/app/dashboard/community/components/PostCard.tsx
"use client";

import React from "react";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import type { Post } from "../types";

type Props = {
  post: Post;
  toggleLike: (id: number) => void;
  addComment: (postId: number, text: string) => void;
  sharePost: (post: Post) => void;
};

export default function PostCard({ post, toggleLike, addComment, sharePost }: Props) {
  const handleAddComment = (e: React.KeyboardEvent<HTMLInputElement>, postId: number) => {
    if (e.key === "Enter") {
      const val = (e.target as HTMLInputElement).value.trim();
      if (val) {
        addComment(postId, val);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
          <UserCircleIcon className="h-6 w-6" />
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Author & actions */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {post.author}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt || "").toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition ${
                  post.liked
                    ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <HandThumbUpIcon className="h-4 w-4" />
                <span>{post.likes}</span>
              </button>

              <button
                className="flex items-center gap-1 px-2 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>{post.comments.length}</span>
              </button>

              <button
                onClick={() => sharePost(post)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <p className="mt-3 text-gray-700 dark:text-gray-300">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="mt-3 rounded-lg max-h-60 object-cover w-full"
            />
          )}
          {post.video && (
            <video
              controls
              className="mt-3 rounded-lg w-full max-h-64"
            >
              <source src={post.video} />
            </video>
          )}

          {/* Comments */}
          <div className="mt-3 space-y-2">
            {post.comments.map((c) => (
              <div
                key={c.id}
                className="text-sm bg-gray-50 dark:bg-gray-700/60 p-3 rounded-lg"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {c.author}:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-300">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Add comment */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              onKeyDown={(e) => handleAddComment(e, post.id)}
              className="flex-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-indigo-500"
            />
            <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
              <PaperAirplaneIcon className="h-4 w-4 transform rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
