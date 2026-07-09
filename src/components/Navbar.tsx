"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getContent, DEFAULT_HEADER, type SiteHeader } from "@/lib/adminDb";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [header, setHeader] = useState<SiteHeader>(DEFAULT_HEADER);

  // Load header content from Firestore, merge over defaults
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getContent("site");
        if (!active || !data) return;
        const merged: SiteHeader = { ...DEFAULT_HEADER, ...data };
        merged.nav =
          Array.isArray(data.nav) && data.nav.length > 0 ? data.nav : DEFAULT_HEADER.nav;
        merged.announcement =
          data.announcement && typeof data.announcement === "object"
            ? { ...DEFAULT_HEADER.announcement, ...data.announcement }
            : DEFAULT_HEADER.announcement;
        setHeader(merged);
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Hide header on scroll down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);   // scrolling down
      } else if (y < lastY - 4) {
        setHidden(false);  // scrolling up
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = header.nav;
  const announcement = header.announcement;

  return (
    <>
      {/* ─── TOP STRUCTURE: header pill + announcement bar ─── */}
      <div
        style={{
          position: "fixed",
          top: "12px",
          left: "12px",
          right: "12px",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          transform: hidden && !menuOpen ? "translateY(-135%)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        {/* 1) HEADER PILL */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "14px 22px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#1a1a1a",
            }}
          >
            {header.logoType === "image" && header.logoImageSrc ? (
              <img
                src={header.logoImageSrc}
                alt={header.logoText || "logo"}
                style={{ height: "26px", width: "auto", display: "block" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                  lineHeight: 1,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {header.logoText}
              </span>
            )}
          </Link>

          {/* MENU / CLOSE button */}
          <button
            id="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Kapat" : "Menü"}
            style={{
              borderRadius: "10px",
              border: "1px solid #e5e5e5",
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "#fff",
              color: "#1a1a1a",
              cursor: "pointer",
            }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* 2) ANNOUNCEMENT BAR */}
        {announcement.enabled && (
          <a
            href={announcement.href || "#"}
            style={{
              background: announcement.bgColor || "#5CE65C",
              color: announcement.textColor || "#0a0a0a",
              borderRadius: "12px",
              padding: "11px",
              textAlign: "center",
              textDecoration: "none",
              display: "block",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span
              style={{
                textTransform: "uppercase",
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.18em",
              }}
            >
              {announcement.text}
              <span style={{ marginLeft: "8px" }}>&#8599;</span>
            </span>
          </a>
        )}
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
          {nav.map((item, i) => (
            <Link
              key={`${item.href}-${i}`}
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
                &#123;&nbsp;_{String(i + 1).padStart(2, "0")}&nbsp;&#125;
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
          <a href={`mailto:${header.email}`} style={{ fontSize: "16px", color: "#1a1a1a", textDecoration: "none", fontWeight: 500, fontFamily: "var(--font-inter), sans-serif" }}>
            {header.email}
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
