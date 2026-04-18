"use client";

import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { value: 3, suffix: "m+", label: "Markaların topladığı sermaye" },
  { value: 289, suffix: "", label: "Lansman yaptığımız marka" },
  { value: 56, suffix: "", label: "Ödül ve takdir" },
  { value: 97, suffix: "%", label: "Müşteri memnuniyet oranı" },
];

const awards = [
  { name: "Awwwards", category: "Site of the Day", date: "Nis 2025" },
  { name: "CSS Design Awards", category: "Best UX, UI & Innovation", date: "Mar 2025" },
  { name: "Webby Awards", category: "Best Visual Design", date: "Eki 2024" },
  { name: "Framer Awards", category: "Best Portfolio Website", date: "Ağu 2024" },
  { name: "Figma Community", category: "Creator of the Year", date: "Tem 2024" },
  { name: "Creativepool", category: "People's Choice Gold", date: "May 2024" },
  { name: "Communication Arts", category: "Web Excellence", date: "Şub 2024" },
];

const marqueeItems = [
  "Marka Kimliği", "Web Tasarım", "Ambalaj", "Editöryal", "Motion Design",
  "Kampanya", "Strateji", "İllüstrasyon", "Tipografi", "UI / UX",
];

export default function HakkimizdaPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ─── 1. VIDEO HERO ─── */}
      <section className="px-6 md:px-[120px]" style={{ paddingTop: "100px" }}>
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/8",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#111",
        }}>
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
          />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px",
          }}>
            <p className={inter.className} style={{
              fontSize: "clamp(20px, 2.8vw, 38px)",
              fontWeight: 500,
              color: "white",
              textAlign: "center",
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              maxWidth: "720px",
            }}>
              Biz Aysin® — güçlü markalar, çarpıcı dijital deneyimler ve
              sıradanlığı reddeden fikirler yaratıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. MARQUEE ─── */}
      <section style={{ padding: "48px 0", overflow: "hidden", borderBottom: "1px solid #e5e5e5" }}>
        <div className="marquee-track" style={{ display: "flex", gap: "48px", width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={inter.className} style={{
              fontSize: "14px", color: "#6b7280", letterSpacing: "0.08em",
              textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {item} <span style={{ color: "#d1d5db", marginLeft: "24px" }}>✦</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-track { animation: marquee 18s linear infinite; }
        `}</style>
      </section>

      {/* ─── 3. STATS ─── */}
      <section ref={statsRef} className="px-6 md:px-[120px]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{
          background: "#EBEBF0",
          borderRadius: "20px",
          padding: "32px 24px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}>
          {/* Logo + tagline */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className={inter.className} style={{ fontSize: "56px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "28px" }}>A</div>
            <p className={inter.className} style={{
              fontSize: "clamp(16px, 2vw, 22px)",
              fontWeight: 500,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              lineHeight: 1.5,
              maxWidth: "520px",
              textAlign: "center",
            }}>
              Biz Aysin® — güçlü markalar, çarpıcı dijital deneyimler ve
              sıradanlığı reddeden fikirler yaratıyoruz.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "0", width: "100%", borderTop: "1px solid #d4d4de", paddingTop: "32px" }}>
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} active={statsVisible} interClass={inter.className} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. TEAM / ABOUT ─── */}
      <section className="px-6 md:px-[120px] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20" style={{ paddingBottom: "80px", alignItems: "center" }}>
        <div>
          <p className={inter.className} style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "20px" }}>
            Ekibimiz
          </p>
          <h2 className={inter.className} style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "24px" }}>
            Hedeflerinize ulaşmak için yakından çalışırız ve beklentilerin ötesine geçeriz.
          </h2>
          <p className={inter.className} style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, maxWidth: "420px" }}>
            Küçük ama güçlü bir ekibiz. Her projede strateji, tasarım ve teknoloji disiplinlerini bir araya getirerek bütünsel bir yaratıcı deneyim sunarız.
          </p>
        </div>
        <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/5", background: "#f0f0f0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80"
            alt="Aysin Ekibi"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* ─── 5. AWARDS ─── */}
      <section className="px-6 md:px-[120px]" style={{ paddingBottom: "100px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className={inter.className} style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "16px" }}>
            Ödüller
          </p>
          <h2 className={inter.className} style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1.2, maxWidth: "600px", margin: "0 auto" }}>
            Yıllar içinde kazandığımız prestijli ödüllerle gurur duyuyoruz.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {awards.map((award, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e5e5e5",
              paddingTop: "24px",
              paddingBottom: "24px",
            }}>
              <span className={inter.className} style={{ fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
                {award.name}
              </span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                <span className={inter.className} style={{ fontSize: "13px", color: "#6b7280" }}>{award.category}</span>
                <span className={inter.className} style={{ fontSize: "13px", color: "#9ca3af", minWidth: "72px", textAlign: "right" }}>{award.date}</span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e5e5e5" }} />
        </div>
      </section>

    </main>
  );
}

function StatItem({ stat, active, interClass }: { stat: typeof stats[0]; active: boolean; interClass: string }) {
  const count = useCountUp(stat.value, 1800, active);
  return (
    <div style={{ padding: "0 24px 0 0" }}>
      <div className={interClass} style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {count}{stat.suffix}
      </div>
      <p className={interClass} style={{ fontSize: "13px", color: "#6b7280", marginTop: "10px", lineHeight: 1.5, maxWidth: "160px" }}>
        {stat.label}
      </p>
    </div>
  );
}
