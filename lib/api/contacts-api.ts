import { api } from "./client";
import type { Contact, PaginatedResponse } from "@/lib/types";

export async function list(
  params?: { page?: number; limit?: number }
): Promise<PaginatedResponse<Contact>> {
  const { data } = await api.get<PaginatedResponse<Contact> | Contact[]>(
    "/api/contacts",
    { params }
  );

  if (Array.isArray(data)) {
    return {
      data,
      total: data.length,
      page: 1,
      limit: data.length,
      totalPages: 1,
    };
  }

  const paginated = data as PaginatedResponse<Contact>;
  return {
    ...paginated,
    data: paginated.data ?? [],
  };
}

export async function getStats(): Promise<{ count?: number; unread?: number }> {
  const { data } = await api.get("/api/contacts/stats");
  return (data as { count?: number; unread?: number }) ?? {};
}

export async function getById(id: string): Promise<Contact | null> {
  try {
    const { data } = await api.get<Contact>(`/api/contacts/${id}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function create(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<Contact> {
  const { data } = await api.post<Contact>("/api/contacts", payload);
  return data as Contact;
}

export async function update(
  id: string,
  payload: Partial<Pick<Contact, "read">>
): Promise<Contact | null> {
  try {
    const { data } = await api.patch<Contact>(`/api/contacts/${id}`, payload);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await api.delete(`/api/contacts/${id}`);
    return true;
  } catch {
    return false;
  }
}
