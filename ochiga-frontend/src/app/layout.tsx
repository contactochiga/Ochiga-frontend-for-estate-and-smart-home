import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Ochiga Smart Estate",
  description: "Smart estate management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <main className="pb-20">{children}</main>
        <Footer /> {/* stays fixed at bottom, independent of flex */}
      </body>
    </html>
  );
}
