"use client";

import { use } from "react";
import Link from "next/link";
import { useCarBySlug } from "@/lib/hooks/use-cars";
import { ImageGallery } from "@/components/cars/image-gallery";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { CarDetailSkeleton } from "@/components/shared/skeletons";
import { Calendar, Gauge, Fuel, Cog, ChevronLeft, Phone } from "lucide-react";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = use(params);
  const { data: car, isLoading, isError, error } = useCarBySlug(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <CarDetailSkeleton />
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <EmptyState
          title="Véhicule non trouvé"
          description={(error as Error)?.message ?? "Ce véhicule n'existe pas ou a été supprimé."}
          action={
            <Link href="/cars">
              <Button>Voir tous les véhicules</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const displayName = car.name ?? (car.make ? `${car.make} ${car.model}` : car.model);
  const images = car.images ?? (car.image ? [car.image] : []);

  // Default specs to show
  const defaultSpecs: Record<string, string> = {
    "Année": String(car.year),
    "Modèle": car.model,
  };

  const specs = { ...defaultSpecs, ...car.specs };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      {/* Breadcrumb */}
      <Link
        href="/cars"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour aux véhicules
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={images} alt={displayName} />
        </div>

        {/* Car Details */}
        <div className="space-y-8">
          {/* Title & Price */}
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {displayName}
            </h1>
            <p className="text-lg text-muted-foreground">
              {car.make && `${car.make} • `}{car.model} • {car.year}
            </p>
            {car.price && (
              <p className="mt-4 text-3xl font-bold text-luxury-accent">
                {car.price}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-3 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Caractéristiques</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/30 p-3"
                >
                  <span className="text-xs text-muted-foreground">{key}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="flex-1">
              <Link href={`/test-drive?model=${encodeURIComponent(car.model)}`}>
                <Calendar className="mr-2 h-5 w-5" />
                Réserver un essai
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Nous contacter
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="rounded-xl border border-border/50 bg-muted/30 p-6">
            <h3 className="mb-2 font-semibold">Intéressé par ce véhicule ?</h3>
            <p className="text-sm text-muted-foreground">
              Prenez rendez-vous pour un essai ou contactez-nous pour plus d&apos;informations.
              Notre équipe est disponible pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}