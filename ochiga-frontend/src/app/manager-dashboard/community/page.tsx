// src/app/manager-dashboard/community/page.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  MegaphoneIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

import {
  ComposerCard,
  PinnedPostCard,
  GroupsCard,
  FeedPostCard,
} from "../../../dashboard/community/components"; // ✅ reuse resident components

import { Post, Group } from "../../../types";

export default function ManagerCommunityPage() {
  // posts state
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Estate Manager",
      content:
        "📢 Monthly estate meeting on Saturday, 10 AM at the clubhouse. Attendance is mandatory.",
      likes: 10,
      liked: false,
      comments: [{ id: 1, author: "John D.", text: "Noted 👍" }],
      pinned: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      author: "Grace M.",
      content: "Can we organize a weekend cleanup for Block B?",
      likes: 4,
      liked: false,
      comments: [],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Security Watch", members: 20 },
    { id: 2, name: "Parents Forum", members: 35 },
  ]);

  // state
  const [newPostText, setNewPostText] = useState("");
  const [media, setMedia] = useState<{ image?: string | null; video?: string | null }>({});
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const [showMessages, setShowMessages] = useState(false);

  // helpers
  const makePost = (pinned = false) => {
    if (!newPostText.trim() && !media.image && !media.video) return;
    const newPost: Post = {
      id: posts.length + 1 + Math.floor(Math.random() * 1000),
      author: "Manager",
      content: newPostText,
      image: media.image || null,
      video: media.video || null,
      likes: 0,
      liked: false,
      comments: [],
      pinned,
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setMedia({});
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePin = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p))
    );
  };

  const toggleJoinGroup = (id: number) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g))
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 space-y-6">
      {/* ✅ Sub-header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Community Management
        </h1>
        <button
          onClick={() => setShowMessages(true)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* ✅ Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 p-6 relative">
            <button
              onClick={() => setShowMessages(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Resident Messages
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Inbox coming soon 🚀
            </p>
          </div>
        </div>
      )}

      {/* ✅ Announcement Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Post Announcement
        </h2>
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 mb-2"
          placeholder="Write announcement..."
        />
        <div className="flex gap-2">
          <button
            onClick={() => makePost(true)}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md text-sm"
          >
            <MegaphoneIcon className="h-4 w-4 mr-1" />
            Pin & Post
          </button>
          <button
            onClick={() => makePost(false)}
            className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-md text-sm"
          >
            Post
          </button>
        </div>
      </div>

      {/* ✅ Pinned Posts */}
      {posts.filter((p) => p.pinned).map((post) => (
        <div key={post.id} className="relative">
          <PinnedPostCard post={post} />
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={() => togglePin(post.id)} className="text-xs text-yellow-600">
              Unpin
            </button>
            <button onClick={() => deletePost(post.id)} className="text-xs text-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Groups Card */}
      <GroupsCard groups={groups} toggleJoinGroup={toggleJoinGroup} />

      {/* ✅ Resident Feed with Moderation */}
      {posts.filter((p) => !p.pinned).map((post) => (
        <div key={post.id} className="relative">
          <FeedPostCard post={post} />
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={() => togglePin(post.id)} className="text-xs text-yellow-600">
              {post.pinned ? "Unpin" : "Pin"}
            </button>
            <button onClick={() => deletePost(post.id)} className="text-xs text-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
