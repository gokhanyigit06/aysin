"use client";

import { useEffect, useRef, useState } from "react";
import {
  getContent,
  setContent,
  uploadMedia,
  DEFAULT_HERO,
  DEFAULT_ABOUT_TEXT,
  DEFAULT_SERVICES,
  DEFAULT_SHOWREEL,
  DEFAULT_MARQUEE,
  type HeroContent,
  type ServiceItem,
  type ShowreelContent,
} from "@/lib/adminDb";

export default function AdminAnasayfa() {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);
  const [aboutText, setAboutText] = useState<string>(DEFAULT_ABOUT_TEXT);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [showreel, setShowreel] = useState<ShowreelContent>(DEFAULT_SHOWREEL);
  const [marqueeItems, setMarqueeItems] = useState<string[]>(DEFAULT_MARQUEE);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const heroVideoRef = useRef<HTMLInputElement>(null);
  const heroImageRef = useRef<HTMLInputElement>(null);
  const showreelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getContent("home").then(d => {
      if (!d) return;
      setHero({ ...DEFAULT_HERO, ...(d.hero ? (d.hero as Partial<HeroContent>) : {}) });
      setAboutText(typeof d.aboutText === "string" && d.aboutText ? (d.aboutText as string) : DEFAULT_ABOUT_TEXT);
      setServices(Array.isArray(d.services) && d.services.length > 0 ? (d.services as ServiceItem[]) : DEFAULT_SERVICES);
      setShowreel({ ...DEFAULT_SHOWREEL, ...(d.showreel ? (d.showreel as Partial<ShowreelContent>) : {}) });
      setMarqueeItems(Array.isArray(d.marqueeItems) && d.marqueeItems.length > 0 ? (d.marqueeItems as string[]) : DEFAULT_MARQUEE);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await setContent("home", { hero, aboutText, services, showreel, marqueeItems });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateHero<K extends keyof HeroContent>(key: K, value: HeroContent[K]) {
    setHero(p => ({ ...p, [key]: value }));
  }

  async function uploadHeroVideo(file: File) {
    const url = await uploadMedia(file, "hero");
    updateHero("backgroundVideoSrc", url);
  }

  async function uploadHeroImage(file: File) {
    const url = await uploadMedia(file, "hero");
    updateHero("backgroundImageSrc", url);
  }

  async function uploadShowreelVideo(file: File) {
    const url = await uploadMedia(file, "showreel");
    setShowreel(p => ({ ...p, videoSrc: url }));
  }

  function updateService(i: number, key: keyof ServiceItem, value: string) {
    setServices(p => p.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  }

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Ana Sayfa</h1>
          <p className="admin-page-sub">Ana sayfa içeriğini düzenleyin</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* HERO */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Hero</h2>

        <div className="admin-field">
          <label className="admin-label">Arka plan türü</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={hero.backgroundType === "image" ? "admin-btn" : "admin-btn-ghost"}
              style={{ fontSize: "12px" }}
              onClick={() => updateHero("backgroundType", "image")}
            >
              Görsel
            </button>
            <button
              type="button"
              className={hero.backgroundType === "video" ? "admin-btn" : "admin-btn-ghost"}
              style={{ fontSize: "12px" }}
              onClick={() => updateHero("backgroundType", "video")}
            >
              Video
            </button>
          </div>
        </div>

        {/* Video upload */}
        <div className="admin-field">
          <label className="admin-label">Arka plan videosu</label>
          <input
            ref={heroVideoRef}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) uploadHeroVideo(f); }}
          />
          {hero.backgroundVideoSrc ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <video src={hero.backgroundVideoSrc} muted autoPlay loop playsInline style={{ width: "140px", aspectRatio: "16/9", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e5e5" }} />
              <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => heroVideoRef.current?.click()}>Değiştir</button>
              <button className="admin-btn-danger" onClick={() => updateHero("backgroundVideoSrc", "")}>Kaldır</button>
            </div>
          ) : (
            <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => heroVideoRef.current?.click()}>Video Yükle</button>
          )}
        </div>

        {/* Image upload */}
        <div className="admin-field">
          <label className="admin-label">Arka plan görseli</label>
          <input
            ref={heroImageRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) uploadHeroImage(f); }}
          />
          {hero.backgroundImageSrc ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.backgroundImageSrc} alt="" style={{ width: "140px", aspectRatio: "16/9", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e5e5" }} />
              <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => heroImageRef.current?.click()}>Değiştir</button>
              <button className="admin-btn-danger" onClick={() => updateHero("backgroundImageSrc", "")}>Kaldır</button>
            </div>
          ) : (
            <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => heroImageRef.current?.click()}>Görsel Yükle</button>
          )}
        </div>

        <div className="admin-field">
          <label className="admin-label">Wordmark (logo yazısı)</label>
          <input className="admin-input" value={hero.wordmark} onChange={e => updateHero("wordmark", e.target.value)} placeholder="Ayşın" />
        </div>

        <div className="admin-field">
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} className="admin-label">
            <input type="checkbox" checked={hero.showRegistered} onChange={e => updateHero("showRegistered", e.target.checked)} />
            ® göster
          </label>
        </div>

        <div className="admin-field">
          <label className="admin-label">Alt yazı</label>
          <input className="admin-input" value={hero.caption} onChange={e => updateHero("caption", e.target.value)} placeholder="Creative studio based in İstanbul" />
        </div>

        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label className="admin-label">Karartma (overlay): {hero.overlayOpacity.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={0.7}
            step={0.05}
            value={hero.overlayOpacity}
            onChange={e => updateHero("overlayOpacity", parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* ABOUT TEXT */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Hakkında Metni</h2>
        <textarea className="admin-textarea" rows={4} value={aboutText} onChange={e => setAboutText(e.target.value)} placeholder="Güçlü markalar ve olağanüstü deneyimler..." />
      </div>

      {/* SERVICES */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700 }}>Servisler</h2>
          <button
            className="admin-btn-ghost"
            style={{ fontSize: "12px" }}
            onClick={() => setServices(p => [...p, { num: "", label: "", desc: "", bg: "#DDD6F3" }])}
          >
            + Servis Ekle
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {services.map((s, i) => (
            <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: "8px", padding: "12px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                <input className="admin-input" style={{ width: "80px" }} value={s.num} onChange={e => updateService(i, "num", e.target.value)} placeholder="001" />
                <input className="admin-input" value={s.label} onChange={e => updateService(i, "label", e.target.value)} placeholder="Branding" />
                <input type="color" value={s.bg || "#DDD6F3"} onChange={e => updateService(i, "bg", e.target.value)} style={{ width: "40px", height: "38px", border: "1px solid #e5e5e5", borderRadius: "8px", cursor: "pointer", padding: "2px", flexShrink: 0 }} />
                <button className="admin-btn-danger" onClick={() => setServices(p => p.filter((_, idx) => idx !== i))}>×</button>
              </div>
              <textarea className="admin-textarea" rows={2} value={s.desc} onChange={e => updateService(i, "desc", e.target.value)} placeholder="Açıklama" />
            </div>
          ))}
        </div>
      </div>

      {/* SHOWREEL */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Showreel</h2>
        <div className="admin-field">
          <label className="admin-label">Başlık</label>
          <textarea className="admin-textarea" rows={3} value={showreel.headline} onChange={e => setShowreel(p => ({ ...p, headline: e.target.value }))} placeholder="Ayşın® cesur markalar..." />
        </div>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label className="admin-label">Video</label>
          <input
            ref={showreelRef}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) uploadShowreelVideo(f); }}
          />
          {showreel.videoSrc ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <video src={showreel.videoSrc} muted autoPlay loop playsInline style={{ width: "140px", aspectRatio: "16/9", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e5e5" }} />
              <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => showreelRef.current?.click()}>Değiştir</button>
              <button className="admin-btn-danger" onClick={() => setShowreel(p => ({ ...p, videoSrc: "" }))}>Kaldır</button>
            </div>
          ) : (
            <button className="admin-btn-ghost" style={{ fontSize: "12px" }} onClick={() => showreelRef.current?.click()}>Video Yükle</button>
          )}
        </div>
      </div>

      {/* MARQUEE */}
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
