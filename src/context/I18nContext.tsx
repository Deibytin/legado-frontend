"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, Locale, TranslationKey } from "@/lib/translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("legado_locale");

    if (storedLocale === "es" || storedLocale === "en") {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale): void => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("legado_locale", nextLocale);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => dictionaries[locale][key],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
};
