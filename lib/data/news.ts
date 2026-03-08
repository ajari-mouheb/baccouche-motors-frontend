export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "test-drive-bmw-gabes",
    title: "TEST DRIVE BMW À GABÈS DU 14 AU 16 NOVEMBRE",
    excerpt: "Découvrez les modèles BMW lors de notre événement test drive à Gabès.",
    content: "Baccouche Automobiles vous invite à découvrir l'expérience BMW lors de notre événement test drive à Gabès du 14 au 16 novembre. Venez essayer nos derniers modèles et vivre la sensation de conduite BMW.",
    date: "2024-11-10",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
  },
  {
    slug: "1er-anniversaire",
    title: "BACCOUCHE AUTOMOBILE FÊTE SON 1ER ANNIVERSAIRE",
    excerpt: "Célébration d'une année au service de la clientèle BMW à Sousse.",
    content: "Baccouche Automobiles célèbre son premier anniversaire. Une année riche en rencontres et en satisfaction client. Merci à tous nos clients pour leur confiance.",
    date: "2024-07-15",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=85",
  },
  {
    slug: "ouverture-agence-sousse",
    title: "BACCOUCHE AUTOMOBILES OUVRE UNE NOUVELLE AGENCE AGRÉÉE BEN JEMAÂ MOTORS À SOUSSE",
    excerpt: "Premier concessionnaire BMW à Sousse, agent agréé par Ben Jemâa Motors.",
    content: "Baccouche Automobiles est fier d'annoncer l'ouverture de la première agence BMW agréée Ben Jemâa Motors à Sousse. Un showroom moderne, un service après-vente de qualité et une équipe dévouée vous attendent.",
    date: "2023-07-10",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=85",
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getLatestNews(limit = 3): NewsArticle[] {
  return [...newsArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
