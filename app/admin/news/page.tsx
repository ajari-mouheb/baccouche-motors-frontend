import type { Metadata } from "next";
import { newsArticles } from "@/lib/data/news";
import { AdminNewsList } from "@/components/admin/admin-news-list";

export const metadata: Metadata = {
  title: "Actualités | Admin - Baccouche Automobiles",
  description: "Gestion des actualités",
};

export default function AdminNewsPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Actualités</h1>
      <AdminNewsList articles={newsArticles} />
    </div>
  );
}
