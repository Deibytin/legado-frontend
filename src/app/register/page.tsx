"use client";

import { LanguageSelect } from "@/components/common/LanguageSelect";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { useI18n } from "@/context/I18nContext";

export default function Register() {
  const { t } = useI18n();

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="absolute right-6 top-6 flex gap-3">
        <LanguageSelect />
        <ThemeToggle />
      </div>
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p className="text-2xl font-bold text-brand">Legado Sport</p>
        <h1 className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">{t("register")}</h1>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
