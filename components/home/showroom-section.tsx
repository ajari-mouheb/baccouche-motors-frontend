import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Car } from "lucide-react";

const showroomFeatures = [
  {
    icon: Car,
    title: "615 m²",
    description: "Espace d'exposition",
  },
  {
    icon: MapPin,
    title: "5000 m²",
    description: "Centre 3S complet",
  },
  {
    icon: Clock,
    title: "Lun - Sam",
    description: "8h00 - 18h00",
  },
  {
    icon: Phone,
    title: "+216 70 220 300",
    description: "Service client",
  },
];

export function ShowroomSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-2xl lg:aspect-[4/3]">
              <Image
                src="/img_1.jpg"
                alt="Showroom Baccouche Automobiles"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 z-10 hidden lg:block">
              <div className="rounded-2xl border border-luxury-accent/30 bg-card p-6 shadow-xl">
                <div className="mb-2 text-3xl font-bold text-luxury-accent">25+</div>
                <div className="text-sm text-muted-foreground">Années d&apos;expertise</div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -z-10 -left-4 -top-4 h-full w-full rounded-2xl border-2 border-luxury-accent/20" />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-block rounded-full bg-luxury-accent/10 px-4 py-1.5 text-sm font-medium text-luxury-accent">
              Notre showroom
            </span>

            <h2 className="section-title mb-6 text-foreground">
              Un espace dédié à l&apos;excellence
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Découvrez notre showroom de 615 m² et notre centre 3S de plus de 5000 m²
              comprenant un atelier de réparation de 1350 m² équipé pour tous les travaux
              techniques BMW.
            </p>

            {/* Features Grid */}
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {showroomFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-luxury-accent/30 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
                    <feature.icon className="h-5 w-5 text-luxury-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-luxury-accent px-6 text-primary hover:bg-luxury-accent/90"
              >
                <Link href="/contact">Prendre rendez-vous</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg border-luxury-accent/50 px-6 hover:border-luxury-accent hover:bg-luxury-accent/5"
              >
                <Link href="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}