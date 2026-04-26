import type { Metadata } from "next";
import { NewsForm } from "@/components/admin/news-form";

export const metadata: Metadata = {
  title: "Modifier l'article | Admin - Baccouche Automobiles",
  description: "Modifier l'article",
};

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = await params;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <NewsForm articleId={id} />
    </div>
  );
}