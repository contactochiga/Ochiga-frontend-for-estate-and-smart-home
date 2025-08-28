"use client";

import { useRouter } from "next/navigation";

export default function RoleSelector() {
  const router = useRouter();

  const handleSelect = (role: string) => {
    if (role === "resident") {
      router.push("/dashboard");  // Resident pages
    } else if (role === "manager") {
      router.push("/manager-dashboard"); // Estate Manager pages
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-6">Select Your Role</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleSelect("resident")}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Resident
          </button>
          <button
            onClick={() => handleSelect("manager")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Estate Manager
          </button>
        </div>
      </div>
    </div>
  );
}
