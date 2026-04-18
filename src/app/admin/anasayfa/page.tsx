"use client";

import { useEffect, useRef, useState } from "react";
import { getContent, setContent, uploadMedia } from "@/lib/adminDb";

export default function AdminAnasayfa() {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);
  const [heroCaption, setHeroCaption] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroSlides, setHeroSlides] = useState<{ src: string; mediaType: "image" | "video" }[]>([]);
  const slideRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getContent("home").then(d => {
      if (!d) return;
      if (d.marqueeItems) setMarqueeItems(d.marqueeItems as string[]);
      if (d.heroCaption) setHeroCaption(d.heroCaption as string);
      if (d.aboutText) setAboutText(d.aboutText as string);
      if (d.heroSlides) setHeroSlides(d.heroSlides as typeof heroSlides);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await setContent("home", { marqueeItems, heroCaption, aboutText, heroSlides });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addSlide(file: File) {
    const url = await uploadMedia(file, "home");
    const mt: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
    setHeroSlides(p => [...p, { src: url, mediaType: mt }]);
  }

  return (
    <div style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Ana Sayfa</h1>
          <p className="admin-page-sub">Ana sayfa içeriğini düzenleyin</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Hero Slides */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700 }}>Hero Slider Görselleri</h2>
          <div>
            <input ref={slideRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) addSlide(f); }} />
            <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => slideRef.current?.click()}>+ Görsel / Video Ekle</button>
          </div>
        </div>

        {heroSlides.length === 0 ? (
          <div style={{ padding: "24px", textAlign: "center", color: "#9ca3af", fontSize: "13px", border: "2px dashed #e5e5e5", borderRadius: "8px" }}>
            Henüz slayt yok — görsel veya video ekleyin
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {heroSlides.map((s, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "16/9", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
                {s.mediaType === "video"
                  ? <video src={s.src} muted autoPlay loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  // eslint-disable-next-line @next/next/no-img-element
                  : <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                }
                <button onClick={() => setHeroSlides(p => p.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "4px", padding: "2px 6px", fontSize: "11px", cursor: "pointer" }}>×</button>
              </div>
            ))}
          </div>
        )}

        <div className="admin-field" style={{ marginTop: "16px", marginBottom: 0 }}>
          <label className="admin-label">Hero Alt Yazı</label>
          <input className="admin-input" value={heroCaption} onChange={e => setHeroCaption(e.target.value)} placeholder="Yaratıcı stüdyo..." />
        </div>
      </div>

      {/* About Text */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Hakkında Metni</h2>
        <textarea className="admin-textarea" rows={4} value={aboutText} onChange={e => setAboutText(e.target.value)} placeholder="Güçlü markalar ve olağanüstü deneyimler..." />
      </div>

      {/* Marquee */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700 }}>Marquee Öğeleri</h2>
          <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => setMarqueeItems(p => [...p, ""])}>+ Ekle</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {marqueeItems.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px" }}>
              <input className="admin-input" value={item} onChange={e => { const n = [...marqueeItems]; n[i] = e.target.value; setMarqueeItems(n); }} placeholder="Marka Kimliği" />
              <button className="admin-btn-danger" onClick={() => setMarqueeItems(p => p.filter((_, idx) => idx !== i))}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
