"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import OyiLoader from "../../components/OyiLoader";
import OyiLiquidWave from "../../components/OyiLiquidWave";

export default function AuthLanding() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // First hide splash
    const t = setTimeout(() => {
      setShowSplash(false);

      // Slight delay before auth UI slides in
      setTimeout(() => setShowAuth(true), 300);
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative">

      {/* ---------------------------
          SPLASH SCREEN
      ---------------------------- */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <OyiLoader size={260} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------
          SLIDING LOGO (ChatGPT style)
      ---------------------------- */}
      <motion.div
        initial={{ y: 140, scale: 1.2, opacity: 0 }}
        animate={
          showAuth
            ? { y: 40, scale: 0.7, opacity: 1 }
            : { y: 140, scale: 1.2, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="mt-10"
      >
        <div className="w-28 h-28 flex items-center justify-center">
          <OyiLiquidWave />
        </div>
      </motion.div>

      {/* ---------------------------
          AUTH CARD SLIDES UP
      ---------------------------- */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            key="auth-card"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl px-8 py-10 mt-6 shadow-xl"
          >
            {/* Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex flex-col gap-4"
            >
              {/* Google */}
              <motion.button
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium"
              >
                Continue with Google
              </motion.button>

              {/* Apple */}
              <motion.button
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium"
              >
                Continue with Apple
              </motion.button>

              {/* Email */}
              <motion.button
                onClick={() => router.push("/auth/resident-complete")}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium"
              >
                Continue with Email
              </motion.button>

              {/* Sign Up */}
              <motion.button
                onClick={() => router.push("/auth/estate-complete")}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Sign Up
              </motion.button>
            </motion.div>

            {/* Footer links */}
            <div className="flex items-center justify-between mt-6 text-xs text-gray-400">
              <button className="hover:text-gray-200">
                Enter Home
              </button>

              <button className="hover:text-gray-200">
                Forgot your password?
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
