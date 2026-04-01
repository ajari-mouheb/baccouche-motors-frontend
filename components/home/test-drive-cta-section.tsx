import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";
import { ArrowRight, Calendar, Clock, CheckCircle } from "lucide-react";

const steps = [
  { icon: Calendar, label: "Réservez en ligne", desc: "Choisissez votre modèle" },
  { icon: Clock, label: "30 minutes", desc: "Essai personnalisé" },
  { icon: CheckCircle, label: "Sans engagement", desc: "Décision libre" },
];

export function TestDriveCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-black">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src={images.testDriveCta}
          alt="Test Drive BMW"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-accent/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 z-10 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-luxury-accent/5 blur-3xl" />

      <div className="section-padding relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-luxury-accent" />
                Test Drive
              </span>

              <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Vivez l&apos;expérience BMW
              </h2>

              <p className="mb-10 text-lg leading-relaxed text-white/80">
                Prenez le volant et découvrez le plaisir de conduire une BMW.
                Réservez votre essai gratuit et laissez-vous séduire par la
                performance et le confort de nos véhicules.
              </p>

              {/* Steps */}
              <div className="mb-10 grid gap-4 sm:grid-cols-3">
                {steps.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <step.icon className="mb-2 h-6 w-6 text-luxury-accent" />
                    <div className="font-medium text-white">{step.label}</div>
                    <div className="text-sm text-white/60">{step.desc}</div>
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
                  <Link href="/test-drive">
                    Réserver un essai
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-lg border-2 border-white/50 bg-white/10 px-8 py-6 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white"
                >
                  <Link href="/cars">Voir les modèles</Link>
                </Button>
              </div>
            </div>

            {/* Right side - Featured card */}
            <div className="hidden lg:flex items-center">
              <div className="relative w-full">
                {/* Main card */}
                <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-luxury-accent/20 px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-luxury-accent" />
                    <span className="font-medium text-white">Essai gratuit</span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Votre essai personnalisé
                  </h3>

                  <ul className="mb-8 space-y-4">
                    {[
                      "Accompagnement par un conseiller",
                      "Parcours adapté à vos besoins",
                      "Découverte de toutes les fonctionnalités",
                      "Conseils personnalisés",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/80">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-luxury-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-luxury-accent hover:bg-luxury-accent/90"
                  >
                    <Link href="/test-drive">
                      Réserver maintenant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl border border-luxury-accent/30 bg-luxury-accent/5 backdrop-blur-sm -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}