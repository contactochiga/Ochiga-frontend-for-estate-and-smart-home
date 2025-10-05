import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Ochiga Smart Estate",
  description: "Smart Estate Dashboard by Ochiga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
