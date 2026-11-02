import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";
import Logo from "./Logo";
import { fadeUp, press } from "./motion";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Arrow({ dir, disabled, onClick, label }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      {...press}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition-[opacity,border-color,color,box-shadow] duration-150 hover:border-teal hover:text-sea hover:shadow-md disabled:pointer-events-none disabled:opacity-35"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d={dir < 0 ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
      </svg>
    </motion.button>
  );
}

export default function LogoCarousel({ id, title, subtitle, items, empty }) {
  const { t } = useLang();
  const trackRef = useRef(null);
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const total = max > 4 ? Math.max(2, Math.ceil(el.scrollWidth / el.clientWidth)) : 1;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setPages(total);
    setPage(max > 4 ? Math.round((el.scrollLeft / max) * (total - 1)) : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, items.length]);

  const behavior = () => (prefersReducedMotion() ? "auto" : "smooth");
  const scrollByDir = (dir) => {
    const el = trackRef.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: behavior() });
  };
  const goToPage = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (pages - 1)) * max, behavior: behavior() });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) < 4 && !dragging) return;
    if (!dragging) setDragging(true);
    trackRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") scrollByDir(-1);
    else if (e.key === "ArrowRight") scrollByDir(1);
    else return;
    e.preventDefault();
  };

  const fade = (on) => (on ? "transparent" : "#000");
  const mask = `linear-gradient(90deg, ${fade(canPrev)} 0, #000 40px, #000 calc(100% - 40px), ${fade(canNext)} 100%)`;
  const hasControls = pages > 1;

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -80px 0px" }}>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 id={id} className="text-3xl font-extrabold tracking-tight text-navy">{title}</h2>
          <p className="mt-2 max-w-xl text-slate-600">{subtitle}</p>
        </div>
        {hasControls && (
          <div className="hidden flex-none gap-2 sm:flex">
            <Arrow dir={-1} disabled={!canPrev} onClick={() => scrollByDir(-1)} label={t("carousel.prev")} />
            <Arrow dir={1} disabled={!canNext} onClick={() => scrollByDir(1)} label={t("carousel.next")} />
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">{empty}</p>
      ) : (
        <>
          <div style={{ maskImage: mask, WebkitMaskImage: mask }} className="-my-4">
            <ul
              ref={trackRef}
              role="region"
              aria-roledescription="carousel"
              aria-labelledby={id}
              tabIndex={0}
              onScroll={update}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onPointerCancel={endDrag}
              onDragStart={(e) => e.preventDefault()}
              className={`flex gap-4 overflow-x-auto px-1 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden ${
                dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
              } select-none`}
            >
              {items.map((c) => (
                <li key={c.id} className="w-[70%] flex-none snap-start sm:w-56 lg:w-60">
                  <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal/60 hover:shadow-[0_18px_40px_-20px_rgba(11,92,168,0.4)]">
                    <div className="flex h-28 w-full items-center justify-center rounded-xl bg-slate-50 px-4 transition-colors duration-200 group-hover:bg-foam">
                      <Logo name={c.name} logoUrl={c.logoUrl} className="h-16 w-16 text-lg" imageClassName="h-16 w-full" />
                    </div>
                    <p className="line-clamp-2 min-h-10 text-center text-sm font-semibold leading-5 text-navy">{c.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {hasControls && (
            <div className="mt-6 flex items-center justify-center gap-2" role="group" aria-label={title}>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToPage(i)}
                  aria-label={t("carousel.page", { n: i + 1 })}
                  aria-current={i === page}
                  className={`h-2 rounded-full transition-[width,background-color] duration-200 ease-out ${
                    i === page ? "w-6 bg-teal" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
