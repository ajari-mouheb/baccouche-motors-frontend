"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useNews } from "@/lib/hooks/use-news";

export default function ActualitesPage() {
  const { data: articles, isLoading, isError, error } = useNews();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-12">
          <div className="mb-4 h-10 w-48 animate-pulse rounded bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <EmptyState
          title="Erreur de chargement"
          description={(error as Error)?.message ?? "Impossible de charger les actualités."}
          icon="news"
          action={
            <Button onClick={() => window.location.reload()} variant="outline">
              Réessayer
            </Button>
          }
        />
      </div>
    );
  }

  const sortedArticles = [...(articles ?? [])].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12">
        <h1 className="section-title mb-4">ACTUALITÉ</h1>
        <p className="text-muted-foreground max-w-2xl">
          Découvrez les dernières actualités et événements de Baccouche
          Automobiles.
        </p>
      </div>
      {sortedArticles.length === 0 ? (
        <EmptyState
          title="Aucune actualité"
          description="Aucune actualité disponible pour le moment."
          icon="news"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article) => (
            <Card key={article.slug} className="flex flex-col overflow-hidden">
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription>
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardContent className="pt-0">
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href={`/actualites/${article.slug}`}>Lire la suite</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
