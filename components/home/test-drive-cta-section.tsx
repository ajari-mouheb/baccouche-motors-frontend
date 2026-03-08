import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";

export function TestDriveCtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.testDriveCta}
          alt="Test Drive BMW"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>
      <div className="section-padding relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title mb-6 text-white">
              Vivez l&apos;expérience
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/90">
              Réservez votre essai gratuit et découvrez le plaisir de conduire une
              BMW. Une expérience à la hauteur de vos attentes.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-lg border-2 border-luxury-accent bg-luxury-accent px-10 py-6 text-base font-medium shadow-lg transition-all hover:bg-luxury-accent/90 hover:shadow-xl"
            >
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
