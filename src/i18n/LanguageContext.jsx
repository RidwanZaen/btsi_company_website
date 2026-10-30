import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, translations } from "./translations";

const STORAGE_KEY = "btsi-lang";
const DEFAULT_LANG = "id";
const LanguageContext = createContext(null);

function readInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {
    /* localStorage tidak tersedia */
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* abaikan */
    }
  }, []);

  const t = useCallback(
    (key, vars) => {
      let text = translations[lang]?.[key] ?? translations[DEFAULT_LANG][key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, v);
      return text;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam LanguageProvider");
  return ctx;
}
