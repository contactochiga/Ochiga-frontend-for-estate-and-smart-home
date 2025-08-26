import Link from "next/link";

export default function ResidentLogin() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Resident Login</h1>
      <input
        type="text"
        placeholder="Email"
        className="mb-2 p-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border rounded w-64"
      />

      {/* Redirect to resident dashboard */}
      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login as Resident
      </Link>
    </main>
  );
}
