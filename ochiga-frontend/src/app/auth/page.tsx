"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaCheck, FaApple, FaGoogle } from "react-icons/fa";

export default function LandingPageWithAuth() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Auth states
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Slide completion → show auth
  useEffect(() => {
    if (unlocked) {
      const timer1 = setTimeout(() => setLoadingDone(true), 2000);
      return () => clearTimeout(timer1);
    }
  }, [unlocked]);

  // Slide handlers
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

  // Auth submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    alert(`${mode === "login" ? "Logged in" : "Signed up"} as ${email}`);
    setAuthLoading(false);
    router.push("/dashboard"); // redirect to dashboard
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Center content */}
      <div className="z-10 text-center select-none w-full max-w-md px-6">
        {!unlocked && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-semibold tracking-wide text-white mb-3"
            >
              Ochiga Infrastructure Suite
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-gray-400 text-sm md:text-lg mb-20"
            >
              Your intelligent infrastructure experience
            </motion.p>

            {/* Slide Bar */}
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
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e11d48] to-[#7f1d1d]"
                style={{ width: `${progress}%` }}
              />
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
              <motion.div
                className={`absolute top-1 left-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48] to-[#7f1d1d] flex items-center justify-center shadow-lg cursor-pointer ${
                  unlocked ? "hidden" : ""
                }`}
                style={{ transform: `translateX(${progress * 2.4}px)` }}
              >
                <FaChevronRight className="text-white text-lg" />
              </motion.div>
            </div>

            {/* Loading spinner */}
            <AnimatePresence>
              {unlocked && !loadingDone && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-10 flex flex-col items-center gap-3"
                >
                  <div className="w-8 h-8 border-2 border-gray-600 border-t-[#22c55e] rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm animate-pulse">
                    Initializing Infrastructure...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Auth container */}
        {unlocked && loadingDone && (
          <motion.div
            key="auth-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-6 shadow-lg mt-6"
          >
            {/* Social buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-3 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
                <FaGoogle className="text-lg" /> Continue with Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
                <FaApple className="text-lg" /> Continue with Apple
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="flex-1 border-t border-gray-700"></span>
              <span>or continue with email</span>
              <span className="flex-1 border-t border-gray-700"></span>
            </div>

            {/* Email form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-600 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-600 outline-none"
              />
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-all"
              >
                {authLoading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Footer toggle */}
            <p className="text-gray-400 text-sm text-center mt-2">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-red-500 font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-red-500 font-semibold"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </motion.div>
        )}
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
