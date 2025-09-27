// src/app/dashboard/community/page.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  ComposerCard,
  PinnedPostCard,
  GroupsCard,
  PostCard,
} from "./components";

import { Post, Group } from "../../../types";

// Dummy posts (replace later with API data)
const posts: Post[] = [
  {
    id: 1,
    author: "Ochiga",
    content: "Welcome to the community 🚀",
    timestamp: new Date().toISOString(),
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <ComposerCard />

      <PinnedPostCard />

      <GroupsCard />

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
