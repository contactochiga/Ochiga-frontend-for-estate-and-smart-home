"use client";

import { Home, Bell, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center justify-center text-gray-500"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
              >
                <Icon size={22} />
              </div>
              <span className="text-[10px] mt-1">{name}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
