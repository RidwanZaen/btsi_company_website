import { useState } from "react";

function getInitials(name) {
  return name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Menampilkan logo. Jika logoUrl kosong atau gagal dimuat, tampil inisial.
 * layout="row" | "col": saat fallback, tampilkan juga nama di samping/bawah inisial.
 */
export default function Logo({ name, logoUrl, className = "h-14 w-14", imageClassName, layout }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const showImage = logoUrl && failedUrl !== logoUrl;

  if (showImage) {
    return (
      <img
        src={logoUrl}
        alt={name}
        onError={() => setFailedUrl(logoUrl)}
        className={`${imageClassName ?? className} object-contain`}
      />
    );
  }

  const badge = (
    <div
      role="img"
      aria-label={name}
      className={`${className} flex flex-none items-center justify-center rounded-lg bg-foam text-sm font-bold text-sea`}
    >
      {getInitials(name) || "?"}
    </div>
  );

  if (!layout) return badge;

  return (
    <div className={`flex items-center gap-3 ${layout === "col" ? "flex-col text-center" : ""}`}>
      {badge}
      <span className="text-sm font-semibold leading-tight text-slate-700">{name}</span>
    </div>
  );
}
