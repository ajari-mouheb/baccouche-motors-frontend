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

const serviceImageMap: Record<string, string> = {
  "apres-vente": images.serviceAfterSale,
  garantie: images.serviceGarantie,
  "premium-selection": images.servicePremium,
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title mb-16 text-center text-foreground">
          Nos services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <Image
                  src={serviceImageMap[service.id] ?? images.serviceAfterSale}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader className="space-y-2 px-6 pt-6">
                <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col px-6 pb-6">
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.details.slice(0, 120)}...
                </p>
                <Button
                  variant="link"
                  asChild
                  className="mt-4 h-auto justify-start p-0 text-luxury-accent hover:text-luxury-accent/80"
                >
                  <Link href="/services">En savoir plus</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
