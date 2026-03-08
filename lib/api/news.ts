import type { NewsArticle } from "@/lib/data/news";
import { newsArticles as initialNews } from "@/lib/data/news";

let newsData: NewsArticle[] = [...initialNews];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchNews(): Promise<NewsArticle[]> {
  await delay(300);
  return [...newsData];
}

export async function fetchNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  await delay(200);
  return newsData.find((a) => a.slug === slug);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createNews(
  data: Omit<NewsArticle, "slug">
): Promise<NewsArticle> {
  await delay(400);
  const slug = slugify(data.title) + `-${Date.now().toString(36)}`;
  const article: NewsArticle = { ...data, slug };
  newsData.push(article);
  return article;
}

export async function updateNews(
  slug: string,
  data: Partial<NewsArticle>
): Promise<NewsArticle | null> {
  await delay(400);
  const idx = newsData.findIndex((a) => a.slug === slug);
  if (idx === -1) return null;
  newsData[idx] = { ...newsData[idx], ...data };
  return newsData[idx];
}

export async function deleteNews(slug: string): Promise<boolean> {
  await delay(300);
  const idx = newsData.findIndex((a) => a.slug === slug);
  if (idx === -1) return false;
  newsData.splice(idx, 1);
  return true;
}
