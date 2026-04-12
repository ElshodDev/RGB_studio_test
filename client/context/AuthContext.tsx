"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { getUser, setUser, removeUser, getToken, setToken, removeToken, StoredUser } from "@/lib/auth";
import { getMe } from "@/lib/api";

interface AuthContextType {
  user: StoredUser | null;
  isLoading: boolean;
  login: (token: string, user: StoredUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<StoredUser | null>(() => getUser());
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    const token = getToken();
    if (!token) return false;
    return !getUser();
  });

  useEffect(() => {
    const token = getToken();
    if (!token || getUser()) return;
    getMe()
      .then((u) => {
        setUserState(u);
        setUser(u);
        Cookies.set("role", u.role, { expires: 7 });
      })
      .catch(() => {
        removeToken();
        removeUser();
        Cookies.remove("role");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback((token: string, userData: StoredUser) => {
    setToken(token);
    setUser(userData);
    Cookies.set("role", userData.role, { expires: 7 });
    Cookies.set("token", token, { expires: 7 });
    setUserState(userData);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    Cookies.remove("role");
    Cookies.remove("token");
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
