import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Agent agréé Ben Jemâa Motors",
  "Showroom de 615 m²",
  "Centre 3S sur 5000 m²",
  "Atelier de réparation 1350 m²",
  "Équipes formées par BMW AG",
];

export function PresentationSection() {
  return (
    <section id="presentation" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-2xl lg:aspect-auto lg:min-h-[480px]">
              <Image
                src={images.presentation}
                alt="Showroom Baccouche Automobiles"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 z-10 hidden lg:block">
              <div className="rounded-2xl border border-luxury-accent/30 bg-card p-6 shadow-xl">
                <div className="text-4xl font-bold text-luxury-accent">25+</div>
                <div className="text-sm text-muted-foreground">Années d&apos;excellence</div>
              </div>
            </div>

            {/* Decorative background */}
            <div className="absolute -z-10 left-0 top-0 h-full w-full rounded-2xl border-2 border-luxury-accent/20 translate-x-0" />
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="mb-4 inline-block rounded-full bg-luxury-accent/10 px-4 py-1.5 text-sm font-medium text-luxury-accent">
                À propos
              </span>
              <h2 className="section-title text-foreground">
                Baccouche Automobiles
              </h2>
            </div>

            <div className="space-y-4">
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
            </div>

            {/* Highlights */}
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-luxury-accent/10">
                    <CheckCircle2 className="h-4 w-4 text-luxury-accent" />
                  </div>
                  <span className="text-sm text-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-luxury-accent px-6 text-primary hover:bg-luxury-accent/90 group"
              >
                <Link href="/about">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg border-luxury-accent/50 px-6 hover:border-luxury-accent hover:bg-luxury-accent/5"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}