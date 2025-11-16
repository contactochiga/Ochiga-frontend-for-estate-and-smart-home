"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!usernameOrEmail || !password) {
      setError("All fields required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Mock login
      document.cookie = "ochiga_estate_auth=true; path=/";
      router.push("/estate-dashboard");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black px-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/auth")}
        className="absolute top-6 left-6 p-2 rounded-full border border-gray-800 hover:border-gray-600 transition"
      >
        <ArrowLeft className="text-gray-300" size={20} />
      </button>

      {/* Login Card */}
      <div className="w-[90%] max-w-md bg-[#0b0b0b] p-8 rounded-xl border border-gray-800 animate-fadeIn">
        
        <h1 className="text-2xl text-center text-white font-semibold mb-6">
          Login to Your Account
        </h1>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        {/* Username or Email */}
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full p-3 mb-3 rounded bg-black border border-gray-700 text-white placeholder-gray-500"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700 text-white placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full p-3 rounded font-semibold bg-[#02e57d] text-black hover:bg-[#12f08a] transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* Divider */}
        <div className="my-5 text-gray-400 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gray-800" />
          <span>OR</span>
          <div className="flex-1 h-[1px] bg-gray-800" />
        </div>

        {/* Alternative buttons */}
        <button className="w-full p-3 mb-3 bg-white text-black rounded font-medium">
          Continue with Google
        </button>

        <button className="w-full p-3 bg-white text-black rounded font-medium">
          Continue with Apple
        </button>
      </div>
    </div>
  );
}
