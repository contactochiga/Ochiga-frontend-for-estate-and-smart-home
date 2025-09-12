"use client";

import { useState, useRef } from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([
    {
      id: 1,
      author: "Estate Manager",
      content:
        "Welcome to the new Ochiga Community Hub 🎉. Share updates, connect with neighbors, and stay informed about estate events.",
      image: null,
      video: null,
      likes: 8,
      comments: [
        { id: 1, author: "Jane D.", text: "This looks amazing 👏" },
        { id: 2, author: "Mark T.", text: "Finally, something interactive!" },
      ],
      pinned: true,
    },
  ]);

  const [groups] = useState([
    { id: 1, name: "Gym & Fitness Club", members: 25 },
    { id: 2, name: "Parents Forum", members: 40 },
    { id: 3, name: "Security Watch", members: 18 },
    { id: 4, name: "Football Crew", members: 15 },
  ]);

  const [newPost, setNewPost] = useState("");
  const [media, setMedia] = useState<{ image?: string; video?: string }>({});
  const [activeComment, setActiveComment] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const handlePost = () => {
    if (!newPost.trim() && !media.image && !media.video) return;
    setPosts([
      {
        id: posts.length + 1,
        author: "You",
        content: newPost,
        image: media.image || null,
        video: media.video || null,
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost("");
    setMedia({});
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMedia((prev) => ({ ...prev, [type]: url }));
    }
  };

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleComment = (id: number) => {
    if (!activeComment.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: p.comments.length + 1, author: "You", text: activeComment },
              ],
            }
          : p
      )
    );
    setActiveComment("");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      {/* Header with DM button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Community
        </h1>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
          <EnvelopeIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Post Composer */}
      <section className="mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update with your estate..."
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          {media.image && (
            <img
              src={media.image}
              alt="preview"
              className="mt-3 rounded-lg max-h-60 object-cover"
            />
          )}
          {media.video && (
            <video controls className="mt-3 rounded-lg w-full max-h-64">
              <source src={media.video} type="video/mp4" />
            </video>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <PhotoIcon className="h-5 w-5" /> Photo
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFileUpload(e, "image")}
              />
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <VideoCameraIcon className="h-5 w-5" /> Video
              </button>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={videoInputRef}
                onChange={(e) => handleFileUpload(e, "video")}
              />
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ChartBarIcon className="h-5 w-5" /> Poll
              </button>
            </div>
            <button
              onClick={handlePost}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
            >
              Post
            </button>
          </div>
        </div>
      </section>

      {/* Pinned Post */}
      <section className="mb-8">
        {posts
          .filter((p) => p.pinned)
          .map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-r from-slate-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl shadow-lg mb-4"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {post.author} 📌
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
            </div>
          ))}
      </section>

      {/* Groups */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">👥 Groups you may like</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {groups.map((g) => (
            <div
              key={g.id}
              className="min-w-[220px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {g.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {g.members} members
              </p>
              <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-1.5 rounded hover:opacity-90">
                Join Group
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
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {post.author}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="mt-3 rounded-lg max-h-60 object-cover"
                />
              )}
              {post.video && (
                <video controls className="mt-3 rounded-lg w-full max-h-64">
                  <source src={post.video} type="video/mp4" />
                </video>
              )}

              {/* Post Actions */}
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <HandThumbUpIcon className="h-4 w-4" /> {post.likes} Likes
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ChatBubbleLeftIcon className="h-4 w-4" />{" "}
                  {post.comments.length} Comments
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ShareIcon className="h-4 w-4" /> Share
                </button>
              </div>

              {/* Comments */}
              <div className="mt-3 space-y-2">
                {post.comments.map((c) => (
                  <div
                    key={c.id}
                    className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {c.author}:
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {c.text}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={activeComment}
                    onChange={(e) => setActiveComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 text-sm"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
