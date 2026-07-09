"use client";

import { useEffect, useRef, useState } from "react";
import { getContent, setContent, uploadMedia, DEFAULT_HEADER } from "@/lib/adminDb";
import type { SiteHeader } from "@/lib/adminDb";

export default function AdminSite() {
  const [header, setHeader] = useState<SiteHeader>(DEFAULT_HEADER);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getContent("site").then(d => {
      setHeader({
        ...DEFAULT_HEADER,
        ...(d || {}),
        nav: Array.isArray(d?.nav) && d.nav.length > 0 ? d.nav : DEFAULT_HEADER.nav,
        announcement: { ...DEFAULT_HEADER.announcement, ...(d?.announcement || {}) },
      });
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await setContent("site", header);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogoUpload(file: File) {
    setUploading(true);
    const url = await uploadMedia(file, "site");
    setHeader(h => ({ ...h, logoImageSrc: url }));
    setUploading(false);
  }

  const ann = header.announcement;

  return (
    <div style={{ maxWidth: "640px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">Site / Header</h1>
          <p className="admin-page-sub">Logo, menü öğeleri, duyuru barı ve iletişim</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* ─── Logo ─── */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>Logo</h2>

        <div className="admin-field">
          <label className="admin-label">Logo Türü</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className={header.logoType === "text" ? "admin-btn" : "admin-btn-ghost"}
              onClick={() => setHeader(h => ({ ...h, logoType: "text" }))}
              style={{ flex: 1 }}
            >
              Metin
            </button>
            <button
              type="button"
              className={header.logoType === "image" ? "admin-btn" : "admin-btn-ghost"}
              onClick={() => setHeader(h => ({ ...h, logoType: "image" }))}
              style={{ flex: 1 }}
            >
              Görsel
            </button>
          </div>
        </div>

        {header.logoType === "text" ? (
          <div className="admin-field" style={{ marginBottom: 0 }}>
            <label className="admin-label">Logo Metni</label>
            <input
              className="admin-input"
              value={header.logoText}
              onChange={e => setHeader(h => ({ ...h, logoText: e.target.value }))}
              placeholder="Ayşın"
            />
          </div>
        ) : (
          <div className="admin-field" style={{ marginBottom: 0 }}>
            <label className="admin-label">Logo Görseli</label>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }}
            />
            {header.logoImageSrc ? (
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={header.logoImageSrc} alt="logo" style={{ height: "48px", display: "block", background: "#111", padding: "6px 10px", borderRadius: "8px" }} />
                <button
                  type="button"
                  className="admin-btn-danger"
                  onClick={() => setHeader(h => ({ ...h, logoImageSrc: "" }))}
                >
                  Kaldır
                </button>
              </div>
            ) : (
              <div style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "10px" }}>Henüz görsel yüklenmedi</div>
            )}
            <button type="button" className="admin-btn-ghost" onClick={() => logoRef.current?.click()} disabled={uploading}>
              {uploading ? "Yükleniyor..." : "Görsel Yükle"}
            </button>
          </div>
        )}
      </div>

      {/* ─── Menü Öğeleri ─── */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>Menü Öğeleri</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {header.nav.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "10px", alignItems: "center" }}>
              <input
                className="admin-input"
                value={item.label}
                onChange={e => setHeader(h => { const nav = [...h.nav]; nav[i] = { ...nav[i], label: e.target.value }; return { ...h, nav }; })}
                placeholder="Etiket"
              />
              <input
                className="admin-input"
                value={item.href}
                onChange={e => setHeader(h => { const nav = [...h.nav]; nav[i] = { ...nav[i], href: e.target.value }; return { ...h, nav }; })}
                placeholder="/link"
              />
              <button
                type="button"
                onClick={() => setHeader(h => ({ ...h, nav: h.nav.filter((_, idx) => idx !== i) }))}
                aria-label="Kaldır"
                style={{ border: "1px solid #fecaca", background: "transparent", color: "#ef4444", borderRadius: "8px", cursor: "pointer", height: "40px", fontSize: "16px" }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="admin-btn-ghost"
          onClick={() => setHeader(h => ({ ...h, nav: [...h.nav, { label: "", href: "/" }] }))}
          style={{ marginTop: "12px", fontSize: "12px" }}
        >
          + Menü Öğesi Ekle
        </button>
      </div>

      {/* ─── Duyuru Barı ─── */}
      <div className="admin-card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>Duyuru Barı</h2>

        <div className="admin-field">
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#1a1a1a" }}>
            <input
              type="checkbox"
              checked={ann.enabled}
              onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, enabled: e.target.checked } }))}
            />
            Duyuru barını göster
          </label>
        </div>

        <div className="admin-field">
          <label className="admin-label">Metin</label>
          <input
            className="admin-input"
            value={ann.text}
            onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, text: e.target.value } }))}
            placeholder="AGENCY OF THE YEAR AWARD"
          />
        </div>

        <div className="admin-field">
          <label className="admin-label">Link (href)</label>
          <input
            className="admin-input"
            value={ann.href}
            onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, href: e.target.value } }))}
            placeholder="#"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="admin-field" style={{ marginBottom: 0 }}>
            <label className="admin-label">Arkaplan Rengi</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={ann.bgColor}
                onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, bgColor: e.target.value } }))}
                style={{ width: "44px", height: "40px", border: "1px solid #e5e5e5", borderRadius: "8px", background: "#fff", cursor: "pointer", padding: "2px" }}
              />
              <input
                className="admin-input"
                value={ann.bgColor}
                onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, bgColor: e.target.value } }))}
              />
            </div>
          </div>
          <div className="admin-field" style={{ marginBottom: 0 }}>
            <label className="admin-label">Metin Rengi</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={ann.textColor}
                onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, textColor: e.target.value } }))}
                style={{ width: "44px", height: "40px", border: "1px solid #e5e5e5", borderRadius: "8px", background: "#fff", cursor: "pointer", padding: "2px" }}
              />
              <input
                className="admin-input"
                value={ann.textColor}
                onChange={e => setHeader(h => ({ ...h, announcement: { ...h.announcement, textColor: e.target.value } }))}
              />
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ marginTop: "20px" }}>
          <label className="admin-label">Önizleme</label>
          <div
            style={{
              background: ann.bgColor,
              color: ann.textColor,
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              opacity: ann.enabled ? 1 : 0.4,
            }}
          >
            {ann.text || "Duyuru metni"}
          </div>
        </div>
      </div>

      {/* ─── İletişim ─── */}
      <div className="admin-card">
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px" }}>İletişim</h2>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label className="admin-label">İletişim E-postası</label>
          <input
            className="admin-input"
            value={header.email}
            onChange={e => setHeader(h => ({ ...h, email: e.target.value }))}
            placeholder="info@aysin.com"
          />
        </div>
      </div>
    </div>
  );
}
