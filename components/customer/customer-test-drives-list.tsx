"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { TestDrive } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { TestDriveDetailDialog } from "./test-drive-detail-dialog";
import { useTestDrives, useCancelTestDrive } from "@/lib/hooks/use-test-drives";
import { Calendar, List, ChevronLeft, ChevronRight, Car, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusVariant: Record<string, "pending" | "confirmed" | "completed" | "rejected" | "destructive"> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  rejected: "rejected",
  cancelled: "destructive",
};

const statusLabel: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  rejected: "Refusé",
  cancelled: "Annulé",
};

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export function CustomerTestDrivesList() {
  const { data: testDrives = [], isLoading } = useTestDrives();
  const cancelTestDrive = useCancelTestDrive();

  const [selected, setSelected] = useState<TestDrive | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  function handleCancelRequest(id: string) {
    setCancelConfirmId(id);
    setDialogOpen(false);
  }

  async function confirmCancel() {
    if (!cancelConfirmId) return;
    try {
      const ok = await cancelTestDrive.mutateAsync(cancelConfirmId);
      if (ok) {
        setSelected((prev) => (prev?.id === cancelConfirmId ? null : prev));
        toast.success("Demande annulée");
      } else {
        toast.error("Erreur lors de l'annulation");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setCancelConfirmId(null);
  }

  function openDetail(td: TestDrive) {
    setSelected(td);
    setDialogOpen(true);
  }

  // Calendar logic
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];

    // Add empty days for padding
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth]);

  // Get test drives for a specific day
  function getTestDrivesForDay(day: number): TestDrive[] {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);

    return testDrives.filter((td) => {
      if (!td.preferredDate) return false;
      const tdDate = new Date(td.preferredDate);
      return tdDate.toDateString() === date.toDateString();
    });
  }

  function previousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {/* View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            className="gap-2"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            Liste
          </Button>
          <Button
            variant={viewMode === "calendar" ? "secondary" : "ghost"}
            size="sm"
            className="gap-2"
            onClick={() => setViewMode("calendar")}
          >
            <Calendar className="h-4 w-4" />
            Calendrier
          </Button>
        </div>
      </div>

      {testDrives.length === 0 ? (
        <EmptyState
          icon="cars"
          title="Aucune demande de test drive"
          description="Vous n'avez pas encore de demande. Réservez un essai gratuit sur le modèle de votre choix."
          action={
            <Button asChild>
              <Link href="/test-drive">Réserver un Test Drive</Link>
            </Button>
          }
        />
      ) : viewMode === "list" ? (
        <div className="space-y-4">
          {testDrives.map((td) => (
            <div
              key={td.id}
              className="cursor-pointer rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-luxury-accent/30 hover:shadow-md"
              onClick={() => openDetail(td)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openDetail(td);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{td.model}</h3>
                  <p className="text-sm text-muted-foreground">
                    Date souhaitée:{" "}
                    {td.preferredDate
                      ? new Date(td.preferredDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Non spécifiée"}
                  </p>
                </div>
                <Badge variant={statusVariant[td.status]} className="text-sm">
                  {statusLabel[td.status]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card">
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <Button variant="ghost" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="font-semibold">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {DAYS.map((day) => (
              <div key={day} className="border-b border-r border-border p-2 text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarData.map((day, index) => {
              const testDrivesForDay = day ? getTestDrivesForDay(day) : [];
              const hasTestDrives = testDrivesForDay.length > 0;

              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-[80px] border-r border-b border-border p-2",
                    day === null && "bg-muted/30",
                    hasTestDrives && "bg-luxury-accent/5"
                  )}
                >
                  {day && (
                    <>
                      <span className="text-sm text-muted-foreground">{day}</span>
                      {testDrivesForDay.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {testDrivesForDay.slice(0, 2).map((td) => (
                            <button
                              key={td.id}
                              onClick={() => openDetail(td)}
                              className={cn(
                                "w-full rounded px-1.5 py-0.5 text-left text-xs truncate",
                                td.status === "pending" && "bg-amber-500/20 text-amber-600",
                                td.status === "confirmed" && "bg-blue-500/20 text-blue-600",
                                td.status === "completed" && "bg-emerald-500/20 text-emerald-600",
                                (td.status === "rejected" || td.status === "cancelled") && "bg-red-500/20 text-red-600"
                              )}
                            >
                              {td.model}
                            </button>
                          ))}
                          {testDrivesForDay.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{testDrivesForDay.length - 2} autre(s)
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-amber-500/20" />
              <span className="text-xs text-muted-foreground">En attente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500/20" />
              <span className="text-xs text-muted-foreground">Confirmé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-emerald-500/20" />
              <span className="text-xs text-muted-foreground">Terminé</span>
            </div>
          </div>
        </div>
      )}

      <TestDriveDetailDialog
        testDrive={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCancel={handleCancelRequest}
      />

      <ConfirmDialog
        open={!!cancelConfirmId}
        onOpenChange={(open) => !open && setCancelConfirmId(null)}
        title="Annuler la demande"
        description="Êtes-vous sûr de vouloir annuler cette demande de test drive ?"
        confirmLabel="Annuler la demande"
        variant="destructive"
        onConfirm={confirmCancel}
      />
    </>
  );
}