"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut, Home, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageLabels: Record<string, string> = {
  "/admin/dashboard": "Tableau de bord",
  "/admin/test-drives": "Test Drives",
  "/admin/contacts": "Messages",
  "/admin/cars": "Véhicules",
  "/admin/cars/new": "Nouveau véhicule",
  "/admin/news": "Actualités",
  "/admin/news/new": "Nouvel article",
  "/admin/login": "Connexion",
};

const pageDescriptions: Record<string, string> = {
  "/admin/dashboard": "Vue d'ensemble de l'activité",
  "/admin/test-drives": "Gestion des demandes d'essai",
  "/admin/contacts": "Messages et demandes de contact",
  "/admin/cars": "Gestion du catalogue véhicules",
  "/admin/cars/new": "Ajouter un nouveau véhicule",
  "/admin/news": "Articles et actualités",
  "/admin/news/new": "Créer un nouvel article",
};

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const label = pageLabels[pathname] ?? "Admin";
  const description = pageDescriptions[pathname] ?? "";

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">
        {/* Left side - Breadcrumb and title */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            <Link
              href="/admin/dashboard"
              className="text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              Admin
            </Link>
            <ChevronRight className="size-4 text-muted-foreground/50" />
            <span className="font-medium text-foreground">{label}</span>
          </nav>

          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-foreground lg:text-lg">
              {label}
            </h1>
            {description && (
              <p className="text-xs text-muted-foreground hidden lg:block">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        {user && pathname !== "/admin/login" && (
          <div className="flex items-center gap-2">
            {/* Back to site link */}
            <Link
              href="/"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm",
                "text-muted-foreground/80 transition-colors",
                "hover:bg-muted hover:text-foreground"
              )}
            >
              <Home className="size-4" />
              <span>Site public</span>
            </Link>

            {/* User info */}
            <div className="hidden items-center gap-2 rounded-lg bg-muted/40 px-3 py-1.5 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-luxury-accent/20 text-xs font-medium text-luxury-accent">
                {user.email?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">
                  Administrateur
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}