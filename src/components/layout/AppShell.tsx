"use client";

import { ReactNode } from "react";
import { LanguageSelect } from "@/components/common/LanguageSelect";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";

interface AppShellProps {
  children: ReactNode;
  title: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
          <div>
            <h1 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelect />
            <ThemeToggle />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
