import { api } from "./client";
import type {
  TestDrive,
  TestDriveCreateGuest,
  TestDriveCreateLoggedIn,
  TestDriveStatus,
  PaginatedResponse,
} from "@/lib/types";

function isLoggedInPayload(
  p: TestDriveCreateLoggedIn | TestDriveCreateGuest
): p is TestDriveCreateLoggedIn {
  return "carId" in p && "scheduledAt" in p;
}

export async function list(
  params?: { page?: number; limit?: number }
): Promise<PaginatedResponse<TestDrive>> {
  const { data } = await api.get<PaginatedResponse<TestDrive> | TestDrive[]>(
    "/api/test-drives",
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

  const paginated = data as PaginatedResponse<TestDrive>;
  return {
    ...paginated,
    data: paginated.data ?? [],
  };
}

export async function getStats(): Promise<{ count?: number; pending?: number }> {
  const { data } = await api.get("/api/test-drives/stats");
  return (data as { count?: number; pending?: number }) ?? {};
}

export async function getById(id: string): Promise<TestDrive | null> {
  try {
    const { data } = await api.get<TestDrive>(`/api/test-drives/${id}`);
    return data ?? null;
  } catch {
    return null;
  }
}

export async function create(
  payload: TestDriveCreateLoggedIn | TestDriveCreateGuest
): Promise<TestDrive> {
  const body = isLoggedInPayload(payload)
    ? {
        carId: payload.carId,
        scheduledAt: payload.scheduledAt,
        notes: payload.notes,
      }
    : {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        model: payload.model,
        preferredDate: payload.preferredDate,
        timeSlot: payload.timeSlot,
      };
  const { data } = await api.post<TestDrive>("/api/test-drives", body);
  return data as TestDrive;
}

export async function updateStatus(id: string, status: TestDriveStatus): Promise<TestDrive | null> {
  try {
    const { data } = await api.patch<TestDrive>(`/api/test-drives/${id}`, { status });
    return data ?? null;
  } catch {
    return null;
  }
}

export async function cancel(id: string): Promise<boolean> {
  try {
    await api.delete(`/api/test-drives/${id}`);
    return true;
  } catch {
    return false;
  }
}
