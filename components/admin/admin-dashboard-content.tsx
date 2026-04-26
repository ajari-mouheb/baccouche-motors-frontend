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
  TrendingUp,
  Activity,
  ArrowRight,
} from "lucide-react";
import { TestDrivesChart } from "./charts/test-drives-chart";
import { StatusChart } from "./charts/status-chart";
import { ActivityFeed } from "./activity-feed";

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

  // Calculate trends (mock for now, could be real with more data)
  const unreadContacts = contacts.filter((c) => !c.read).length;

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
    <div className="space-y-6">
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
          subtitle={unreadContacts > 0 ? `${unreadContacts} non lus` : undefined}
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

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-6">
          <TestDrivesChart />
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <StatusChart />
        </div>
      </div>

      {/* Quick Stats and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Stats */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="size-5 text-luxury-accent" />
            Aperçu Rapide
          </h2>
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
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <h3 className="font-semibold text-foreground">
                Dernières demandes Test Drive
              </h3>
              <Link href="/admin/test-drives">
                <Button variant="ghost" size="sm" className="gap-1.5 text-luxury-accent">
                  Voir tout
                  <ArrowRight className="size-4" />
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
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentTestDrives.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
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
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {td.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{td.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{td.model}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {td.preferredDate ?? "—"}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={statusVariant[td.status]} className="gap-1">
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
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <ActivityFeed />
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