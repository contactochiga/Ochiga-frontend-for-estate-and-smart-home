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
  // initial posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Estate Manager",
      content:
        "Welcome to the Ochiga Community Hub 🎉. Use this space for estate updates and discussions. Official notices stay pinned here.",
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
  const [chatMessages, setChatMessages] = useState<Record<string, { from: string; text: string }[]>>({
    "Security Office": [{ from: "Security Office", text: "All units check complete." }],
  });
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
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setMedia({});
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1 } : p
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
                { id: p.comments.length + 1 + Math.floor(Math.random() * 1000), author: "You", text },
              ],
            }
          : p
      )
    );
  };

  const sharePost = async (post: Post) => {
    const payload = `${post.author}: ${post.content}\n(shared from Ochiga Community)`;
    await navigator.clipboard.writeText(payload);
    alert("Post details copied to clipboard.");
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

  // Composer
  const Composer = (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <textarea
        placeholder="Share an update with your estate..."
        className="w-full bg-transparent resize-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 rounded-md border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
        rows={3}
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />
      {media.image && <img src={media.image} alt="preview" className="mt-3 w-full rounded-lg max-h-64 object-cover" />}
      {media.video && (
        <video controls className="mt-3 w-full rounded-lg max-h-64">
          <source src={media.video} />
        </video>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <PhotoIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Photo</span>
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={(e) => handleFileUpload(e, "image")} />

          <button onClick={() => videoRef.current?.click()} className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <VideoCameraIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Video</span>
          </button>
          <input type="file" accept="video/*" className="hidden" ref={videoRef} onChange={(e) => handleFileUpload(e, "video")} />

          <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <ChartBarIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Poll</span>
          </button>
        </div>

        <button onClick={makePost} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95 transition">
          Post
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 space-y-6">
      {/* Composer */}
      {Composer}

      {/* Pinned */}
      {posts
        .filter((p) => p.pinned)
        .map((p) => (
          <article
            key={p.id}
            className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
                <UserCircleIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {p.author} <span className="text-xs ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">Pinned</span>
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(p.createdAt || "").toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{p.content}</p>
              </div>
            </div>
          </article>
        ))}

      {/* Groups */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">👥 Groups you may like</h2>
          <a href="#groups" className="text-sm text-indigo-600 dark:text-indigo-400">See all</a>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {groups.map((g) => (
            <div key={g.id} className="min-w-[200px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  <PencilSquareIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{g.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{g.members} members</p>
                </div>
              </div>
              <button
                onClick={() => toggleJoinGroup(g.id)}
                className={`mt-3 w-full py-2 rounded-lg font-semibold transition ${
                  g.joined ? "bg-gray-200 dark:bg-gray-700 text-gray-800" : "bg-indigo-600 text-white"
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
            <article key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-600 text-white">
                  <UserCircleIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{post.author}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.createdAt || "").toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                          post.liked ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <HandThumbUpIcon className="h-4 w-4" /> <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => {
                          const c = prompt("Add a comment:");
                          if (c) addComment(post.id, c);
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <ChatBubbleLeftIcon className="h-4 w-4" /> <span className="text-sm">{post.comments.length}</span>
                      </button>
                      <button
                        onClick={() => sharePost(post)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <ShareIcon className="h-4 w-4" /> <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300">{post.content}</p>
                  {post.image && <img src={post.image} alt="post" className="mt-3 rounded-lg max-h-60 object-cover w-full" />}
                  {post.video && (
                    <video controls className="mt-3 rounded-lg w-full max-h-64">
                      <source src={post.video} />
                    </video>
                  )}
                  {/* Comments */}
                  <div className="mt-3 space-y-2">
                    {post.comments.map((c) => (
                      <div key={c.id} className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{c.author}:</span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">{c.text}</span>
                      </div>
                    ))}
                  </div>
                  {/* Add comment */}
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      placeholder="Write a comment..."
                      className="flex-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm focus:ring-1 focus:ring-indigo-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = (e.target as HTMLInputElement).value;
                          addComment(post.id, val);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <button onClick={() => {}} className="p-2 rounded-lg bg-indigo-600 text-white">
                      <PaperAirplaneIcon className="h-4 w-4 transform rotate-45" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </section>
    </main>
  );
}
