"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import type { NewsArticle } from "@/lib/data/news";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { NewsFormDialog } from "./news-form-dialog";
import { fetchNews, createNews, updateNews, deleteNews } from "@/lib/api/news";

interface AdminNewsListProps {
  articles: NewsArticle[];
}

export function AdminNewsList({ articles: initialArticles }: AdminNewsListProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetchNews().then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase().trim())
  );

  function handleAdd() {
    setEditingArticle(null);
    setFormOpen(true);
  }

  function handleEdit(article: NewsArticle) {
    setEditingArticle(article);
    setFormOpen(true);
  }

  async function handleSave(data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image?: string;
  }) {
    try {
      if (editingArticle) {
        const updated = await updateNews(editingArticle.slug, {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          date: data.date,
          image: data.image || undefined,
        });
        if (updated) {
          setArticles((prev) =>
            prev.map((a) => (a.slug === editingArticle.slug ? updated : a))
          );
          toast.success("Article modifié");
        } else {
          toast.error("Erreur lors de la modification");
        }
      } else {
        const created = await createNews({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          date: data.date,
          image: data.image || undefined,
        });
        setArticles((prev) => [...prev, created]);
        toast.success("Article ajouté");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  function handleDeleteClick(slug: string) {
    setDeleteSlug(slug);
  }

  async function confirmDelete() {
    if (!deleteSlug) return;
    try {
      const ok = await deleteNews(deleteSlug);
      if (ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== deleteSlug));
        toast.success("Article supprimé");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setDeleteSlug(null);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
        <Button onClick={handleAdd} className="shrink-0">
          <Plus className="size-4" />
          Nouvel article
        </Button>
      </div>
      <div className="space-y-6">
        {filtered.map((article) => (
          <div
            key={article.slug}
            className="flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md sm:flex-row"
          >
            <Link
              href={`/actualites/${article.slug}`}
              className="flex flex-1 gap-6"
            >
              {article.image && (
                <div className="relative h-24 w-full shrink-0 overflow-hidden bg-muted sm:h-32 sm:w-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-center p-4">
                <h3 className="font-semibold line-clamp-1">{article.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
            <div className="flex gap-2 border-t border-border p-4 sm:border-t-0 sm:border-l sm:p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(article)}
              >
                <Pencil className="size-4" />
                Modifier
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteClick(article.slug)}
              >
                <Trash2 className="size-4" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Aucun article trouvé.
        </p>
      )}

      <NewsFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        article={editingArticle}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteSlug}
        onOpenChange={(open) => !open && setDeleteSlug(null)}
        title="Supprimer l'article"
        description="Cette action est irréversible. L'article sera définitivement supprimé."
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
