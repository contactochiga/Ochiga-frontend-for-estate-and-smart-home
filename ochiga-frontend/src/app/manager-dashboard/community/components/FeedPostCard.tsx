"use client";

import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Post } from "../../../types";

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
      {/* Author */}
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="h-8 w-8 text-gray-400" />
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-xs text-gray-500">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 dark:text-gray-200">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-lg object-cover"
        />
      )}

      {post.video && (
        <video
          src={post.video}
          controls
          className="w-full rounded-lg"
        />
      )}

      {/* Actions */}
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <button
          onClick={() => toggleLike(post.id)}
          className="flex items-center space-x-1"
        >
          <HandThumbUpIcon
            className={`h-5 w-5 ${
              post.liked ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <span>{post.likes}</span>
        </button>

        <button className="flex items-center space-x-1">
          <ChatBubbleLeftIcon className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>

        <button
          onClick={() => sharePost(post)}
          className="flex items-center space-x-1"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments */}
      <div className="space-y-2">
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

        {/* Add comment */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-3 py-1 text-sm dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleComment}
            className="p-1 text-blue-500 hover:text-blue-600"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
