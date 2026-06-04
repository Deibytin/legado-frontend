"use client";

import { LanguageSelect } from "@/components/common/LanguageSelect";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { AppShell } from "@/components/layout/AppShell";
import { useI18n } from "@/context/I18nContext";

export default function SettingsPage() {
  const { t } = useI18n();

  return (
    <PrivateRoute>
      <AppShell title={t("settings")}>
        <section className="grid max-w-xl gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">{t("darkMode")}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">{t("settings")}</span>
            <LanguageSelect />
          </div>
        </section>
      </AppShell>
    </PrivateRoute>
  );
}
