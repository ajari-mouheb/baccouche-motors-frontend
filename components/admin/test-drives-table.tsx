"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Check, X, CheckCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import type { TestDrive } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { AdminTestDriveDetailDialog } from "./admin-test-drive-detail-dialog";
import {
  useTestDrives,
  useUpdateTestDriveStatus,
} from "@/lib/hooks/use-test-drives";
import Link from "next/link";

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

type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "rejected" | "cancelled";

const PAGE_SIZE = 5;

export function TestDrivesTable() {
  const { data: testDrives = [], isLoading } = useTestDrives();
  const updateStatus = useUpdateTestDriveStatus();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [detailTestDrive, setDetailTestDrive] = useState<TestDrive | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectConfirmId, setRejectConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = testDrives;
    if (statusFilter !== "all") {
      result = result.filter((td) => td.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (td) =>
          td.name.toLowerCase().includes(q) ||
          td.email.toLowerCase().includes(q) ||
          td.model.toLowerCase().includes(q)
      );
    }
    return result;
  }, [testDrives, search, statusFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 when filtered data changes and current page is out of bounds
  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [page, totalPages]);

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
    setRejectConfirmId(id);
  }

  async function confirmReject() {
    if (!rejectConfirmId) return;
    try {
      const updated = await updateStatus.mutateAsync({
        id: rejectConfirmId,
        status: "rejected",
      });
      if (updated) {
        setDetailTestDrive((prev) =>
          prev?.id === rejectConfirmId ? updated : prev
        );
        toast.success("Demande refusée");
      }
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
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  if (testDrives.length === 0) {
    return (
      <EmptyState
        icon="cars"
        title="Aucune demande de test drive"
        description="Les demandes envoyées depuis le formulaire apparaîtront ici."
        action={
          <Button variant="outline" asChild>
            <Link href="/test-drive">Voir le formulaire</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email, modèle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
            <SelectItem value="rejected">Refusé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Nom</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Téléphone</th>
              <th className="px-4 py-3 text-left font-medium">Modèle</th>
              <th className="px-4 py-3 text-left font-medium">Date souhaitée</th>
              <th className="px-4 py-3 text-left font-medium">Statut</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  Aucun résultat pour cette recherche.
                </td>
              </tr>
            ) : (
              paginated.map((td) => (
                <tr key={td.id} className="border-b border-border/50">
                  <td className="px-4 py-3 font-medium">{td.name}</td>
                  <td className="px-4 py-3">{td.email}</td>
                  <td className="px-4 py-3">{td.phone}</td>
                  <td className="px-4 py-3">{td.model}</td>
                  <td className="px-4 py-3">
                    {td.preferredDate
                      ? new Date(td.preferredDate).toLocaleDateString("fr-FR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[td.status]}>
                      {statusLabel[td.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                          setDetailTestDrive(td);
                          setDetailOpen(true);
                        }}
                        aria-label="Voir les détails"
                      >
                        <Eye className="size-4" />
                      </Button>
                      {td.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => handleConfirm(td.id)}
                            aria-label="Confirmer"
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => handleReject(td.id)}
                            aria-label="Refuser"
                          >
                            <X className="size-4" />
                          </Button>
                        </>
                      )}
                      {td.status === "confirmed" && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                          onClick={() => handleComplete(td.id)}
                          aria-label="Marquer terminé"
                        >
                          <CheckCircle className="size-4" />
                        </Button>
                      )}
                      {(td.status === "completed" ||
                        td.status === "rejected") && (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filtered.length > PAGE_SIZE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-4"
        />
      )}

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
