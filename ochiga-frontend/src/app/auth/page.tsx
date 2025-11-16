"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import OyiLiquidWave from "../../components/OyiLiquidWave";
import { FaO } from "react-icons/fa"; // optional, remove if not used

/**
 * Auth landing that first shows a Jelly-wave splash,
 * then fades into the landing selection UI (Resident / Estate).
 *
 * - No auto-login.
 * - Splash runs ~2600ms then reveals landing.
 */

export default function AuthLanding() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2600); // ~2.6s animation
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative text-white">
      {/* Splash overlay */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.86, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Circular badge with wave inside */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.3, repeat: 1, ease: "easeInOut" }}
                className="w-40 h-40 rounded-full bg-white/6 border border-white/8 flex items-center justify-center shadow-2xl"
                style={{ backdropFilter: "blur(6px)" }}
              >
                {/* small badge background circle */}
                <div className="w-[86%] h-[86%] rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <div className="w-[78%] h-[78%] rounded-full bg-gradient-to-tr from-[#111318] to-[#0b0d10] flex items-center justify-center">
                    {/* the wave sits horizontally centered */}
                    <div style={{ width: "78%", height: "34px", overflow: "hidden", borderRadius: 999 }}>
                      <OyiLiquidWave color="#e11d48" size="medium" barCount={88} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* App name below splash */}
              <motion.h2
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-2xl font-bold tracking-tight"
              >
                Oyi
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-400 max-w-xs text-center"
              >
                Your Smart Infrastructure Suite
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main landing content (revealed after splash) */}
      <motion.div
        key="landing"
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: showSplash ? 0 : 1, scale: showSplash ? 0.995 : 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center shadow-xl"
        style={{ pointerEvents: showSplash ? "none" : "auto" }}
      >
        {/* Title row with icon */}
        <div className="flex items-center justify-center gap-3 mb-2">
          {/* Icon badge left of title (small) */}
          <div className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center">
            <div style={{ width: 34, height: 34 }} className="flex items-center justify-center">
              {/* reuse the wave as mini logo inside the icon */}
              <div style={{ width: 34, height: 12, overflow: "hidden", borderRadius: 999 }}>
                <OyiLiquidWave color="#e11d48" size="small" barCount={40} />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold">Oyi</h1>
        </div>

        <p className="text-gray-400 text-sm mb-8">Your Smart Infrastructure Suite</p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/auth/resident-complete")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Resident Login
          </button>

          <button
            onClick={() => router.push("/auth/estate-complete")}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-medium transition"
          >
            Estate Admin Signup
          </button>
        </div>

        {/* Footer credit */}
        <div className="mt-8 text-xs text-gray-500">
          Built & Designed by <span className="text-gray-300">Ochiga</span>
        </div>
      </motion.div>
    </div>
  );
}
