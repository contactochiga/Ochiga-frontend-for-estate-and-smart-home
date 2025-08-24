"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"

// ✅ Define link type
interface NavLink {
  href: string
  label: string
}

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const links: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Resident Dashboard" },
    { href: "/manager", label: "Manager Dashboard" },
  ]

  // ✅ Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  // ✅ Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg sticky top-0 z-50 dark:bg-slate-900 dark:text-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* ✅ Branding */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-wide">Ochiga</span>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-yellow-300 ${
                pathname === link.href
                  ? "text-yellow-300 font-semibold"
                  : "text-white dark:text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* ✅ Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {theme === "light" ? (
              <Moon size={20} className="text-yellow-300" />
            ) : (
              <Sun size={20} className="text-yellow-400" />
            )}
          </button>
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
        <div className="flex flex-col md:hidden mt-4 space-y-3 bg-blue-800 dark:bg-slate-800 rounded-lg p-4 shadow-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-yellow-300 ${
                pathname === link.href
                  ? "text-yellow-300 font-semibold"
                  : "text-white dark:text-gray-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* ✅ Dark Mode Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {theme === "light" ? (
              <>
                <Moon size={18} className="text-yellow-300" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={18} className="text-yellow-400" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  )
}
