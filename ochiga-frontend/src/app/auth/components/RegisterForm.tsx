"use client";

import { useState } from "react";

interface Props {
  onRegister: (inviteCode: string, username: string, password: string) => void;
  loading?: boolean;
}

export default function RegisterForm({ onRegister, loading }: Props) {
  const [inviteCode, setInviteCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="flex flex-col w-full max-w-sm gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onRegister(inviteCode, username, password);
      }}
    >
      <input
        type="text"
        placeholder="Invite / QR Code"
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-400 text-black py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-all"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
