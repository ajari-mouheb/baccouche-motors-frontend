"use client";

import type { TestDrive } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const timeSlotLabel: Record<string, string> = {
  morning: "Matin (9h - 12h)",
  afternoon: "Après-midi (14h - 18h)",
};

interface AdminTestDriveDetailDialogProps {
  testDrive: TestDrive | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function AdminTestDriveDetailDialog({
  testDrive,
  open,
  onOpenChange,
  onConfirm,
  onReject,
  onComplete,
}: AdminTestDriveDetailDialogProps) {
  if (!testDrive) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Détails de la demande</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Modèle</p>
            <p className="font-semibold">{testDrive.model}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Date souhaitée
            </p>
            <p>
              {testDrive.preferredDate
                ? new Date(testDrive.preferredDate).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Non spécifiée"}
            </p>
          </div>
          {testDrive.timeSlot && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Créneau
              </p>
              <p>{timeSlotLabel[testDrive.timeSlot] ?? testDrive.timeSlot}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Contact</p>
            <p>{testDrive.name}</p>
            <p className="text-sm text-muted-foreground">{testDrive.email}</p>
            {testDrive.phone && (
              <p className="text-sm text-muted-foreground">{testDrive.phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Statut</p>
            <Badge variant={statusVariant[testDrive.status]}>
              {statusLabel[testDrive.status]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Demande du{" "}
            {new Date(testDrive.createdAt).toLocaleString("fr-FR")}
          </p>
          {(testDrive.status === "pending" || testDrive.status === "confirmed") && (
            <div className="flex flex-wrap gap-2">
              {testDrive.status === "pending" && (
                <>
                  {onConfirm && (
                    <Button
                      size="sm"
                      onClick={() => {
                        onConfirm(testDrive.id);
                        onOpenChange(false);
                      }}
                    >
                      Confirmer
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onReject(testDrive.id);
                        onOpenChange(false);
                      }}
                    >
                      Refuser
                    </Button>
                  )}
                </>
              )}
              {testDrive.status === "confirmed" && onComplete && (
                <Button
                  size="sm"
                  onClick={() => {
                    onComplete(testDrive.id);
                    onOpenChange(false);
                  }}
                >
                  Marquer terminé
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
