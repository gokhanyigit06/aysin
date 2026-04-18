"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, seedProjectsIfEmpty } from "@/lib/adminDb";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    seedProjectsIfEmpty().then(() =>
      getProjects().then(p => setProjectCount(p.length))
    );
  }, []);

  const cards = [
    { label: "Projeler", value: projectCount ?? "—", href: "/admin/projeler", desc: "Proje ekle, düzenle, sil" },
    { label: "Ana Sayfa", value: "✎", href: "/admin/anasayfa", desc: "Hero, hakkında, servisler" },
    { label: "Hakkımızda", value: "✎", href: "/admin/hakkimizda", desc: "Sayaçlar, ekip, ödüller" },
    { label: "FAQ", value: "✎", href: "/admin/faq", desc: "Sıkça sorulan sorular" },
    { label: "Footer", value: "✎", href: "/admin/footer", desc: "İletişim, sosyal medya" },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Aysin Creative Studio — İçerik Yönetim Paneli</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {cards.map(card => (
          <Link key={card.href} href={card.href} style={{ textDecoration: "none" }}>
            <div className="admin-card" style={{ cursor: "pointer", transition: "border-color 0.15s", minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
            >
              <div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>{card.value}</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginTop: "4px" }}>{card.label}</div>
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px" }}>{card.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: "24px" }}>
        <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
          <strong style={{ color: "#1a1a1a" }}>Başlarken:</strong> Soldan bir bölüm seçin. Projeler için proje ekleyip düzenleyebilirsiniz. Gerçek veri eklenene kadar seed projeler görünür. Firebase Storage üzerinden görseller ve videolar yüklenebilir.
        </p>
      </div>
    </div>
  );
}
