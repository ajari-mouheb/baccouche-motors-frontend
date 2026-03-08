import { AdminLayoutChrome } from "@/components/admin/admin-layout-chrome";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="admin" loginPath="/admin/login">
      <AdminLayoutChrome>{children}</AdminLayoutChrome>
    </AuthGuard>
  );
}
