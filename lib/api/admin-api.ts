import { api } from "./client";
import type { DashboardStats } from "@/lib/types";

export async function getDashboard(): Promise<DashboardStats> {
  const { data } = await api.get<DashboardStats>("/api/admin/dashboard");
  return (data as DashboardStats) ?? {};
}
