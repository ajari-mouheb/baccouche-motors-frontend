import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités | Baccouche Automobiles - BMW Sousse",
  description: "Les dernières actualités de Baccouche Automobiles.",
};

export default function ActualitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
