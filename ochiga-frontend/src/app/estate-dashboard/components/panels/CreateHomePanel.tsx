"use client";

import { useState } from "react";

interface Props {
  onCreate: (home: { name: string; type: string; description?: string }) => void;
}

export default function CreateHomePanel({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Apartment");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate({ name, type, description });
    setName("");
    setDescription("");
    setType("Apartment");
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md w-full max-w-md">
      <h3 className="text-white font-semibold mb-3">Create New Home</h3>
      <input
        type="text"
        placeholder="Home Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none"
      >
        <option>Apartment</option>
        <option>Duplex</option>
        <option>Penthouse</option>
        <option>Bungalow</option>
      </select>
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Create Home
      </button>
    </div>
  );
}
