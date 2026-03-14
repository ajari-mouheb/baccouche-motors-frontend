"use client";

import Link from "next/link";
import { Car, CarFront, CalendarPlus, Mail } from "lucide-react";
import { useTestDrives } from "@/lib/hooks/use-test-drives";

export default function CustomerDashboardPage() {
  const { data: testDrives = [] } = useTestDrives();

  const pendingCount = testDrives.filter((t) => t.status === "pending").length;
  const lastRequest = testDrives[0]
    ? new Date(testDrives[0].createdAt).toLocaleDateString("fr-FR")
    : null;

  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-4">Mon espace</h1>
      <p className="mb-8 text-muted-foreground">
        Bienvenue ! Gérez vos demandes et découvrez nos véhicules.
      </p>
      {(pendingCount > 0 || lastRequest) && (
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {pendingCount > 0 && (
            <span>{pendingCount} demande(s) en cours</span>
          )}
          {lastRequest && (
            <span>Dernière activité : {lastRequest}</span>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/customer/test-drives"
          className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-luxury-accent/30 hover:shadow-md"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
            <Car className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Mes demandes Test Drive</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Consultez le statut de vos demandes d&apos;essai.
            </p>
          </div>
        </Link>
        <Link
          href="/test-drive"
          className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-luxury-accent/30 hover:shadow-md"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
            <CalendarPlus className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Réserver un Test Drive</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Demandez un essai gratuit sur le modèle de votre choix.
            </p>
          </div>
        </Link>
        <Link
          href="/cars"
          className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-luxury-accent/30 hover:shadow-md"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
            <CarFront className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Découvrir nos véhicules</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Explorez notre gamme BMW.
            </p>
          </div>
        </Link>
        <Link
          href="/contact"
          className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-luxury-accent/30 hover:shadow-md"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-luxury-accent/10">
            <Mail className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Nous contacter</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Une question ? Envoyez-nous un message.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
