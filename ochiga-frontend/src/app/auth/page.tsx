"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./components/AuthModal";

export default function AuthPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    router.push("/ai-dashboard"); // redirect after login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-gray-950 to-black" />

      <div className="z-10 w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold mb-2 text-center">Welcome to Ochiga</h1>
        <p className="text-gray-400 mb-8 text-center">
          Sign in to access your smart home and estate dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-semibold transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-between mt-5 text-sm text-gray-400">
          <button
            onClick={() => router.push("/auth/onboard")}
            className="hover:text-emerald-400"
          >
            Scan QR to Access
          </button>
          <button onClick={() => setShowModal(true)} className="hover:text-emerald-400">
            Create Account
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
