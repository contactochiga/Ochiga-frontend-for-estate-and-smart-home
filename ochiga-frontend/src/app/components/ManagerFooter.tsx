"use client";

import { useState } from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ManagerFooter() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const handleTabChange = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t shadow flex justify-around text-xs">
      <button
        className={`flex flex-col items-center p-2 ${
          activeTab === "dashboard"
            ? "text-green-600 font-bold"
            : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => handleTabChange("dashboard", "/manager-dashboard")}
      >
        <HomeIcon className="w-5 h-5 mb-1" />
        Dashboard
      </button>

      <button
        className={`flex flex-col items-center p-2 ${
          activeTab === "houses"
            ? "text-green-600 font-bold"
            : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => handleTabChange("houses", "/manager-dashboard/houses")}
      >
        <BuildingOfficeIcon className="w-5 h-5 mb-1" />
        Houses
      </button>

      <button
        className={`flex flex-col items-center p-2 ${
          activeTab === "requests"
            ? "text-green-600 font-bold"
            : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => handleTabChange("requests", "/manager-dashboard/requests")}
      >
        <ClipboardDocumentListIcon className="w-5 h-5 mb-1" />
        Requests
      </button>

      <button
        className={`flex flex-col items-center p-2 ${
          activeTab === "finance"
            ? "text-green-600 font-bold"
            : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={() => handleTabChange("finance", "/manager-dashboard/finance")}
      >
        <CreditCardIcon className="w-5 h-5 mb-1" />
        Finance
      </button>

      <button
        className={`flex flex-col items-center p-2 ${
          activeTab === "community"
            ? "text-green-600 font-bold"
            : "text-gray-600 dark:text-gray-300"
        }`}
        onClick={() =>
          handleTabChange("community", "/manager-dashboard/community")
        }
      >
        <GlobeAltIcon className="w-5 h-5 mb-1" />
        Community
      </button>
    </nav>
  );
}
