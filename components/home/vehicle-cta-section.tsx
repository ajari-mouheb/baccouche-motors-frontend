import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";
import { ArrowRight, Car, CheckCircle } from "lucide-react";

const features = [
  "Véhicules neufs BMW",
  "Occasions certifiées Premium Selection",
  "Garantie constructeur",
  "Financement sur mesure",
];

export function VehicleCtaSection() {
  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.vehicleCta}
          alt="Collection BMW"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 z-10 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-luxury-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 z-10 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-luxury-accent/10 blur-3xl" />

      <div className="section-padding relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                <Car className="h-4 w-4 text-luxury-accent" />
                Notre collection
              </span>

              <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Découvrez notre collection
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-white/80">
                Explorez notre sélection de véhicules neufs et d&apos;occasion
                certifiés BMW Premium Selection. Chaque véhicule est inspecté et
                certifié par nos experts.
              </p>

              {/* Features */}
              <div className="mb-10 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="h-5 w-5 shrink-0 text-luxury-accent" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-lg bg-luxury-accent px-10 py-6 text-base font-medium shadow-lg transition-all hover:bg-luxury-accent/90 hover:shadow-xl hover:scale-105"
                >
                  <Link href="/cars">
                    Découvrir les véhicules
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-2 border-white/50 bg-white/10 px-8 py-6 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white"
                >
                  <Link href="/cars?filter=new">Voir les neufs</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="mt-1 text-sm text-white/70">Véhicules en stock</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold text-white">100%</div>
                <div className="mt-1 text-sm text-white/70">Certifiés</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold text-white">5 ans</div>
                <div className="mt-1 text-sm text-white/70">Garantie max</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold text-white">24h</div>
                <div className="mt-1 text-sm text-white/70">Livraison express</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}