"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"manager" | "resident">("resident");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");

  // ✅ Safe JSON helper
  const safeJson = async (res: Response) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  // ✅ Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await safeJson(res);

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
      setMessage("❌ Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup (manager only)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "manager" }),
      });

      const data = await safeJson(res);

      if (res.ok && data.token) {
        saveToken(data.token);
        setMessage("✅ Account created! Redirecting...");
        router.push("/manager-dashboard");
      } else {
        setMessage(`❌ ${data.message || "Signup failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await safeJson(res);

      if (res.ok) {
        setMessage("📩 Reset link sent to your email.");
      } else {
        setMessage(`❌ ${data.message || "Failed to send reset link"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {view === "login" && "Login"}
          {view === "signup" && "Manager Signup"}
          {view === "forgot" && "Forgot Password"}
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm text-red-400">{message}</p>
        )}

        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <div className="flex justify-between text-sm">
              <button type="button" onClick={() => setView("forgot")}>
                Forgot Password?
              </button>
              <button type="button" onClick={() => setView("signup")}>
                Manager Signup
              </button>
            </div>
          </form>
        )}

        {view === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-bold"
            >
              {loading ? "Loading..." : "Signup"}
            </button>
            <button
              type="button"
              className="text-sm"
              onClick={() => setView("login")}
            >
              Back to Login
            </button>
          </form>
        )}

        {view === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 p-3 rounded font-bold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              className="text-sm"
              onClick={() => setView("login")}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
