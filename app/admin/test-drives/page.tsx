import type { Metadata } from "next";
import { TestDrivesTable } from "@/components/admin/test-drives-table";

export const metadata: Metadata = {
  title: "Test Drives | Admin - Baccouche Automobiles",
  description: "Gestion des demandes de test drive",
};

export default function AdminTestDrivesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <TestDrivesTable />
    </div>
  );
}
