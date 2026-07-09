"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "./admin.css";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/site", label: "Site / Header", icon: "▤" },
  { href: "/admin/projeler", label: "Projeler", icon: "▦" },
  { href: "/admin/anasayfa", label: "Ana Sayfa", icon: "⌂" },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: "◉" },
  { href: "/admin/faq", label: "FAQ", icon: "?" },
  { href: "/admin/footer", label: "Footer", icon: "▬" },
];

// ─── LOGIN SCREEN ───────────────────────────────────────
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string })?.code || "";
      if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
        setError("E-posta veya şifre hatalı.");
      } else if (code.includes("too-many-requests")) {
        setError("Çok fazla deneme. Lütfen biraz bekleyin.");
      } else if (code.includes("operation-not-allowed") || code.includes("configuration-not-found")) {
        setError("Firebase Authentication henüz etkin değil.");
      } else {
        setError("Giriş yapılamadı. Tekrar deneyin.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", padding: "24px" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "360px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "16px", padding: "32px 28px" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.04em", color: "#1a1a1a" }}>A</div>
          <p style={{ fontSize: "10px", color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>Admin Panel</p>
        </div>

        <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Giriş yap</h1>
        <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>Yönetim paneline erişmek için giriş yapın.</p>

        <div className="admin-field">
          <label className="admin-label">E-posta</label>
          <input className="admin-input" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@aysin.com" required />
        </div>

        <div className="admin-field">
          <label className="admin-label">Şifre</label>
          <input className="admin-input" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>

        {error && (
          <p style={{ fontSize: "12px", color: "#dc2626", marginBottom: "12px" }}>{error}</p>
        )}

        <button type="submit" className="admin-btn" style={{ width: "100%", marginTop: "4px" }} disabled={busy}>
          {busy ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", color: "#9ca3af", fontSize: "13px" }}>
        Yükleniyor…
      </div>
    );
  }

  if (!user) return <AdminLogin />;

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
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e5e5", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user.email}
          </span>
          <Link href="/" target="_blank" style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>
            ↗ Siteyi görüntüle
          </Link>
          <button
            onClick={() => signOut(auth)}
            style={{ fontSize: "12px", color: "#dc2626", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
          >
            ⇥ Çıkış yap
          </button>
        </div>
      </aside>

      {/* ─── Content ─── */}
      <main style={{ marginLeft: "220px", flex: 1, padding: "40px 48px", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
