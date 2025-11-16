"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OyiLiquidWave from "../../components/OyiLiquidWave";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-start overflow-hidden">

      {/* ---------------------------
          LOGO + TAGLINE
      ---------------------------- */}
      <motion.div
        className="flex flex-col items-center justify-center mt-24"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <OyiLiquidWave />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-center text-gray-400 text-xs sm:text-sm md:text-base font-medium"
        >
          Smart Infrastructure Suite
        </motion.div>
      </motion.div>

      {/* ---------------------------
          AUTH CARD
      ---------------------------- */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        className="w-full max-w-sm sm:max-w-md bg-[#111] border border-gray-800 rounded-2xl px-6 sm:px-8 py-10 shadow-xl mt-10"
      >
        <div className="flex flex-col gap-4">

          <button className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center justify-center gap-2">
            <FaApple /> Continue with Apple
          </button>

          <button className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center justify-center gap-2">
            <FaGoogle /> Continue with Google
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium"
          >
            Continue with Email
          </button>

          <button
            onClick={() => router.push("/auth/estate-complete")}
            className="w-full py-3 rounded-xl bg-[#B22222] hover:bg-[#8B0000] text-white font-medium"
          >
            Sign Up
          </button>

        </div>

        <div className="flex items-center justify-between mt-6 text-xs text-gray-400">
          
          {/* UPDATED: Enter Home now leads to resident activation */}
          <button
            onClick={() => router.push("/auth/resident-complete")}
            className="hover:text-gray-200"
          >
            Enter Home
          </button>

          <button className="hover:text-gray-200">Forgot your password?</button>
        </div>
      </motion.div>

    </div>
  );
}
