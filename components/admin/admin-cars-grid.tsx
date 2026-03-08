"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import type { Car } from "@/lib/data/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { CarFormDialog } from "./car-form-dialog";

interface AdminCarsGridProps {
  cars: Car[];
}

export function AdminCarsGrid({ cars: initialCars }: AdminCarsGridProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    setCars(initialCars);
  }, [initialCars]);

  const filtered = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      car.model.toLowerCase().includes(search.toLowerCase().trim()) ||
      car.year.toString().includes(search.trim())
  );

  function handleAdd() {
    setEditingCar(null);
    setFormOpen(true);
  }

  function handleEdit(car: Car) {
    setEditingCar(car);
    setFormOpen(true);
  }

  function handleSave(payload: Car & { id: string; slug: string }) {
    const carData: Car = {
      ...payload,
      specs: cars.find((c) => c.id === payload.id)?.specs,
    };
    if (editingCar) {
      setCars((prev) =>
        prev.map((c) => (c.id === payload.id ? carData : c))
      );
      console.log("Car updated (mock):", carData);
    } else {
      setCars((prev) => [...prev, carData]);
      console.log("Car added (mock):", carData);
    }
    // TODO: API call when backend is ready
  }

  function handleDeleteClick(id: string) {
    setDeleteId(id);
  }

  function confirmDelete() {
    if (deleteId) {
      setCars((prev) => prev.filter((c) => c.id !== deleteId));
      console.log("Delete car:", deleteId);
      // TODO: API call when backend is ready
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
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
        <Button onClick={handleAdd} className="shrink-0">
          <Plus className="size-4" />
          Ajouter un véhicule
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car) => (
          <div
            key={car.id}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <Link
              href={`/cars/${car.slug}`}
              className="block"
            >
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
                <h3 className="font-semibold">
                  {car.name} {car.model}
                </h3>
                <p className="text-sm text-muted-foreground">{car.year}</p>
              </div>
            </Link>
            <div className="flex gap-2 border-t border-border p-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(car);
                }}
              >
                <Pencil className="size-4" />
                Modifier
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteClick(car.id);
                }}
              >
                <Trash2 className="size-4" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Aucun véhicule trouvé.
        </p>
      )}

      <CarFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        car={editingCar}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Supprimer le véhicule"
        description="Cette action est irréversible. Le véhicule sera définitivement supprimé."
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
