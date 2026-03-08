import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "@/components/admin/stats-cards";
import { Badge } from "@/components/ui/badge";
import { mockTestDrives, mockContacts } from "@/lib/data/mock-admin";
import { cars } from "@/lib/data/cars";
import { newsArticles } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "Dashboard | Admin - Baccouche Automobiles",
  description: "Tableau de bord administration",
};

const statusVariant = {
  pending: "pending" as const,
  confirmed: "confirmed" as const,
  completed: "completed" as const,
  rejected: "rejected" as const,
};

const statusLabel = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  rejected: "Refusé",
};

export default function AdminDashboardPage() {
  const pendingTestDrives = mockTestDrives.filter((t) => t.status === "pending");
  const recentTestDrives = mockTestDrives.slice(0, 5);

  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Tableau de bord</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Demandes Test Drive"
          value={mockTestDrives.length}
          subtitle={`${pendingTestDrives.length} en attente`}
        />
        <StatCard
          title="Messages contact"
          value={mockContacts.length}
        />
        <StatCard title="Véhicules" value={cars.length} />
        <StatCard title="Actualités" value={newsArticles.length} />
      </div>
      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">
            Dernières demandes Test Drive
          </h2>
          <Link
            href="/admin/test-drives"
            className="text-sm font-medium text-luxury-accent hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Nom</th>
                <th className="px-4 py-3 text-left font-medium">Modèle</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentTestDrives.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                    Aucune demande de test drive pour le moment.
                  </td>
                </tr>
              ) : (
                recentTestDrives.map((td) => (
                  <tr key={td.id} className="border-b border-border/50">
                    <td className="px-4 py-3">{td.name}</td>
                    <td className="px-4 py-3">{td.model}</td>
                    <td className="px-4 py-3">{td.preferredDate ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[td.status]}>
                        {statusLabel[td.status]}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
