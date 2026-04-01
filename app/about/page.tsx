import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";
import { Award, Users, Car, Wrench, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos | Baccouche Automobiles - BMW Sousse",
  description:
    "Baccouche Automobiles, premier concessionnaire BMW à Sousse, agent agréé par Ben Jemâa Motors.",
};

const stats = [
  { label: "Années d'expérience", value: "25+", icon: Award },
  { label: "Clients satisfaits", value: "5000+", icon: Users },
  { label: "Véhicules vendus", value: "3000+", icon: Car },
  { label: "Techniciens certifiés", value: "15+", icon: Wrench },
];

const values = [
  {
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque interaction, offrant un service irréprochable à nos clients.",
    icon: Award,
  },
  {
    title: "Confiance",
    description:
      "La transparence et l'intégrité sont au cœur de nos relations avec nos clients.",
    icon: CheckCircle2,
  },
  {
    title: "Expertise",
    description:
      "Nos équipes régulièrement formées maîtrisent les dernières technologies BMW.",
    icon: Wrench,
  },
];

const timeline = [
  { year: "1998", title: "Création", description: "Ouverture du premier showroom BMW à Sousse" },
  { year: "2005", title: "Expansion", description: "Agrandissement du centre 3S à 5000 m²" },
  { year: "2015", title: "Modernisation", description: "Rénovation complète du showroom et atelier" },
  { year: "2023", title: "Innovation", description: "Introduction des véhicules électriques BMW" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-luxury-black to-luxury-charcoal">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={images.presentation}
            alt="Showroom BMW"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container relative z-10 mx-auto flex min-h-[50vh] items-center px-4 py-16 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Notre Histoire
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Depuis plus de 25 ans, Baccouche Automobiles accompagne ses clients
              dans la découverte de l&apos;excellence BMW.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-luxury-accent/10">
                  <stat.icon className="h-7 w-7 text-luxury-accent" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
              <Image
                src={images.presentation}
                alt="Showroom Baccouche Automobiles"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="section-title text-foreground">Qui Sommes-Nous</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Baccouche Automobiles est le premier concessionnaire de BMW à Sousse,
                  agent agréé par Ben Jemâa Motors, importateur officiel de la marque BMW
                  en Tunisie.
                </p>
                <p className="leading-relaxed">
                  En tant que premier concessionnaire, Baccouche Automobiles promet à ses
                  clients un large panel des modèles qui répond aux besoins de sa
                  clientèle. Notre showroom de plus de 615 m² d&apos;espace d&apos;exposition
                  vous accueille pour découvrir les dernières nouveautés BMW.
                </p>
                <p className="leading-relaxed">
                  Notre centre 3S (Showroom, Pièces détachées, Service) s&apos;étend sur
                  plus de 5000 m² et comprend un atelier de réparation de 1350 m²
                  équipé pour tous les travaux techniques BMW.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="section-title text-foreground">Nos Valeurs</h2>
            <p className="text-muted-foreground">
              Des principes qui guident notre engagement envers l&apos;excellence
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-8 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-luxury-accent/10">
                  <value.icon className="h-8 w-8 text-luxury-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="section-title text-foreground">Notre Parcours</h2>
            <p className="text-muted-foreground">
              Plus de deux décennies d&apos;excellence automobile
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative mb-8 flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-luxury-accent ring-4 ring-background md:left-1/2" />
                {/* Content */}
                <div
                  className={`ml-12 w-full rounded-xl border border-border/50 bg-card p-6 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                  }`}
                >
                  <span className="mb-2 inline-block rounded-full bg-luxury-accent/10 px-3 py-1 text-sm font-medium text-luxury-accent">
                    {item.year}
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="section-title text-foreground">Nos Services</h2>
            <p className="text-muted-foreground">
              Un accompagnement complet pour votre véhicule BMW
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Vente de véhicules", desc: "Découvrez notre gamme complète de BMW neuves et d'occasion" },
              { title: "Service rapide", desc: "Entretien express sans rendez-vous pour les interventions courantes" },
              { title: "Mécanique générale", desc: "Réparations et maintenance par nos techniciens certifiés" },
              { title: "Carrosserie", desc: "Réparation et peinture dans notre atelier équipé" },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-luxury-accent/50 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="section-title text-foreground">Nous Visiter</h2>
                <p className="text-muted-foreground">
                  Notre showroom vous accueille du lundi au samedi
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-accent/10">
                    <MapPin className="h-6 w-6 text-luxury-accent" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Adresse</h3>
                  <p className="text-sm text-muted-foreground">
                    Route de Tunis, km 143<br />
                    4000 Sousse, Tunisie
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-accent/10">
                    <Phone className="h-6 w-6 text-luxury-accent" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Téléphone</h3>
                  <p className="text-sm text-muted-foreground">
                    +216 73 XXX XXX<br />
                    +216 73 XXX XXX
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-accent/10">
                    <Clock className="h-6 w-6 text-luxury-accent" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Horaires</h3>
                  <p className="text-sm text-muted-foreground">
                    Lun - Ven: 8h - 18h<br />
                    Samedi: 9h - 13h
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}