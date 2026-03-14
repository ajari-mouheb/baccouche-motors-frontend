"use client";

import { CarGrid } from "@/components/cars/car-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { useCars } from "@/lib/hooks/use-cars";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CarsPage() {
  const { data: cars, isLoading, isError, error } = useCars();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-12">
          <div className="mb-4 h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <EmptyState
          title="Erreur de chargement"
          description={(error as Error)?.message ?? "Impossible de charger les véhicules."}
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Réessayer
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12">
        <h1 className="section-title mb-4">VOTRE BMW</h1>
        <p className="text-muted-foreground max-w-2xl">
          Trouvez le véhicule BMW qui vous correspond. Découvrez notre gamme
          complète de modèles neufs et d&apos;occasion.
        </p>
      </div>
      {!cars?.length ? (
        <EmptyState
          title="Aucun véhicule"
          description="Aucun véhicule disponible pour le moment."
        />
      ) : (
        <CarGrid cars={cars} />
      )}
    </div>
  );
}
