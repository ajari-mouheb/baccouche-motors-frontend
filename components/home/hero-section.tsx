import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt="Luxury BMW - Baccouche Automobiles Sousse"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-left md:max-w-xl lg:max-w-2xl">
          <p className="hero-subtitle mb-4 font-medium tracking-[0.2em] text-white/90 uppercase">
            L&apos;excellence automobile à Sousse
          </p>
          <h1 className="hero-title mb-6 text-white drop-shadow-lg">
            Où le luxe rencontre la performance
          </h1>
          <p className="mb-10 text-base leading-relaxed text-white/90 md:text-lg">
            Premier concessionnaire BMW à Sousse. Découvrez notre collection de
            véhicules neufs et d&apos;occasion certifiés, notre service
            après-vente d&apos;excellence et réservez votre essai.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-lg border-2 border-luxury-accent bg-luxury-accent px-8 py-6 text-base font-medium text-primary shadow-lg transition-all hover:bg-luxury-accent/90 hover:shadow-xl"
            >
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-2 border-white/70 bg-white/10 px-8 py-6 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
