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
  MegaphoneIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  UsersIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function ResidentHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  const [notifications, setNotifications] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = rawPathname || "";

  const profileRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);

  // 🧠 Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      )
        setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target as Node))
        setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node))
        setNotifOpen(false);
      if (msgRef.current && !msgRef.current.contains(event.target as Node))
        setMsgOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⚡ Real-time updates via WebSocket
  useEffect(() => {
    const ws = new WebSocket("wss://your-backend-url.com/ws"); // update to your actual endpoint

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "notification") {
        setNotifications((prev) => [data.message, ...prev]);
        setHasNewNotif(true);
      }

      if (data.type === "message") {
        setMessages((prev) => [data.message, ...prev]);
        setHasNewMsg(true);
      }
    };

    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    return () => ws.close();
  }, []);

  const menuItems = [
    { name: "Community", href: "/dashboard/community", icon: MegaphoneIcon },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: WrenchScrewdriverIcon },
    { name: "Utilities", href: "/dashboard/utilities", icon: BoltIcon },
    { name: "Directory", href: "/dashboard/directory", icon: UsersIcon },
    { name: "Reports", href: "/dashboard/reports", icon: ChartBarIcon },
    { name: "Help & Support", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
    { name: "Legal & Policies", href: "/dashboard/legal", icon: DocumentTextIcon },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-bold text-black dark:text-white">Ochiga</h1>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div ref={searchRef} className="relative flex items-center w-full max-w-sm">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            {searchOpen && (
              <div className="absolute top-10 right-0 left-0 px-4 pb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative" ref={msgRef}>
            <button
              onClick={() => {
                setMsgOpen(!msgOpen);
                setHasNewMsg(false);
              }}
              className="relative"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {hasNewMsg && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#800000] rounded-full animate-ping"></span>
              )}
            </button>
            {msgOpen && (
              <div className="absolute right-0 top-10 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
                <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Messages</h3>
                {messages.slice(0, 3).map((msg, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 py-1">
                    {msg}
                  </p>
                ))}
                <button
                  onClick={() => router.push("/dashboard/messages")}
                  className="text-[#800000] hover:underline text-sm mt-2"
                >
                  See more →
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setHasNewNotif(false);
              }}
              className="relative"
            >
              <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {hasNewNotif && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#800000] rounded-full animate-pulse"></span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-10 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
                <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Notifications</h3>
                {notifications.slice(0, 3).map((notif, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 py-1">
                    {notif}
                  </p>
                ))}
                <button
                  onClick={() => router.push("/dashboard/notifications")}
                  className="text-[#800000] hover:underline text-sm mt-2"
                >
                  See more →
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            </button>
            {profileOpen && (
              <div className="absolute top-10 right-0 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm ${
                    pathname === "/dashboard/profile"
                      ? "bg-[#800000]/10 text-[#800000] dark:bg-[#800000] dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm ${
                    pathname === "/dashboard/settings"
                      ? "bg-[#800000]/10 text-[#800000] dark:bg-[#800000] dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#800000] dark:text-[#ffcccc]">
                Resident Tools
              </h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li
                    key={item.name}
                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                      isActive
                        ? "bg-[#800000]/10 text-[#800000] dark:bg-[#800000] dark:text-white"
                        : "hover:text-[#800000]"
                    }`}
                    onClick={() => {
                      setSidebarOpen(false);
                      router.push(item.href);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
