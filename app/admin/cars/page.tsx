import type { Metadata } from "next";
import { cars } from "@/lib/data/cars";
import { AdminCarsGrid } from "@/components/admin/admin-cars-grid";

export const metadata: Metadata = {
  title: "Véhicules | Admin - Baccouche Automobiles",
  description: "Liste des véhicules",
};

export default function AdminCarsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Véhicules</h1>
      <AdminCarsGrid cars={cars} />
    </div>
  );
}
