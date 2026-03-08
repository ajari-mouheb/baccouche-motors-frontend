import { CustomerLayoutChrome } from "@/components/customer/customer-layout-chrome";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard loginPath="/customer/login">
      <CustomerLayoutChrome>{children}</CustomerLayoutChrome>
    </AuthGuard>
  );
}
