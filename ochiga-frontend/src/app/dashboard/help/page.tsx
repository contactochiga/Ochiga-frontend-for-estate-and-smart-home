"use client";

import {
  LifebuoyIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ServerStackIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6 sm:px-10 space-y-10">
      {/* Header */}
      <header className="text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <LifebuoyIcon className="w-8 h-8 text-[#800000]" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          We’re here to make your Ochiga experience smooth and stress-free.
        </p>
      </header>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#800000] font-bold">•</span> How do I reset my password?
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#800000] font-bold">•</span> How can I contact other residents?
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#800000] font-bold">•</span> How do I view estate financial reports?
          </li>
        </ul>
      </section>

      {/* Contact Support */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <EnvelopeIcon className="w-6 h-6 text-[#800000]" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Contact Support
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
          Reach out to our resident support desk anytime. We typically respond within minutes.
        </p>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#800000] text-white text-sm font-medium hover:bg-[#a00000] transition">
          <PaperAirplaneIcon className="w-4 h-4" />
          Send a Message
        </button>
      </section>

      {/* Documentation */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <BookOpenIcon className="w-6 h-6 text-[#800000]" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Documentation
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
          Learn how to make the most of your Ochiga Resident Dashboard with our easy-to-follow
          guide and feature breakdowns.
        </p>
        <button className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          View Docs
        </button>
      </section>

      {/* System Status */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <ServerStackIcon className="w-6 h-6 text-[#800000]" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            System Status
          </h2>
        </div>
        <p className="text-sm text-green-600 font-medium">✅ All systems operational</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Last updated: {new Date().toLocaleString()}
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-10">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ochiga Estate. Support crafted with care.
        </p>
      </footer>
    </main>
  );
}
