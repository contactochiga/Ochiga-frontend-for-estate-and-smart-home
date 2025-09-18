"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"manager" | "resident">("resident");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [view, setView] = useState<"login" | "signup" | "forgot">("login"); // 👈 control which form to show

  // ✅ Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        saveToken(data.token);
        setMessage("✅ Login successful! Redirecting...");
        const userRole = data.user?.role || role;
        if (userRole === "manager") {
          router.push("/manager-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setMessage(`❌ ${data.message || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup (manager only)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "manager" }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        saveToken(data.token, "manager");
        router.push("/manager-dashboard");
      } else {
        setMessage(`❌ ${data.message || "Signup failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("📩 Reset link sent to your email.");
      } else {
        setMessage(`❌ ${data.message || "Failed to send reset link"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Ochiga<span className="text-indigo-400">Connect</span>
        </h2>

        {/* 🔀 Role Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-black/40 border border-gray-700 rounded-full overflow-hidden">
            <button
              type="button"
              className={`px-6 py-2 transition ${
                role === "manager"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setRole("manager")}
            >
              Manager 🔑
            </button>
            <button
              type="button"
              className={`px-6 py-2 transition ${
                role === "resident"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setRole("resident")}
            >
              Resident 🏠
            </button>
          </div>
        </div>

        {/* 👇 Forms */}
        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-semibold text-lg"
            >
              {loading ? "Logging in..." : `Login as ${role}`}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm mt-3">
              <button
                type="button"
                onClick={() => setView("forgot")}
                className="text-indigo-400 hover:underline"
              >
                Forgot password?
              </button>

              {role === "manager" && (
                <button
                  type="button"
                  onClick={() => setView("signup")}
                  className="text-purple-400 hover:underline"
                >
                  Create account
                </button>
              )}
            </div>
          </form>
        )}

        {view === "signup" && role === "manager" && (
          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="email"
              placeholder="Manager email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
            />
            <input
              type="password"
              placeholder="Choose password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 transition font-semibold text-lg"
            >
              {loading ? "Signing up..." : "Create Manager Account"}
            </button>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-indigo-400 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        )}

        {view === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your account email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-600 hover:opacity-90 transition font-semibold text-lg"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <p className="text-sm text-center mt-3">
              Back to{" "}
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-indigo-400 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
}
