import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminDashboard from "./pages/AdminDashboard";
import CustomersPartnersPage from "./pages/CustomersPartnersPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LanguageToggle from "./components/LanguageToggle";
import { EASE } from "./components/motion";
import { useLang } from "./i18n/LanguageContext";
import logoBTSI from "./BTSI_logo.png";

const NAV = [
  { to: "/", end: true, key: "nav.home" },
  { to: "/customers-partners", key: "nav.clients", shortKey: "nav.clientsShort" },
  { to: "/admin", key: "nav.admin" },
];

function Header() {
  const { t } = useLang();
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
        <NavLink to="/" aria-label={t("nav.logoLabel")} className="flex items-center">
          <img src={logoBTSI} alt="Logo BTSI" className="h-8 w-auto" />
        </NavLink>
        <div className="flex items-center gap-1 sm:gap-3">
        <nav className="flex gap-0.5 sm:gap-1" aria-label={t("nav.label")}>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-sm sm:px-4 font-semibold transition-colors duration-150 ${
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
                  {n.shortKey ? (
                    <>
                      <span className="sm:hidden">{t(n.shortKey)}</span>
                      <span className="hidden sm:inline">{t(n.key)}</span>
                    </>
                  ) : (
                    t(n.key)
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView();
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
