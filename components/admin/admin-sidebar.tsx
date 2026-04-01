"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CarFront,
  FileText,
  Mail,
  Menu,
  Home,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const adminNavLinks = [
  {
    href: "/admin/dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    description: "Vue d'ensemble",
  },
  {
    href: "/admin/test-drives",
    label: "Test Drives",
    icon: Car,
    description: "Demandes d'essai",
  },
  {
    href: "/admin/contacts",
    label: "Messages",
    icon: Mail,
    description: "Contacts reçus",
  },
  {
    href: "/admin/cars",
    label: "Véhicules",
    icon: CarFront,
    description: "Gestion des voitures",
  },
  {
    href: "/admin/news",
    label: "Actualités",
    icon: FileText,
    description: "Articles et news",
  },
];

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-6 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
          <LayoutDashboard className="size-5 text-luxury-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Admin</span>
          <span className="text-xs text-muted-foreground">Baccouche Motors</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
          Navigation
        </p>
        {adminNavLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-luxury-accent/15 text-luxury-accent shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  isActive
                    ? "bg-luxury-accent/20"
                    : "bg-muted/40 group-hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex flex-col">
                <span>{link.label}</span>
                <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground">
                  {link.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border/50 pt-4">
        <Link
          href="/"
          onClick={onLinkClick}
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/40 transition-colors group-hover:bg-muted">
            <Home className="size-4" />
          </div>
          <div className="flex flex-col">
            <span>Retour au site</span>
            <span className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground">
              Baccouche Automobiles
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border/50 bg-gradient-to-b from-card to-card/95 lg:block">
        <div className="flex min-h-screen flex-col">
          {/* Logo header */}
          <div className="flex h-16 items-center gap-3 border-b border-border/50 px-4">
            <Image
              src="/logo.png"
              alt="Baccouche Automobiles"
              width={120}
              height={36}
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <NavContent />
          </nav>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Baccouche Motors
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile: menu button + sheet */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Menu Admin"
              className="size-10 rounded-full border-border/50 bg-background/95 shadow-lg backdrop-blur"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-border/50 bg-card p-0">
            <div className="flex h-full flex-col">
              {/* Logo header */}
              <div className="flex h-16 items-center gap-3 border-b border-border/50 px-4">
                <Image
                  src="/logo.png"
                  alt="Baccouche Automobiles"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain brightness-0 invert opacity-90"
                />
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <NavContent onLinkClick={() => setOpen(false)} />
              </nav>

              {/* Footer */}
              <div className="border-t border-border/50 p-4">
                <p className="text-xs text-muted-foreground/60">
                  © {new Date().getFullYear()} Baccouche Motors
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}