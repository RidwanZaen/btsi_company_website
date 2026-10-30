import { Link } from "react-router-dom";
import { COMPANY } from "../data/content";
import { useLang } from "../i18n/LanguageContext";
import logoBTSI from "../BTSI_logo.png";

const SERVICES = ["services.consulting.title", "services.ict.title", "services.infra.title"];

const icon = {
  chevron: "m9 6 6 6-6 6",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  linkedin: "M4 9h4v11H4zM6 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10 9h3.8v1.6c.6-1 1.9-1.9 3.7-1.9 3.2 0 4 2.1 4 5V20h-4v-5.4c0-1.3-.1-2.6-1.7-2.6s-1.8 1.2-1.8 2.5V20h-4z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6.5h.01",
  youtube: "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3ZM10 9.5v5l4.5-2.5z",
};

function Svg({ name, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={icon[name]} />
    </svg>
  );
}

const Heading = ({ children }) => (
  <h2 className="mb-5 border-b border-white/10 pb-3 text-base font-bold text-white">{children}</h2>
);

const SOCIALS = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
];

export default function Footer() {
  const { t } = useLang();
  const socials = SOCIALS.filter((s) => COMPANY.socials?.[s.key]);

  const contacts = [
    { name: "globe", text: COMPANY.website, href: `https://${COMPANY.website}` },
    COMPANY.email && { name: "mail", text: COMPANY.email, href: `mailto:${COMPANY.email}` },
    COMPANY.phone && { name: "phone", text: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/[^+\d]/g, "")}` },
  ].filter(Boolean);

  return (
    <footer className="bg-navy text-sm text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div>
          <Link to="/" aria-label={t("nav.logoLabel")} className="inline-flex rounded-xl bg-white px-3 py-2">
            <img src={logoBTSI} alt="BTSI" className="h-8 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs leading-7">{t("footer.about")}</p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={COMPANY.socials[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors duration-150 hover:border-teal/60 hover:text-teal"
                >
                  <Svg name={s.key} className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label={t("footer.services")}>
          <Heading>{t("footer.services")}</Heading>
          <ul className="space-y-3.5">
            {SERVICES.map((key) => (
              <li key={key}>
                <Link to="/#services" className="group flex items-center gap-2 transition-colors duration-150 hover:text-white">
                  <Svg name="chevron" className="h-3.5 w-3.5 text-teal transition-transform duration-150 group-hover:translate-x-0.5" />
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Heading>{t("footer.address")}</Heading>
          <p className="flex gap-3 leading-7">
            <Svg name="pin" className="mt-1.5 h-4 w-4 flex-none text-teal" />
            <span>
              <span className="font-semibold text-slate-200">{COMPANY.name}</span>
              <br />
              {COMPANY.address}
            </span>
          </p>
        </div>

        <div>
          <Heading>{t("footer.contact")}</Heading>
          <ul className="space-y-3.5">
            {contacts.map((c) => (
              <li key={c.name}>
                <a href={c.href} className="flex items-center gap-3 break-all transition-colors duration-150 hover:text-white">
                  <Svg name={c.name} className="h-4 w-4 flex-none text-teal" />
                  {c.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-white/10 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {COMPANY.name}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
