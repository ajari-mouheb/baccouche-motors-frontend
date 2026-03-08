import type { Metadata } from "next";
import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Admin - Baccouche Automobiles",
  description: "Tableau de bord administration",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Tableau de bord</h1>
      <AdminDashboardContent />
    </div>
  );
}
