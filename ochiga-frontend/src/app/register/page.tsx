// src/app/register/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // grab inviteToken from the URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteToken: token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! You can now log in.");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="p-6 text-red-500">Invalid or missing invite link.</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-bold">Complete Your Registration</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
