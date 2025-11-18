"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaApple } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

export default function EstateAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSignup = async () => {
    if (!email || !password || !username) {
      setError("All fields required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          role: "estate",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      // ✅ store JWT
      localStorage.setItem("ochiga_token", data.token);

      router.push("/estate-dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">

      {/* BACK ARROW */}
      <button
        onClick={() => router.push("/auth")}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition"
      >
        <IoChevronBack size={28} />
      </button>

      {/* AUTH CARD */}
      <div className="w-[90%] max-w-md bg-[#111] p-8 rounded-2xl border border-gray-800 shadow-xl animate-fadeIn">
        <h1 className="text-2xl text-center text-white font-semibold mb-6">
          Create Estate Account
        </h1>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:border-[#B22222]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-3 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:border-[#B22222]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create password"
          className="w-full p-3 mb-6 rounded-xl bg-black border border-gray-700 text-white focus:outline-none focus:border-[#B22222]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full p-3 mb-4 bg-[#B22222] hover:bg-[#8B0000] rounded-xl text-white font-semibold transition"
        >
          {loading ? "Processing..." : "Create Account"}
        </button>

        <div className="my-5 text-gray-400 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gray-700" />
          <span>OR</span>
          <div className="flex-1 h-[1px] bg-gray-700" />
        </div>

        {/* Apple */}
        <button className="w-full p-3 mb-3 bg-gray-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition">
          <FaApple /> Continue with Apple
        </button>

        {/* Google */}
        <button className="w-full p-3 mb-0 bg-gray-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition">
          <FaGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
}
