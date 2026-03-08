import { CustomerSidebar } from "@/components/customer/customer-sidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <CustomerSidebar />
      <div className="flex-1 overflow-auto pl-16 lg:pl-0">
        {children}
      </div>
    </div>
  );
}
