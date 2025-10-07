"use client";

import React, { useState } from "react";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ScaleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function LegalAndPoliciesPage() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const policies = [
    {
      title: "Terms of Service",
      icon: ScaleIcon,
      description:
        "Understand the terms that govern your use of the Ochiga platform, including responsibilities, data usage, and service boundaries.",
      content: `
      ## Ochiga Terms of Service
      Welcome to Ochiga. By accessing or using our platform, you agree to abide by these terms.
      
      - You are responsible for maintaining the confidentiality of your account.
      - Unauthorized use or tampering with platform services is prohibited.
      - We reserve the right to update or suspend access for policy violations.

      For full legal details, please contact the management office.`,
    },
    {
      title: "Privacy Policy",
      icon: ShieldCheckIcon,
      description:
        "Learn how we handle your personal data, protect your privacy, and ensure transparency in all our operations.",
      content: `
      ## Privacy Policy
      Ochiga collects limited personal information to provide secure and efficient services.
      
      - Data such as name, contact info, and payment records may be stored securely.
      - We do **not** sell or share your data without your consent.
      - Residents can request data removal or review at any time.
      
      Security and privacy are central to our commitment to residents.`,
    },
    {
      title: "Resident Code of Conduct",
      icon: DocumentTextIcon,
      description:
        "Our community thrives on mutual respect. This outlines acceptable behavior, reporting procedures, and consequences for violations.",
      content: `
      ## Resident Code of Conduct
      We believe in a respectful and safe environment for everyone.
      
      - Maintain courtesy in interactions with neighbors and staff.
      - Noise levels should be kept minimal after 10PM.
      - Harassment, vandalism, or misconduct will result in disciplinary measures.

      Together, we create a harmonious living experience.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6 sm:px-10 relative">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Legal & Policies
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Stay informed about your rights, data, and responsibilities as a member of the Ochiga
          community.
        </p>
      </header>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {policies.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <item.icon className="w-7 h-7 text-[#800000]" />
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                {item.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {item.description}
            </p>
            <button
              onClick={() => setActivePolicy(item.title)}
              className="text-sm font-medium text-[#800000] hover:underline"
            >
              Read More →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {policies
              .filter((p) => p.title === activePolicy)
              .map((p) => (
                <div key={p.title}>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {p.title}
                  </h2>
                  <div
                    className="prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: p.content.replace(/\n/g, "<br/>") }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ochiga Estate. All rights reserved.
        </p>
      </div>
    </div>
  );
}
