"use client";

import { useEffect, useRef, useState } from "react";
import { getContent, setContent, uploadMedia } from "@/lib/adminDb";

export default function AdminFooter() {
  const [email, setEmail] = useState("info@aysin.com");
  const [socials, setSocials] = useState([
    { label: "BE", url: "#" },
    { label: "DR", url: "#" },
    { label: "X", url: "#" },
  ]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoSrc, setLogoSrc] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getContent("footer").then(d => {
      if (!d) return;
      if (d.email) setEmail(d.email as string);
      if (d.socials) setSocials(d.socials as typeof socials);
      if (d.logoSrc) setLogoSrc(d.logoSrc as string);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await setContent("footer", { email, socials, logoSrc });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogoUpload(file: File) {
    const url = await uploadMedia(file, "brand");
    setLogoSrc(url);
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Footer</h1>
          <p className="admin-page-sub">İletişim bilgileri ve sosyal medya linkleri</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>İletişim</h2>
        <div className="admin-field">
          <label className="admin-label">E-posta Adresi</label>
          <input className="admin-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="info@aysin.com" />
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>Sosyal Medya</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {socials.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "10px", alignItems: "center" }}>
              <input className="admin-input" value={s.label} onChange={e => { const n = [...socials]; n[i] = { ...n[i], label: e.target.value }; setSocials(n); }} placeholder="BE" />
              <input className="admin-input" value={s.url} onChange={e => { const n = [...socials]; n[i] = { ...n[i], url: e.target.value }; setSocials(n); }} placeholder="https://behance.net/..." />
            </div>
          ))}
        </div>
        <button className="admin-btn-ghost" onClick={() => setSocials(p => [...p, { label: "", url: "" }])} style={{ marginTop: "10px", fontSize: "12px" }}>+ Ekle</button>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>Logo (İsteğe Bağlı)</h2>
        <input ref={logoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} />
        {logoSrc
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={logoSrc} alt="logo" style={{ height: "48px", marginBottom: "10px", display: "block" }} />
          : <div style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "10px" }}>Şu an "A" harfi kullanılıyor</div>
        }
        <button className="admin-btn-ghost" onClick={() => logoRef.current?.click()}>Logo Yükle</button>
      </div>
    </div>
  );
}
