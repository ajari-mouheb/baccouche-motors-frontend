import type { Metadata } from "next";
import { NewsForm } from "@/components/admin/news-form";

export const metadata: Metadata = {
  title: "Nouvel article | Admin - Baccouche Automobiles",
  description: "Créer un nouvel article",
};

export default function NewNewsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <NewsForm />
    </div>
  );
}