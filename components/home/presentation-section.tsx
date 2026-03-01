import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PresentationSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title mb-6">PRÉSENTATION</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Baccouche Automobiles est le premier concessionnaire de BMW à Sousse,
            agent agréé par Ben Jemâa Motors, importateur officiel de la marque
            BMW en Tunisie.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            En tant que premier concessionnaire, Baccouche Automobiles promet à
            ses clients un large panel des modèles qui répond aux besoins de sa
            clientèle.
          </p>
          <Button asChild variant="outline">
            <Link href="/about">En savoir plus</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
