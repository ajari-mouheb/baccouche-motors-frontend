"use client";

import { useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/stats-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminTestDriveDetailDialog } from "./admin-test-drive-detail-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useTestDrives, useUpdateTestDriveStatus } from "@/lib/hooks/use-test-drives";
import { useContacts } from "@/lib/hooks/use-contacts";
import { useCars } from "@/lib/hooks/use-cars";
import { useNews } from "@/lib/hooks/use-news";
import type { TestDrive } from "@/lib/types";
import { toast } from "sonner";
import {
  Car,
  Mail,
  CarFront,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
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

const statusIcon: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  rejected: XCircle,
  cancelled: XCircle,
};

export function AdminDashboardContent() {
  const { data: testDrives = [], isLoading: loadingTestDrives } = useTestDrives();
  const { data: contacts = [], isLoading: loadingContacts } = useContacts();
  const { data: cars = [], isLoading: loadingCars } = useCars();
  const { data: news = [], isLoading: loadingNews } = useNews();
  const updateStatus = useUpdateTestDriveStatus();

  const [detailTestDrive, setDetailTestDrive] = useState<TestDrive | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectConfirmId, setRejectConfirmId] = useState<string | null>(null);

  const isLoading =
    loadingTestDrives || loadingContacts || loadingCars || loadingNews;
  const pendingTestDrives = testDrives.filter((t) => t.status === "pending");
  const confirmedTestDrives = testDrives.filter((t) => t.status === "confirmed");
  const recentTestDrives = testDrives.slice(0, 5);

  async function handleConfirm(id: string) {
    try {
      const updated = await updateStatus.mutateAsync({
        id,
        status: "confirmed",
      });
      if (updated) {
        setDetailTestDrive((prev) => (prev?.id === id ? updated : prev));
        toast.success("Demande confirmée");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  function handleReject(id: string) {
    setDetailOpen(false);
    setRejectConfirmId(id);
  }

  async function confirmReject() {
    if (!rejectConfirmId) return;
    try {
      await updateStatus.mutateAsync({
        id: rejectConfirmId,
        status: "rejected",
      });
      setDetailTestDrive((prev) =>
        prev?.id === rejectConfirmId ? null : prev
      );
      toast.success("Demande refusée");
    } catch {
      toast.error("Une erreur est survenue");
    }
    setRejectConfirmId(null);
  }

  async function handleComplete(id: string) {
    try {
      const updated = await updateStatus.mutateAsync({
        id,
        status: "completed",
      });
      if (updated) {
        setDetailTestDrive((prev) => (prev?.id === id ? updated : prev));
        toast.success("Demande marquée comme terminée");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-luxury-accent border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Demandes Test Drive"
          value={testDrives.length}
          subtitle={`${pendingTestDrives.length} en attente`}
          icon={Car}
          variant="accent"
        />
        <StatCard
          title="Messages contact"
          value={contacts.length}
          icon={Mail}
          variant="info"
        />
        <StatCard
          title="Véhicules"
          value={cars.length}
          icon={CarFront}
          variant="success"
        />
        <StatCard
          title="Actualités"
          value={news.length}
          icon={FileText}
          variant="default"
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
              <Clock className="size-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {pendingTestDrives.length}
              </p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
              <CheckCircle className="size-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {confirmedTestDrives.length}
              </p>
              <p className="text-xs text-muted-foreground">Confirmées</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-luxury-accent/20 bg-gradient-to-br from-luxury-accent/10 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-luxury-accent/20">
              <CalendarDays className="size-5 text-luxury-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {testDrives.filter((t) => t.status === "completed").length}
              </p>
              <p className="text-xs text-muted-foreground">Terminées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Test Drives Table */}
      <div className="rounded-xl border border-border/50 bg-card/50">
        <div className="flex items-center justify-between border-b border-border/50 p-4 lg:p-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Dernières demandes Test Drive
            </h2>
            <p className="text-sm text-muted-foreground">
              Cliquez sur une ligne pour voir les détails
            </p>
          </div>
          <Link href="/admin/test-drives">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink className="size-4" />
              Voir tout
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Modèle
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date souhaitée
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentTestDrives.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Car className="size-8 text-muted-foreground/50" />
                      <p>Aucune demande de test drive pour le moment.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentTestDrives.map((td) => {
                  const StatusIcon = statusIcon[td.status] || Clock;
                  return (
                    <tr
                      key={td.id}
                      className="cursor-pointer transition-colors hover:bg-muted/30"
                      onClick={() => {
                        setDetailTestDrive(td);
                        setDetailOpen(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDetailTestDrive(td);
                          setDetailOpen(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            {td.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {td.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {td.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-medium">{td.model}</span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {td.preferredDate ?? "—"}
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          variant={statusVariant[td.status]}
                          className="gap-1"
                        >
                          <StatusIcon className="size-3" />
                          {statusLabel[td.status]}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminTestDriveDetailDialog
        testDrive={detailTestDrive}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onConfirm={handleConfirm}
        onReject={handleReject}
        onComplete={handleComplete}
      />

      <ConfirmDialog
        open={!!rejectConfirmId}
        onOpenChange={(open) => !open && setRejectConfirmId(null)}
        title="Refuser la demande"
        description="Êtes-vous sûr de vouloir refuser cette demande de test drive ?"
        confirmLabel="Refuser"
        variant="destructive"
        onConfirm={confirmReject}
      />
    </div>
  );
}