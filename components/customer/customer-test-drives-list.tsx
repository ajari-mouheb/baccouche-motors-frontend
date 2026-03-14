"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { TestDrive } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { TestDriveDetailDialog } from "./test-drive-detail-dialog";
import { useTestDrives, useCancelTestDrive } from "@/lib/hooks/use-test-drives";

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

export function CustomerTestDrivesList() {
  const { data: testDrives = [], isLoading } = useTestDrives();
  const cancelTestDrive = useCancelTestDrive();

  const [selected, setSelected] = useState<TestDrive | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <>
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
      ) : (
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
                      ? new Date(td.preferredDate).toLocaleDateString("fr-FR")
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
