import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as newsApi from "@/lib/api/news-api";
import type { NewsArticle } from "@/lib/types";

export const newsKeys = {
  all: ["news"] as const,
  list: (params?: { page?: number; limit?: number }) =>
    [...newsKeys.all, "list", params] as const,
  stats: () => [...newsKeys.all, "stats"] as const,
  slug: (slug: string) => [...newsKeys.all, "slug", slug] as const,
  detail: (id: string) => [...newsKeys.all, "detail", id] as const,
};

export function useNews(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => newsApi.list(params),
    select: (res) => res.data,
  });
}

export function useNewsStats() {
  return useQuery({
    queryKey: newsKeys.stats(),
    queryFn: newsApi.getStats,
  });
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: newsKeys.slug(slug),
    queryFn: () => newsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useNewsById(id: string) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewsArticle> }) =>
      newsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
    },
  });
}

export function useUploadNewsImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      newsApi.uploadImage(id, file),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.all });
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
    },
  });
}
