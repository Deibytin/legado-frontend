"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

export function LanguageSelect() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <Languages size={16} />
      <select
        className="bg-transparent outline-none"
        value={locale}
        onChange={(event) => setLocale(event.target.value === "en" ? "en" : "es")}
      >
        <option value="es">{t("spanish")}</option>
        <option value="en">{t("english")}</option>
      </select>
    </label>
  );
}
