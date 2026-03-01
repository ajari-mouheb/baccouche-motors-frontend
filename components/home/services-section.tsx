import Link from "next/link";
import { Wrench, Shield, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

const icons = {
  "apres-vente": Wrench,
  garantie: Shield,
  "premium-selection": Car,
};

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-title mb-12 text-center">NOS SERVICES</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.id as keyof typeof icons] ?? Wrench;
            return (
              <Card key={service.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {service.details.slice(0, 120)}...
                  </p>
                </CardContent>
                <CardContent className="pt-0">
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/services">En savoir plus</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
