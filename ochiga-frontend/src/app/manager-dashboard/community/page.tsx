"use client";

import React, { useState } from "react";
import {
  ComposerCard,
  PinnedPostCard,
  GroupsCard,
  FeedPostCard,
} from "./components";
import type { Post, Group } from "./types";

export default function ManagerCommunityPage() {
  // ---------------------------
  // State
  // ---------------------------
  const [newPostText, setNewPostText] = useState("");
  const [media, setMedia] = useState<{ image?: string | null; video?: string | null }>({});
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Admin",
      content: "Welcome to the community!",
      likes: 2,
      comments: [{ id: 1, author: "Resident A", text: "Thanks!" }],
      pinned: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Security Updates", members: 45, joined: false },
    { id: 2, name: "Facility Maintenance", members: 30, joined: true },
    { id: 3, name: "Neighbourhood Watch", members: 15, joined: false },
  ]);

  // ---------------------------
  // Handlers
  // ---------------------------
  const makePost = () => {
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: "Manager",
      content: newPostText,
      image: media.image || null,
      video: media.video || null,
      likes: 0,
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
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
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
                { id: Date.now(), author: "Manager", text },
              ],
            }
          : p
      )
    );
  };

  const sharePost = (post: Post) => {
    // For now, just log it. Later you can add backend logging or UI modal.
    console.log("Shared post:", post);
    alert(`Shared post: "${post.content}"`);
  };

  const toggleJoinGroup = (id: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, joined: !g.joined } : g
      )
    );
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        <GroupsCard groups={groups} toggleJoinGroup={toggleJoinGroup} />
      </div>

      {/* Main Feed */}
      <div className="space-y-6 md:col-span-2">
        {/* Composer */}
        <ComposerCard
          newPostText={newPostText}
          setNewPostText={setNewPostText}
          media={media}
          setMedia={setMedia}
          makePost={makePost}
        />

        {/* Pinned Posts */}
        {posts
          .filter((p) => p.pinned)
          .map((p) => (
            <PinnedPostCard key={p.id} post={p} />
          ))}

        {/* Feed */}
        {posts
          .filter((p) => !p.pinned)
          .map((p) => (
            <FeedPostCard
              key={p.id}
              post={p}
              toggleLike={toggleLike}
              addComment={addComment}
              sharePost={sharePost}
            />
          ))}
      </div>
    </div>
  );
}
