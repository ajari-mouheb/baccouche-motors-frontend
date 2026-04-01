"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Check, X, CheckCircle, Eye, Clock, Car, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import type { TestDrive } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const statusIcon: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  rejected: X,
  cancelled: X,
};

type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "rejected" | "cancelled";
type BulkAction = "confirm" | "reject" | "complete" | null;

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

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<BulkAction>(null);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);

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

  // Get selectable items (only pending can be bulk confirmed/rejected)
  const selectableItems = useMemo(() => {
    return filtered.filter((td) => td.status === "pending");
  }, [filtered]);

  const allSelectableSelected = selectableItems.length > 0 && selectableItems.every((td) => selectedIds.has(td.id));
  const someSelected = selectedIds.size > 0;
  const selectedPending = Array.from(selectedIds).filter((id) => {
    const td = testDrives.find((t) => t.id === id);
    return td?.status === "pending";
  });
  const selectedConfirmed = Array.from(selectedIds).filter((id) => {
    const td = testDrives.find((t) => t.id === id);
    return td?.status === "confirmed";
  });

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [page, totalPages]);

  // Clear selection when filters change
  useEffect(() => {
    setSelectedIds(new Set());
  }, [search, statusFilter]);

  function toggleSelect(id: string) {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  }

  function toggleSelectAll() {
    if (allSelectableSelected) {
      setSelectedIds(new Set());
    } else {
      const newSet = new Set(selectedIds);
      selectableItems.forEach((td) => newSet.add(td.id));
      setSelectedIds(newSet);
    }
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

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

  async function executeBulkAction() {
    if (!bulkAction) return;

    setIsProcessingBulk(true);
    let successCount = 0;
    let errorCount = 0;

    const targetStatus = bulkAction === "confirm" ? "confirmed" : bulkAction === "reject" ? "rejected" : "completed";
    const targetIds = bulkAction === "complete" ? selectedConfirmed : selectedPending;

    for (const id of targetIds) {
      try {
        await updateStatus.mutateAsync({ id, status: targetStatus });
        successCount++;
      } catch {
        errorCount++;
      }
    }

    setIsProcessingBulk(false);
    setBulkAction(null);
    setSelectedIds(new Set());

    if (successCount > 0) {
      const actionLabel = bulkAction === "confirm" ? "confirmées" : bulkAction === "reject" ? "refusées" : "terminées";
      toast.success(`${successCount} demande(s) ${actionLabel}`);
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} demande(s) en erreur`);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-luxury-accent border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
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
    <div className="space-y-6">
      {/* Filters */}
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

      {/* Bulk Actions Bar */}
      {someSelected && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-luxury-accent/30 bg-luxury-accent/5 p-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {selectedIds.size} sélectionnée(s)
            </span>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Effacer
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedPending.length > 0 && (
              <>
                <Button
                  size="sm"
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setBulkAction("confirm")}
                  disabled={isProcessingBulk}
                >
                  <Check className="size-4" />
                  Confirmer ({selectedPending.length})
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-2"
                  onClick={() => setBulkAction("reject")}
                  disabled={isProcessingBulk}
                >
                  <X className="size-4" />
                  Refuser ({selectedPending.length})
                </Button>
              </>
            )}
            {selectedConfirmed.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => setBulkAction("complete")}
                disabled={isProcessingBulk}
              >
                <CheckCircle className="size-4" />
                Terminer ({selectedConfirmed.length})
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={toggleSelectAll}
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                      allSelectableSelected
                        ? "bg-luxury-accent border-luxury-accent"
                        : "border-border hover:border-luxury-accent"
                    )}
                    aria-label="Sélectionner tout"
                  >
                    {allSelectableSelected && (
                      <Check className="size-3 text-primary" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Modèle
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date souhaitée
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statut
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-muted-foreground/50" />
                      <p>Aucun résultat pour cette recherche.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((td) => {
                  const StatusIcon = statusIcon[td.status] || Clock;
                  const isSelected = selectedIds.has(td.id);
                  const isSelectable = td.status === "pending";

                  return (
                    <tr
                      key={td.id}
                      className={cn(
                        "transition-colors hover:bg-muted/30",
                        isSelected && "bg-luxury-accent/5"
                      )}
                    >
                      <td className="px-4 py-4">
                        <button
                          onClick={() => isSelectable && toggleSelect(td.id)}
                          disabled={!isSelectable}
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                            isSelected
                              ? "bg-luxury-accent border-luxury-accent"
                              : isSelectable
                              ? "border-border hover:border-luxury-accent cursor-pointer"
                              : "border-border/50 opacity-50 cursor-not-allowed"
                          )}
                          aria-label="Sélectionner"
                        >
                          {isSelected && <Check className="size-3 text-primary" />}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            {td.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{td.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Car className="size-4 text-muted-foreground" />
                          <span className="font-medium">{td.model}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={`mailto:${td.email}`}
                            className="text-sm text-luxury-accent hover:underline"
                          >
                            {td.email}
                          </a>
                          {td.phone && (
                            <a
                              href={`tel:${td.phone}`}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              {td.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="size-4" />
                          <span>
                            {td.preferredDate
                              ? new Date(td.preferredDate).toLocaleDateString("fr-FR")
                              : "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={statusVariant[td.status]} className="gap-1">
                          <StatusIcon className="size-3" />
                          {statusLabel[td.status]}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
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
                                className="size-8 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                                onClick={() => handleConfirm(td.id)}
                                aria-label="Confirmer"
                              >
                                <Check className="size-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-8 border-destructive/50 text-destructive hover:bg-destructive/10"
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
                              className="size-8 border-blue-500/50 text-blue-500 hover:bg-blue-500/10"
                              onClick={() => handleComplete(td.id)}
                              aria-label="Marquer terminé"
                            >
                              <CheckCircle className="size-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-4"
        />
      )}

      {/* Dialogs */}
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

      {/* Bulk Action Confirmation */}
      <ConfirmDialog
        open={!!bulkAction}
        onOpenChange={(open) => !open && setBulkAction(null)}
        title={
          bulkAction === "confirm"
            ? "Confirmer les demandes"
            : bulkAction === "reject"
            ? "Refuser les demandes"
            : "Terminer les demandes"
        }
        description={
          bulkAction === "confirm"
            ? `Êtes-vous sûr de vouloir confirmer ${selectedPending.length} demande(s) ?`
            : bulkAction === "reject"
            ? `Êtes-vous sûr de vouloir refuser ${selectedPending.length} demande(s) ?`
            : `Êtes-vous sûr de vouloir marquer ${selectedConfirmed.length} demande(s) comme terminée(s) ?`
        }
        confirmLabel={
          bulkAction === "confirm"
            ? "Confirmer"
            : bulkAction === "reject"
            ? "Refuser"
            : "Terminer"
        }
        variant={bulkAction === "reject" ? "destructive" : "default"}
        onConfirm={executeBulkAction}
      />
    </div>
  );
}