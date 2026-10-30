import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { press } from "./motion";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 transition-[border-color,box-shadow] duration-150 focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/30";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Isi file .env lalu restart npm run dev.");
      return;
    }
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email atau kata sandi salah.");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl justify-center px-6 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-navy">Masuk admin</h1>
        <p className="mb-6 text-sm text-slate-600">Hanya admin BTSI yang dapat mengelola data klien dan mitra.</p>

        <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
        <input id="email" type="email" autoComplete="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mb-4`} />

        <label htmlFor="password" className="mb-1 block text-sm font-semibold">Kata sandi</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mb-4`} />

        {error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}

        <motion.button
          type="submit"
          disabled={busy}
          {...press}
          className="w-full rounded-md bg-sea px-4 py-2.5 font-semibold text-white transition-colors duration-150 hover:bg-navy disabled:opacity-60"
        >
          {busy ? "Masuk..." : "Masuk"}
        </motion.button>
      </form>
    </div>
  );
}
