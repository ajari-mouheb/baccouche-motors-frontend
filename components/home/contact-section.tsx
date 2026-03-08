import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title mb-12 text-center text-foreground">
          Contact
        </h2>
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-luxury-accent/30">
              <h3 className="mb-2 font-serif font-semibold">Adresse</h3>
              <p className="text-sm text-muted-foreground">
                Route Ceinture Oued Arouk
                <br />
                Akouda, Sousse, Tunisie
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-luxury-accent/30">
              <h3 className="mb-2 font-serif font-semibold">Téléphone</h3>
              <a
                href="tel:+21670220300"
                className="text-sm text-muted-foreground hover:text-luxury-accent transition-colors"
              >
                +216 70 220 300
              </a>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-luxury-accent/30 md:col-span-2">
              <h3 className="mb-2 font-serif font-semibold">Email</h3>
              <a
                href="mailto:contact@baccoucheautomobiles.tn"
                className="text-sm text-muted-foreground hover:text-luxury-accent transition-colors"
              >
                contact@baccoucheautomobiles.tn
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-lg border-2 border-luxury-accent bg-luxury-accent px-8 shadow-sm transition-all hover:bg-luxury-accent/90 hover:shadow-md"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
