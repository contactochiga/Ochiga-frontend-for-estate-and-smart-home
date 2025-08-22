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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex flex-col items-center ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
