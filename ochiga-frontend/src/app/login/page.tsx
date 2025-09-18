"use client";

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
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "manager" }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        saveToken(data.token);
        setMessage("✅ Account created! Redirecting...");
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
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
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
    // 🚀 Your UI stays exactly the same as before
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* ...rest of your JSX */}
    </div>
  );
}
