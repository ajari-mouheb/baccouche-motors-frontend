"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, CarFront, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";
import type { Car } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  useCars,
  useDeleteCar,
} from "@/lib/hooks/use-cars";

export function AdminCarsGrid() {
  const { data: cars = [], isLoading } = useCars();
  const deleteCar = useDeleteCar();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");

  const filtered = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      car.model.toLowerCase().includes(search.toLowerCase().trim()) ||
      car.year.toString().includes(search.trim())
  );

  function handleDeleteClick(car: Car) {
    setDeleteId(car.id);
    setDeleteName(`${car.name} ${car.model}`);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      const ok = await deleteCar.mutateAsync(deleteId);
      if (ok) {
        toast.success("Véhicule supprimé");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setDeleteId(null);
    setDeleteName("");
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

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par modèle, année..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link href="/admin/cars/new">
          <Button className="shrink-0 gap-2">
            <Plus className="size-4" />
            Ajouter un véhicule
          </Button>
        </Link>
      </div>

      {/* Cars Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <CarFront className="mb-2 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Aucun véhicule trouvé.</p>
          <p className="text-sm">Ajoutez un véhicule pour commencer.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:border-border hover:shadow-md"
            >
              <Link href={`/cars/${car.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    {car.name} {car.model}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {car.year}
                    </span>
                    {car.price && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="size-3" />
                        {car.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex gap-2 border-t border-border/50 p-3">
                <Link href={`/admin/cars/edit/${car.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <Pencil className="size-4" />
                    Modifier
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteClick(car)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
            setDeleteName("");
          }
        }}
        title="Supprimer le véhicule"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteName}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}