import TopBar from "../components/TopBar";
import Footer from "@/components/Footer";
import ResidentDashboard from "@/components/ResidentDashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <ResidentDashboard />
      <Footer />
    </div>
  );
}
