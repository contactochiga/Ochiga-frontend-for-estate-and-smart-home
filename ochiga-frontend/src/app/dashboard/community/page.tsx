// src/app/dashboard/community/page.tsx
"use client";

import React, { useState, useRef } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

// ✅ Centralized card imports
import {
  ComposerCard,
  PinnedPostCard,
  GroupsCard,
  FeedPostCard,
} from "./components";

// ✅ Import shared types
import { Post, Group } from "../../../types";

export default function CommunityPage() {
  // ... (your existing state and helpers stay the same)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 space-y-6">
      
      {/* ✅ Sub-header with just the message icon */}
      <div className="flex justify-end pb-2 border-b border-gray-200 dark:border-gray-700">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* ✅ Composer Card */}
      <ComposerCard
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        media={media}
        setMedia={setMedia}
        fileRef={fileRef}
        videoRef={videoRef}
        makePost={makePost}
      />

      {/* ✅ Pinned Post Card */}
      {posts.filter((p) => p.pinned).map((p) => (
        <PinnedPostCard key={p.id} post={p} />
      ))}

      {/* ✅ Groups Card */}
      <GroupsCard groups={groups} toggleJoinGroup={toggleJoinGroup} />

      {/* ✅ Feed Posts */}
      {posts.filter((p) => !p.pinned).map((post) => (
        <FeedPostCard
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
