import "./globals.css"
import NavBar from "@/NavBar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Ochiga",
  description: "Smart home & estate management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        {/* Top navigation bar */}
        <NavBar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Bottom footer navigation */}
        <Footer />
      </body>
    </html>
  )
}
