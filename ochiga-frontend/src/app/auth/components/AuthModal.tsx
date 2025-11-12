"use client";

import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [creating, setCreating] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await new Promise((res) => setTimeout(res, 1500));
    alert("Account created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-sm border border-gray-800 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-300 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

        <div className="flex flex-col space-y-3 mb-5">
          <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded transition">
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded transition">
            <FaApple className="text-white" /> Sign up with Apple
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">or use email</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-semibold transition-all"
          >
            {creating ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          By signing up, you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
