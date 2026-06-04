"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function PrivateRoute({ adminOnly = false, children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (adminOnly && user?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [adminOnly, isAuthenticated, isLoading, router, user?.role]);

  if (isLoading || !isAuthenticated || (adminOnly && user?.role !== "ADMIN")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-medium text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Legado Sport
      </div>
    );
  }

  return <>{children}</>;
}
