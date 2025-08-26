// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-red-600 underline">
  Tailwind Test 🚀
</h1>
      <p className="text-lg text-gray-600 mb-8">
        Choose your dashboard to continue.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/resident"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Resident Login
        </Link>
        <Link
          href="/manager"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Manager Login
        </Link>
      </div>
    </main>
  );
}
