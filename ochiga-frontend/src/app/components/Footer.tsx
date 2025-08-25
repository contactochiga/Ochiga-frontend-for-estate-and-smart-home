"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  BuildingOffice2Icon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Rooms", href: "/rooms", icon: Squares2X2Icon },
    { name: "Estate", href: "/estate", icon: BuildingOffice2Icon },
    { name: "Devices", href: "/devices", icon: DevicePhoneMobileIcon },
    { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  ];

  return (
    <footer
      className="w-full
        bg-white dark:bg-gray-800
        border-t border-gray-200 dark:border-gray-700 shadow-lg
        max-w-md mx-auto px-4
        flex justify-around items-center rounded-t-2xl
        h-14 pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center"
          >
            <Icon
              className={`h-6 w-6 ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <span
              className={`text-[10px] mt-1 ${
                active
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </footer>
  );
}
