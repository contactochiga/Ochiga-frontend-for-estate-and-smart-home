"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaChevronRight } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();
  const [slideProgress, setSlideProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSlideProgress(value);
    if (value >= 100) {
      setUnlocked(true);
      setTimeout(() => router.push("/ai-dashboard"), 800);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050505] via-[#0c0c0c] to-[#111] text-gray-200 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,1)_70%)]"></div>

      {/* Ochiga Logo or Text */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-semibold tracking-wide text-white mb-3"
      >
        Welcome to <span className="text-[#e11d48]">Ochiga</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-sm md:text-base mb-16"
      >
        Your intelligent infrastructure experience
      </motion.p>

      {/* Slide to Enter Bar */}
      <div className="relative w-72 md:w-96 bg-[#1a1a1a] border border-gray-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: unlocked ? "100%" : `${slideProgress}%` }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e11d48] to-[#8b0000] rounded-full"
        />
        <div className="relative z-10 flex items-center justify-between px-4 py-3 text-xs md:text-sm">
          <span className={unlocked ? "opacity-0" : "text-gray-400"}>
            {unlocked ? "" : "Slide to enter infrastructure"}
          </span>
          <FaChevronRight className={`text-gray-400 ${unlocked ? "opacity-0" : ""}`} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={slideProgress}
          onChange={handleSlide}
          disabled={unlocked}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Unlock Icon Animation */}
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-[#22c55e]"
        >
          <FaLock className="text-4xl animate-bounce" />
        </motion.div>
      )}

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Ochiga Systems — Smart Infrastructure
      </p>
    </div>
  );
}
