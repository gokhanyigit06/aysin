"use client";

import { useEffect, useState } from "react";
import { getContent, setContent } from "@/lib/adminDb";

interface FAQItem { q: string; a: string; }

export default function AdminFAQ() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getContent("faq").then(d => { if (d?.items) setItems(d.items); });
  }, []);

  function update(i: number, field: keyof FAQItem, val: string) {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function addItem() { setItems(p => [...p, { q: "", a: "" }]); }
  function removeItem(i: number) { setItems(p => p.filter((_, idx) => idx !== i)); }
  function move(i: number, dir: -1 | 1) {
    setItems(p => { const n = [...p]; const j = i + dir; if (j < 0 || j >= n.length) return p; [n[i], n[j]] = [n[j], n[i]]; return n; });
  }

  async function handleSave() {
    setSaving(true);
    await setContent("faq", { items });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">FAQ</h1>
          <p className="admin-page-sub">Sıkça sorulan soruları düzenleyin</p>
        </div>
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Kaydedildi" : saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
        {items.map((item, i) => (
          <div key={i} className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af" }}>{i + 1}. Soru</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button className="admin-btn-ghost" style={{ padding: "3px 8px", fontSize: "12px" }} onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button className="admin-btn-ghost" style={{ padding: "3px 8px", fontSize: "12px" }} onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
                <button className="admin-btn-danger" onClick={() => removeItem(i)}>Kaldır</button>
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Soru</label>
              <input className="admin-input" value={item.q} onChange={e => update(i, "q", e.target.value)} placeholder="Soru metni..." />
            </div>
            <div className="admin-field" style={{ marginBottom: 0 }}>
              <label className="admin-label">Cevap</label>
              <textarea className="admin-textarea" rows={3} value={item.a} onChange={e => update(i, "a", e.target.value)} placeholder="Cevap metni..." />
            </div>
          </div>
        ))}
      </div>

      <button className="admin-btn-ghost" onClick={addItem} style={{ width: "100%" }}>+ Yeni Soru Ekle</button>
    </div>
  );
}
