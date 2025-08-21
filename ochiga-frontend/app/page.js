import Link from "next/link";
import CommunityPage from "./community/page";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
        <div className="text-xl font-bold text-blue-600">Ochiga</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-500">
            Login
          </Link>
          <Link href="/resident-dashboard" className="text-gray-700 hover:text-blue-500">
            Resident Dashboard
          </Link>
          <Link href="/manager-dashboard" className="text-gray-700 hover:text-blue-500">
            Manager Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <section className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Ochiga Smart Home</h1>
        <p className="mt-2 text-lg text-gray-600">Your community, connected and secure.</p>
        
        {/* Resident Dashboard Content */}
        <div className="mt-6">
          <CommunityPage />
        </div>
      </section>
    </main>
  );
}
