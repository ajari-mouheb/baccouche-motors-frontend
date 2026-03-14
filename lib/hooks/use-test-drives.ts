import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as testDrivesApi from "@/lib/api/test-drives-api";
import type {
  TestDrive,
  TestDriveCreateGuest,
  TestDriveCreateLoggedIn,
  TestDriveStatus,
} from "@/lib/types";

export const testDrivesKeys = {
  all: ["testDrives"] as const,
  list: (params?: { page?: number; limit?: number }) =>
    [...testDrivesKeys.all, "list", params] as const,
  stats: () => [...testDrivesKeys.all, "stats"] as const,
  detail: (id: string) => [...testDrivesKeys.all, "detail", id] as const,
};

export function useTestDrives(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: testDrivesKeys.list(params),
    queryFn: () => testDrivesApi.list(params),
    select: (res) => res.data,
  });
}

export function useTestDriveStats() {
  return useQuery({
    queryKey: testDrivesKeys.stats(),
    queryFn: testDrivesApi.getStats,
  });
}

export function useTestDriveById(id: string) {
  return useQuery({
    queryKey: testDrivesKeys.detail(id),
    queryFn: () => testDrivesApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTestDrive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TestDriveCreateLoggedIn | TestDriveCreateGuest) =>
      testDrivesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testDrivesKeys.all });
    },
  });
}

export function useUpdateTestDriveStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TestDriveStatus }) =>
      testDrivesApi.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: testDrivesKeys.all });
      queryClient.invalidateQueries({ queryKey: testDrivesKeys.detail(id) });
    },
  });
}

export function useCancelTestDrive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: testDrivesApi.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testDrivesKeys.all });
    },
  });
}
