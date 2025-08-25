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
  className="fixed bottom-0 left-1/2 -translate-x-1/2
    bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
    border-t border-gray-200 dark:border-gray-700 shadow-lg
    w-[95%] max-w-md px-4 py-2
    flex justify-around items-center rounded-t-2xl z-50"
>
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
              className={`text-[11px] mt-1 ${
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
