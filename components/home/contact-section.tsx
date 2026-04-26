import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const contactCards = [
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

export function ContactSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-black relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 z-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-luxury-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 z-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-luxury-accent/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
            Contact
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Besoin d&apos;aide ?
          </h2>
          <p className="text-lg text-white/70">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans votre projet automobile.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-luxury-accent/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-accent/20 transition-transform group-hover:scale-110">
                <card.icon className="h-6 w-6 text-luxury-accent" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-white">
                {card.title}
              </h3>
              {card.href ? (
                <a
                  href={card.href}
                  className="whitespace-pre-line text-sm text-white/70 transition-colors hover:text-luxury-accent"
                >
                  {card.content}
                </a>
              ) : (
                <p className="whitespace-pre-line text-sm text-white/70">{card.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="rounded-lg bg-luxury-accent px-10 py-6 text-base font-medium text-primary shadow-lg transition-all hover:bg-luxury-accent/90 hover:shadow-xl hover:scale-105"
          >
            <Link href="/contact">
              Nous contacter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex items-center justify-center gap-8 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2 text-white/60">
            <svg className="h-8 w-auto" viewBox="0 0 80 80" fill="currentColor">
              <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M40 15 L45 30 L60 30 L48 40 L53 55 L40 45 L27 55 L32 40 L20 30 L35 30 Z" />
            </svg>
            <span className="text-sm">Agent agréé BMW</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="h-8 w-auto" viewBox="0 0 80 80" fill="currentColor">
              <rect x="15" y="15" width="50" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M25 40 L35 50 L55 30" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <span className="text-sm">Premium Selection</span>
          </div>
        </div>
      </div>
    </section>
  );
}