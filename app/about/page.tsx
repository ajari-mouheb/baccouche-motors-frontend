import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Baccouche Automobiles - BMW Sousse",
  description:
    "Baccouche Automobiles, premier concessionnaire BMW à Sousse, agent agréé par Ben Jemâa Motors.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="section-title mb-8">À PROPOS</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed mb-6">
          Baccouche Automobiles est le premier concessionnaire de BMW à Sousse,
          agent agréé par Ben Jemâa Motors, importateur officiel de la marque BMW
          en Tunisie.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          En tant que premier concessionnaire, Baccouche Automobiles promet à ses
          clients un large panel des modèles qui répond aux besoins de sa
          clientèle. Notre showroom de plus de 615 m² d&apos;espace d&apos;exposition
          vous accueille pour découvrir les dernières nouveautés BMW.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Notre centre 3S (Showroom, Pièces détachées, Service) s&apos;étend sur
          plus de 5000 m² et comprend un atelier de réparation de 1350 m²
          équipé pour tous les travaux techniques BMW : service rapide,
          mécanique générale, électromécanique, diagnostic et carrosserie.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Nos équipes reçoivent régulièrement des formations spécifiques afin de
          toujours rester à la pointe des dernières techniques de réparation et
          maintenance mises en place par le groupe BMW AG. En confiant votre
          véhicule BMW à Baccouche Automobiles, vous le remettez entre les mains
          de nos experts.
        </p>
      </div>
    </div>
  );
}
