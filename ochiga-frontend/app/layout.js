import "./globals.css"
import NavBar from "../src/components/NavBar"
import Footer from "../src/components/Footer"

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
