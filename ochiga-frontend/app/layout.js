import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ochiga",
  description: "Smart home & estate management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen pb-16">
        {/* pb-16 = bottom padding so content doesn’t hide behind footer */}
        <NavBar />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
