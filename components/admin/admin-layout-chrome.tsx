"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

const ADMIN_AUTH_PATHS = ["/admin/login"];

export function AdminLayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = ADMIN_AUTH_PATHS.includes(pathname ?? "");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-auto pl-16 lg:pl-0">
        <AdminHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
