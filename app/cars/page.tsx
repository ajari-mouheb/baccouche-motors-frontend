import type { Metadata } from "next";
import { cars } from "@/lib/data/cars";
import { CarGrid } from "@/components/cars/car-grid";

export const metadata: Metadata = {
  title: "Véhicules | Baccouche Automobiles - BMW Sousse",
  description: "Découvrez notre gamme de véhicules BMW neufs et d'occasion.",
};

export default function CarsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12">
        <h1 className="section-title mb-4">VOTRE BMW</h1>
        <p className="text-muted-foreground max-w-2xl">
          Trouvez le véhicule BMW qui vous correspond. Découvrez notre gamme
          complète de modèles neufs et d&apos;occasion.
        </p>
      </div>
      <CarGrid cars={cars} />
    </div>
  );
}
