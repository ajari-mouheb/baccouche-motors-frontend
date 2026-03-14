import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord | Espace client - Baccouche Automobiles",
  description: "Votre espace client",
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
