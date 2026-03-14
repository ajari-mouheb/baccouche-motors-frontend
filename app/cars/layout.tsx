import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Véhicules | Baccouche Automobiles - BMW Sousse",
  description:
    "Découvrez notre gamme de véhicules BMW neufs et d'occasion.",
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
