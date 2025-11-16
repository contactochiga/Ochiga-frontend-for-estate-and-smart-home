"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // Dummy login for now — replace with real API when ready
    if (email === "admin@ochiga.com" && password === "123456") {
      localStorage.setItem("ochiga_auth", "true");
      router.push("/estate-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-[90%] max-w-md bg-gray-900 p-8 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Ochiga Login
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
