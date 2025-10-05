"use client";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  WalletIcon,
  UsersIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

export default function ResidentFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // ✅ Prevent TypeScript error by ensuring pathname exists
    if (!pathname) return;

    if (pathname.includes("/rooms")) setActiveTab("rooms");
    else if (pathname.includes("/wallet")) setActiveTab("wallet");
    else if (pathname.includes("/visitors")) setActiveTab("visitors");
    else if (pathname.includes("/community")) setActiveTab("community");
    else setActiveTab("dashboard");
  }, [pathname]);

  const handleTabChange = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const tabs = [
    { id: "dashboard", label: "Home", icon: HomeIcon, path: "/dashboard" },
    { id: "rooms", label: "Rooms", icon: Squares2X2Icon, path: "/dashboard/rooms" },
    { id: "wallet", label: "Wallet", icon: WalletIcon, path: "/dashboard/wallet" },
    { id: "visitors", label: "Visitors", icon: UsersIcon, path: "/dashboard/visitors" },
    { id: "community", label: "Community", icon: UserGroupIcon, path: "/dashboard/community" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md flex justify-between px-2 py-1 z-50">
      {tabs.map(({ id, label, icon: Icon, path }) => (
        <button
          key={id}
          className={`flex flex-col items-center flex-1 py-2 transition-colors duration-200 ${
            activeTab === id
              ? "text-[#800000] font-semibold" // ✅ Active maroon tab
              : "text-gray-500 dark:text-gray-400"
          } hover:text-[#800000]`} // ✅ Hover maroon color
          onClick={() => handleTabChange(id, path)}
        >
          <Icon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </nav>
  );
}
