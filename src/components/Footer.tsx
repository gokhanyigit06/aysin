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
      <div className="flex justify-between items-center px-6 md:px-[120px]" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
        <span className={inter.className} style={{ fontWeight: 900, fontSize: "36px", letterSpacing: "-0.04em", color: "#1a1a1a", lineHeight: 1 }}>
          A
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {["BE", "DR", "X"].map((s, i, arr) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a href="#" className={inter.className} style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", letterSpacing: "0.1em", textDecoration: "none", opacity: 0.7 }}>{s}</a>
              {i < arr.length - 1 && <span style={{ opacity: 0.3, fontSize: "13px" }}>/</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Main — stacks on mobile */}
      <div className="px-6 md:px-[120px]" style={{ paddingTop: "48px", paddingBottom: "72px", display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
        {/* grid-cols-2 on md+ via className */}
        <style>{`@media(min-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}`}</style>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "40px" }}>
            <p className={inter.className} style={{ fontSize: "clamp(16px, 2.2vw, 24px)", fontWeight: 500, lineHeight: 1.5, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
              We&apos;d love to hear from you —
              <span style={{ color: "#9ca3af" }}> whether you have a project in mind, or just want to say hi.</span>
            </p>
            <div>
              <a href="mailto:info@aysin.com" className={inter.className} style={{ fontSize: "clamp(15px, 2vw, 22px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em", textDecoration: "none" }}>
                info@aysin.com
              </a>
              <div style={{ width: "32px", height: "2px", background: "#1a1a1a", marginTop: "10px" }} />
            </div>
          </div>

          {/* Right — Newsletter */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 className={inter.className} style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Join our<br />newsletter
            </h3>
            <p className={inter.className} style={{ fontSize: "13px", color: "#9ca3af", marginTop: "10px", marginBottom: "32px" }}>
              Daily dose of design trends by the team.
            </p>
            <input type="text" placeholder="Name" className={inter.className} style={{ width: "100%", background: "transparent", fontSize: "14px", color: "#1a1a1a", outline: "none", borderBottom: "1px solid #c4c4cc", paddingTop: "12px", paddingBottom: "12px" }} />
            <input type="email" placeholder="Email" className={inter.className} style={{ width: "100%", background: "transparent", fontSize: "14px", color: "#1a1a1a", outline: "none", borderBottom: "1px solid #c4c4cc", paddingTop: "12px", paddingBottom: "12px", marginTop: "4px" }} />
            <button className={inter.className} style={{ marginTop: "18px", width: "100%", background: "#1a1a1a", color: "white", fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", paddingTop: "16px", paddingBottom: "16px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-6 md:px-[120px]" style={{ paddingTop: "24px", paddingBottom: "24px", borderTop: "1px solid #d4d4de", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {navLinks.map(item => (
          <a key={item.label} href={item.href} className={inter.className} style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", textDecoration: "none" }}>
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
