import { api, setStoredToken } from "./client";
import type { AuthUser } from "@/lib/auth-context";

export interface LoginResponse {
  user: AuthUser;
  accessToken?: string;
  token?: string;
  auth_token?: string;
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AuthUser; token?: string }> {
  try {
    const { data } = await api.post<LoginResponse>("/api/auth/login", {
      email,
      password,
    });
    const token =
      data.auth_token ??
      data.accessToken ??
      data.token ??
      (data as { access_token?: string }).access_token;
    const user = data.user ?? data;
    if (token) {
      setStoredToken(token);
    }
    if (user && (user as AuthUser).id) {
      return { success: true, user: user as AuthUser, token: token as string };
    }
    return { success: false, error: "Réponse invalide du serveur" };
  } catch (err: unknown) {
    const ax = err as { response?: { data?: { message?: string } }; message?: string };
    const msg =
      ax?.response?.data?.message ||
      ax?.message ||
      "Email ou mot de passe incorrect";
    return { success: false, error: msg };
  }
}

export async function register(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<{ success: boolean; error?: string; user?: AuthUser; token?: string }> {
  try {
    const { firstName, lastName } = splitName(data.name);
    const payload = {
      email: data.email,
      password: data.password,
      firstName,
      lastName,
      phone: data.phone ?? "",
    };
    const { data: res } = await api.post<LoginResponse>("/api/auth/register", payload);
    const token =
      res.auth_token ??
      res.accessToken ??
      res.token ??
      (res as { access_token?: string }).access_token;
    const user = res.user ?? res;
    if (token) {
      setStoredToken(token);
    }
    if (user && (user as AuthUser).id) {
      return { success: true, user: user as AuthUser, token: token as string };
    }
    return { success: false, error: "Réponse invalide du serveur" };
  } catch (err: unknown) {
    const ax = err as { response?: { data?: { message?: string } }; message?: string };
    const msg = ax?.response?.data?.message || ax?.message || "Erreur lors de l'inscription";
    return { success: false, error: msg };
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/api/auth/logout");
  } catch {
    // Ignore errors on logout
  } finally {
    setStoredToken(null);
  }
}

function normalizeAuthUser(data: AuthUser & { firstName?: string; lastName?: string }): AuthUser {
  const name =
    data.name ??
    (data.firstName || data.lastName
      ? [data.firstName, data.lastName].filter(Boolean).join(" ")
      : "");
  return { ...data, name: name || data.name || "" };
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    const { data } = await api.get<AuthUser & { firstName?: string; lastName?: string }>("/api/auth/me");
    return data ? normalizeAuthUser(data) : null;
  } catch {
    return null;
  }
}

export async function forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await api.post("/api/auth/forgot-password", { email });
    return { success: true };
  } catch (err: unknown) {
    const ax = err as { response?: { data?: { message?: string } }; message?: string };
    const msg = ax?.response?.data?.message || ax?.message || "Erreur lors de l'envoi";
    return { success: false, error: msg };
  }
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await api.post("/api/auth/reset-password", { token, newPassword });
    return { success: true };
  } catch (err: unknown) {
    const ax = err as { response?: { data?: { message?: string } }; message?: string };
    const msg = ax?.response?.data?.message || ax?.message || "Erreur lors de la réinitialisation";
    return { success: false, error: msg };
  }
}
