import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-title mb-12 text-center">CONTACT</h2>
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg border bg-card p-6">
              <MapPin className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-sm text-muted-foreground">
                  Route Ceinture Oued Arouk
                  <br />
                  Akouda, Sousse, Tunisie
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border bg-card p-6">
              <Phone className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Téléphone</h3>
                <p className="text-sm text-muted-foreground">+216 XX XXX XXX</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border bg-card p-6 md:col-span-2">
              <Mail className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">
                  contact@baccoucheautomobiles.tn
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
