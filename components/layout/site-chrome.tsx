"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Auth pages - no header/footer
const AUTH_PATHS = [
  "/admin/login",
  "/customer/login",
  "/customer/register",
];

// Protected routes that have their own chrome (admin/customer dashboards)
// These should NOT show public header/footer
const PROTECTED_ROUTE_PREFIXES = ["/admin", "/customer"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if it's an auth page
  const isAuthPage = AUTH_PATHS.includes(pathname ?? "");

  // Check if it's a protected route (admin or customer dashboard)
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname?.startsWith(prefix) && !AUTH_PATHS.includes(pathname)
  );

  // No chrome for auth pages or protected routes
  if (isAuthPage || isProtectedRoute) {
    return <>{children}</>;
  }

  // Public routes get the header and footer
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
