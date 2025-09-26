"use client";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

export default function ManagerFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (pathname.includes("/houses")) setActiveTab("houses");
    else if (pathname.includes("/requests")) setActiveTab("requests");
    else if (pathname.includes("/finance")) setActiveTab("finance");
    else if (pathname.includes("/community")) setActiveTab("community");
    else setActiveTab("dashboard");
  }, [pathname]);

  const handleTabChange = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon, path: "/manager-dashboard" },
    { id: "houses", label: "Houses", icon: BuildingOfficeIcon, path: "/manager-dashboard/houses" },
    { id: "requests", label: "Requests", icon: ClipboardDocumentListIcon, path: "/manager-dashboard/requests" },
    { id: "finance", label: "Finance", icon: CreditCardIcon, path: "/manager-dashboard/finance" },
    { id: "community", label: "Community", icon: GlobeAltIcon, path: "/manager-dashboard/community" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md flex justify-between px-2 py-1 z-50">
      {tabs.map(({ id, label, icon: Icon, path }) => (
        <button
          key={id}
          className={`flex flex-col items-center flex-1 py-2 transition-colors duration-200 ${
            activeTab === id
              ? "text-[#800000] font-semibold" // maroon active
              : "text-gray-500 dark:text-gray-400"
          } hover:text-[#800000]`} // maroon hover
          onClick={() => handleTabChange(id, path)}
        >
          <Icon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </nav>
  );
}
