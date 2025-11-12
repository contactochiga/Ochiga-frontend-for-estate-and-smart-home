"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEnvelope } from "react-icons/fa";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${mode === "login" ? "Logging in" : "Signing up"} with ${email}`);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-gray-200 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[90%] max-w-md bg-[#111]/70 backdrop-blur-xl border border-[#222] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-white">
            Welcome to <span className="text-[#e11d48]">Ochiga</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {mode === "login"
              ? "Access your Smart Estate Dashboard"
              : "Create your Smart Estate account"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setMode("login");
              setShowEmail(false);
            }}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              mode === "login"
                ? "bg-[#e11d48] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setShowEmail(false);
            }}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              mode === "signup"
                ? "bg-[#e11d48] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            <FcGoogle className="text-lg" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
            <FaApple className="text-lg" /> Continue with Apple
          </button>
          <button
            onClick={() => setShowEmail(!showEmail)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e11d48] to-[#7f1d1d] py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <FaEnvelope className="text-lg" /> Continue with Email
          </button>
        </div>

        {/* Email Form (Animated) */}
        <AnimatePresence>
          {showEmail && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm outline-none focus:ring-2 focus:ring-[#e11d48]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm outline-none focus:ring-2 focus:ring-[#e11d48]"
                required
              />

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#e11d48] to-[#7f1d1d] py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          {mode === "login"
            ? "New here? "
            : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setShowEmail(false);
            }}
            className="text-[#e11d48] hover:underline"
          >
            {mode === "login" ? "Create an account" : "Login here"}
          </button>
        </p>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-xs text-gray-600"
      >
        © {new Date().getFullYear()} Ochiga Systems — Smart Infrastructure
      </motion.p>
    </div>
  );
}
