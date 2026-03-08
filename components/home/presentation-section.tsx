import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";

export function PresentationSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={images.presentation}
              alt="Showroom Baccouche Automobiles"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="space-y-6">
            <h2 className="section-title text-foreground">Présentation</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Baccouche Automobiles est le premier concessionnaire BMW à Sousse, agent
              agréé par Ben Jemâa Motors, importateur officiel de la marque BMW en
              Tunisie.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              En tant que premier concessionnaire, nous offrons à nos clients une
              sélection premium de modèles qui allient luxe, performance et
              artisanat allemand.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-4 rounded-lg border-luxury-accent/50 px-6 transition-colors hover:border-luxury-accent hover:bg-luxury-accent/5"
            >
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
