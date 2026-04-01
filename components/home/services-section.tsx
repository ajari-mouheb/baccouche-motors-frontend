import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { images } from "@/lib/constants/images";
import { ArrowRight, Wrench, Shield, Car } from "lucide-react";

const serviceImageMap: Record<string, string> = {
  "apres-vente": images.serviceAfterSale,
  garantie: images.serviceGarantie,
  "premium-selection": images.servicePremium,
};

const serviceIconMap: Record<string, typeof Wrench> = {
  "apres-vente": Wrench,
  garantie: Shield,
  "premium-selection": Car,
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-luxury-accent/10 px-4 py-1.5 text-sm font-medium text-luxury-accent">
            Nos services
          </span>
          <h2 className="section-title mb-4 text-foreground">
            Un accompagnement complet
          </h2>
          <p className="text-muted-foreground">
            De l&apos;achat à l&apos;entretien, notre équipe vous accompagne à chaque étape
            de votre expérience BMW.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const ServiceIcon = serviceIconMap[service.id] || Wrench;
            return (
              <Card
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-luxury-accent/30"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={serviceImageMap[service.id] ?? images.serviceAfterSale}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-card/90 backdrop-blur-sm shadow-lg transition-transform group-hover:scale-110">
                    <ServiceIcon className="h-6 w-6 text-luxury-accent" />
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="space-y-3 px-6 pt-6">
                  <CardTitle className="font-serif text-xl group-hover:text-luxury-accent transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col px-6 pb-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.details.slice(0, 100)}...
                  </p>
                  <Button
                    variant="link"
                    asChild
                    className="mt-4 h-auto justify-start p-0 text-luxury-accent group/link hover:text-luxury-accent/80"
                  >
                    <Link href="/services" className="flex items-center gap-2">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-lg border-luxury-accent/50 px-8 hover:border-luxury-accent hover:bg-luxury-accent/5"
          >
            <Link href="/services">
              Découvrir tous nos services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}