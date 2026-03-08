"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  register: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AUTH_STORAGE_KEY = "baccouche-auth";

const MOCK_ADMIN = { email: "admin@baccouche.com", password: "admin" };
const MOCK_CUSTOMER = { email: "customer@demo.com", password: "demo" };

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

function saveUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(loadStoredUser());
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      await new Promise((r) => setTimeout(r, 400));

      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        const adminUser: AuthUser = {
          id: "admin-1",
          name: "Administrateur",
          email: MOCK_ADMIN.email,
          role: "admin",
        };
        setUser(adminUser);
        saveUser(adminUser);
        return { success: true };
      }

      if (email === MOCK_CUSTOMER.email && password === MOCK_CUSTOMER.password) {
        const customerUser: AuthUser = {
          id: "customer-1",
          name: "Client Démo",
          email: MOCK_CUSTOMER.email,
          role: "customer",
          phone: "+216 XX XXX XXX",
          address: "Adresse exemple",
        };
        setUser(customerUser);
        saveUser(customerUser);
        return { success: true };
      }

      return { success: false, error: "Email ou mot de passe incorrect" };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    saveUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      saveUser(next);
      return next;
    });
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }): Promise<{ success: boolean; error?: string }> => {
      await new Promise((r) => setTimeout(r, 500));

      if (data.email === MOCK_ADMIN.email || data.email === MOCK_CUSTOMER.email) {
        return { success: false, error: "Cet email est déjà utilisé" };
      }

      const newUser: AuthUser = {
        id: `customer-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: "customer",
        phone: data.phone,
      };
      setUser(newUser);
      saveUser(newUser);
      return { success: true };
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
