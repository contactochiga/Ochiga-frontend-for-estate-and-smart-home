"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

type Resident = {
  id: number;
  name: string;
  house: string;
  phone: string;
  status: "Active" | "Inactive";
  outstanding: number;
};

export default function ResidentsPage() {
  const [search, setSearch] = useState("");
  const [residents, setResidents] = useState<Resident[]>([
    { id: 1, name: "Jane Doe", house: "A12", phone: "08012345678", status: "Active", outstanding: 0 },
    { id: 2, name: "John Smith", house: "B04", phone: "08087654321", status: "Active", outstanding: 50000 },
  ]);

  const filtered = residents.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.house.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Residents</h1>
        <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md">
          <UserPlusIcon className="h-5 w-5 mr-1" /> Add Resident
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-md px-3 py-2 shadow">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search residents..."
          className="ml-2 flex-1 bg-transparent outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div>
              <p className="font-semibold">{res.name}</p>
              <p className="text-sm text-gray-500">House {res.house}</p>
              <p className="text-sm text-gray-500">{res.phone}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${res.outstanding > 0 ? "text-red-600" : "text-green-600"}`}>
                ₦{res.outstanding.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{res.status}</p>
              <button className="mt-2 text-blue-600 text-sm">View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk actions */}
      <div className="flex justify-end">
        <button className="flex items-center px-4 py-2 border rounded-md bg-white dark:bg-gray-800 shadow">
          <EnvelopeIcon className="h-5 w-5 mr-2" /> Message All
        </button>
      </div>
    </main>
  );
}
