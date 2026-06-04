"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setAccessTokenGetter } from "@/services/api";
import { authService } from "@/services/authService";
import { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types/auth";

type StoredSession = AuthResponse;

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "legado_auth";

const readStoredSession = (): StoredSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as StoredSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = readStoredSession();

    if (session) {
      setUser(session.user);
      setToken(session.token);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAccessTokenGetter(() => token);
  }, [token]);

  const persistSession = useCallback((session: AuthResponse): void => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session.user);
    setToken(session.token);
  }, []);

  const login = useCallback(async (payload: LoginPayload): Promise<void> => {
    const session = await authService.login(payload);
    persistSession(session);
  }, [persistSession]);

  const register = useCallback(async (payload: RegisterPayload): Promise<void> => {
    const session = await authService.register(payload);
    persistSession(session);
  }, [persistSession]);

  const logout = useCallback((): void => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
    }),
    [isLoading, login, logout, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
