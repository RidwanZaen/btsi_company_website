import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminDashboard from "./pages/AdminDashboard";
import CustomersPartnersPage from "./pages/CustomersPartnersPage";
import HomePage from "./pages/HomePage";
import { COMPANY } from "./data/content";
import { EASE } from "./components/motion";
import logoBTSI from "./BTSI_logo.png";

const NAV = [
  { to: "/", end: true, label: "Home" },
  { to: "/customers-partners", label: "Customers & Partners", short: "Clients" },
  { to: "/admin", label: "Admin" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/75 text-navy backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
        scrolled ? "border-black/10 shadow-[0_1px_12px_-4px_rgba(6,24,47,0.12)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" aria-label="BTSI, beranda" className="flex items-center">
          <img src={logoBTSI} alt="Logo BTSI" className="h-8 w-auto" />
        </NavLink>
        <nav className="flex gap-1" aria-label="Navigasi utama">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  isActive ? "text-navy" : "text-slate-600 hover:text-sea"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-teal"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                  {n.short ? (
                    <>
                      <span className="sm:hidden">{n.short}</span>
                      <span className="hidden sm:inline">{n.label}</span>
                    </>
                  ) : (
                    n.label
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-6">
        <div className="max-w-md">
          <p className="font-bold text-white">{COMPANY.name}</p>
          <p className="mt-2 leading-relaxed">{COMPANY.address}</p>
        </div>
        <a
          href={`https://${COMPANY.website}`}
          className="font-semibold text-teal transition-colors duration-150 hover:text-white"
        >
          {COMPANY.website}
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Header />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers-partners" element={<CustomersPartnersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}
