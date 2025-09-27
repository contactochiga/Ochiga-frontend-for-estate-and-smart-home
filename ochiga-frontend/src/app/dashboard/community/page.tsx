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
  PostCard, // ✅ comes directly from ./components/index.ts
} from "./components";

import { Post, Group } from "../../../types";
