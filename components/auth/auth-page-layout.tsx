"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function AuthPageLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  backHref = "/",
  backLabel = "Retour au site",
}: AuthPageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.22 0.02 265 / 0.4) 0%, transparent 50%), linear-gradient(180deg, oklch(0.12 0.015 265) 0%, oklch(0.08 0.02 265) 100%)",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Back link */}
      {backHref && (
        <Link
          href={backHref}
          className="absolute left-4 top-4 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-6 sm:top-6"
        >
          ← {backLabel}
        </Link>
      )}

      <div className="w-full max-w-md space-y-8">
        {showLogo && (
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Baccouche Automobiles"
              width={160}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert opacity-95 sm:h-12"
              priority
            />
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card/95 p-8 shadow-xl shadow-black/20 backdrop-blur sm:p-10">
          <div className="mb-8">
            <h1 className="section-title text-center">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
