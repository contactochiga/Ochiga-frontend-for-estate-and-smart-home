import "./globals.css"
import NavBar from "../components/NavBar"

export const metadata = {
  title: "Ochiga",
  description: "Smart Estate Management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  )
}
