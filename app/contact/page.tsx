import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Baccouche Automobiles - BMW Sousse",
  description:
    "Contactez Baccouche Automobiles, concessionnaire BMW à Sousse.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Route Ceinture Oued Arouk\nAkouda, Sousse, Tunisie",
    href: null,
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+216 70 220 300",
    href: "tel:+21670220300",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@baccoucheautomobiles.tn",
    href: "mailto:contact@baccoucheautomobiles.tn",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun - Sam: 8h00 - 18h00\nDimanche: Fermé",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-luxury-black to-luxury-charcoal">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Contactez-Nous
            </h1>
            <p className="text-lg text-white/80">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions et vous accompagner dans votre projet automobile.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-luxury-accent/50 hover:shadow-md"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-luxury-accent/10 transition-colors group-hover:bg-luxury-accent/20">
                      <item.icon className="h-5 w-5 text-luxury-accent" />
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="whitespace-pre-line text-sm text-muted-foreground transition-colors hover:text-luxury-accent"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="whitespace-pre-line text-sm text-muted-foreground">
                        {item.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
                <div className="border-b border-border/50 bg-muted/30 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-luxury-accent" />
                    <span className="text-sm font-medium">Notre Localisation</span>
                  </div>
                </div>
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.556636248!2d10.5622!3d35.8694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d6e9e8b4b1%3A0x4c8d4e4e4e4e4e4e!2sRoute%20Ceinture%20Oued%20Arouk%2C%20Akouda%2C%20Sousse%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v1709481600000!5m2!1sfr!2stn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Baccouche Automobiles - Localisation"
                    className="absolute inset-0"
                  />
                </div>
              </div>

              {/* Quick Contact Note */}
              <div className="rounded-xl border border-luxury-accent/20 bg-luxury-accent/5 p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
                    <MessageCircle className="h-5 w-5 text-luxury-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Réponse Rapide</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous vous répondons dans les plus brefs délais. Pour une réponse
                      immédiate, n&apos;hésitez pas à nous appeler directement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans
                    les plus brefs délais.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}