import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsBySlug, newsArticles } from "@/lib/data/news";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Baccouche Automobiles`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

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
