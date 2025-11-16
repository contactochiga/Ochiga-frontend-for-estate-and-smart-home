"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // 🔐 Dummy authentication for now
    if (email === "admin@ochiga.com" && password === "123456") {
      // Store token as cookie (middleware compatible)
      document.cookie = "ochiga_auth=true; path=/";

      // Redirect to your dashboard (choose your path)
      router.push("/dashboard");
    } else {
      setError("Invalid login details");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-[90%] max-w-md bg-gray-900 p-8 rounded-xl border border-gray-700">
        <h1 className="text-2xl text-white text-center font-semibold mb-6">
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
          className="w-full p-3 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 active:scale-95 transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
