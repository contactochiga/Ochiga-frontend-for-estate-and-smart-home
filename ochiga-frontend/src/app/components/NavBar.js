"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react" // ✅ modern icons

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Resident Dashboard" },
    { href: "/manager", label: "Manager Dashboard" },
  ]

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* ✅ Branding */}
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with <Image src="/logo.png" alt="Ochiga Logo" width={32} height={32}/> */}
          <span className="text-2xl font-extrabold tracking-wide">Ochiga</span>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-yellow-300 ${
                pathname === link.href ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ✅ Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-4 space-y-3 bg-blue-800 rounded-lg p-4 shadow-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-yellow-300 ${
                pathname === link.href ? "text-yellow-300 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
