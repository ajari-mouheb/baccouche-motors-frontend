import Link from "next/link";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VehicleCtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title mb-4">VOTRE BMW</h2>
          <p className="mb-8 text-muted-foreground md:text-lg">
            Trouvez Votre BMW ... !
          </p>
          <Button asChild size="lg">
            <Link href="/cars" className="flex items-center gap-2">
              <Car className="size-5" />
              Découvrir nos véhicules
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
