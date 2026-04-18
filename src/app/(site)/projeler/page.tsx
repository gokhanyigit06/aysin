import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeler | Aysin Yaratıcı Stüdyo",
  description: "Her renk, kelime ve piksel, sizi büyütmek için tasarlanmış net bir stratejiyle gelir.",
};

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  type: "image" | "video";
  src: string;
};

const r1: Project[] = [
  { id: "01", title: "Nova Brand Identity", category: "Marka Kimliği", year: "2024", type: "image", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80" },
  { id: "02", title: "Forma Editorial", category: "Editöryal Tasarım", year: "2024", type: "image", src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80" },
];

const r2: Project[] = [
  { id: "03", title: "Kei Digital", category: "Web Tasarım", year: "2024", type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
  { id: "04", title: "Arbor Packaging", category: "Ambalaj", year: "2023", type: "image", src: "https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=800&q=80" },
  { id: "05", title: "Strata Campaign", category: "Kampanya", year: "2023", type: "image", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
];

const r3: Project = { id: "06", title: "Meridian — Brand Film", category: "Film Yapım", year: "2023", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" };

const r4: Project[] = [
  { id: "07", title: "Lune Fragrance", category: "Marka Kimliği", year: "2023", type: "image", src: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80" },
  { id: "08", title: "Crest Motion", category: "Hareket Tasarımı", year: "2022", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "09", title: "Veil Apparel", category: "Moda", year: "2022", type: "image", src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" },
];

const r5: Project[] = [
  { id: "10", title: "Atlas Interiors", category: "İç Mekan", year: "2022", type: "image", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80" },
  { id: "11", title: "Dusk Studio", category: "Stüdyo Kimliği", year: "2021", type: "image", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80" },
];

export default function ProjelerPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ paddingTop: "160px", paddingBottom: "60px", textAlign: "center" }}>
        <h1 className={inter.className} style={{ fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "20px" }}>
          Projeler.
        </h1>
        <p className={inter.className} style={{ fontSize: "15px", color: "#6b7280", maxWidth: "380px", margin: "0 auto 28px", lineHeight: 1.6 }}>
          Her renk, kelime ve piksel, sizi büyütmek için inşa edilmiş net bir stratejiden gelir.
        </p>
        <a href="/iletisim" className={inter.className} style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#1a1a1a", textDecoration: "underline", textUnderlineOffset: "4px" }}>
          Bize Ulaşın&nbsp;+
        </a>
      </div>

      {/* GRID CONTAINER */}
      <div style={{ paddingBottom: "100px" }} className="px-6 md:px-[120px] flex flex-col gap-3">

        {/* ROW 1 — 2 kart, 1:1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {r1.map(p => <Card key={p.id} project={p} aspect="1/1" ic={inter.className} />)}
        </div>

        {/* ROW 2 — 3 kart, 9:16 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {r2.map(p => <Card key={p.id} project={p} aspect="9/16" ic={inter.className} />)}
        </div>

        {/* ROW 3 — 1 kart, 16:9 tam genişlik */}
        <Card project={r3} aspect="16/9" ic={inter.className} />

        {/* ROW 4 — 3 kart, 9:16 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {r4.map(p => <Card key={p.id} project={p} aspect="9/16" ic={inter.className} />)}
        </div>

        {/* ROW 5 — 2 kart, 1:1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {r5.map(p => <Card key={p.id} project={p} aspect="1/1" ic={inter.className} />)}
        </div>

      </div>
    </main>
  );
}

function Card({ project, aspect, ic }: { project: Project; aspect: string; ic: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Cover */}
      <div
        style={{ position: "relative", width: "100%", aspectRatio: aspect, borderRadius: "14px", overflow: "hidden", background: "#f0f0f0", cursor: "pointer" }}
        className="project-cover-wrap"
      >
        {project.type === "video" ? (
          <video src={project.src} loop muted playsInline autoPlay style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.src} alt={project.title} className="project-cover-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
        )}

        {/* Hover overlay */}
        <div className="project-cover-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.3s ease", display: "flex", alignItems: "flex-end", padding: "20px" }}>
          <span className={`project-view-label ${ic}`} style={{ fontSize: "11px", fontWeight: 500, color: "white", opacity: 0, transition: "opacity 0.3s ease", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Projeyi Gör →
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingLeft: "2px", paddingRight: "2px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span className={ic} style={{ fontSize: "11px", fontFamily: "monospace", color: "#9ca3af", letterSpacing: "0.08em" }}>&#123;&nbsp;_{project.id}&nbsp;&#125;</span>
          <span className={ic} style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em" }}>{project.title}</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <span className={ic} style={{ fontSize: "12px", color: "#6b7280" }}>{project.category}</span>
          <span className={ic} style={{ fontSize: "12px", color: "#9ca3af" }}>{project.year}</span>
        </div>
      </div>
    </div>
  );
}
