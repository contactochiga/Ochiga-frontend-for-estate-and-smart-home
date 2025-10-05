// src/app/dashboard/community/components/FeedPostCard.tsx
"use client";

import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Post } from "../types"; // ✅ fixed import path

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 space-y-4 border border-gray-100 dark:border-gray-700">
      {/* Author */}
      <div className="flex items-center space-x-3">
        <UserCircleIcon className="h-10 w-10 text-gray-400" />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {post.author}
          </p>
          <p className="text-xs text-gray-500">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
        {post.content}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-lg object-cover max-h-72"
        />
      )}

      {post.video && (
        <video
          src={post.video}
          controls
          className="w-full rounded-lg max-h-72"
        />
      )}

      {/* Actions */}
      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
        <button
          onClick={() => toggleLike(post.id)}
          className="flex items-center gap-1 hover:text-blue-500 transition"
        >
          <HandThumbUpIcon
            className={`h-5 w-5 ${
              post.liked ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <span>{post.likes}</span>
        </button>

        <button className="flex items-center gap-1 hover:text-indigo-500 transition">
          <ChatBubbleLeftIcon className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>

        <button
          onClick={() => sharePost(post)}
          className="flex items-center gap-1 hover:text-purple-500 transition"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments */}
      <div className="space-y-3">
        {post.comments.map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <UserCircleIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {c.author}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {c.text}
              </p>
            </div>
          </div>
        ))}

        {/* Add comment */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleComment}
            className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
