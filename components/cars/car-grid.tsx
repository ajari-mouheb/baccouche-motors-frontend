"use client";

import { useState, useMemo } from "react";
import type { Car } from "@/lib/types";
import { CarCard } from "./car-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CarGridProps {
  cars: Car[];
}

type ViewMode = "grid" | "list";
type SortOption = "default" | "name-asc" | "name-desc" | "year-asc" | "year-desc";

export function CarGrid({ cars }: CarGridProps) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique years for filter
  const years = useMemo(() => {
    const uniqueYears = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, [cars]);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let result = cars;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.description.toLowerCase().includes(q)
      );
    }

    // Year filter
    if (yearFilter !== "all") {
      result = result.filter((car) => String(car.year) === yearFilter);
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "year-asc":
        result = [...result].sort((a, b) => a.year - b.year);
        break;
      case "year-desc":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [cars, search, yearFilter, sortBy]);

  const hasActiveFilters = search.trim() !== "" || yearFilter !== "all" || sortBy !== "default";

  function clearFilters() {
    setSearch("");
    setYearFilter("all");
    setSortBy("default");
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un véhicule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* View Mode & Filter Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && "bg-muted")}
            >
              <SlidersHorizontal className="size-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="size-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setViewMode("list")}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
            {/* Year Filter */}
            <div className="min-w-[140px]">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Année
              </label>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les années" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les années</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="min-w-[160px]">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Trier par
              </label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger>
                  <SelectValue placeholder="Par défaut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Par défaut</SelectItem>
                  <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                  <SelectItem value="year-desc">Plus récent</SelectItem>
                  <SelectItem value="year-asc">Plus ancien</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="mt-auto gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
                Réinitialiser
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground">
          {filteredCars.length} véhicule{filteredCars.length !== 1 ? "s" : ""} trouvé{filteredCars.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Cars Grid/List */}
      {filteredCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Search className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Aucun véhicule trouvé</p>
          <p className="text-sm">Essayez de modifier vos filtres</p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCars.map((car) => (
            <CarListItem key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

// List view component
function CarListItem({ car }: { car: Car }) {
  const displayName = car.name ?? (car.make ? `${car.make} ${car.model}` : car.model);
  const carImage = car.image || "/placeholder-car.svg";

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="flex flex-col gap-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:border-border hover:shadow-md sm:flex-row"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted sm:aspect-[4/3] sm:w-48">
        {carImage === "/placeholder-car.svg" ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <img
              src={carImage}
              alt={displayName}
              className="h-20 w-20 object-contain opacity-50"
            />
          </div>
        ) : (
          <img
            src={carImage}
            alt={displayName}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-foreground">{displayName}</h3>
          <p className="text-sm text-muted-foreground">
            {car.model} • {car.year}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {car.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {car.price && (
            <span className="font-semibold text-foreground">{car.price}</span>
          )}
          <Button size="sm" asChild>
            <span>Voir les détails</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}