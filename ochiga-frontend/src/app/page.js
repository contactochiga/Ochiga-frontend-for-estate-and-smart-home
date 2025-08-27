// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-blue-600">Ochiga Smart Estate</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Welcome to your smart estate dashboard 🚀
      </p>

      <div className="mt-6 grid gap-4 grid-cols-2">
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Generator Status</h2>
          <p className="text-sm text-gray-500">Online ✅</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Water Tank</h2>
          <p className="text-sm text-gray-500">75% Full 💧</p>
        </div>
      </div>
    </main>
  );
}
