import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { DashboardProvider } from "../context/DashboardContext";
import { Toaster } from "sonner";

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
        <AuthProvider>
          <DashboardProvider>
            {children}
            <Toaster richColors position="top-right" />
          </DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
