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
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Car,
  User,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";

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

const statusColor: Record<string, string> = {
  pending: "text-amber-500",
  confirmed: "text-emerald-500",
  completed: "text-blue-500",
  rejected: "text-red-500",
  cancelled: "text-red-500",
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

  const StatusIcon = {
    pending: Clock,
    confirmed: CheckCircle,
    completed: CheckCircle,
    rejected: XCircle,
    cancelled: XCircle,
  }[testDrive.status] || Clock;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="size-5 text-luxury-accent" />
            Demande de Test Drive
          </DialogTitle>
        </DialogHeader>

        {/* Status Banner */}
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${statusColor[testDrive.status]?.replace('text-', 'bg-')}/10`}>
              <StatusIcon className={`size-5 ${statusColor[testDrive.status]}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <p className="font-semibold">{statusLabel[testDrive.status]}</p>
            </div>
          </div>
          <Badge variant={statusVariant[testDrive.status]} className="text-sm">
            {statusLabel[testDrive.status]}
          </Badge>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border/50 bg-gradient-to-br from-luxury-accent/5 to-transparent p-4">
            <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Véhicule
            </p>
            <p className="text-lg font-semibold text-foreground">
              {testDrive.model}
            </p>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Calendar className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date souhaitée</p>
                <p className="font-medium">
                  {testDrive.preferredDate
                    ? new Date(testDrive.preferredDate).toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Non spécifiée"}
                </p>
              </div>
            </div>
            {testDrive.timeSlot && (
              <div className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <ClockIcon className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Créneau</p>
                  <p className="font-medium">{timeSlotLabel[testDrive.timeSlot] ?? testDrive.timeSlot}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Contact Info */}
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Contact
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <User className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{testDrive.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Mail className="size-4 text-muted-foreground" />
                </div>
                <a
                  href={`mailto:${testDrive.email}`}
                  className="text-luxury-accent hover:underline"
                >
                  {testDrive.email}
                </a>
              </div>
              {testDrive.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Phone className="size-4 text-muted-foreground" />
                  </div>
                  <a
                    href={`tel:${testDrive.phone}`}
                    className="text-foreground hover:text-luxury-accent transition-colors"
                  >
                    {testDrive.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground">
            Demande créée le{" "}
            {new Date(testDrive.createdAt).toLocaleString("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {/* Action Buttons */}
          {(testDrive.status === "pending" || testDrive.status === "confirmed") && (
            <div className="flex flex-wrap gap-3 pt-2">
              {testDrive.status === "pending" && (
                <>
                  {onConfirm && (
                    <Button
                      onClick={() => {
                        onConfirm(testDrive.id);
                        onOpenChange(false);
                      }}
                      className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle className="size-4" />
                      Confirmer
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onReject(testDrive.id);
                        onOpenChange(false);
                      }}
                      className="flex-1 gap-2"
                    >
                      <XCircle className="size-4" />
                      Refuser
                    </Button>
                  )}
                </>
              )}
              {testDrive.status === "confirmed" && onComplete && (
                <Button
                  onClick={() => {
                    onComplete(testDrive.id);
                    onOpenChange(false);
                  }}
                  className="w-full gap-2"
                >
                  <CheckCircle className="size-4" />
                  Marquer comme terminé
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}