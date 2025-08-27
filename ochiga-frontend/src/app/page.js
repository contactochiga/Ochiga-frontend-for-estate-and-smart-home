export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <header className="p-4 bg-sky-500 text-white shadow-md flex justify-between">
        <h1 className="font-bold text-lg">Ochiga Dashboard</h1>
        <button className="px-3 py-1 bg-white text-sky-600 rounded-md shadow">
          Dark Mode
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome 🎉</h2>
        <p className="mb-6">
          Tailwind is working! You can now start building your Estate and Smart Home UI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">Card 1</div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">Card 2</div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">Card 3</div>
        </div>
      </main>
    </div>
  )
}
