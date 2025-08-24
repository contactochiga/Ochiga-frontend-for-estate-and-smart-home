// src/components/Footer.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, User, Bell, Settings } from "lucide-react";

const navItems = [
  { href: "/", icon: Home },
  { href: "/profile", icon: User },
  { href: "/notifications", icon: Bell },
  { href: "/settings", icon: Settings },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 w-full h-20 bg-white border-t shadow-md flex items-center justify-around z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center"
          >
            <div
              className={`p-3 rounded-full transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-500"
              }`}
            >
              <Icon size={24} />
            </div>
          </Link>
        );
      })}
    </footer>
  );
}
