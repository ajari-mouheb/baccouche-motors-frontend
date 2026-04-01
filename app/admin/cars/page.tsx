import type { Metadata } from "next";
import { AdminCarsGrid } from "@/components/admin/admin-cars-grid";

export const metadata: Metadata = {
  title: "Véhicules | Admin - Baccouche Automobiles",
  description: "Liste des véhicules",
};

export default function AdminCarsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AdminCarsGrid />
    </div>
  );
}
