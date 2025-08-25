"use client";

import { CreditCardIcon, UserPlusIcon, UsersIcon, HomeIcon, Cog6ToothIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function ResidentDashboard() {
  const cards = [
    {
      name: "Wallet",
      icon: CreditCardIcon,
      href: "/wallet",
      desc: "Balance & transactions",
    },
    {
      name: "Visitors",
      icon: UserPlusIcon,
      href: "/visitors",
      desc: "Manage guest access",
    },
    {
      name: "Community",
      icon: UsersIcon,
      href: "/community",
      desc: "Announcements & groups",
    },
    {
      name: "Devices",
      icon: DevicePhoneMobileIcon,
      href: "/devices",
      desc: "Control smart devices",
    },
    {
      name: "Services",
      icon: Cog6ToothIcon,
      href: "/services",
      desc: "Bills & maintenance",
    },
    {
      name: "Estate Info",
      icon: HomeIcon,
      href: "/estate",
      desc: "Contacts & updates",
    },
  ];

  return (
    <main className="flex-1 max-w-md mx-auto px-4 pt-4 pb-20">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.name}
              href={card.href}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition"
            >
              <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="mt-2 font-medium text-sm">{card.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {card.desc}
              </span>
            </a>
          );
        })}
      </div>
    </main>
  );
}
