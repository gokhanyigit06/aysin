"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/projeler", label: "Projeler", icon: "▦" },
  { href: "/admin/anasayfa", label: "Ana Sayfa", icon: "⌂" },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: "◉" },
  { href: "/admin/faq", label: "FAQ", icon: "?" },
  { href: "/admin/footer", label: "Footer", icon: "▬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafafa", color: "#1a1a1a" }}>
      {/* ─── Sidebar ─── */}
      <aside style={{
        width: "220px", flexShrink: 0,
        background: "#fff", borderRight: "1px solid #e5e5e5",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #e5e5e5" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.04em", color: "#1a1a1a" }}>A</span>
          </Link>
          <p style={{ fontSize: "10px", color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {nav.map(item => {
            const active = path === item.href || (item.href !== "/admin" && path.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 12px", borderRadius: "8px", marginBottom: "2px",
                    background: active ? "#1a1a1a" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "13px", color: active ? "white" : "#6b7280", width: "16px", textAlign: "center" }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: active ? "white" : "#1a1a1a" }}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e5e5" }}>
          <Link href="/" target="_blank" style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>
            ↗ Siteyi görüntüle
          </Link>
        </div>
      </aside>

      {/* ─── Content ─── */}
      <main style={{ marginLeft: "220px", flex: 1, padding: "40px 48px", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
