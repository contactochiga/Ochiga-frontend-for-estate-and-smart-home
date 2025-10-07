"use client";

import { LifebuoyIcon, EnvelopeIcon, BookOpenIcon, ServerStackIcon } from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <LifebuoyIcon className="w-7 h-7 text-green-600" />
        Help & Support
      </h1>

      {/* FAQ */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">FAQs</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>How do I reset my password?</li>
          <li>How can I contact residents?</li>
          <li>How do I view estate financial reports?</li>
        </ul>
      </section>

      {/* Contact Support */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5" /> Contact Support
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Reach out to our support team anytime.
        </p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Send Message
        </button>
      </section>

      {/* Documentation */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <BookOpenIcon className="w-5 h-5" /> Documentation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to use Ochiga Manager effectively.</p>
        <button className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          View Docs
        </button>
      </section>

      {/* System Status */}
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <ServerStackIcon className="w-5 h-5" /> System Status
        </h2>
        <p className="text-sm text-green-600">✅ All systems operational</p>
      </section>
    </main>
  );
}
