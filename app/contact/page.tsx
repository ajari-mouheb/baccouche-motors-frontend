import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

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
            <ul className="space-y-6">
              <li>
                <p className="font-medium">Adresse</p>
                <p className="text-muted-foreground">
                  Route Ceinture Oued Arouk
                  <br />
                  Akouda, Sousse, Tunisie
                </p>
              </li>
              <li>
                <p className="font-medium">Téléphone</p>
                <a
                  href="tel:+21670220300"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +216 70 220 300
                </a>
              </li>
              <li>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">
                  contact@baccoucheautomobiles.tn
                </p>
              </li>
              <li>
                <p className="font-medium">Horaires</p>
                <p className="text-muted-foreground">
                  Lundi - Samedi: 8h00 - 18h00
                </p>
              </li>
            </ul>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.556636248!2d10.5622!3d35.8694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d6e9e8b4b1%3A0x4c8d4e4e4e4e4e4e!2sRoute%20Ceinture%20Oued%20Arouk%2C%20Akouda%2C%20Sousse%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v1709481600000!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baccouche Automobiles - Localisation"
              className="min-h-[300px]"
            />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
