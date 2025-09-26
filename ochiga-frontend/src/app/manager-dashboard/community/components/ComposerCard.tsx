"use client";
import React, { useRef } from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

type Props = {
  newPostText: string;
  setNewPostText: (t: string) => void;
  media: { image?: string | null; video?: string | null };
  setMedia: (m: any) => void;
  makePost: () => void;
};

export default function ComposerCard({
  newPostText,
  setNewPostText,
  media,
  setMedia,
  makePost,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setMedia((prev: any) => ({ ...prev, [type]: url }));
  };

  return (
    <div className="rounded-xl shadow-lg p-5 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:via-black dark:to-gray-900 text-gray-900 dark:text-gray-100 transition hover:shadow-xl">
      {/* Input */}
      <textarea
        placeholder="Share an update with your estate..."
        className="w-full bg-transparent resize-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-indigo-500"
        rows={3}
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />

      {/* Media Preview */}
      {media.image && (
        <img
          src={media.image}
          alt="preview"
          className="mt-4 w-full rounded-lg max-h-64 object-cover shadow-md"
        />
      )}
      {media.video && (
        <video controls className="mt-4 w-full rounded-lg max-h-64 shadow-md">
          <source src={media.video} />
        </video>
      )}

      {/* Actions */}
      <div className="flex items-center justify-start mt-4">
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-sm font-medium"
          >
            <PhotoIcon className="h-5 w-5" /> <span>Photo</span>
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileRef}
            onChange={(e) => handleFileUpload(e, "image")}
          />

          <button
            onClick={() => videoRef.current?.click()}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-sm font-medium"
          >
            <VideoCameraIcon className="h-5 w-5" /> <span>Video</span>
          </button>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={videoRef}
            onChange={(e) => handleFileUpload(e, "video")}
          />

          <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-sm font-medium">
            <ChartBarIcon className="h-5 w-5" /> <span>Poll</span>
          </button>

          {/* Post CTA now sits with them */}
          <button
            onClick={makePost}
            className="ml-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-95 transition font-medium"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
