"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Resident Dashboard" },
    { href: "/manager", label: "Manager Dashboard" },
  ]

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:underline ${
            pathname === link.href ? "font-bold underline" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
