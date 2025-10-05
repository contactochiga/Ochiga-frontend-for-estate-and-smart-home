import TopBar from "./TopBar";
import Footer from "./Footer";

export default function ResidentDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <main className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Welcome to your Resident Dashboard
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Here you can access your community updates, maintenance requests,
          utilities, reports, and more — all in one place.
        </p>
      </main>

      <Footer />
    </div>
  );
}
