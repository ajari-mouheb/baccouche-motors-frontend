import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
}

function getCarDisplayName(car: Car): string {
  return car.name ?? (car.make ? `${car.make} ${car.model}` : car.model);
}

export function CarCard({ car }: CarCardProps) {
  const displayName = getCarDisplayName(car);
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={car.image}
          alt={displayName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle>{displayName}</CardTitle>
        <CardDescription>
          {car.model} • {car.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {car.description}
        </p>
        {car.price && (
          <p className="mt-2 font-semibold text-primary">{car.price}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/cars/${car.slug}`}>Voir les détails</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
