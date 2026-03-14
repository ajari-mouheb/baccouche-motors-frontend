"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNewsBySlug } from "@/lib/hooks/use-news";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export default function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = use(params);

  const { data: article, isLoading, isError } = useNewsBySlug(slug);

  if (!slug) return null;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-8 h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="mb-8 h-12 w-full animate-pulse rounded bg-muted" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <article>
        <p className="mb-2 text-sm text-muted-foreground">
          {new Date(article.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="section-title mb-8">{article.title}</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {article.content}
          </p>
        </div>
      </article>
      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/actualites">Retour aux actualités</Link>
        </Button>
      </div>
    </div>
  );
}
