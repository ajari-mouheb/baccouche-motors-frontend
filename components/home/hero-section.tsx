"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constants/images";
import { ChevronDown, Shield, Award, Clock } from "lucide-react";

const words = ["luxe", "performance", "élégance", "innovation"];

const trustBadges = [
  { icon: Shield, label: "Agent agréé BMW" },
  { icon: Award, label: "Premium Selection" },
  { icon: Clock, label: "+25 ans d'expertise" },
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt="Luxury BMW - Baccouche Automobiles Sousse"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-luxury-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-luxury-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-left lg:max-w-3xl">
          {/* Trust Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4 text-luxury-accent" />
            <span className="text-sm font-medium text-white/90">Agent agréé Ben Jemâa Motors</span>
          </div>

          {/* Animated Subtitle */}
          <p className="hero-subtitle mb-4 font-medium tracking-[0.2em] text-white/90 uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
            L&apos;excellence automobile à Sousse
          </p>

          {/* Main Title */}
          <h1 className="hero-title mb-6 text-white drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Où le{" "}
            <span
              key={currentWordIndex}
              className={`inline-block transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 transform -translate-y-2"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <span className="text-luxury-accent">{words[currentWordIndex]}</span>
            </span>{" "}
            rencontre la performance
          </h1>

          {/* Description */}
          <p className="mb-10 text-base leading-relaxed text-white/90 md:text-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            Premier concessionnaire BMW à Sousse. Découvrez notre collection de
            véhicules neufs et d&apos;occasion certifiés, notre service
            après-vente d&apos;excellence et réservez votre essai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-700 delay-450">
            <Button
              asChild
              size="lg"
              className="rounded-lg border-2 border-luxury-accent bg-luxury-accent px-8 py-6 text-base font-medium text-primary shadow-lg transition-all hover:bg-luxury-accent/90 hover:shadow-xl hover:scale-105"
            >
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-2 border-white/70 bg-white/10 px-8 py-6 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white hover:scale-105"
            >
              <Link href="/cars">Découvrir les véhicules</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          {mounted && (
            <div className="mt-12 flex flex-wrap items-center gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-600">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-white/70"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <badge.icon className="h-5 w-5 text-luxury-accent" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            const nextSection = document.querySelector("#presentation");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
          aria-label="Défiler vers le bas"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Découvrir</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}