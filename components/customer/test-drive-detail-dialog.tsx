"use client";

import type { MockTestDrive } from "@/lib/data/mock-admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const statusVariant = {
  pending: "pending" as const,
  confirmed: "confirmed" as const,
  completed: "completed" as const,
  rejected: "rejected" as const,
};

const statusLabel = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  rejected: "Refusé",
};

const timeSlotLabel: Record<string, string> = {
  morning: "Matin (9h - 12h)",
  afternoon: "Après-midi (14h - 18h)",
};

interface TestDriveDetailDialogProps {
  testDrive: MockTestDrive | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel?: (id: string) => void;
}

export function TestDriveDetailDialog({
  testDrive,
  open,
  onOpenChange,
  onCancel,
}: TestDriveDetailDialogProps) {
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
          {testDrive.status === "pending" && onCancel && (
            <Button
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
              onClick={() => {
                onCancel(testDrive.id);
                onOpenChange(false);
              }}
            >
              Annuler la demande
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
