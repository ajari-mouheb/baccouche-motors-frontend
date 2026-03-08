"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const pageLabels: Record<string, string> = {
  "/customer/dashboard": "Tableau de bord",
  "/customer/test-drives": "Mes demandes Test Drive",
  "/customer/profile": "Mon profil",
  "/customer/login": "Connexion",
  "/customer/register": "Inscription",
};

export function CustomerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const label = pageLabels[pathname] ?? "Espace client";

  function handleLogout() {
    logout();
    router.push("/customer/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-2 px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/customer/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Espace client
          </Link>
          <ChevronRight className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {user && pathname !== "/customer/login" && pathname !== "/customer/register" && (
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {user.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="size-4" />
              Déconnexion
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
