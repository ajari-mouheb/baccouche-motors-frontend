import { api } from "./client";
import type { NewsArticle, PaginatedResponse } from "@/lib/types";

export async function list(
  params?: { page?: number; limit?: number }
): Promise<PaginatedResponse<NewsArticle>> {
  const { data } = await api.get<
    PaginatedResponse<NewsArticle> | NewsArticle[]
  >("/api/news", { params });

  if (Array.isArray(data)) {
    return {
      data,
      total: data.length,
      page: 1,
      limit: data.length,
      totalPages: 1,
    };
  }

  const paginated = data as PaginatedResponse<NewsArticle>;
  return {
    ...paginated,
    data: paginated.data ?? [],
  };
}

export async function getStats(): Promise<{ count?: number }> {
  const { data } = await api.get("/api/news/stats");
  return (data as { count?: number }) ?? {};
}

export async function getBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const { data } = await api.get<NewsArticle>(`/api/news/slug/${encodeURIComponent(slug)}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getById(id: string): Promise<NewsArticle | null> {
  try {
    const { data } = await api.get<NewsArticle>(`/api/news/${id}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function create(
  payload: Omit<NewsArticle, "id" | "slug"> & { slug?: string }
): Promise<NewsArticle> {
  const { data } = await api.post<NewsArticle>("/api/news", payload);
  return data as NewsArticle;
}

export async function update(
  id: string,
  payload: Partial<NewsArticle>
): Promise<NewsArticle | null> {
  try {
    const { data } = await api.put<NewsArticle>(`/api/news/${id}`, payload);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await api.delete(`/api/news/${id}`);
    return true;
  } catch {
    return false;
  }
}

export async function uploadImage(id: string, file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<{ url?: string; image?: string }>(
      `/api/news/${id}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return (data as { url?: string }).url ?? (data as { image?: string }).image ?? null;
  } catch {
    return null;
  }
}
