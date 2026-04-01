import type { Metadata } from "next";
import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Admin - Baccouche Automobiles",
  description: "Tableau de bord administration",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AdminDashboardContent />
    </div>
  );
}
