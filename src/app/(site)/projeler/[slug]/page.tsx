"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// ─── Mock data — Admin'den çekilecek ───
type MediaBlock =
  | { type: "wide"; src: string; alt: string }           // 16:9 tek görsel
  | { type: "square"; src: string; alt: string }         // 1:1 tek görsel
  | { type: "dual-portrait"; items: { src: string; alt: string }[] }; // 2× 9:16 yan yana

const projectsData: Record<string, {
  id: string; title: string; slug: string;
  description: string; year: string; scope: string; timeline: string; liveUrl?: string;
  media: MediaBlock[];
}> = {
  "nova-brand-identity": {
    id: "01", title: "Nova Brand Identity", slug: "nova-brand-identity",
    description: "Nova, net bir hedefle bize geldi: pazardaki payını altı ayda %20 büyütmek. Trendlerin peşinde değil, kalıcı ve güçlü bir marka kimliği istiyorlardı.",
    year: "2024", scope: "Marka Kimliği, UI/UX", timeline: "9 Hafta", liveUrl: "#",
    media: [
      { type: "wide", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80", alt: "Nova hero" },
      { type: "dual-portrait", items: [
        { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", alt: "Nova detail 1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", alt: "Nova detail 2" },
      ]},
      { type: "square", src: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&q=80", alt: "Nova mockup" },
      { type: "wide", src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1400&q=80", alt: "Nova final" },
    ],
  },
  "forma-editorial": {
    id: "02", title: "Forma Editorial", slug: "forma-editorial",
    description: "Forma için moda yayıncılığının geleceğini yeniden tanımladık. Basılı ve dijital arasındaki sınırı eriten bir editöryal dil geliştirdik.",
    year: "2024", scope: "Editöryal Tasarım", timeline: "6 Hafta", liveUrl: "#",
    media: [
      { type: "square", src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80", alt: "Forma hero" },
      { type: "wide", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80", alt: "Forma wide" },
      { type: "dual-portrait", items: [
        { src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80", alt: "Forma p1" },
        { src: "https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=800&q=80", alt: "Forma p2" },
      ]},
    ],
  },
};

const moreProjects = [
  { title: "Kei Digital", category: "Web Tasarım", slug: "kei-digital", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
  { title: "Arbor Packaging", category: "Ambalaj", slug: "arbor-packaging", src: "https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=800&q=80" },
  { title: "Strata Campaign", category: "Kampanya", slug: "strata-campaign", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const project = projectsData[slug] ?? Object.values(projectsData)[0];

  return (
    <main style={{ background: "#fff", minHeight: "100vh", paddingTop: "100px" }}>

      {/* ─── MAIN LAYOUT: sticky left + scrolling right ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "0", paddingLeft: "120px", paddingRight: "120px", alignItems: "start" }}>

        {/* LEFT — sticky */}
        <div style={{ position: "sticky", top: "120px", paddingRight: "60px", paddingBottom: "80px" }}>
          {/* Title */}
          <h1 className={inter.className} style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
            {project.title}
          </h1>
          <p className={inter.className} style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, marginBottom: "48px", maxWidth: "360px" }}>
            {project.description}
          </p>

          {/* Meta */}
          <div style={{ borderTop: "1px solid #e5e5e5" }}>
            {[
              { label: "Yıl", value: project.year },
              { label: "Kapsam", value: project.scope },
              { label: "Süre", value: project.timeline },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #e5e5e5" }}>
                <span className={inter.className} style={{ fontSize: "12px", color: "#9ca3af", letterSpacing: "0.04em" }}>{row.label}</span>
                <span className={inter.className} style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
            {project.liveUrl && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #e5e5e5" }}>
                <span className={inter.className} style={{ fontSize: "12px", color: "#9ca3af" }}>Canlı proje</span>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={inter.className}
                  style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Önizle +
                </a>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — scrolling media blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "120px" }}>
          {project.media.map((block, i) => (
            <MediaBlock key={i} block={block} />
          ))}
        </div>
      </div>

      {/* ─── MORE PROJECTS ─── */}
      <section style={{ paddingLeft: "120px", paddingRight: "120px", paddingBottom: "160px" }}>
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "60px", marginBottom: "40px" }}>
          <h2 className={inter.className} style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em" }}>
            Daha fazla proje.
          </h2>
        </div>

        {/* 3 × 9:16 portrait cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {moreProjects.map(p => (
            <Link key={p.slug} href={`/projeler/${p.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ position: "relative", aspectRatio: "9/16", borderRadius: "14px", overflow: "hidden", background: "#f0f0f0" }} className="project-cover-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.title} className="project-cover-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "2px" }}>
                <span className={inter.className} style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>{p.title}</span>
                <span className={inter.className} style={{ fontSize: "12px", color: "#6b7280" }}>{p.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

function MediaBlock({ block }: { block: MediaBlock }) {
  if (block.type === "wide") {
    return (
      <div style={{ aspectRatio: "16/9", borderRadius: "14px", overflow: "hidden", background: "#f0f0f0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.src} alt={block.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  if (block.type === "square") {
    return (
      <div style={{ aspectRatio: "1/1", borderRadius: "14px", overflow: "hidden", background: "#f0f0f0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.src} alt={block.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  if (block.type === "dual-portrait") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {block.items.map((item, i) => (
          <div key={i} style={{ aspectRatio: "9/16", borderRadius: "14px", overflow: "hidden", background: "#f0f0f0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
