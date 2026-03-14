import type { AuthUser } from "@/lib/auth-context";

// Mock profile stored in memory (reset on refresh)
let customerProfile: Partial<AuthUser> = {};

export async function fetchProfile(userId: string): Promise<Partial<AuthUser> | null> {
  await new Promise((r) => setTimeout(r, 200));
  return { ...customerProfile };
}

export async function updateProfile(
  userId: string,
  data: { name?: string; phone?: string; address?: string }
): Promise<Partial<AuthUser> | null> {
  await new Promise((r) => setTimeout(r, 400));
  customerProfile = { ...customerProfile, ...data };
  return { ...customerProfile };
}

export async function changePassword(
  _userId: string,
  _currentPassword: string,
  _newPassword: string
): Promise<{ success: boolean; error?: string }> {
  await new Promise((r) => setTimeout(r, 400));
  return { success: true };
}
