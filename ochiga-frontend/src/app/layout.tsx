// app/layout.tsx
import "./globals.css";
import Footer from "./components/Footer"; // ✅ correct path

export const metadata = {
  title: "Ochiga Smart Estate",
  description: "Smart estate management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <main className="flex-1 pb-20">{children}</main>
        <Footer /> {/* 👈 Always visible at the bottom */}
      </body>
    </html>
  );
}
