import ClientPartnerSection from "../components/ClientPartnerSection";
import { useLang } from "../i18n/LanguageContext";

export default function CustomersPartnersPage() {
  const { t } = useLang();
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-sea py-20 text-white sm:py-28">
        <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-teal/25 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{t("clients.heroTitle")}</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">{t("clients.heroText")}</p>
        </div>
      </div>
      <ClientPartnerSection />
    </>
  );
}
