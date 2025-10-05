"use client";

import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Post } from "../types"; // ✅ Correct relative import path

type FeedPostCardProps = {
  post: Post;
  toggleLike: (id: number) => void;
  addComment: (postId: number, text: string) => void;
  sharePost: (post: Post) => void;
};

export default function FeedPostCard({
  post,
  toggleLike,
  addComment,
  sharePost,
}: FeedPostCardProps) {
  const [commentText, setCommentText] = useState("");

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <div className="rounded-xl shadow-md p-5 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:via-black dark:to-gray-900 text-gray-900 dark:text-gray-100 hover:shadow-lg transition">
      {/* 🧑‍💼 Author Info */}
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="h-9 w-9 text-gray-400" />
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-xs text-gray-500">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </p>
        </div>
      </div>

      {/* 📝 Post Content */}
      <p className="mt-2 text-gray-800 dark:text-gray-200">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-3 w-full rounded-lg object-cover shadow-md"
        />
      )}

      {post.video && (
        <video
          src={post.video}
          controls
          className="mt-3 w-full rounded-lg shadow-md"
        />
      )}

      {/* ❤️ Actions */}
      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
        <button
          onClick={() => toggleLike(post.id)}
          className="flex items-center space-x-1 hover:text-blue-600 transition"
        >
          <HandThumbUpIcon
            className={`h-5 w-5 ${
              post.liked ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <span>{post.likes}</span>
        </button>

        <button className="flex items-center space-x-1 hover:text-indigo-600 transition">
          <ChatBubbleLeftIcon className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>

        <button
          onClick={() => sharePost(post)}
          className="flex items-center space-x-1 hover:text-purple-600 transition"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {/* 💬 Comments Section */}
      <div className="mt-3 space-y-3">
        {post.comments.map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <UserCircleIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium">{c.author}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {c.text}
              </p>
            </div>
          </div>
        ))}

        {/* ➕ Add New Comment */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={handleComment}
            className="p-2 text-blue-500 hover:text-blue-600 transition"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
