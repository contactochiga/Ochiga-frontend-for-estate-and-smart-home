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
    // Mock login: check localStorage users
    await new Promise((r) => setTimeout(r, 800));
    const users = JSON.parse(localStorage.getItem("ochiga_users" ) || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    setLoading(false);
    if (user) {
      // store session
      localStorage.setItem("ochiga_current_user", JSON.stringify(user));
      router.push("/ai-dashboard");
    } else {
      alert("Invalid credentials (demo). Try any registered user or register a new estate/user.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h1 className="text-xl font-semibold mb-2 text-center">Welcome to Ochiga</h1>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Sign in to access your smart home / estate dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <button onClick={() => router.push("/auth/onboard")} className="hover:text-emerald-400">
            Scan QR to Access
          </button>
          <button onClick={() => setShowModal(true)} className="hover:text-emerald-400">
            Create Estate (Sign up)
          </button>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
