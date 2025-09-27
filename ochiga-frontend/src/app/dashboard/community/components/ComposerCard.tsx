"use client";
import React, { useRef } from "react";
import { PhotoIcon, VideoCameraIcon, ChartBarIcon } from "@heroicons/react/24/outline";

type Props = {
  newPostText: string;
  setNewPostText: (t: string) => void;
  media: { image?: string | null; video?: string | null };
  setMedia: (m: any) => void;
  makePost: () => void;
};

export default function ComposerCard({ newPostText, setNewPostText, media, setMedia, makePost }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setMedia((prev: any) => ({ ...prev, [type]: url }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <textarea
        placeholder="Share an update with your estate..."
        className="w-full bg-transparent resize-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 rounded-md border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
        rows={3}
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
      />
      {media.image && <img src={media.image} alt="preview" className="mt-3 w-full rounded-lg max-h-64 object-cover" />}
      {media.video && (
        <video controls className="mt-3 w-full rounded-lg max-h-64">
          <source src={media.video} />
        </video>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <PhotoIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Photo</span>
          </button>
          <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={(e) => handleFileUpload(e, "image")} />

          <button onClick={() => videoRef.current?.click()} className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <VideoCameraIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Video</span>
          </button>
          <input type="file" accept="video/*" className="hidden" ref={videoRef} onChange={(e) => handleFileUpload(e, "video")} />

          <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <ChartBarIcon className="h-5 w-5" /> <span className="text-sm hidden sm:inline">Poll</span>
          </button>
        </div>

        <button onClick={makePost} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95 transition">
          Post
        </button>
      </div>
    </div>
  );
}
