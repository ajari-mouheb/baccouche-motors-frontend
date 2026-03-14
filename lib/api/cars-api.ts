import { api } from "./client";
import type { Car, CarsQueryParams, PaginatedResponse } from "@/lib/types";

function normalizeCar(raw: Car & { make?: string }): Car {
  const name =
    raw.name ?? (raw.make ? `${raw.make} ${raw.model}` : raw.model) ?? "";
  return { ...raw, name, make: raw.make };
}

export async function getAll(
  params?: CarsQueryParams
): Promise<PaginatedResponse<Car>> {
  const { data } = await api.get<
    PaginatedResponse<Car & { make?: string }> | (Car & { make?: string })[]
  >("/api/cars", { params });

  if (Array.isArray(data)) {
    const items = data.map(normalizeCar);
    return {
      data: items,
      total: items.length,
      page: 1,
      limit: items.length,
      totalPages: 1,
    };
  }

  const paginated = data as PaginatedResponse<Car & { make?: string }>;
  return {
    ...paginated,
    data: (paginated.data ?? []).map(normalizeCar),
  };
}

export async function getStats(): Promise<{ count?: number }> {
  const { data } = await api.get("/api/cars/stats");
  return (data as { count?: number }) ?? {};
}

export async function getBySlug(slug: string): Promise<Car | null> {
  try {
    const { data } = await api.get<Car & { make?: string }>(
      `/api/cars/slug/${encodeURIComponent(slug)}`
    );
    return data ? normalizeCar(data) : null;
  } catch {
    return null;
  }
}

export async function getById(id: string): Promise<Car | null> {
  try {
    const { data } = await api.get<Car & { make?: string }>(`/api/cars/${id}`);
    return data ? normalizeCar(data) : null;
  } catch {
    return null;
  }
}

export async function create(
  payload: Omit<Car, "id" | "slug"> & { slug?: string }
): Promise<Car> {
  const body = {
    make: payload.make ?? payload.name,
    model: payload.model,
    year: payload.year,
    price: typeof payload.price === "string" ? parseFloat(payload.price) || 0 : payload.price ?? 0,
    slug: payload.slug,
    image: payload.image,
    description: payload.description,
    specs: payload.specs,
  };
  const { data } = await api.post<Car & { make?: string }>("/api/cars", body);
  return data ? normalizeCar(data) : (data as Car);
}

export async function update(id: string, payload: Partial<Car>): Promise<Car | null> {
  try {
    const body: Record<string, unknown> = { ...payload };
    if (payload.name !== undefined && !("make" in payload)) {
      body.make = payload.name;
    }
    const { data } = await api.put<Car & { make?: string }>(`/api/cars/${id}`, body);
    return data ? normalizeCar(data) : null;
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await api.delete(`/api/cars/${id}`);
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
      `/api/cars/${id}/image`,
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
