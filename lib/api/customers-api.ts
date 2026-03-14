import { api } from "./client";
import type { AuthUser } from "@/lib/auth-context";
import type { UpdateUserDto } from "@/lib/types";

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

function normalizeUser(data: AuthUser & { firstName?: string; lastName?: string }): AuthUser {
  const name =
    data.name ?? (data.firstName || data.lastName ? [data.firstName, data.lastName].filter(Boolean).join(" ") : data.name ?? "");
  return { ...data, name: name || data.name };
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    const { data } = await api.get<AuthUser & { firstName?: string; lastName?: string }>("/api/customers/me");
    return data ? normalizeUser(data) : null;
  } catch {
    return null;
  }
}

export async function updateMe(
  updates: Partial<Pick<AuthUser, "name" | "phone" | "address">>
): Promise<AuthUser | null> {
  try {
    const payload: UpdateUserDto = {};
    if (updates.phone !== undefined) payload.phone = updates.phone;
    if (updates.address !== undefined) payload.address = updates.address;
    if (updates.name !== undefined) {
      const { firstName, lastName } = splitName(updates.name);
      payload.firstName = firstName;
      payload.lastName = lastName;
    }
    const { data } = await api.patch<AuthUser & { firstName?: string; lastName?: string }>("/api/customers/me", payload);
    return data ? normalizeUser(data) : null;
  } catch {
    return null;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await api.patch("/api/customers/me/password", {
      currentPassword,
      newPassword,
    });
    return { success: true };
  } catch (err: unknown) {
    const msg =
      (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
      "Erreur lors du changement de mot de passe";
    return { success: false, error: msg };
  }
}
