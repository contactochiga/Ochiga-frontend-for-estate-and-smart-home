"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EstateAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      setError("All fields required");
      return;
    }

    // Temporary dummy success
    document.cookie = "ochiga_estate_auth=true; path=/";
    router.push("/estate-dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-[90%] max-w-md bg-gray-900 p-8 rounded-xl border border-gray-700 animate-fadeIn">
        
        <h1 className="text-2xl text-center text-white font-semibold mb-6">
          Create Estate Account
        </h1>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-black border border-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create password"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full p-3 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        <div className="my-5 text-gray-400 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gray-700" />
          <span>OR</span>
          <div className="flex-1 h-[1px] bg-gray-700" />
        </div>

        {/* Google */}
        <button className="w-full p-3 mb-3 bg-white text-black rounded font-medium">
          Continue with Google
        </button>

        {/* Apple */}
        <button className="w-full p-3 bg-white text-black rounded font-medium">
          Continue with Apple
        </button>

      </div>
    </div>
  );
}
