import type { Metadata } from "next";
import Image from "next/image";
import { TestDriveForm } from "@/components/forms/test-drive-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";

export const metadata: Metadata = {
  title: "Test Drive | Baccouche Automobiles - BMW Sousse",
  description: "Réservez votre essai gratuit BMW chez Baccouche Automobiles.",
};

export default function TestDrivePage() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.testDrivePage}
            alt="Test Drive BMW"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
          <h1 className="hero-title text-white drop-shadow-lg">
            Réserver un Test Drive
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Vivez l&apos;expérience BMW. Notre équipe vous contactera sous 24h pour organiser votre essai.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="rounded-xl border border-border/80 bg-card p-8 shadow-sm">
              <TestDriveForm />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="section-title mb-6 text-foreground">
                Pourquoi réserver ?
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="inline-block size-8 shrink-0 rounded-full bg-luxury-accent/20 text-center font-semibold text-luxury-accent leading-8">1</span>
                  <span>Essai gratuit, sans engagement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block size-8 shrink-0 rounded-full bg-luxury-accent/20 text-center font-semibold text-luxury-accent leading-8">2</span>
                  <span>Réponse sous 24h garantie</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block size-8 shrink-0 rounded-full bg-luxury-accent/20 text-center font-semibold text-luxury-accent leading-8">3</span>
                  <span>Conseils personnalisés par nos experts</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-luxury-accent/30 bg-luxury-accent/5 p-6">
              <p className="font-semibold text-foreground">Réponse sous 24h</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Notre équipe vous recontactera rapidement pour confirmer votre créneau.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/30 p-6">
              <p className="font-semibold text-foreground">Essai gratuit</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Découvrez le plaisir de conduire une BMW sans frais ni engagement.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full border-luxury-accent/50 hover:border-luxury-accent hover:bg-luxury-accent/5"
            >
              <Link href="/cars">Découvrir nos véhicules</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
