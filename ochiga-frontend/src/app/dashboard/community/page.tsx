// src/app/dashboard/community/page.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  PencilSquareIcon,
  UserCircleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

/**
 * Interactive Community Page for Ochiga
 * - Composer (photo/video/poll)
 * - Pinned manager posts
 * - Groups carousel (join toggle)
 * - Feed: like, comment, share, inline add comment
 * - Simple DM drawer
 *
 * Replace existing page.tsx in /dashboard/community with this file.
 */

type Post = {
  id: number;
  author: string;
  content: string;
  image?: string | null;
  video?: string | null;
  likes: number;
  liked?: boolean;
  comments: { id: number; author: string; text: string }[];
  pinned?: boolean;
  createdAt?: string;
};

type Group = { id: number; name: string; members: number; joined?: boolean };

export default function CommunityPage() {
  // initial posts: estate manager pinned + one sample
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Estate Manager",
      content:
        "Welcome to the Ochiga Community Hub 🎉. Please use this space to share important estate updates — official notices will be pinned here.",
      likes: 12,
      liked: false,
      comments: [
        { id: 1, author: "Jane D.", text: "Thanks! Very helpful." },
        { id: 2, author: "Mark T.", text: "Great to have this." },
      ],
      pinned: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      author: "Aisha B.",
      content: "Does anyone recommend a reliable plumber in the estate?",
      likes: 3,
      liked: false,
      comments: [{ id: 1, author: "Paul", text: "Try BrightFix — they helped me." }],
      pinned: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Gym & Fitness Club", members: 25 },
    { id: 2, name: "Parents Forum", members: 40 },
    { id: 3, name: "Security Watch", members: 18 },
    { id: 4, name: "Football Crew", members: 15 },
  ]);

  // composer state
  const [newPostText, setNewPostText] = useState("");
  const [media, setMedia] = useState<{ image?: string | null; video?: string | null }>({});
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  // DM drawer
  const [dmOpen, setDmOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, { from: string; text: string }[]>>(
    {
      "Security Office": [{ from: "Security Office", text: "All units check complete." }],
    }
  );
  const [chatInput, setChatInput] = useState("");

  // helpers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    if (!e.target.files || !e.target.files[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setMedia((prev) => ({ ...prev, [type]: url }));
  };

  const makePost = () => {
    if (!newPostText.trim() && !media.image && !media.video) return;
    const newPost: Post = {
      id: posts.length + 1 + Math.floor(Math.random() * 1000),
      author: "You",
      content: newPostText,
      image: media.image || null,
      video: media.video || null,
      likes: 0,
      liked: false,
      comments: [],
      pinned: false,
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setMedia({});
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
            }
          : p
      )
    );
  };

  const addComment = (postId: number, text: string) => {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: p.comments.length + 1 + Math.floor(Math.random() * 1000),
                  author: "You",
                  text,
                },
              ],
            }
          : p
      )
    );
  };

  const sharePost = async (post: Post) => {
    const payload = `${post.author}: ${post.content}\n(shared from Ochiga Community)`;
    await navigator.clipboard.writeText(payload);
    alert("Post details copied to clipboard. Share it anywhere.");
  };

  const toggleJoinGroup = (id: number) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g)));
  };

  const openChatWith = (name: string) => {
    setActiveChatUser(name);
    setDmOpen(true);
    if (!chatMessages[name]) setChatMessages((prev) => ({ ...prev, [name]: [] }));
  };

  const sendChat = () => {
    if (!activeChatUser || !chatInput.trim()) return;
    setChatMessages((prev) => ({
      ...prev,
      [activeChatUser]: [...(prev[activeChatUser] || []), { from: "You", text: chatInput }],
    }));
    setChatInput("");
  };

  // composer
  const Composer = (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <textarea
        placeholder="Share an update with your estate..."
        className="w-full bg-transparent resize-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 rounded-md border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
        rows={3}
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />
      {media.image && (
        <img
          src={media.image}
          alt="preview"
          className="mt-3 w-full rounded-lg max-h-64 object-cover"
        />
      )}
      {media.video && (
        <video controls className="mt-3 w-full rounded-lg max-h-64">
          <source src={media.video} />
        </video>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <PhotoIcon className="h-5 w-5" />{" "}
            <span className="text-sm hidden sm:inline">Photo</span>
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileRef}
            onChange={(e) => handleFileUpload(e, "image")}
          />

          <button
            onClick={() => videoRef.current?.click()}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <VideoCameraIcon className="h-5 w-5" />{" "}
            <span className="text-sm hidden sm:inline">Video</span>
          </button>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={videoRef}
            onChange={(e) => handleFileUpload(e, "video")}
          />

          <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <ChartBarIcon className="h-5 w-5" />{" "}
            <span className="text-sm hidden sm:inline">Poll</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={makePost}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Community
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connect with neighbors — announcements, groups, and chat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            title="Announcements"
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <BellAlertIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            title="Direct Messages"
            className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95"
            onClick={() => setDmOpen(true)}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Composer */}
      <section className="mb-6">{Composer}</section>

      {/* Pinned */}
      <section className="mb-6">
        {posts
          .filter((p) => p.pinned)
          .map((p) => (
            <article
              key={p.id}
              className="p-4 rounded-xl mb-4 bg-gradient-to-r from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
                  <UserCircleIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {p.author}{" "}
                      <span className="text-xs ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                        Pinned
                      </span>
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {p.createdAt ? format(new Date(p.createdAt), "dd/MM/yyyy") : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{p.content}</p>
                </div>
              </div>
            </article>
          ))}
      </section>

      {/* Groups carousel */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            👥 Groups you may like
          </h2>
          <a href="#groups" className="text-sm text-indigo-600 dark:text-indigo-400">
            See all
          </a>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-2">
          {groups.map((g) => (
            <div
              key={g.id}
              className="min-w-[200px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  <PencilSquareIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {g.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {g.members} members
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleJoinGroup(g.id)}
                className={`mt-3 w-full py-2 rounded-lg font-semibold transition ${
                  g.joined
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-800"
                    : "bg-blue-600 text-white"
                }`}
              >
                {g.joined ? "Joined" : "Join Group"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="space-y-6">
        {posts
          .filter((p) => !p.pinned)
          .map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
                  <UserCircleIcon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {post.author}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.createdAt
                          ? format(new Date(post.createdAt), "dd/MM/yyyy HH:mm")
                          : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                          post.liked
                            ? "bg-blue-50 dark:bg-blue-900 text-blue-600"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <HandThumbUpIcon className="h-4 w-4" />{" "}
                        <span className="text-sm">{post.likes}</span>
                      </button>

                      <button
                        onClick={() => {
                          const c = prompt("Add a comment:");
                          if (c) addComment(post.id, c);
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <ChatBubbleLeftIcon className="h-4 w-4" />{" "}
                        <span className="text-sm">{post.comments.length}</span>
                      </button>

                      <button
                        onClick={() => sharePost(post)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <ShareIcon className="h-4 w-4" />{" "}
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {post.content}
                  </p>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="mt-3 rounded-lg max-h-60 object-cover w-full"
                    />
                  )}
                  {post.video && (
                    <video controls className="mt-3 rounded-lg w-full max-h-64">
                      <source src={post.video} />
                    </video>
                  )}

                  {/* Inline comments */}
                  <div className="mt-3 space-y-2">
                    {post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md"
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

                  {/* quick add comment input */}
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      placeholder="Write a comment..."
                      className="flex-1 p-2
