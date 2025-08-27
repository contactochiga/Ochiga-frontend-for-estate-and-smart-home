export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <header className="p-4 bg-sky-500 text-white shadow-md flex justify-between items-center">
        <h1 className="font-bold text-lg">Ochiga</h1>
        <nav className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Ochiga Smart Living 🌍
        </h2>
        <p className="max-w-xl mx-auto text-lg">
          Manage your home and estate in one app. Simple. Secure. Smart.
        </p>
      </section>

      {/* Features */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-2">💳 Wallet</h3>
          <p className="text-sm">Fund wallet, buy tokens, and manage payments.</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-2">🏠 Smart Home</h3>
          <p className="text-sm">Control your lights, fans, and security devices.</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-2">🏢 Estate Management</h3>
          <p className="text-sm">Manage visitors, internet, and facility monitoring.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 mt-8 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Ochiga Smart Living. All rights reserved.
      </footer>
    </div>
  );
}
