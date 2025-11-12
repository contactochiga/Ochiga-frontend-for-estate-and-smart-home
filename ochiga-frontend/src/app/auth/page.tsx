"use client";

import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    // TODO: handle auth logic
    alert(`${mode === "login" ? "Logged in" : "Signed up"} as ${email}`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
        Ochiga Infrastructure Suite
      </h1>

      {/* Auth Container */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-6 shadow-lg">
        {/* Toggle Login / Sign-Up */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              mode === "login"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              mode === "signup"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
            <FaGoogle className="text-lg" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
            <FaApple className="text-lg" /> Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="flex-1 border-t border-gray-700"></span>
          <span>or continue with email</span>
          <span className="flex-1 border-t border-gray-700"></span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-all"
          >
            {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
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
      </div>

      <p className="mt-8 text-gray-600 text-xs text-center">
        © {new Date().getFullYear()} Ochiga Systems — Smart Infrastructure
      </p>
    </div>
  );
}
