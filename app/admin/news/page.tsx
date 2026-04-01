import type { Metadata } from "next";
import { AdminNewsList } from "@/components/admin/admin-news-list";

export const metadata: Metadata = {
  title: "Actualités | Admin - Baccouche Automobiles",
  description: "Gestion des actualités",
};

export default function AdminNewsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AdminNewsList />
    </div>
  );
}
