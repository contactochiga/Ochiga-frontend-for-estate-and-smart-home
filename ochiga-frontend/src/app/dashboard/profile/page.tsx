"use client";

import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Resident Info Card */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex items-center gap-6 border border-gray-200 dark:border-gray-700">
        <Image
          src="/user-avatar.png"
          alt="Resident Avatar"
          width={80}
          height={80}
          className="rounded-full border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            John Doe
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estate: Greenfield Estate
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            House: Block B, Apartment 12
          </p>
        </div>
      </div>

      {/* 🔹 Contact & Account Info */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Contact & Account Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Phone:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">+234 812 345 6789</span>
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">johndoe@email.com</span>
          </p>
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">Resident</span>
          </p>
          <p>
            <span className="font-medium">Member Since:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">Jan 2023</span>
          </p>
        </div>
      </div>

      {/* 🔹 Quick Actions */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Fund Wallet", icon: "💳" },
            { label: "Pay Utilities", icon: "⚡" },
            { label: "Maintenance", icon: "🛠️" },
            { label: "Visitor Pass", icon: "🚪" },
          ].map((action, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Activity & Records */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>💳 Paid NGN 20,000 for Service Charge (Sept 2025)</li>
          <li>🛠️ Requested maintenance for Water Tank (Aug 2025)</li>
          <li>🚪 Visitor Pass created for "Mr. Okafor" (July 2025)</li>
          <li>⚡ Electricity Token purchased (July 2025)</li>
        </ul>
      </div>
    </div>
  );
}
