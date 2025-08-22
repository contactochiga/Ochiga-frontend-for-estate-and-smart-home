import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ochiga",
  description: "Smart home & estate management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top nav */}
        <NavBar />

        {/* Main content with padding so footer doesn't overlap */}
        <main className="flex-1 pb-16">{children}</main>

        {/* Mobile bottom nav */}
        <Footer />
      </body>
    </html>
  );
}
