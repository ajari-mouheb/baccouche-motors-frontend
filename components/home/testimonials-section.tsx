"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Mohamed Ben Ali",
    role: "Entrepreneur",
    content:
      "Un service exceptionnel ! L'équipe de Baccouche Automobiles m'a accompagné tout au long de l'achat de ma BMW X5. Professionnalisme et expertise au rendez-vous.",
    rating: 5,
    car: "BMW X5",
  },
  {
    id: 2,
    name: "Fatma Kacem",
    role: "Médecin",
    content:
      "J'ai acheté ma première BMW chez Baccouche et l'expérience a été parfaite. Le service après-vente est réactif et les conseils sont toujours pertinents.",
    rating: 5,
    car: "BMW Série 3",
  },
  {
    id: 3,
    name: "Ahmed Trabelsi",
    role: "Ingénieur",
    content:
      "Excellent concessionnaire. Le personnel est compétent et à l'écoute. Mon véhicule d'occasion Premium Selection était en parfait état. Je recommande vivement.",
    rating: 5,
    car: "BMW Série 5",
  },
  {
    id: 4,
    name: "Leila Mansouri",
    role: "Avocate",
    content:
      "Service client irréprochable. L'équipe a pris le temps de me présenter tous les modèles et m'a aidée à trouver la BMW parfaite pour mes besoins. Merci !",
    rating: 5,
    car: "BMW X3",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-luxury-accent/10 px-4 py-1.5 text-sm font-medium text-luxury-accent">
            Témoignages
          </span>
          <h2 className="section-title mb-4 text-foreground">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground">
            Découvrez les expériences de nos clients satisfaits et rejoignez notre communauté de passionnés BMW.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden">
          {/* Cards Container */}
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full shrink-0 px-4">
                    <Card className="border-border/50 bg-card shadow-lg">
                      <CardContent className="p-8 md:p-12">
                        {/* Quote Icon */}
                        <div className="mb-6 flex justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-luxury-accent/10">
                            <Quote className="h-7 w-7 text-luxury-accent" />
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-6 flex justify-center gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-luxury-accent text-luxury-accent" />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="mb-8 text-center text-lg leading-relaxed text-muted-foreground">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex flex-col items-center">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-luxury-accent/10 px-3 py-1 text-xs font-medium text-luxury-accent">
                              {testimonial.car}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full border-border/50 hover:border-luxury-accent/50 hover:bg-luxury-accent/5"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-6 bg-luxury-accent"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full border-border/50 hover:border-luxury-accent/50 hover:bg-luxury-accent/5"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}