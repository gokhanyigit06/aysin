"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const menuItems = [
  { num: "01", label: "Ana Sayfa", href: "/" },
  { num: "02", label: "Projeler", href: "/projeler" },
  { num: "03", label: "Hakkımızda", href: "/hakkimizda" },
  { num: "04", label: "Blog", href: "/blog" },
  { num: "05", label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── TOP NAV BAR ─── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "20px 36px",
          background: menuOpen ? "transparent" : "rgba(255,255,255,0.6)",
          backdropFilter: menuOpen ? "none" : "blur(16px)",
          WebkitBackdropFilter: menuOpen ? "none" : "blur(16px)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-black text-[38px] tracking-tighter text-[#1a1a1a] leading-none hover:opacity-60 transition-opacity select-none"
          style={{ fontFamily: "var(--font-inter), sans-serif", zIndex: 60, position: "relative" }}
        >
          A
        </Link>

        {/* Hamburger — 3 lines that morph to X */}
        <button
          id="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Kapat" : "Menü"}
          style={{ position: "relative", zIndex: 60, width: "36px", height: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span
            style={{
              display: "block", height: "1.5px", background: "#1a1a1a",
              transformOrigin: "left center",
              transform: menuOpen ? "rotate(45deg) translateY(-1px)" : "rotate(0)",
              transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
              width: "100%",
            }}
          />
          <span
            style={{
              display: "block", height: "1.5px", background: "#1a1a1a",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "translateX(10px)" : "translateX(0)",
              transition: "opacity 0.2s ease, transform 0.3s ease",
              width: "100%",
            }}
          />
          <span
            style={{
              display: "block", height: "1.5px", background: "#1a1a1a",
              transformOrigin: "left center",
              transform: menuOpen ? "rotate(-45deg) translateY(1px)" : "rotate(0)",
              transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
              width: "100%",
            }}
          />
        </button>
      </div>

      {/* ─── VERTICAL CLOCK — Left ─── */}
      <div
        className="fixed z-40 hidden md:flex items-center"
        style={{ left: "16px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center" }}
      >
        <span style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 500, letterSpacing: "0.15em", color: "#1a1a1a", opacity: 0.5, whiteSpace: "nowrap" }}>
          ( {time}&nbsp;&nbsp;TR )
        </span>
      </div>

      {/* ─── VERTICAL SOCIALS — Right ─── */}
      <div
        className="fixed z-40 hidden md:flex items-center"
        style={{ right: "16px", top: "50%", transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center", gap: "16px" }}
      >
        {["BE", "DR", "X"].map((label, i, arr) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href="#" style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 500, letterSpacing: "0.15em", color: "#1a1a1a", opacity: 0.5, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
            >
              {label}
            </a>
            {i < arr.length - 1 && <span style={{ fontSize: "11px", opacity: 0.25, fontFamily: "monospace" }}>/</span>}
          </span>
        ))}
      </div>

      {/* ─── FULLSCREEN MENU OVERLAY ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 45,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.65s cubic-bezier(0.77,0,0.175,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px",
          paddingRight: "80px",
        }}
      >
        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {menuItems.map((item, i) => (
            <Link
              key={item.num}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "20px",
                textDecoration: "none",
                paddingTop: "10px",
                paddingBottom: "10px",
                transform: menuOpen ? "translateY(0)" : "translateY(40px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.55s cubic-bezier(0.77,0,0.175,1) ${100 + i * 70}ms, opacity 0.4s ease ${80 + i * 70}ms`,
                position: "relative",
              }}
              className="nav-menu-item group"
            >
              {/* Number tag */}
              <span style={{ fontSize: "14px", fontFamily: "monospace", color: "#4b5563", letterSpacing: "0.1em", flexShrink: 0 }}>
                &#123;&nbsp;_{item.num}&nbsp;&#125;
              </span>

              {/* Label */}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{
                  fontSize: "clamp(42px, 5.6vw, 70px)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  fontFamily: "var(--font-inter), sans-serif",
                }}>
                  {item.label}
                </span>
              </span>

              {/* Hover underline — full row width, starts 50% expands to 100% */}
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "1px",
                  background: "#1a1a1a",
                  width: "50%",
                  transition: "width 0.45s cubic-bezier(0.77,0,0.175,1)",
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Bottom — email */}
        <div
          style={{
            marginTop: "60px",
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: "transform 0.5s ease 0.5s, opacity 0.4s ease 0.5s",
          }}
        >
          <a href="mailto:info@aysin.com" style={{ fontSize: "16px", color: "#1a1a1a", textDecoration: "none", fontWeight: 500, fontFamily: "var(--font-inter), sans-serif" }}>
            info@aysin.com
          </a>
          <div style={{ width: "28px", height: "1.5px", background: "#1a1a1a", marginTop: "8px" }} />
        </div>
      </div>

      {/* Hover underline expand style */}
      <style>{`
        .nav-menu-item:hover .nav-underline {
          width: 100% !important;
        }
      `}</style>
    </>
  );
}
