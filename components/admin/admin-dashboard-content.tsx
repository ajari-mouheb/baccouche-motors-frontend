"use client";

import { useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/stats-cards";
import { Badge } from "@/components/ui/badge";
import { AdminTestDriveDetailDialog } from "./admin-test-drive-detail-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useTestDrives, useUpdateTestDriveStatus } from "@/lib/hooks/use-test-drives";
import { useContacts } from "@/lib/hooks/use-contacts";
import { useCars } from "@/lib/hooks/use-cars";
import { useNews } from "@/lib/hooks/use-news";
import type { TestDrive } from "@/lib/types";
import { toast } from "sonner";

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
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Demandes Test Drive"
          value={testDrives.length}
          subtitle={`${pendingTestDrives.length} en attente`}
        />
        <StatCard title="Messages contact" value={contacts.length} />
        <StatCard title="Véhicules" value={cars.length} />
        <StatCard title="Actualités" value={news.length} />
      </div>
      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">
            Dernières demandes Test Drive
          </h2>
          <Link
            href="/admin/test-drives"
            className="text-sm font-medium text-luxury-accent hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Nom</th>
                <th className="px-4 py-3 text-left font-medium">Modèle</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentTestDrives.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Aucune demande de test drive pour le moment.
                  </td>
                </tr>
              ) : (
                recentTestDrives.map((td) => (
                  <tr
                    key={td.id}
                    className="cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/50"
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
                    <td className="px-4 py-3">{td.name}</td>
                    <td className="px-4 py-3">{td.model}</td>
                    <td className="px-4 py-3">{td.preferredDate ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[td.status]}>
                        {statusLabel[td.status]}
                      </Badge>
                    </td>
                  </tr>
                ))
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
    </>
  );
}
