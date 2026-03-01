import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-28 lg:py-36">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-lg font-medium text-muted-foreground md:text-xl">
            Contactez nous et on s&apos;occupe du reste...
          </p>
          <h1 className="hero-title mb-6 text-primary">
            BMW SOUSSE EST PLUS PROCHE DE VOUS !
          </h1>
          <p className="mb-8 text-muted-foreground md:text-lg">
            Premier concessionnaire BMW à Sousse. Découvrez nos véhicules neufs
            et d&apos;occasion, notre service après-vente et réservez votre
            essai.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
