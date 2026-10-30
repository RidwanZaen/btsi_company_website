import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LOGO_BUCKET, supabase } from "../lib/supabase";

const ClientsContext = createContext(null);

const fromRow = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  logoUrl: r.logo_url ?? "",
  logoPath: r.logo_path ?? null,
});

async function uploadLogo(file) {
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(LOGO_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw error;
  const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

const removeFile = (path) => (path ? supabase.storage.from(LOGO_BUCKET).remove([path]) : Promise.resolve());

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Isi file .env lalu restart npm run dev.");
      setLoading(false);
      return;
    }
    let active = true;
    supabase
      .from("clients")
      .select("*")
      .order("seq")
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setError(error.message);
        else setClients(data.map(fromRow));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const addClient = useCallback(async ({ name, category, file }) => {
    const logo = file ? await uploadLogo(file) : { url: "", path: null };
    const { data, error } = await supabase
      .from("clients")
      .insert({ name, category, logo_url: logo.url, logo_path: logo.path })
      .select()
      .single();
    if (error) {
      await removeFile(logo.path);
      throw error;
    }
    setClients((prev) => [...prev, fromRow(data)]);
  }, []);

  const updateClient = useCallback(async (client, { name, category, file, removeLogo }) => {
    const patch = { name, category };
    let uploaded = null;
    if (file) {
      uploaded = await uploadLogo(file);
      patch.logo_url = uploaded.url;
      patch.logo_path = uploaded.path;
    } else if (removeLogo) {
      patch.logo_url = "";
      patch.logo_path = null;
    }
    const { data, error } = await supabase.from("clients").update(patch).eq("id", client.id).select().single();
    if (error) {
      if (uploaded) await removeFile(uploaded.path);
      throw error;
    }
    if ((file || removeLogo) && client.logoPath) await removeFile(client.logoPath);
    setClients((prev) => prev.map((c) => (c.id === client.id ? fromRow(data) : c)));
  }, []);

  const deleteClient = useCallback(async (client) => {
    const { error } = await supabase.from("clients").delete().eq("id", client.id);
    if (error) throw error;
    await removeFile(client.logoPath);
    setClients((prev) => prev.filter((c) => c.id !== client.id));
  }, []);

  const value = useMemo(
    () => ({ clients, loading, error, addClient, updateClient, deleteClient }),
    [clients, loading, error, addClient, updateClient, deleteClient]
  );

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("useClients harus dipakai di dalam ClientsProvider");
  return ctx;
}
