import { useClients } from "../context/ClientsContext";
import { useLang } from "../i18n/LanguageContext";
import LogoCarousel from "./LogoCarousel";

export default function ClientPartnerSection() {
  const { clients, loading, error } = useClients();
  const { t } = useLang();
  const customers = clients.filter((c) => c.category === "Customer");
  const partners = clients.filter((c) => c.category === "Partner");
  const empty = loading ? t("clients.loading") : error || t("clients.empty");

  return (
    <div id="clients" className="scroll-mt-16">
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <LogoCarousel
            id="customers-title"
            title={t("clients.customersTitle")}
            subtitle={t("clients.customersText", { n: customers.length })}
            items={customers}
            empty={empty}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <LogoCarousel
            id="partners-title"
            title={t("clients.partnersTitle")}
            subtitle={t("clients.partnersText", { n: partners.length })}
            items={partners}
            empty={empty}
          />
        </div>
      </section>
    </div>
  );
}
