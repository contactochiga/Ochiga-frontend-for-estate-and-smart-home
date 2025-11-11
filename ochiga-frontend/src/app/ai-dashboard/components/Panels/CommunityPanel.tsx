"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaShareAlt } from "react-icons/fa";

export default function CommunityPanel() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Estate Manager",
      content:
        "Welcome to the Ochiga Community Hub 🎉 Use this space for estate updates and discussions.",
      pinned: true,
      likes: 12,
      liked: false,
      comments: [
        { id: 1, author: "Jane D.", text: "Thanks for this update!" },
        { id: 2, author: "Mark T.", text: "Glad to see this working." },
      ],
    },
    {
      id: 2,
      author: "Aisha B.",
      content: "Anyone know a reliable plumber around Phase 2?",
      pinned: false,
      likes: 3,
      liked: false,
      comments: [{ id: 1, author: "Paul", text: "Try BrightFix—they’re quick." }],
    },
  ]);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="mt-2 p-3 bg-gray-900/90 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-3 text-blue-400 font-semibold">💬 Community</p>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`p-3 rounded-lg ${
              post.pinned
                ? "bg-blue-950/60 border border-blue-700/40"
                : "bg-gray-800/60 border border-gray-700"
            }`}
          >
            {/* Author + Content */}
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 font-medium">{post.author}</span>
              {post.pinned && (
                <span className="text-[10px] bg-blue-700/40 px-2 py-0.5 rounded-full">
                  📌 Pinned
                </span>
              )}
            </div>
            <p className="mt-1 text-gray-300 text-[13px]">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-2 text-gray-400">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1 hover:text-red-400 transition"
              >
                {post.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-sky-400">
                <FaRegCommentDots />
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-amber-400">
                <FaShareAlt />
              </button>
            </div>

            {/* Comments */}
            <div className="mt-2 space-y-1 border-t border-gray-700/50 pt-2">
              {post.comments.map((c) => (
                <p key={c.id} className="text-gray-400 text-[12px]">
                  <span className="text-gray-300 font-medium">{c.author}: </span>
                  {c.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
