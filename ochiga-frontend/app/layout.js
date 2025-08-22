import "./globals.css"
import NavBar from "@/NavBar"
import Footer from "@/Footer"

export const metadata = {
  title: "Ochiga",
  description: "Smart home & estate management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
