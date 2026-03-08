"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  User,
  Menu,
  Home,
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

const customerNavLinks = [
  { href: "/customer/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/customer/test-drives", label: "Mes demandes Test Drive", icon: Car },
  { href: "/customer/profile", label: "Mon profil", icon: User },
];

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <p className="mb-4 px-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Espace client
      </p>
      {customerNavLinks.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-luxury-accent/20 text-luxury-accent"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
      <div className="mt-8 border-t border-border pt-4">
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Home className="size-4 shrink-0" />
          Retour au site
        </Link>
      </div>
    </>
  );
}

export function CustomerSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <nav className="flex flex-col gap-1 p-4">
          <NavContent />
        </nav>
      </aside>

      {/* Mobile: menu button + sheet */}
      <div className="fixed left-4 top-20 z-40 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Menu Espace client"
              className="size-10 rounded-full shadow-md"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle>Espace client</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              <NavContent onLinkClick={() => setOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
