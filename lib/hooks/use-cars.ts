import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as carsApi from "@/lib/api/cars-api";
import type { Car, CarsQueryParams } from "@/lib/types";

export const carsKeys = {
  all: ["cars"] as const,
  list: (params?: CarsQueryParams) => [...carsKeys.all, "list", params] as const,
  stats: () => [...carsKeys.all, "stats"] as const,
  slug: (slug: string) => [...carsKeys.all, "slug", slug] as const,
  detail: (id: string) => [...carsKeys.all, "detail", id] as const,
};

export function useCars(params?: CarsQueryParams) {
  return useQuery({
    queryKey: carsKeys.list(params),
    queryFn: () => carsApi.getAll(params),
    select: (res) => res.data,
  });
}

export function useCarStats() {
  return useQuery({
    queryKey: carsKeys.stats(),
    queryFn: carsApi.getStats,
  });
}

export function useCarBySlug(slug: string) {
  return useQuery({
    queryKey: carsKeys.slug(slug),
    queryFn: () => carsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCarById(id: string) {
  return useQuery({
    queryKey: carsKeys.detail(id),
    queryFn: () => carsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: carsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
    },
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Car> }) =>
      carsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({ queryKey: carsKeys.detail(id) });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: carsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
    },
  });
}

export function useUploadCarImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      carsApi.uploadImage(id, file),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
      queryClient.invalidateQueries({ queryKey: carsKeys.detail(id) });
    },
  });
}
