import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Test Drives | Espace client - Baccouche Automobiles",
  description: "Vos demandes de test drive",
};

export default function CustomerTestDrivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
