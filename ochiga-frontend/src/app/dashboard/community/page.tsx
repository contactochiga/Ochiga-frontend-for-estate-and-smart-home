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
} from "./components"; // ✅ all from index.ts

import { Post, Group } from "../../../types";
