import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLatestNews } from "@/lib/data/news";

export function NewsSection() {
  const articles = getLatestNews(3);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-title mb-12 text-center">ACTUALITÉ</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/actualites">Voir toutes les actualités</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
