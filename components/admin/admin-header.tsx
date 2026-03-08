"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const pageLabels: Record<string, string> = {
  "/admin/dashboard": "Tableau de bord",
  "/admin/test-drives": "Test Drives",
  "/admin/contacts": "Messages",
  "/admin/cars": "Véhicules",
  "/admin/news": "Actualités",
};

export function AdminHeader() {
  const pathname = usePathname();
  const label = pageLabels[pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4 lg:px-8">
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Admin
        </Link>
        <ChevronRight className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </header>
  );
}
