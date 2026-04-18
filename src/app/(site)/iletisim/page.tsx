"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import FAQ from "@/components/FAQ";

const inter = Inter({ subsets: ["latin"] });

export default function IletisimPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Firebase / email integration
    setSent(true);
  }

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ─── HERO ─── */}
      <section className="px-6 md:px-[120px]" style={{ paddingTop: "120px", paddingBottom: "0" }}>
        {/* Top row: label left, socials right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <p className={inter.className} style={{ fontSize: "12px", color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            İletişime geç
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["BE", "DR", "X"].map((s, i, arr) => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <a href="#" className={inter.className} style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", letterSpacing: "0.1em", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1a1a1a")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
                >{s}</a>
                {i < arr.length - 1 && <span style={{ color: "#d1d5db", fontSize: "12px" }}>/</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Big heading */}
        <h1 className={inter.className} style={{
          fontSize: "clamp(40px, 6vw, 80px)",
          fontWeight: 600,
          color: "#1a1a1a",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: "780px",
          marginBottom: "48px",
        }}>
          Aklınızda bir proje mi var? Konuşalım ve hayata geçirelim.
        </h1>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e5e5e5", marginBottom: "60px" }} />

        {/* Two columns: email left, form right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20" style={{ paddingBottom: "80px" }}>

          {/* Left — email + info */}
          <div>
            <a href="mailto:info@aysin.com" className={inter.className} style={{
              display: "block",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 600,
              color: "#1a1a1a",
              textDecoration: "none",
              marginBottom: "10px",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              info@aysin.com
            </a>
            <div style={{ width: "32px", height: "2px", background: "#1a1a1a" }} />

            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <p className={inter.className} style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                Türkiye &amp; uluslararası projeler için
                haftanın her günü yanınızdayız.
              </p>
              <p className={inter.className} style={{ fontSize: "14px", color: "#9ca3af" }}>
                Yanıt süresi: 24 saat
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <p className={inter.className} style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "28px", letterSpacing: "-0.01em" }}>
              Mesaj gönder
            </p>

            {sent ? (
              <div style={{ padding: "32px", background: "#f9f9f9", borderRadius: "12px", textAlign: "center" }}>
                <p className={inter.className} style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a" }}>
                  ✓ Mesajınız iletildi — en kısa sürede döneceğiz!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {/* Name */}
                <div style={{ marginBottom: "16px" }}>
                  <label className={inter.className} style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ad Soyad"
                    className={inter.className}
                    style={{
                      width: "100%", padding: "14px 16px", fontSize: "14px",
                      border: "1px solid #e5e5e5", borderRadius: "10px",
                      outline: "none", background: "#fff", color: "#1a1a1a",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label className={inter.className} style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ornek@mail.com"
                    className={inter.className}
                    style={{
                      width: "100%", padding: "14px 16px", fontSize: "14px",
                      border: "1px solid #e5e5e5", borderRadius: "10px",
                      outline: "none", background: "#fff", color: "#1a1a1a",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label className={inter.className} style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Projenizin detaylarını paylaşın..."
                    className={inter.className}
                    style={{
                      width: "100%", padding: "14px 16px", fontSize: "14px",
                      border: "1px solid #e5e5e5", borderRadius: "10px",
                      outline: "none", background: "#fff", color: "#1a1a1a",
                      resize: "vertical", transition: "border-color 0.2s",
                      boxSizing: "border-box", fontFamily: "inherit",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
                  />
                </div>

                <button
                  type="submit"
                  className={inter.className}
                  style={{
                    width: "100%", padding: "18px", background: "#1a1a1a",
                    color: "white", fontSize: "13px", fontWeight: 600,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    border: "none", borderRadius: "10px", cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <FAQ />

    </main>
  );
}
