import type { Metadata } from "next";
import Link from "next/link";
import { newsArticles } from "@/lib/data/news";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Actualités | Baccouche Automobiles - BMW Sousse",
  description: "Les dernières actualités de Baccouche Automobiles.",
};

export default function ActualitesPage() {
  const sortedArticles = [...newsArticles].sort((a, b) =>
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
    </div>
  );
}
