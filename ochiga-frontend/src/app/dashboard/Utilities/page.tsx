"use client";

import { DocumentTextIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function UtilitiesPage() {
  const bills = [
    { id: 1, name: "Electricity", amount: "₦15,000", status: "Unpaid" },
    { id: 2, name: "Water", amount: "₦5,000", status: "Paid" },
    { id: 3, name: "Security Levy", amount: "₦7,500", status: "Unpaid" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6 sm:px-10 space-y-10">
      {/* Header */}
      <header className="text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <BoltIcon className="w-8 h-8 text-[#800000]" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Utilities & Bills
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          View and manage your estate utility bills in one place.
        </p>
      </header>

      {/* Bills Section */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-5">
          <DocumentTextIcon className="w-6 h-6 text-[#800000]" />
          Active Bills
        </h2>

        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transition-all hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  {bill.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {bill.amount}
                </p>
              </div>

              <span
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${
                  bill.status === "Paid"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}
              >
                {bill.status}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Outstanding:
          </p>
          <p className="text-lg font-bold text-[#800000]">₦22,500</p>
        </div>

        <div className="pt-4 text-right">
          <button className="px-5 py-2.5 bg-[#800000] text-white rounded-lg text-sm font-medium hover:bg-[#a00000] transition">
            Pay Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-10">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ochiga Estate — Utilities Dashboard
        </p>
      </footer>
    </main>
  );
}
