// src/app/register/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inviteToken = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!inviteToken) {
      setMessage("Invalid or missing invite token.");
    }
  }, [inviteToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteToken) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/register-resident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteToken, password }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Registration successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete Registration
        </h2>
        {inviteToken ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Set your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <p className="text-red-500 text-center">{message}</p>
        )}
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
