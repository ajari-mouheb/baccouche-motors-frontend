import { useQuery } from "@tanstack/react-query";
import * as adminApi from "@/lib/api/admin-api";

export const adminKeys = {
  dashboard: () => ["admin", "dashboard"] as const,
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: adminApi.getDashboard,
  });
}
