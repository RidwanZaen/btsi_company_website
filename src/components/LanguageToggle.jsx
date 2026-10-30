import { motion } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";
import { LANGUAGES } from "../i18n/translations";

export default function LanguageToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div role="group" aria-label={t("lang.label")} className="flex rounded-full bg-slate-100 p-0.5">
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            title={l.name}
            aria-pressed={active}
            onClick={() => setLang(l.code)}
            className={`relative rounded-full px-2.5 py-1 text-xs font-bold transition-colors duration-150 ${
              active ? "text-navy" : "text-slate-500 hover:text-sea"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
