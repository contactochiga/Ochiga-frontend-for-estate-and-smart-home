"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BuildingOffice2Icon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
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
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2">
      <ul className="flex justify-around items-center">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex flex-col items-center text-xs transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
                }`}
              >
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full ${
                    active
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-transparent"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
