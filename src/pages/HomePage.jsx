import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import { fadeUp, press, stagger } from "../components/motion";
import { useLang } from "../i18n/LanguageContext";
import { HERO_IMAGE, MISSION } from "../data/content";

const MotionLink = motion.create(Link);

const VALUES = [
  { icon: "bulb", key: "values.1" },
  { icon: "synergy", key: "values.2" },
  { icon: "growth", key: "values.3" },
];

const card = "transition-[border-color,box-shadow] duration-200 ease-out hover:border-teal/60 hover:shadow-[0_18px_40px_-20px_rgba(11,92,168,0.35)]";

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {HERO_IMAGE && <img src={HERO_IMAGE} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-sea/70" />
      <div className="absolute -right-24 top-16 -z-10 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
      <div className="absolute -left-24 bottom-24 -z-10 h-72 w-72 rounded-full bg-sea/40 blur-3xl" />

      <motion.div
        variants={stagger(0.09, 0.05)}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 pb-44 pt-28 sm:pt-36"
      >
        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          {t("hero.subtitle")}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <motion.a
            href="#services"
            {...press}
            className="rounded-full bg-teal px-8 py-3.5 font-bold text-navy transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[0_12px_30px_-8px_rgba(20,184,196,0.8)]"
          >
            {t("hero.ctaServices")}
          </motion.a>
          <MotionLink
            to="/customers-partners"
            {...press}
            className="rounded-full border border-white/40 px-8 py-3.5 font-semibold transition-colors duration-200 hover:bg-white/10"
          >
            {t("hero.ctaClients")}
          </MotionLink>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 2400 160" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] animate-wave motion-reduce:animate-none">
          <path d="M0 80Q300 0 600 80T1200 80T1800 80T2400 80V160H0Z" fill="#fff" fillOpacity=".25" />
        </svg>
        <svg viewBox="0 0 2400 160" preserveAspectRatio="none" className="absolute bottom-0 h-full w-[200%] animate-wave-rev motion-reduce:animate-none">
          <path d="M0 115Q300 55 600 115T1200 115T1800 115T2400 115V160H0Z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}

function About() {
  const { t, lang } = useLang();
  const mission = MISSION[lang];
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2" aria-labelledby="about-title">
      <div>
        <h2 id="about-title" className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("about.title")}</h2>
        <p className="mt-5 max-w-prose leading-relaxed text-slate-600">
          {t("about.text")}
        </p>
        <div className="mt-8 border-l-4 border-teal pl-5">
          <h3 className="font-bold text-navy">{t("about.vision")}</h3>
          <p className="mt-1 text-xl font-semibold text-sea">{t("about.visionText")}</p>
        </div>
        {mission && (
          <div className="mt-6 border-l-4 border-sea pl-5">
            <h3 className="font-bold text-navy">{t("about.mission")}</h3>
            <p className="mt-1 text-slate-600">{mission}</p>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-sea p-8 text-white sm:p-10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-teal/30 blur-3xl" />
        <div className="relative">
          <p className="text-7xl font-extrabold leading-none tabular-nums">19</p>
          <p className="mt-3 max-w-xs text-lg text-slate-200">{t("about.statText")}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
            <div><p className="text-2xl font-bold">{t("about.founded")}</p><p className="text-sm text-slate-300">{t("about.foundedLabel")}</p></div>
            <div><p className="text-2xl font-bold">{t("about.sectors")}</p><p className="text-sm text-slate-300">{t("about.sectorsLabel")}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const { t } = useLang();
  return (
    <section className="bg-slate-50 py-24" aria-labelledby="values-title">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="values-title" className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("values.title")}</h2>
        <p className="mt-3 max-w-xl text-slate-600">{t("values.subtitle")}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.key} className={`rounded-2xl border border-slate-200 bg-white p-8 ${card}`}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-foam text-sea">
                <Icon name={v.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-navy">{t(`${v.key}.title`)}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{t(`${v.key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24" aria-labelledby="services-title">
      <h2 id="services-title" className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("services.title")}</h2>
      <p className="mt-3 max-w-xl text-slate-600">{t("services.subtitle")}</p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white transition-shadow duration-200 hover:shadow-[0_24px_50px_-18px_rgba(20,184,196,0.5)] md:col-span-2 md:p-10">
          <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-teal/25 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-teal"><Icon name="consulting" className="h-7 w-7" /></div>
            <h3 className="text-2xl font-bold">{t("services.consulting.title")}</h3>
            <p className="mt-2 max-w-md leading-relaxed text-slate-300">{t("services.consulting.text")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Security", "ISP", "PI", "DT"].map((t) => (
                <span key={t} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={`rounded-3xl border border-slate-200 bg-white p-8 ${card}`}>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-foam text-sea"><Icon name="shield" className="h-7 w-7" /></div>
          <h3 className="text-2xl font-bold text-navy">{t("services.ict.title")}</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{t("services.ict.text")}</p>
        </div>

        <div className={`rounded-3xl border border-slate-200 bg-white p-8 md:col-span-3 ${card}`}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-foam text-sea"><Icon name="server" className="h-7 w-7" /></div>
            <div>
              <h3 className="text-2xl font-bold text-navy">{t("services.infra.title")}</h3>
              <p className="mt-1 max-w-2xl leading-relaxed text-slate-600">{t("services.infra.text")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Services />
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
          <h2 className="max-w-xl text-2xl font-bold">{t("cta.text")}</h2>
          <MotionLink
            to="/customers-partners"
            {...press}
            className="rounded-full bg-teal px-8 py-3.5 font-bold text-navy transition-colors duration-200 hover:bg-white"
          >
            {t("cta.button")}
          </MotionLink>
        </div>
      </section>
    </>
  );
}
