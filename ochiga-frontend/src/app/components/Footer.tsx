"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  WalletIcon,
  UsersIcon,
  UserGroupIcon, // ✅ Corrected
} from "@heroicons/react/24/outline";

export default function Footer() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Rooms", href: "/dashboard/rooms", icon: Squares2X2Icon },
    { name: "Wallet", href: "/dashboard/wallet", icon: WalletIcon },
    { name: "Visitors", href: "/dashboard/visitors", icon: UsersIcon },
    { name: "Community", href: "/dashboard/community", icon: UserGroupIcon }, // ✅ Fixed
  ];

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(true); // scrolling down
      } else {
        setVisible(false); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Check active state (also works for nested routes e.g. /dashboard/wallet/history)
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300
      ${visible ? "translate-y-0" : "translate-y-full"}
      bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md`}
    >
      <div className="max-w-md mx-auto flex justify-between items-center h-14 px-6">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center transition-transform"
            >
              <Icon
                className={`h-6 w-6 transform transition-all duration-200 ${
                  active
                    ? "text-blue-600 dark:text-blue-400 scale-110"
                    : "text-gray-500 dark:text-gray-400 scale-100"
                }`}
              />
              <span
                className={`text-[11px] mt-0.5 transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
