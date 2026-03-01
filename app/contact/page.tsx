import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Baccouche Automobiles - BMW Sousse",
  description:
    "Contactez Baccouche Automobiles, concessionnaire BMW à Sousse.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="section-title mb-4">CONTACT</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour répondre à toutes vos
          questions.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="mb-6 font-semibold">Nos coordonnées</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-muted-foreground">
                    Route Ceinture Oued Arouk
                    <br />
                    Akouda, Sousse, Tunisie
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-muted-foreground">+216 XX XXX XXX</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    contact@baccoucheautomobiles.tn
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-muted-foreground">
                    Lundi - Samedi: 8h00 - 18h00
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Carte (Google Maps)
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
