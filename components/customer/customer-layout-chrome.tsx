"use client";

import { usePathname } from "next/navigation";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CustomerHeader } from "@/components/customer/customer-header";

const CUSTOMER_AUTH_PATHS = ["/customer/login", "/customer/register"];

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
    <div className="flex min-h-[calc(100vh-8rem)]">
      <CustomerSidebar />
      <div className="flex flex-1 flex-col overflow-auto pl-16 lg:pl-0">
        <CustomerHeader />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
