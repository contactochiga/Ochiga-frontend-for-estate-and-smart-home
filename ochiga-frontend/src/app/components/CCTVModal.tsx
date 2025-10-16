"use client";

import { useEffect, useRef, useState } from "react";
import { MdCameraswitch, MdZoomIn, MdZoomOut, MdClose } from "react-icons/md";

interface CCTVModalProps {
  deviceId: string;
  onClose: () => void;
}

export default function CCTVModal({ deviceId, onClose }: CCTVModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isOnline, setIsOnline] = useState(true);

  // Simulated WebSocket for live connection visual
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleZoomIn = () => {
    if (zoom < 2) setZoom((z) => z + 0.1);
  };
  const handleZoomOut = () => {
    if (zoom > 1) setZoom((z) => z - 0.1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-5 shadow-xl animate-scaleUp relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <MdClose className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            CCTV Live Feed
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Device ID: {deviceId}
          </p>
        </div>

        {/* Live feed area */}
        <div
          className="relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center"
          style={{ height: "220px" }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
            autoPlay
            muted
            loop
            playsInline
            src="/sample-feed.mp4" // replace with your real stream or WebRTC source
          />
          {!isOnline && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-sm">
              <span className="animate-pulse mb-2 text-[#800000]">Offline</span>
              <span>Attempting to reconnect...</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-around mt-5">
          <button
            onClick={handleZoomOut}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <MdZoomOut className="text-lg" />
          </button>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`p-3 rounded-xl transition-all ${
              isOnline
                ? "bg-gradient-to-r from-[#800000] to-black text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400"
            }`}
          >
            <MdCameraswitch className="text-lg" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <MdZoomIn className="text-lg" />
          </button>
        </div>

        {/* Status */}
        <div className="mt-3 text-center">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          ></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isOnline ? "Live Streaming" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
