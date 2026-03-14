import { useQuery } from "@tanstack/react-query";
import * as healthApi from "@/lib/api/health-api";

export const healthKeys = {
  root: () => ["health", "root"] as const,
  api: () => ["health", "api"] as const,
};

export function useHealth() {
  return useQuery({
    queryKey: healthKeys.api(),
    queryFn: healthApi.healthApi,
  });
}
