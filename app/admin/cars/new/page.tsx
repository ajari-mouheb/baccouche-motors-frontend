import type { Metadata } from "next";
import { CarForm } from "@/components/admin/car-form";

export const metadata: Metadata = {
  title: "Ajouter un véhicule | Admin - Baccouche Automobiles",
  description: "Ajouter un nouveau véhicule au catalogue",
};

export default function NewCarPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <CarForm />
    </div>
  );
}