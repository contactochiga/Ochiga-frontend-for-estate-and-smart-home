// ochiga-frontend/src/app/components/TopBar.tsx
"use client";

import { useState, useEffect, useRef, Fragment } from "react";
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

  // slide-down panels
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  // data
  const [notifications, setNotifications] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = rawPathname || "";

  // refs to detect outside clicks
  const profileRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notifPanelRef = useRef<HTMLDivElement | null>(null);
  const msgPanelRef = useRef<HTMLDivElement | null>(null);

  // backdrop ref (for slide-down panels)
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // menu items (unchanged from your design)
  const menuItems = [
    { name: "Community", href: "/dashboard/community", icon: MegaphoneIcon },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: WrenchScrewdriverIcon },
    { name: "Utilities", href: "/dashboard/utilities", icon: BoltIcon },
    { name: "Directory", href: "/dashboard/directory", icon: UsersIcon },
    { name: "Reports", href: "/dashboard/reports", icon: ChartBarIcon },
    { name: "Help & Support", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
    { name: "Legal & Policies", href: "/dashboard/legal", icon: DocumentTextIcon },
  ];

  // Click outside logic - closes profile & search & panels
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(target)) setSearchOpen(false);

      // If clicked outside notif panel and its trigger, close it
      if (
        notifPanelRef.current &&
        !notifPanelRef.current.contains(target) &&
        !(target as HTMLElement).closest("[data-notif-trigger]")
      ) {
        setNotifOpen(false);
      }

      if (
        msgPanelRef.current &&
        !msgPanelRef.current.contains(target) &&
        !(target as HTMLElement).closest("[data-msg-trigger]")
      ) {
        setMsgOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setSearchOpen(false);
        setNotifOpen(false);
        setMsgOpen(false);
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // WebSocket for real-time updates (best-effort — replace env var)
  useEffect(() => {
    const WS_URL = (process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/ws").replace(
      "http://",
      "ws://"
    ).replace("https://", "wss://");

    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(WS_URL);
    } catch (err) {
      console.warn("WebSocket init failed", err);
      return;
    }

    ws.onopen = () => {
      // optional: subscribe / auth message here
      // ws!.send(JSON.stringify({ type: 'subscribe', channel: 'user:notifications' }));
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        // expected minimal payloads: { type: 'notification', message: '...' } or { type: 'message', message: '...' }
        if (data.type === "notification") {
          setNotifications((p) => [data.message, ...p]);
          setHasNewNotif(true);
        }
        if (data.type === "message") {
          setMessages((p) => [data.message, ...p]);
          setHasNewMsg(true);
        }
      } catch (err) {
        console.warn("WS parse error", err);
      }
    };

    ws.onclose = () => {
      // reconnect policy could be added, keeping simple
      ws = null;
    };

    ws.onerror = (e) => {
      // swallow errors
      console.warn("WebSocket error", e);
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  // open slide-down panel helper
  const openNotifPanel = () => {
    setNotifOpen(true);
    setMsgOpen(false);
    setHasNewNotif(false);
  };
  const openMsgPanel = () => {
    setMsgOpen(true);
    setNotifOpen(false);
    setHasNewMsg(false);
  };

  // preserve exactly your UI structure; panels sit below header & overlay content with blur
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-bold text-black dark:text-white">Ochiga</h1>
        </div>

        {/* Right (keeps layout & spacing exactly) */}
        <div className="flex items-center space-x-4">
          {/* SEARCH: slim input that expands end-to-end when opened */}
          <div
            ref={searchRef}
            className="relative flex items-center w-full max-w-sm"
            aria-haspopup="true"
            aria-expanded={searchOpen}
          >
            <button
              onClick={() => {
                // toggle search, also close panels
                setSearchOpen((s) => !s);
                setNotifOpen(false);
                setMsgOpen(false);
              }}
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>

            {/* When open, show a full-width input that stretches across header */}
            {searchOpen && (
              <div
                className="absolute top-10 left-0 right-0 px-4 pb-3 z-50"
                role="dialog"
                aria-modal="false"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>
            )}
          </div>

          {/* MESSAGES icon — trigger slide-down panel */}
          <div className="relative">
            <button
              data-msg-trigger
              onClick={() => openMsgPanel()}
              aria-label="Messages"
              className="relative"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {/* pulse / ring for new message */}
              {hasNewMsg && (
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#800000] ring-2 ring-white dark:ring-gray-800 animate-pulse"
                />
              )}
            </button>
          </div>

          {/* NOTIFICATIONS icon — trigger slide-down panel */}
          <div className="relative">
            <button
              data-notif-trigger
              onClick={() => openNotifPanel()}
              aria-label="Notifications"
              className="relative"
            >
              <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {hasNewNotif && (
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#800000] ring-2 ring-white dark:ring-gray-800 animate-ping"
                />
              )}
            </button>
          </div>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((p) => !p);
                setNotifOpen(false);
                setMsgOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            </button>

            {profileOpen && (
              <div
                className="absolute top-10 right-0 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2"
                role="menu"
              >
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

      {/* Sidebar (unchanged UI) */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
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

      {/* Slide-down panels + blurred backdrop (shared overlay) */}
      {(notifOpen || msgOpen) && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 flex"
          aria-hidden
        >
          {/* blurred, dim background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setNotifOpen(false);
              setMsgOpen(false);
            }}
          />

          {/* container for slide panels - positioned under header */}
          <div className="relative w-full">
            {/* Messages panel */}
            <div
              ref={msgPanelRef}
              className={`transform transition-transform duration-300 ease-[cubic-bezier(.22,.9,.32,1)] origin-top ${
                msgOpen ? "translate-y-0" : "-translate-y-full"
              }`}
              style={{ marginTop: "64px" }} /* header height offset */
            >
              {msgOpen && (
                <div className="mx-auto max-w-4xl bg-white dark:bg-gray-900 rounded-b-xl shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Messages</h3>
                    <button
                      aria-label="Close messages"
                      onClick={() => setMsgOpen(false)}
                      className="p-1"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-sm text-gray-600 dark:text-gray-300">No messages yet.</p>
                    ) : (
                      messages.map((m, i) => (
                        <div key={i} className="py-2 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm text-gray-700 dark:text-gray-200">{m}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => {
                        setMsgOpen(false);
                        router.push("/dashboard/messages");
                      }}
                      className="text-[#800000] hover:underline text-sm"
                    >
                      See more →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications panel */}
            <div
              ref={notifPanelRef}
              className={`transform transition-transform duration-300 ease-[cubic-bezier(.22,.9,.32,1)] origin-top ${
                notifOpen ? "translate-y-0" : "-translate-y-full"
              }`}
              style={{ marginTop: "64px" }}
            >
              {notifOpen && (
                <div className="mx-auto max-w-4xl bg-white dark:bg-gray-900 rounded-b-xl shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                    <button
                      aria-label="Close notifications"
                      onClick={() => setNotifOpen(false)}
                      className="p-1"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-600 dark:text-gray-300">No notifications.</p>
                    ) : (
                      notifications.map((n, i) => (
                        <div key={i} className="py-2 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm text-gray-700 dark:text-gray-200">{n}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => {
                        setNotifOpen(false);
                        router.push("/dashboard/notifications");
                      }}
                      className="text-[#800000] hover:underline text-sm"
                    >
                      See more →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
