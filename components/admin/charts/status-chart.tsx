"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTestDrives } from "@/lib/hooks/use-test-drives";

const statusConfig = {
  pending: { label: "En attente", color: "hsl(45, 93%, 47%)" },
  confirmed: { label: "Confirmé", color: "hsl(217, 91%, 60%)" },
  completed: { label: "Terminé", color: "hsl(142, 71%, 45%)" },
  rejected: { label: "Refusé", color: "hsl(0, 84%, 60%)" },
  cancelled: { label: "Annulé", color: "hsl(0, 0%, 50%)" },
};

interface StatusChartProps {
  className?: string;
}

export function StatusChart({ className }: StatusChartProps) {
  const { data: testDrives = [] } = useTestDrives();

  // Group by status
  const statusData = Object.entries(statusConfig).map(([key, config]) => ({
    name: config.label,
    value: testDrives.filter((td) => td.status === key).length,
    color: config.color,
  }));

  const hasData = testDrives.length > 0;

  if (!hasData) {
    return (
      <div className={className}>
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Répartition par Statut
        </h3>
        <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
          Aucune donnée disponible
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Répartition par Statut
      </h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              cursor={{ fill: "hsl(var(--muted)/20)" }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}