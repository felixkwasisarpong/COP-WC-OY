"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/services/api";

export type AuthUser = {
  id: number;
  email: string;
  role: "member" | "admin";
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
    } else {
      setLoading(false);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!token) {
      setUser(null);
      if (hydrated) {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    apiFetch("/auth/me", { token })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token, hydrated]);

  const login = async (email: string, password: string) => {
    const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const nextToken = response.access_token as string;
    window.localStorage.setItem("auth_token", nextToken);
    setToken(nextToken);
  };

  const logout = () => {
    window.localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, loading, login, logout }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
