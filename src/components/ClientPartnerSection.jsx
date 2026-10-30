import { useClients } from "../context/ClientsContext";
import Logo from "./Logo";
import { Item, RevealGroup } from "./motion";

const Empty = ({ children }) => (
  <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">{children}</p>
);

function LogoGrid({ items, empty }) {
  if (items.length === 0) return <Empty>{empty}</Empty>;
  return (
    <RevealGroup as="ul" gap={0.035} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => (
        <Item
          as="li"
          key={c.id}
          className="group flex h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 ease-out hover:border-teal/60 hover:shadow-[0_18px_40px_-20px_rgba(11,92,168,0.35)]"
        >
          <div className="opacity-80 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0">
            <Logo name={c.name} logoUrl={c.logoUrl} layout="col" className="h-10 w-10" imageClassName="h-12 w-36" />
          </div>
        </Item>
      ))}
    </RevealGroup>
  );
}

export default function ClientPartnerSection() {
  const { clients, loading, error } = useClients();
  const customers = clients.filter((c) => c.category === "Customer");
  const partners = clients.filter((c) => c.category === "Partner");
  const empty = loading ? "Memuat data..." : error || "Belum ada data.";

  return (
    <>
      <section className="bg-slate-50 py-20" aria-labelledby="customers-title">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="customers-title" className="text-3xl font-extrabold tracking-tight text-navy">Our Customers</h2>
          <p className="mb-10 mt-2 text-slate-600">{customers.length} institusi yang mempercayakan keamanan dan infrastrukturnya kepada kami.</p>
          <LogoGrid items={customers} empty={empty} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="partners-title">
        <h2 id="partners-title" className="text-3xl font-extrabold tracking-tight text-navy">Our Partners</h2>
        <p className="mb-10 mt-2 text-slate-600">{partners.length} mitra teknologi dan konsultasi yang mendukung solusi kami.</p>
        <LogoGrid items={partners} empty={empty} />
      </section>
    </>
  );
}