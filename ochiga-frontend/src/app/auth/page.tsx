"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import OyiLoader from "../../components/OyiLoader";
import OyiLiquidWave from "../../components/OyiLiquidWave";
import { FaGoogle, FaApple } from "react-icons/fa"; // Import Google & Apple logos

export default function AuthLanding() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setShowAuth(true), 300);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden">

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
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <OyiLoader size={260} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------
          LOGO + TAGLINE
      ---------------------------- */}
      <div className="flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ scale: 1.5, y: 0 }}
          animate={showAuth ? { scale: 0.7, y: 0 } : { scale: 1.5, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="flex items-center justify-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24">
            <OyiLiquidWave />
          </div>
        </motion.div>

        {/* Tagline */}
        <AnimatePresence>
          {showAuth && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center text-gray-400 text-xs sm:text-sm md:text-base font-medium"
            >
              Smart Infrastructure Suite
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------------------
          AUTH CARD
      ---------------------------- */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            key="auth-card"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="w-full max-w-sm sm:max-w-md bg-[#111] border border-gray-800 rounded-2xl px-6 sm:px-8 py-8 sm:py-10 shadow-xl mt-6"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-4"
            >
              {/* Google */}
              <motion.button
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <FaGoogle className="text-white" /> Continue with Google
              </motion.button>

              {/* Apple */}
              <motion.button
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <FaApple className="text-white" /> Continue with Apple
              </motion.button>

              {/* Email */}
              <motion.button
                onClick={() => router.push("/auth/resident-complete")}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm sm:text-base"
              >
                Continue with Email
              </motion.button>

              {/* Sign Up */}
              <motion.button
                onClick={() => router.push("/auth/estate-complete")}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="w-full py-3 rounded-xl bg-[#B22222] hover:bg-[#8B0000] text-white font-medium text-sm sm:text-base"
              >
                Sign Up
              </motion.button>
            </motion.div>

            <div className="flex items-center justify-between mt-6 text-xs text-gray-400">
              <button className="hover:text-gray-200">Enter Home</button>
              <button className="hover:text-gray-200">Forgot your password?</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
