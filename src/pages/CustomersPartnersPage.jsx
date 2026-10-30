import ClientPartnerSection from "../components/ClientPartnerSection";

export default function CustomersPartnersPage() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-sea py-20 text-white sm:py-28">
        <div className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-teal/25 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Trusted by Leading Institutions</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Bank, sekuritas, dan perusahaan pembiayaan memercayakan keamanan ICT mereka kepada kami, dengan dukungan mitra teknologi global.
          </p>
        </div>
      </div>
      <ClientPartnerSection />
    </>
  );
}
