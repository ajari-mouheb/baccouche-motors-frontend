"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/cars", label: "Véhicules" },
  { href: "/services", label: "Services" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:backdrop-blur-md transition-colors",
        isHome
          ? "border-transparent bg-transparent -mb-16 md:-mb-20"
          : "border-border bg-background/95 supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 transition-opacity hover:opacity-90",
            "brightness-0 invert"
          )}
        >
          <Image
            src="/logo.png"
            alt="Baccouche Automobiles"
            width={140}
            height={40}
            className="h-8 w-auto object-contain md:h-10"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors pb-1",
                isHome
                  ? "text-white/90 hover:text-white after:bg-luxury-accent"
                  : "text-muted-foreground hover:text-foreground after:bg-luxury-accent",
                (isHome ? "hover:text-white" : "hover:text-foreground"),
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {(user?.role === "customer" || !user) && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "hidden sm:inline-flex gap-1.5",
                isHome
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Link href={user?.role === "customer" ? "/customer/dashboard" : "/customer/login"}>
                <User className="size-4" />
                Espace client
              </Link>
            </Button>
          )}
          {user?.role === "admin" && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "hidden sm:inline-flex",
                isHome
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          )}
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              isHome
                ? "border-2 border-white bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                : "border-2 border-luxury-accent bg-luxury-accent text-primary hover:bg-luxury-accent/90 hover:border-luxury-accent/90"
            )}
          >
            <Link href="/test-drive">Test Drive</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className={isHome ? "text-white hover:bg-white/10 hover:text-white" : ""}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-luxury-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={user?.role === "customer" ? "/customer/dashboard" : "/customer/login"}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-luxury-accent transition-colors"
                >
                  Espace client
                </Link>
                <Button
                  asChild
                  className="mt-4 bg-luxury-accent text-primary hover:bg-luxury-accent/90"
                >
                  <Link href="/test-drive" onClick={() => setOpen(false)}>
                    Test Drive
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
