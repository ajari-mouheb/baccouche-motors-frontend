import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getCarBySlug, getAllCarSlugs } from "@/lib/data/cars";
import { Button } from "@/components/ui/button";

interface CarPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateStaticParams() {
  return getAllCarSlugs().map((slug) => ({ carId: slug }));
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarBySlug(carId);
  if (!car) return {};
  return {
    title: `${car.name} | Baccouche Automobiles - BMW Sousse`,
    description: car.description,
  };
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { carId } = await params;
  const car = getCarBySlug(carId);
  if (!car) notFound();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted lg:aspect-square">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="section-title mb-2">{car.name}</h1>
          <p className="mb-6 text-muted-foreground">
            {car.model} • {car.year}
          </p>
          {car.price && (
            <p className="mb-6 text-xl font-semibold text-primary">{car.price}</p>
          )}
          <p className="mb-8 leading-relaxed text-muted-foreground">
            {car.description}
          </p>
          {car.specs && (
            <div className="mb-8">
              <h2 className="mb-4 font-semibold">Caractéristiques</h2>
              <dl className="space-y-2">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b py-2 text-sm"
                  >
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
