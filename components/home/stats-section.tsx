"use client";

import { useEffect, useState, useRef } from "react";
import { Award, Users, Car, Wrench } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "Années d'expérience",
    description: "Expertise BMW depuis 1998",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Clients satisfaits",
    description: "Une clientèle fidèle",
  },
  {
    icon: Car,
    value: 3000,
    suffix: "+",
    label: "Véhicules vendus",
    description: "Neufs et occasions",
  },
  {
    icon: Wrench,
    value: 15,
    suffix: "+",
    label: "Techniciens certifiés",
    description: "Formation BMW continue",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-foreground md:text-5xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative -mt-16 z-10 mx-4 md:mx-8 lg:mx-auto max-w-6xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-border/50 bg-card p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-luxury-accent/30 hover:shadow-xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5 transition-transform group-hover:scale-110">
              <stat.icon className="h-6 w-6 text-luxury-accent" />
            </div>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 font-medium text-foreground">{stat.label}</p>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}