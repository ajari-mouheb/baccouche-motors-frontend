"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTestDrives } from "@/lib/hooks/use-test-drives";

const months = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
];

interface TestDrivesChartProps {
  className?: string;
}

export function TestDrivesChart({ className }: TestDrivesChartProps) {
  const { data: testDrives = [] } = useTestDrives();

  // Group test drives by month
  const monthlyData = months.map((month, index) => {
    const count = testDrives.filter((td) => {
      const date = new Date(td.createdAt);
      return date.getMonth() === index;
    }).length;

    return {
      name: month,
      demandes: count,
    };
  });

  // If no data, show placeholder data for current year
  const currentYear = new Date().getFullYear();
  const hasData = testDrives.some((td) => {
    const date = new Date(td.createdAt);
    return date.getFullYear() === currentYear;
  });

  const chartData = hasData
    ? monthlyData
    : months.map((month) => ({ name: month, demandes: 0 }));

  return (
    <div className={className}>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Demandes Test Drive par Mois
      </h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="demandes"
              stroke="hsl(var(--luxury-accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--luxury-accent))", r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--luxury-accent))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}