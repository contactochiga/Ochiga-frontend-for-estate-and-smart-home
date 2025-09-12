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

  const [newPostText, setNewPostText] = useState("");
  const [media, setMedia] = useState<{ image?: string | null; video?: string | null }>({});
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const [dmOpen, setDmOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<
    Record<string, { from: string; text: string }[]>
  >({
    "Security Office": [{ from: "Security Office", text: "All units check complete." }],
  });
  const [chatInput, setChatInput] = useState("");

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

  // composer UI
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
        <img src={media.image} alt="preview" className="mt-3 w-full rounded-lg max-h-64 object-cover" />
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
            <PhotoIcon className="h-5 w-5" />
            <span className="text-sm hidden sm:inline">Photo</span>
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={(e) => handleFileUpload(e, "image")} />

          <button
            onClick={() => videoRef.current?.click()}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <VideoCameraIcon className="h-5 w-5" />
            <span className="text-sm hidden sm:inline">Video</span>
          </button>
          <input type="file" accept="video/*" className="hidden" ref={videoRef} onChange={(e) => handleFileUpload(e, "video")} />

          <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <ChartBarIcon className="h-5 w-5" />
            <span className="text-sm hidden sm:inline">Poll</span>
          </button>
        </div>

        <button
          onClick={makePost}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95 transition"
        >
          Post
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      {/* ...header, composer, pinned posts, groups, feed (same as yours)... */}

      {/* DM drawer */}
      {dmOpen && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {activeChatUser || "Direct Messages"}
            </h2>
            <button onClick={() => setDmOpen(false)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {(activeChatUser && chatMessages[activeChatUser])?.map((m, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[70%] ${
                  m.from === "You"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                <span className="text-sm">{m.text}</span>
              </div>
            ))}
          </div>

          {activeChatUser && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button onClick={sendChat} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:opacity-90">
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
