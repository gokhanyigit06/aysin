"use client";

import { useEffect, useRef, useState } from "react";
import { getContent, setContent, uploadMedia } from "@/lib/adminDb";

interface Stat { value: number; suffix: string; label: string; }
interface Award { name: string; category: string; date: string; }

export default function AdminHakkimizda() {
  const [heroVideoSrc, setHeroVideoSrc] = useState("");
  const [tagline, setTagline] = useState("");
  const [teamImageSrc, setTeamImageSrc] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [teamText, setTeamText] = useState("");
  const [stats, setStats] = useState<Stat[]>([
    { value: 3, suffix: "m+", label: "Sermaye" },
    { value: 289, suffix: "", label: "Lansman" },
    { value: 56, suffix: "", label: "Ödül" },
    { value: 97, suffix: "%", label: "Memnuniyet" },
  ]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const teamImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getContent("about").then(d => {
      if (!d) return;
      if (d.heroVideoSrc) setHeroVideoSrc(d.heroVideoSrc as string);
      if (d.tagline) setTagline(d.tagline as string);
      if (d.teamImageSrc) setTeamImageSrc(d.teamImageSrc as string);
      if (d.teamTitle) setTeamTitle(d.teamTitle as string);
      if (d.teamText) setTeamText(d.teamText as string);
      if (d.stats) setStats(d.stats as Stat[]);
      if (d.awards) setAwards(d.awards as Award[]);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await setContent("about", { heroVideoSrc, tagline, teamImageSrc, teamTitle, teamText, stats, awards });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Hakkımızda</h1>
          <p className="admin-page-sub">Hakkımızda sayfası içeriğini düzenleyin</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Hero Video */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Hero Video</h2>
        <input ref={videoRef} type="file" accept="video/*" style={{ display: "none" }}
          onChange={async e => { const f = e.target.files?.[0]; if (f) setHeroVideoSrc(await uploadMedia(f, "about")); }} />
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button className="admin-btn-ghost" onClick={() => videoRef.current?.click()}>Video Yükle</button>
          {heroVideoSrc && <span style={{ fontSize: "12px", color: "#22c55e", alignSelf: "center" }}>✓ Video var</span>}
        </div>
        <input className="admin-input" value={heroVideoSrc} onChange={e => setHeroVideoSrc(e.target.value)} placeholder="veya video URL yapıştırın..." />

        <div className="admin-field" style={{ marginTop: "16px", marginBottom: 0 }}>
          <label className="admin-label">Kampanya Metni (Tagline)</label>
          <textarea className="admin-textarea" rows={2} value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Biz Aysin® — güçlü markalar..." />
        </div>
      </div>

      {/* Stats */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Sayaçlar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: "8px", padding: "12px" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                <input className="admin-input" type="number" value={s.value} onChange={e => { const n = [...stats]; n[i] = { ...n[i], value: +e.target.value }; setStats(n); }} style={{ width: "60px" }} />
                <input className="admin-input" value={s.suffix} onChange={e => { const n = [...stats]; n[i] = { ...n[i], suffix: e.target.value }; setStats(n); }} placeholder="+%" style={{ width: "40px" }} />
              </div>
              <input className="admin-input" value={s.label} onChange={e => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; setStats(n); }} placeholder="Etiket" />
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Ekip Bölümü</h2>
        <input ref={teamImgRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={async e => { const f = e.target.files?.[0]; if (f) setTeamImageSrc(await uploadMedia(f, "about")); }} />
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button className="admin-btn-ghost" onClick={() => teamImgRef.current?.click()}>Fotoğraf Yükle</button>
          {teamImageSrc && <span style={{ fontSize: "12px", color: "#22c55e", alignSelf: "center" }}>✓ Görsel var</span>}
        </div>
        <div className="admin-field">
          <label className="admin-label">Başlık</label>
          <input className="admin-input" value={teamTitle} onChange={e => setTeamTitle(e.target.value)} placeholder="Hedeflerinize ulaşmak için..." />
        </div>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label className="admin-label">Açıklama</label>
          <textarea className="admin-textarea" rows={3} value={teamText} onChange={e => setTeamText(e.target.value)} placeholder="Küçük ama güçlü bir ekibiz..." />
        </div>
      </div>

      {/* Awards */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700 }}>Ödüller</h2>
          <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => setAwards(p => [...p, { name: "", category: "", date: "" }])}>+ Ekle</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {awards.map((a, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px 32px", gap: "8px", alignItems: "center" }}>
              <input className="admin-input" value={a.name} onChange={e => { const n = [...awards]; n[i] = { ...n[i], name: e.target.value }; setAwards(n); }} placeholder="Awwwards" />
              <input className="admin-input" value={a.category} onChange={e => { const n = [...awards]; n[i] = { ...n[i], category: e.target.value }; setAwards(n); }} placeholder="Site of the Day" />
              <input className="admin-input" value={a.date} onChange={e => { const n = [...awards]; n[i] = { ...n[i], date: e.target.value }; setAwards(n); }} placeholder="Nis 2025" />
              <button className="admin-btn-danger" onClick={() => setAwards(p => p.filter((_, idx) => idx !== i))} style={{ padding: "8px 10px" }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
