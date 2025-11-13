"use client";

import { useState } from "react";

interface Props {
  homes: Array<{ id: string; name: string }>;
  users: Array<{ id: string; name: string }>;
  onAssign: (homeId: string, userId: string) => void;
}

export default function AssignResidentPanel({ homes, users, onAssign }: Props) {
  const [selectedHome, setSelectedHome] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleAssign = () => {
    if (!selectedHome || !selectedUser) return;
    onAssign(selectedHome, selectedUser);
    setSelectedHome("");
    setSelectedUser("");
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md w-full max-w-md">
      <h3 className="text-white font-semibold mb-3">Assign Resident to Home</h3>

      <select
        value={selectedHome}
        onChange={(e) => setSelectedHome(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none"
      >
        <option value="">Select Home</option>
        {homes.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none"
      >
        <option value="">Select Resident</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        Assign Resident
      </button>
    </div>
  );
}
