import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
