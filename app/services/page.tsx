import type { Metadata } from "next";
import { services } from "@/lib/data/services";
import { Wrench, Shield, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const icons = {
  "apres-vente": Wrench,
  garantie: Shield,
  "premium-selection": Car,
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
        {services.map((service) => {
          const Icon = icons[service.id as keyof typeof icons] ?? Wrench;
          return (
            <Card key={service.id}>
              <CardHeader>
                <div className="mb-2 flex size-14 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.details}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
