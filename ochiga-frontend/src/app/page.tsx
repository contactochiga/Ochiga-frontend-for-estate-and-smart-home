"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaLockOpen } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (unlocked) {
      const timer = setTimeout(() => router.push("/ai-dashboard"), 1000);
      return () => clearTimeout(timer);
    }
  }, [unlocked, router]);

  // Handle touch drag
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSliding(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSliding || unlocked) return;
    const deltaX = e.touches[0].clientX - (touchStartX ?? 0);
    const newProgress = Math.min(Math.max((deltaX / 250) * 100, 0), 100);
    setProgress(newProgress);
    if (newProgress >= 100) setUnlocked(true);
  };

  const handleTouchEnd = () => {
    if (!unlocked) setProgress(0);
    setIsSliding(false);
  };

  // Handle mouse drag for desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setTouchStartX(e.clientX);
    setIsSliding(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSliding || unlocked) return;
    const deltaX = e.clientX - (touchStartX ?? 0);
    const newProgress = Math.min(Math.max((deltaX / 250) * 100, 0), 100);
    setProgress(newProgress);
    if (newProgress >= 100) setUnlocked(true);
  };

  const handleMouseUp = () => {
    if (!unlocked) setProgress(0);
    setIsSliding(false);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-gray-200">
      {/* Subtle background gradient + glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Centered Welcome */}
      <div className="z-10 text-center select-none">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-semibold tracking-wide text-white mb-3"
        >
          Welcome to <span className="text-[#e11d48]">Ochiga</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-400 text-sm md:text-lg mb-20"
        >
          Your intelligent infrastructure experience
        </motion.p>

        {/* Slide bar */}
        <div
          className="relative mx-auto w-[280px] md:w-[360px] h-14 bg-[#111] border border-[#222] rounded-full overflow-hidden backdrop-blur-lg shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Track glow */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e11d48] to-[#7f1d1d]"
            style={{ width: `${progress}%` }}
          />

          {/* Text + glow animation */}
          <AnimatePresence>
            {!unlocked && (
              <motion.div
                key="slide-text"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 flex items-center justify-center text-sm md:text-base text-gray-400"
              >
                Slide to enter infrastructure
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slider knob */}
          <motion.div
            className={`absolute top-1 left-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48] to-[#7f1d1d] flex items-center justify-center shadow-lg cursor-pointer ${
              unlocked ? "hidden" : ""
            }`}
            style={{ transform: `translateX(${progress * 2.4}px)` }}
          >
            <FaChevronRight className="text-white text-lg" />
          </motion.div>
        </div>

        {/* Unlock animation */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 flex items-center justify-center gap-2 text-green-400 text-lg"
            >
              <FaLockOpen className="animate-bounce" /> Infrastructure Online
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-xs text-gray-600"
      >
        © {new Date().getFullYear()} Ochiga Systems — Smart Infrastructure
      </motion.p>
    </div>
  );
}
