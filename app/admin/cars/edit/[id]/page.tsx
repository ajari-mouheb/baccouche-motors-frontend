import type { Metadata } from "next";
import { CarForm } from "@/components/admin/car-form";

export const metadata: Metadata = {
  title: "Modifier le véhicule | Admin - Baccouche Automobiles",
  description: "Modifier les informations du véhicule",
};

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <CarForm carId={id} />
    </div>
  );
}