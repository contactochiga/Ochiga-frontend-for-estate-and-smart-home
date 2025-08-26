"use client";

import Link from "next/link";
import {
  CreditCardIcon,
  UserPlusIcon,
  UsersIcon,
  HomeIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function ResidentDashboard() {
  const cards = [
    { name: "Wallet", icon: CreditCardIcon, href: "/dashboard/wallet", desc: "Balance & transactions" },
    { name: "Visitors", icon: UserPlusIcon, href: "/dashboard/visitors", desc: "Manage guest access" },
    { name: "Community", icon: UsersIcon, href: "/dashboard/community", desc: "Announcements & groups" },
    { name: "Devices", icon: DevicePhoneMobileIcon, href: "/dashboard/devices", desc: "Control smart devices" },
    { name: "Utilities", icon: Cog6ToothIcon, href: "/dashboard/utilities", desc: "Bills & maintenance" },
    { name: "Estate Info", icon: HomeIcon, href: "/dashboard/estate", desc: "Contacts & updates" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
            >
              <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="mt-3 font-medium text-sm">{card.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {card.desc}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
