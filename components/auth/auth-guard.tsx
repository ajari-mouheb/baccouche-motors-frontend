"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  /** Redirect path when unauthenticated (e.g. /admin/login, /customer/login) */
  loginPath: string;
}

export function AuthGuard({ children, requiredRole, loginPath }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isPublicAuthPage =
      pathname === loginPath ||
      pathname === "/admin/login" ||
      pathname === "/customer/login" ||
      pathname === "/customer/register" ||
      pathname === "/customer/forgot-password" ||
      pathname === "/customer/reset-password";
    if (isPublicAuthPage) return;

    if (!user) {
      router.replace(`${loginPath}?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (requiredRole === "admin") {
        router.replace("/customer/dashboard");
      } else {
        router.replace("/admin/dashboard");
      }
    }
  }, [user, isLoading, requiredRole, loginPath, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  const isPublicAuthPage =
    pathname === loginPath ||
    pathname === "/admin/login" ||
    pathname === "/customer/login" ||
    pathname === "/customer/register" ||
    pathname === "/customer/forgot-password" ||
    pathname === "/customer/reset-password";
  if (isPublicAuthPage) return <>{children}</>;

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
