import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClients } from "../context/ClientsContext";
import { supabase } from "../lib/supabase";
import { useSession } from "../lib/useSession";
import Logo from "../components/Logo";
import ClientFormModal from "../components/ClientFormModal";
import AdminLogin from "../components/AdminLogin";
import { press } from "../components/motion";

function AdminPanel() {
  const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
  const [modal, setModal] = useState(null); // null | { client: null } | { client: {...} }

  const handleSave = async (data) => {
    if (modal.client) await updateClient(modal.client, data);
    else await addClient(data);
    setModal(null);
  };

  const handleDelete = async (client) => {
    if (!window.confirm(`Hapus "${client.name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await deleteClient(client);
    } catch (err) {
      window.alert(`Gagal menghapus: ${err.message}`);
    }
  };

  const customerCount = clients.filter((c) => c.category === "Customer").length;
  const partnerCount = clients.filter((c) => c.category === "Partner").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">{customerCount} customer, {partnerCount} partner</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={() => supabase?.auth.signOut()}
            {...press}
            className="rounded-md border border-slate-300 px-4 py-2.5 font-semibold transition-colors duration-150 hover:bg-slate-100"
          >
            Keluar
          </motion.button>
          <motion.button
            onClick={() => setModal({ client: null })}
            {...press}
            className="rounded-md bg-sea px-5 py-2.5 font-semibold text-white transition-colors duration-150 hover:bg-navy"
          >
            Tambah data
          </motion.button>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Logo</th>
              <th className="px-4 py-3 font-semibold">Nama perusahaan</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">Memuat data...</td>
              </tr>
            )}
            {!loading && clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  Belum ada data. Klik "Tambah data" untuk menambah.
                </td>
              </tr>
            )}
            <AnimatePresence initial={false}>
              {clients.map((c) => (
                <motion.tr
                  key={c.id}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="transition-colors duration-150 hover:bg-slate-50"
                >
                  <td className="px-4 py-3"><Logo name={c.name} logoUrl={c.logoUrl} className="h-10 w-10" imageClassName="h-10 w-16" /></td>
                  <td className="px-4 py-3 font-semibold">{c.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        c.category === "Customer" ? "bg-sea/10 text-sea" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <motion.button
                      onClick={() => setModal({ client: c })}
                      {...press}
                      className="mr-2 rounded-md border border-slate-300 px-3 py-1.5 font-semibold transition-colors duration-150 hover:bg-slate-100"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(c)}
                      {...press}
                      className="rounded-md border border-red-300 px-3 py-1.5 font-semibold text-red-600 transition-colors duration-150 hover:bg-red-50"
                    >
                      Hapus
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modal && (
          <ClientFormModal
            key={modal.client?.id ?? "new"}
            client={modal.client}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard() {
  const session = useSession();
  if (session === undefined) return <p className="py-20 text-center text-slate-500">Memuat...</p>;
  if (!session) return <AdminLogin />;
  return <AdminPanel />;
}
