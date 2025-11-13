"use client";

import { useState } from "react";

interface Props {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
}

export default function LoginForm({ onLogin, loading }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="flex flex-col w-full max-w-sm gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onLogin(username, password);
      }}
    >
      <input
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-emerald-400 text-black py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-all"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
