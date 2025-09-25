"use client";

import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  PinIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import type { Post } from "../types";

type Props = {
  post: Post;
  toggleLike: (id: number) => void;
  addComment: (postId: number, text: string) => void;
  sharePost: (post: Post) => void;
  isManager?: boolean;
  variant?: "feed" | "pinned" | "announcement";
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onPin?: (id: number) => void;
  onToggleComments?: (id: number) => void;
};

export default function PostCard({
  post,
  toggleLike,
  addComment,
  sharePost,
  isManager = false,
  variant = "feed",
  onEdit,
  onDelete,
  onPin,
  onToggleComments,
}: Props) {
  const [commentText, setCommentText] = useState("");

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <article
      className={`p-4 rounded-xl shadow border ${
        variant === "pinned"
          ? "bg-gradient-to-r from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-yellow-300"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
          <UserCircleIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {post.author}
                {variant === "pinned" && (
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                    Pinned
                  </span>
                )}
                {variant === "announcement" && (
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                    Official
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt || "").toLocaleString()}
              </p>
            </div>

            {/* Manager Controls */}
            {isManager && (
              <div className="flex items-center gap-2 text-gray-500">
                <button
                  onClick={() => onEdit?.(post)}
                  className="hover:text-indigo-600"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onPin?.(post.id)}
                  className="hover:text-yellow-600"
                  title="Pin/Unpin"
                >
                  <PinIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToggleComments?.(post.id)}
                  className="hover:text-purple-600"
                  title="Enable/Disable comments"
                >
                  <NoSymbolIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete?.(post.id)}
                  className="hover:text-red-600"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            )}
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
              src={post.video}
            />
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center gap-1"
            >
              <HandThumbUpIcon
                className={`h-5 w-5 ${
                  post.liked ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </button>
            <button
              onClick={() => sharePost(post)}
              className="flex items-center gap-1"
            >
              <ShareIcon className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {post.comments.map((c) => (
                <div
                  key={c.id}
                  className="text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded-md"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {c.author}:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          {post.allowComments !== false && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleComment}
                className="p-2 rounded-lg bg-indigo-600 text-white"
              >
                <PaperAirplaneIcon className="h-4 w-4 transform rotate-45" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
