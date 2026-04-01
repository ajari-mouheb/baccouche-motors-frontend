"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Car, CarFront, CalendarPlus, Mail, Clock, CheckCircle, XCircle, Calendar, ArrowRight, User } from "lucide-react";
import { useTestDrives } from "@/lib/hooks/use-test-drives";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: "En attente", color: "text-amber-500", bgColor: "bg-amber-500/10" },
  confirmed: { label: "Confirmé", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  completed: { label: "Terminé", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  rejected: { label: "Refusé", color: "text-red-500", bgColor: "bg-red-500/10" },
  cancelled: { label: "Annulé", color: "text-gray-500", bgColor: "bg-gray-500/10" },
};

export default function CustomerDashboardPage() {
  const { data: testDrives = [], isLoading } = useTestDrives();
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Bonjour");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Bonjour");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Bon après-midi");
    } else {
      setGreeting("Bonsoir");
    }
  }, []);

  const pendingCount = testDrives.filter((t) => t.status === "pending").length;
  const confirmedCount = testDrives.filter((t) => t.status === "confirmed").length;
  const completedCount = testDrives.filter((t) => t.status === "completed").length;
  const upcomingTestDrives = testDrives
    .filter((t) => t.status === "confirmed" || t.status === "pending")
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-luxury-accent/10 via-luxury-accent/5 to-transparent p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{greeting}</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
              {user?.name || "Bienvenue"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Gérez vos demandes et découvrez nos véhicules.
            </p>
          </div>
          <div className="hidden shrink-0 md:block">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-luxury-accent/20">
              <User className="h-8 w-8 text-luxury-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
              <p className="text-xs text-muted-foreground">Confirmées</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Terminées</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-luxury-accent/20 bg-gradient-to-br from-luxury-accent/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-luxury-accent/20">
              <Car className="h-5 w-5 text-luxury-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{testDrives.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Test Drives */}
      {upcomingTestDrives.length > 0 && (
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="flex items-center justify-between border-b border-border/50 p-4">
            <h2 className="font-semibold text-foreground">Prochains essais</h2>
            <Link
              href="/customer/test-drives"
              className="text-sm font-medium text-luxury-accent hover:underline"
            >
              Voir tout
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {upcomingTestDrives.map((td) => {
              const config = statusConfig[td.status] || statusConfig.pending;
              return (
                <div
                  key={td.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor}`}>
                      <Car className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{td.model}</p>
                      <p className="text-sm text-muted-foreground">
                        {td.preferredDate
                          ? new Date(td.preferredDate).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                            })
                          : "Date à confirmer"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={td.status === "pending" ? "pending" : td.status === "confirmed" ? "confirmed" : "default"}
                  >
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 font-semibold text-foreground">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/customer/test-drives"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-luxury-accent/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-accent/10 transition-colors group-hover:bg-luxury-accent/20">
              <Car className="h-6 w-6 text-luxury-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Mes demandes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Consultez le statut de vos essais
              </p>
            </div>
          </Link>

          <Link
            href="/test-drive"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-luxury-accent/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
              <CalendarPlus className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Réserver un essai</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Demandez un test drive gratuit
              </p>
            </div>
          </Link>

          <Link
            href="/cars"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-luxury-accent/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
              <CarFront className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Nos véhicules</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Explorez notre gamme BMW
              </p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-luxury-accent/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 transition-colors group-hover:bg-purple-500/20">
              <Mail className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Nous contacter</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Une question ? Contactez-nous
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Empty State for New Users */}
      {testDrives.length === 0 && !isLoading && (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Réservez votre premier essai
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Découvrez nos véhicules BMW avec un test drive gratuit.
          </p>
          <Button asChild className="mt-4">
            <Link href="/test-drive">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Réserver un test drive
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}