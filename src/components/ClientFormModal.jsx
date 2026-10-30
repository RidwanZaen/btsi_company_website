import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/initialData";
import Logo from "./Logo";
import { EASE, press } from "./motion";

const MAX_SIZE = 2 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 transition-[border-color,box-shadow] duration-150 focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/30";

// client = null -> mode tambah, client = {...} -> mode ubah
// onSave harus mengembalikan Promise; modal ditutup oleh parent saat berhasil.
export default function ClientFormModal({ client, onSave, onClose }) {
  const [form, setForm] = useState({
    name: client?.name ?? "",
    category: client?.category ?? CATEGORIES[0],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !saving && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, saving]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleFile = (e) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;
    if (!TYPES.includes(picked.type)) return setError("Format harus PNG, JPG, WEBP, atau SVG.");
    if (picked.size > MAX_SIZE) return setError("Ukuran gambar maksimal 2 MB.");
    setError("");
    setFile(picked);
    setRemoveLogo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return setError("Nama perusahaan wajib diisi.");
    setSaving(true);
    setError("");
    try {
      await onSave({ name, category: form.category, file, removeLogo });
    } catch (err) {
      setError(err?.message || "Gagal menyimpan. Coba lagi.");
      setSaving(false);
    }
  };

  const shownUrl = preview ?? (removeLogo ? "" : client?.logoUrl ?? "");
  const hasLogo = !!shownUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <motion.form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 id="modal-title" className="mb-5 text-xl font-bold text-navy">
          {client ? "Edit data" : "Tambah data"}
        </h2>

        <label htmlFor="name" className="mb-1 block text-sm font-semibold">Nama</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} autoFocus aria-invalid={!!error} className={`${inputClass} mb-4`} />

        <label htmlFor="category" className="mb-1 block text-sm font-semibold">Kategori</label>
        <select id="category" name="category" value={form.category} onChange={handleChange} className={`${inputClass} mb-4`}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span className="mb-1 block text-sm font-semibold">Logo</span>
        <div className="flex items-center gap-4 rounded-lg border border-dashed border-slate-300 p-3">
          <div className="flex h-16 w-24 flex-none items-center justify-center rounded-md bg-slate-50">
            <Logo name={form.name || "?"} logoUrl={shownUrl} className="h-12 w-12" imageClassName="h-12 w-20" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold transition-colors duration-150 hover:bg-slate-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal">
                {hasLogo ? "Ganti gambar" : "Pilih gambar"}
                <input type="file" accept={TYPES.join(",")} onChange={handleFile} className="sr-only" />
              </label>
              {hasLogo && (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setRemoveLogo(true);
                  }}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors duration-150 hover:bg-red-50"
                >
                  Hapus
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">PNG, JPG, WEBP, atau SVG. Maks 2 MB. Jika kosong, tampil inisial.</p>
          </div>
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <motion.button
            type="button"
            onClick={onClose}
            disabled={saving}
            {...press}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold transition-colors duration-150 hover:bg-slate-50 disabled:opacity-60"
          >
            Batal
          </motion.button>
          <motion.button
            type="submit"
            disabled={saving}
            {...press}
            className="rounded-md bg-sea px-4 py-2 font-semibold text-white transition-colors duration-150 hover:bg-navy disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : client ? "Simpan perubahan" : "Tambah"}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
