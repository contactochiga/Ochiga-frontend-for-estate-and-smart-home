"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ExclamationTriangleIcon,
  LifebuoyIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function ManagerHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  // ✅ Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Residents", href: "/manager-dashboard/residents", icon: UsersIcon },
    { name: "Staff", href: "/manager-dashboard/staff", icon: BriefcaseIcon },
    { name: "Reports", href: "/manager-dashboard/reports", icon: ChartBarIcon },
    { name: "Announcements", href: "/manager-dashboard/announcements", icon: MegaphoneIcon },
    { name: "Complaints", href: "/manager-dashboard/complaints", icon: ExclamationTriangleIcon },
    { name: "Devices", href: "/manager-dashboard/devices", icon: Cog6ToothIcon },
    { name: "Support / Help", href: "/manager-dashboard/help", icon: LifebuoyIcon },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-bold text-green-600 dark:text-green-400">
            Ochiga
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-
