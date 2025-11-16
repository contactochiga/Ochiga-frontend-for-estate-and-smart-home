"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import OyiLoader from "../../components/OyiLoader";
import OyiLiquidWave from "../../components/OyiLiquidWave"; // mini static logo

export default function AuthLanding() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative text-white">
      
      {/* ============================
          SPLASH SCREEN
      ============================= */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <OyiLoader size={220} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================
          LANDING CONTENT
      ============================= */}
      <motion.div
        key="landing"
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{
          opacity: showSplash ? 0 : 1,
          scale: showSplash ? 0.995 : 1,
        }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center shadow-xl"
        style={{ pointerEvents: showSplash ? "none" : "auto" }}
      >
        
        {/* ============================
            STATIC LOGO HEADER (REPLACES Oyi TEXT)
        ============================= */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-20 h-20">
            <OyiLiquidWave />
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-8">
          Your Smart Infrastructure Suite
        </p>

        {/* ============================
            BUTTONS
        ============================= */}
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

        <div className="mt-8 text-xs text-gray-500">
          Built & Designed by <span className="text-gray-300">Ochiga</span>
        </div>
      </motion.div>
    </div>
  );
}
