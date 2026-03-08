import type { Metadata } from "next";
import { mockContacts } from "@/lib/data/mock-admin";
import { AdminContactsList } from "@/components/admin/admin-contacts-list";

export const metadata: Metadata = {
  title: "Messages | Admin - Baccouche Automobiles",
  description: "Messages de contact",
};

export default function AdminContactsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Messages de contact</h1>
      <AdminContactsList contacts={mockContacts} />
    </div>
  );
}
