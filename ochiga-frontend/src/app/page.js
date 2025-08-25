// ochiga-frontend/src/app/page.js

import ResidentDashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      {/* Main Content Area */}
      <section className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Ochiga Smart Home</h1>
        <p className="mt-2 text-lg text-gray-600">Your community, connected and secure.</p>
      </section>

      {/* Resident Dashboard directly below */}
      <div className="mt-6">
        <ResidentDashboard />
      </div>
    </main>
  );
}
