"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getStoredToken } from "@/lib/api/client";
import * as authApi from "@/lib/api/auth-api";

export type UserRole = "admin" | "customer";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  register: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    authApi
      .getMe()
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
      const result = await authApi.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error ?? "Échec de connexion" };
    },
    []
  );

  const logout = useCallback(() => {
    authApi.logout().finally(() => {
      setUser(null);
    });
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }): Promise<{ success: boolean; error?: string }> => {
      const result = await authApi.register(data);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error ?? "Échec de l'inscription" };
    },
    []
  );

  const value: AuthContextValue = { user, isLoading, login, logout, updateUser, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
