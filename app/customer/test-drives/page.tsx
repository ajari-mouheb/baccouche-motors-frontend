import type { Metadata } from "next";
import Link from "next/link";
import { mockTestDrives } from "@/lib/data/mock-admin";
import { Button } from "@/components/ui/button";
import { CustomerTestDrivesList } from "@/components/customer/customer-test-drives-list";

export const metadata: Metadata = {
  title: "Mes Test Drives | Espace client - Baccouche Automobiles",
  description: "Vos demandes de test drive",
};

export default function CustomerTestDrivesPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title mb-0">Mes demandes Test Drive</h1>
        <Button asChild>
          <Link href="/test-drive">Nouvelle demande</Link>
        </Button>
      </div>
      <CustomerTestDrivesList testDrives={mockTestDrives} />
    </div>
  );
}
