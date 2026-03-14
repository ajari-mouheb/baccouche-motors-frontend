import type { Metadata } from "next";
import { TestDrivesTable } from "@/components/admin/test-drives-table";

export const metadata: Metadata = {
  title: "Test Drives | Admin - Baccouche Automobiles",
  description: "Gestion des demandes de test drive",
};

export default function AdminTestDrivesPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Demandes Test Drive</h1>
      <TestDrivesTable />
    </div>
  );
}
