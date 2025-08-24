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
    <footer className="fixed bottom-4 left-0 right-0 flex justify-center z-50 md:hidden">
      <nav className="flex justify-around items-center w-[90%] max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg px-2 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`text-[11px] mt-1 ${
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
      </nav>
    </footer>
  );
}
