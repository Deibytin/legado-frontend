"use client";

import { ShieldCheck } from "lucide-react";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import { AppShell } from "@/components/layout/AppShell";
import { useI18n } from "@/context/I18nContext";

export default function AdminPage() {
  const { t } = useI18n();

  return (
    <PrivateRoute adminOnly>
      <AppShell title={t("admin")}>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand/10 text-brand">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">{t("adminOnly")}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">ADMIN</p>
            </div>
          </div>
        </section>
      </AppShell>
    </PrivateRoute>
  );
}
