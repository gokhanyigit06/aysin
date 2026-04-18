"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  { label: "Projects", href: "/projeler" },
  { label: "About", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/iletisim" },
];

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: "#EBEBF0" }}>
      {/* Top bar — Logo + Socials */}
      <div
        style={{ paddingLeft: "120px", paddingRight: "120px", paddingTop: "40px", paddingBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <span className={inter.className} style={{ fontWeight: 900, fontSize: "40px", letterSpacing: "-0.04em", color: "#1a1a1a", lineHeight: 1 }}>
          A
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {["BE", "DR", "X"].map((s, i, arr) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href="#" className={inter.className} style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", letterSpacing: "0.1em", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
              >{s}</a>
              {i < arr.length - 1 && <span style={{ opacity: 0.3, fontSize: "13px" }}>/</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Main — two columns */}
      <div
        style={{ paddingLeft: "120px", paddingRight: "120px", paddingTop: "60px", paddingBottom: "100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}
      >
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className={inter.className} style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 500, lineHeight: 1.45, color: "#1a1a1a", letterSpacing: "-0.01em", maxWidth: "420px" }}>
            We&apos;d love to hear from you —
            <span style={{ color: "#9ca3af" }}> whether you have a project in mind, or just want to say hi.</span>
          </p>
          <div style={{ marginTop: "80px" }}>
            <a href="mailto:info@aysin.com" className={inter.className} style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              info@aysin.com
            </a>
            <div style={{ width: "32px", height: "2px", background: "#1a1a1a", marginTop: "12px" }} />
          </div>
        </div>

        {/* Right — Newsletter */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 className={inter.className} style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Join our<br />newsletter
          </h3>
          <p className={inter.className} style={{ fontSize: "13px", color: "#9ca3af", marginTop: "12px", marginBottom: "40px", letterSpacing: "0.02em" }}>
            Daily dose of design trends by the team.
          </p>
          <input type="text" placeholder="Name" className={inter.className} style={{ width: "100%", background: "transparent", fontSize: "14px", color: "#1a1a1a", outline: "none", borderBottom: "1px solid #c4c4cc", paddingTop: "14px", paddingBottom: "14px" }} />
          <input type="email" placeholder="Email" className={inter.className} style={{ width: "100%", background: "transparent", fontSize: "14px", color: "#1a1a1a", outline: "none", borderBottom: "1px solid #c4c4cc", paddingTop: "14px", paddingBottom: "14px", marginTop: "4px" }} />
          <button className={inter.className} style={{ marginTop: "20px", width: "100%", background: "#1a1a1a", color: "white", fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", paddingTop: "18px", paddingBottom: "18px", borderRadius: "8px", border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Send
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ paddingLeft: "120px", paddingRight: "120px", paddingTop: "28px", paddingBottom: "28px", borderTop: "1px solid #d4d4de", display: "flex", alignItems: "center", gap: "32px" }}>
        {navLinks.map(item => (
          <a key={item.label} href={item.href} className={inter.className} style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
