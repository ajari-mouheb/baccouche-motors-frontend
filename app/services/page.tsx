import type { Metadata } from "next";
import Image from "next/image";
import { services } from "@/lib/data/services";
import { images } from "@/lib/constants/images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const serviceImageMap: Record<string, string> = {
  "apres-vente": images.serviceAfterSale,
  garantie: images.serviceGarantie,
  "premium-selection": images.servicePremium,
};

export const metadata: Metadata = {
  title: "Services | Baccouche Automobiles - BMW Sousse",
  description:
    "Service après-vente, garantie et véhicules d'occasion certifiés BMW.",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="section-title mb-4">NOS SERVICES</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Baccouche Automobiles vous propose une gamme complète de services pour
          votre véhicule BMW.
        </p>
      </div>

      <div className="space-y-8">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden rounded-2xl border-border/60 shadow-sm">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-square overflow-hidden bg-muted">
                <Image
                  src={serviceImageMap[service.id] ?? images.serviceAfterSale}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.details}
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
