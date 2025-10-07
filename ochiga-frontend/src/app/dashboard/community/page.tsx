"use client";

import React, { useState } from "react";
import { ComposerCard, PinnedPostCard, GroupsCard, PostCard } from "./components";
import { Post, Group } from "./types";

export default function CommunityPage() {
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

  const [newPostText, setNewPostText] = useState("");
  const [media, setMedia] = useState<{ image?: string | null; video?: string | null }>({});

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
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1 }
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
    alert("Post details copied to clipboard.");
  };

  const toggleJoinGroup = (id: number) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g))
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-5 space-y-6">
      {/* ✅ Header */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Community
      </h1>

      {/* ✅ Composer Card */}
      <ComposerCard
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        media={media}
        setMedia={setMedia}
        makePost={makePost}
      />

      {/* ✅ Pinned Posts */}
      {posts
        .filter((p) => p.pinned)
        .map((p) => (
          <PinnedPostCard key={p.id} post={p} />
        ))}

      {/* ✅ Groups Section */}
      <GroupsCard groups={groups} toggleJoinGroup={toggleJoinGroup} />

      {/* ✅ Regular Posts */}
      {posts
        .filter((p) => !p.pinned)
        .map((post) => (
          <PostCard
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            addComment={addComment}
            sharePost={sharePost}
          />
        ))}
    </main>
  );
}
