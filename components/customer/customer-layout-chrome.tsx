"use client";

import { usePathname } from "next/navigation";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CustomerHeader } from "@/components/customer/customer-header";

const CUSTOMER_AUTH_PATHS = [
  "/customer/login",
  "/customer/register",
  "/customer/forgot-password",
  "/customer/reset-password",
];

export function CustomerLayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = CUSTOMER_AUTH_PATHS.includes(pathname ?? "");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CustomerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0 ml-0">
        <CustomerHeader />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}