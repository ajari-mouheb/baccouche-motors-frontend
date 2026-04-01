"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useDeleteNews, useNews } from "@/lib/hooks/use-news";

export function AdminNewsList() {
  const { data: articles = [], isLoading } = useNews();
  const deleteNews = useDeleteNews();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("");

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase().trim())
  );

  function handleDeleteClick(article: NewsArticle) {
    if (article.id) {
      setDeleteId(article.id);
      setDeleteTitle(article.title);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      const ok = await deleteNews.mutateAsync(deleteId);
      if (ok) {
        toast.success("Article supprimé");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setDeleteId(null);
    setDeleteTitle("");
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-luxury-accent border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link href="/admin/news/new">
          <Button className="shrink-0 gap-2">
            <Plus className="size-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Articles List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FileText className="mb-2 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Aucun article trouvé.</p>
          <p className="text-sm">Créez un article pour commencer.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((article) => (
            <div
              key={article.slug}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:border-border hover:shadow-md"
            >
              <div className="flex flex-col gap-0 sm:flex-row">
                {/* Image */}
                {article.image && (
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="block w-full shrink-0 sm:w-48"
                  >
                    <div className="relative aspect-video overflow-hidden sm:aspect-[4/3] sm:h-full">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 192px"
                      />
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="block"
                    >
                      <h3 className="font-semibold text-foreground line-clamp-1 hover:text-luxury-accent transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link href={`/admin/news/edit/${article.id}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <Pencil className="size-4" />
                        Modifier
                      </Button>
                    </Link>
                    {article.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(article)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
            setDeleteTitle("");
          }
        }}
        title="Supprimer l'article"
        description={`Êtes-vous sûr de vouloir supprimer "${deleteTitle}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}