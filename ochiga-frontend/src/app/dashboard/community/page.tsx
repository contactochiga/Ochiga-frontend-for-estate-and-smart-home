"use client";

import { useState } from "react";
import { PhotoIcon, VideoCameraIcon, ChartBarIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function CommunityPage() {
  const [announcements] = useState([
    {
      id: 1,
      title: "General Meeting",
      content: "All residents are invited for the estate general meeting on Saturday 31st at 12 PM.",
      date: "2025-08-20",
    },
    {
      id: 2,
      title: "Water Supply Notice",
      content: "Water supply will be temporarily unavailable from 9 AM – 2 PM tomorrow due to maintenance.",
      date: "2025-08-22",
    },
  ]);

  const [groups] = useState([
    { id: 1, name: "Gym & Fitness Club", members: 25 },
    { id: 2, name: "Parents Forum", members: 40 },
    { id: 3, name: "Security Watch", members: 18 },
  ]);

  const [posts, setPosts] = useState<any[]>([
    {
      id: 1,
      author: "Estate Manager",
      content: "Welcome to the new Community Hub! 🎉 Share your thoughts, updates, or even photos.",
      image: null,
      video: null,
      likes: 5,
      comments: [
        { id: 1, author: "Jane D.", text: "This looks amazing 👏👏" },
        { id: 2, author: "Mark T.", text: "Finally, something interactive for us!" },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: posts.length + 1,
        author: "You",
        content: newPost,
        image: null,
        video: null,
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost("");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Community
      </h1>

      {/* Announcements */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">📢 Announcements</h2>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {a.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{a.content}</p>
              <p className="text-xs text-gray-400 mt-2">📅 {a.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Groups */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">👥 Groups</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <div
              key={g.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{g.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{g.members} members</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Post Composer */}
      <section className="mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update with your estate..."
            className="w-full p-2 rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            rows={3}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <PhotoIcon className="h-5 w-5" /> Photo
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <VideoCameraIcon className="h-5 w-5" /> Video
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ChartBarIcon className="h-5 w-5" /> Poll
              </button>
            </div>
            <button
              onClick={handlePost}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {post.author}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="post" className="mt-3 rounded-lg" />
            )}
            {post.video && (
              <video controls className="mt-3 rounded-lg w-full">
                <source src={post.video} type="video/mp4" />
              </video>
            )}
            {/* Actions */}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <HandThumbUpIcon className="h-4 w-4" /> {post.likes} Likes
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ChatBubbleLeftIcon className="h-4 w-4" /> {post.comments.length} Comments
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
                  <span className="text-gray-700 dark:text-gray-300">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
