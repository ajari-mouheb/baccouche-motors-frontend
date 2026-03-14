"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNews } from "@/lib/hooks/use-news";

export function NewsSection() {
  const { data: articles, isLoading } = useNews();

  const latestArticles = [...(articles ?? [])]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 h-10 w-48 animate-pulse rounded bg-muted mx-auto" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title mb-12 text-center text-foreground">
          Actualités
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <Card
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {article.image && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2 font-serif">
                  {article.title}
                </CardTitle>
                <CardDescription>
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardContent className="pt-0">
                <Button
                  variant="link"
                  asChild
                  className="h-auto p-0 text-luxury-accent hover:text-luxury-accent/80"
                >
                  <Link href={`/actualites/${article.slug}`}>Lire la suite</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-luxury-accent/50 hover:border-luxury-accent hover:bg-luxury-accent/5"
          >
            <Link href="/actualites">Voir toutes les actualités</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
