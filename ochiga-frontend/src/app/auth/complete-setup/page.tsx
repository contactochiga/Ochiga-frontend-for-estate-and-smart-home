"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteSetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/ai-dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6">
      <h2 className="text-2xl font-semibold mb-4">Complete Setup</h2>
      <p className="text-gray-400 mb-8 text-center">Set your username and password to finalize your home access.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-semibold transition-all"
        >
          {loading ? "Finalizing..." : "Complete Setup"}
        </button>
      </form>
    </div>
  );
}
