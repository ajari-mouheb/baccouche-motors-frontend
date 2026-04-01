import type { Metadata } from "next";
import { AdminContactsList } from "@/components/admin/admin-contacts-list";

export const metadata: Metadata = {
  title: "Messages | Admin - Baccouche Automobiles",
  description: "Messages de contact",
};

export default function AdminContactsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AdminContactsList />
    </div>
  );
}
