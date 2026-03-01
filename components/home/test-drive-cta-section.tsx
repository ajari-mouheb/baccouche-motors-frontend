import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TestDriveCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title mb-4 text-primary-foreground">
            Vivez l&apos;expérience BMW
          </h2>
          <p className="mb-8 opacity-90">
            Réservez votre essai gratuit et découvrez le plaisir de conduire une
            BMW.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/test-drive">Réserver un Test Drive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
