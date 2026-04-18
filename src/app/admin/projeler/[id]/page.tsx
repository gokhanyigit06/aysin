"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createProject, getProject, updateProject, uploadMedia, MediaBlock, Project } from "@/lib/adminDb";

type BlockType = "wide" | "square" | "dual-portrait";
type AspectRatio = "1:1" | "9:16" | "16:9";

const ASPECT_LABELS: Record<string, string> = { "1:1": "Kare (1:1)", "9:16": "Dikey (9:16)", "16:9": "Geniş (16:9)" };
const BLOCK_TYPES: { value: BlockType; label: string; desc: string }[] = [
  { value: "wide", label: "Geniş (16:9)", desc: "Tek tam genişlik görsel/video" },
  { value: "square", label: "Kare (1:1)", desc: "Tek kare görsel/video" },
  { value: "dual-portrait", label: "İkili Dikey (9:16 × 2)", desc: "İki 9:16 görsel yan yana" },
];

export default function ProjectForm() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;
  const isNew = id === undefined;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  // Basic fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [coverSrc, setCoverSrc] = useState("");
  const [coverMediaType, setCoverMediaType] = useState<"image" | "video">("image");
  const [coverAspect, setCoverAspect] = useState<AspectRatio>("16:9");

  // Media blocks
  const [blocks, setBlocks] = useState<MediaBlock[]>([]);

  useEffect(() => {
    if (!isNew && id) {
      getProject(id).then(p => {
        if (p) {
          setTitle(p.title); setSlug(p.slug); setDescription(p.description);
          setYear(p.year); setScope(p.scope); setTimeline(p.timeline);
          setLiveUrl(p.liveUrl ?? ""); setCoverSrc(p.coverSrc);
          setCoverMediaType(p.coverMediaType); setCoverAspect(p.coverAspect);
          setBlocks(p.media ?? []);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  function slugify(s: string) {
    return s.toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    try {
      const url = await uploadMedia(file, "covers");
      setCoverSrc(url);
      setCoverMediaType(file.type.startsWith("video") ? "video" : "image");
    } finally { setUploadingCover(false); }
  }

  // ── Block helpers ──────────────────────────────────────
  function addBlock(type: BlockType) {
    if (type === "dual-portrait") {
      setBlocks(b => [...b, { type: "dual-portrait", items: [{ src: "", mediaType: "image", alt: "" }, { src: "", mediaType: "image", alt: "" }] }]);
    } else {
      setBlocks(b => [...b, { type, src: "", mediaType: "image", alt: "" } as MediaBlock]);
    }
  }

  function removeBlock(i: number) { setBlocks(b => b.filter((_, idx) => idx !== i)); }

  function moveBlock(i: number, dir: -1 | 1) {
    setBlocks(b => {
      const next = [...b];
      const j = i + dir;
      if (j < 0 || j >= next.length) return b;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function uploadBlockFile(file: File, blockIdx: number, itemIdx?: number) {
    const url = await uploadMedia(file, `projects/${id ?? "new"}`);
    const mt: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
    setBlocks(b => {
      const next = [...b];
      const block = { ...next[blockIdx] };
      if (block.type === "dual-portrait" && itemIdx !== undefined) {
        const items = [...block.items];
        items[itemIdx] = { ...items[itemIdx], src: url, mediaType: mt };
        next[blockIdx] = { ...block, items };
      } else if (block.type !== "dual-portrait") {
        (block as { type: "wide" | "square"; src: string; mediaType: "image" | "video"; alt: string }).src = url;
        (block as { type: "wide" | "square"; src: string; mediaType: "image" | "video"; alt: string }).mediaType = mt;
        next[blockIdx] = block;
      }
      return next;
    });
  }

  async function handleSave() {
    if (!title || !slug || !coverSrc) { alert("Başlık, slug ve kapak görseli zorunludur."); return; }
    setSaving(true);
    const data: Omit<Project, "id"> = {
      title, slug, description, year, scope, timeline, liveUrl, coverSrc,
      coverMediaType, coverAspect, media: blocks, isSeed: false,
    };
    try {
      if (isNew) { await createProject(data); }
      else { await updateProject(id!, data); }
      router.push("/admin/projeler");
    } finally { setSaving(false); }
  }

  if (loading) return <div style={{ color: "#9ca3af", fontSize: "14px" }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: "840px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 className="admin-page-title">{isNew ? "Yeni Proje" : "Projeyi Düzenle"}</h1>
          <p className="admin-page-sub">{isNew ? "Yeni bir proje oluşturun" : `"${title}" projesini düzenliyorsunuz`}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="admin-btn-ghost" onClick={() => router.push("/admin/projeler")}>İptal</button>
          <button className="admin-btn" onClick={handleSave} disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</button>
        </div>
      </div>

      {/* ── Section: Basic Info ── */}
      <div className="admin-card" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px", color: "#1a1a1a" }}>Temel Bilgiler</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="admin-field">
            <label className="admin-label">Başlık *</label>
            <input className="admin-input" value={title} onChange={e => { setTitle(e.target.value); if (isNew) setSlug(slugify(e.target.value)); }} placeholder="Proje adı" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Slug *</label>
            <input className="admin-input" value={slug} onChange={e => setSlug(slugify(e.target.value))} placeholder="proje-adi" />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label">Açıklama</label>
          <textarea className="admin-textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Proje hakkında kısa açıklama..." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <div className="admin-field">
            <label className="admin-label">Yıl</label>
            <input className="admin-input" value={year} onChange={e => setYear(e.target.value)} placeholder="2024" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Kapsam</label>
            <input className="admin-input" value={scope} onChange={e => setScope(e.target.value)} placeholder="Marka, UI/UX" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Süre</label>
            <input className="admin-input" value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="9 Hafta" />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-label">Canlı Proje URL</label>
          <input className="admin-input" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} placeholder="https://..." />
        </div>
      </div>

      {/* ── Section: Cover ── */}
      <div className="admin-card" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "20px", color: "#1a1a1a" }}>Kapak Görseli</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div className="admin-field">
            <label className="admin-label">Kapsam Oranı</label>
            <select className="admin-input" value={coverAspect} onChange={e => setCoverAspect(e.target.value as AspectRatio)}>
              {(Object.entries(ASPECT_LABELS) as [AspectRatio, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
          <div className="admin-field" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {coverSrc && (
              <span style={{ fontSize: "12px", color: "#22c55e", marginBottom: "6px" }}>✓ Görsel yüklendi</span>
            )}
            <input ref={coverRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }} />
            <button className="admin-btn-ghost" onClick={() => coverRef.current?.click()} disabled={uploadingCover}>
              {uploadingCover ? "Yükleniyor..." : "Bilgisayardan Seç"}
            </button>
          </div>
        </div>

        {coverSrc && (
          <div style={{ aspectRatio: coverAspect === "1:1" ? "1" : coverAspect === "9:16" ? "9/16" : "16/9", maxHeight: "280px", width: "fit-content", borderRadius: "10px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
            {coverMediaType === "video"
              ? <video src={coverSrc} muted loop autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              // eslint-disable-next-line @next/next/no-img-element
              : <img src={coverSrc} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            }
          </div>
        )}

        {!coverSrc && (
          <input className="admin-input" value={coverSrc} onChange={e => setCoverSrc(e.target.value)} placeholder="veya URL yapıştırın..." style={{ marginTop: "8px" }} />
        )}
      </div>

      {/* ── Section: Media Blocks ── */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>Medya Blokları</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            {BLOCK_TYPES.map(bt => (
              <button key={bt.value} className="admin-btn-ghost" style={{ fontSize: "12px", padding: "7px 12px" }} onClick={() => addBlock(bt.value)}>
                + {bt.label}
              </button>
            ))}
          </div>
        </div>

        {blocks.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "14px", border: "2px dashed #e5e5e5", borderRadius: "10px" }}>
            Yukarıdan blok türü seçerek medya ekleyin
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {blocks.map((block, i) => (
            <BlockEditor key={i} block={block} index={i} total={blocks.length}
              onRemove={() => removeBlock(i)}
              onMove={dir => moveBlock(i, dir)}
              onUpload={(file, itemIdx) => uploadBlockFile(file, i, itemIdx)}
              onUrlChange={(url, itemIdx) => {
                setBlocks(b => {
                  const next = [...b];
                  const blk = { ...next[i] };
                  if (blk.type === "dual-portrait" && itemIdx !== undefined) {
                    const items = [...blk.items]; items[itemIdx] = { ...items[itemIdx], src: url };
                    next[i] = { ...blk, items };
                  } else if (blk.type !== "dual-portrait") {
                    (blk as { src: string }).src = url; next[i] = blk;
                  }
                  return next;
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Block Editor Component ──────────────────────────────
function BlockEditor({ block, index, total, onRemove, onMove, onUpload, onUrlChange }: {
  block: MediaBlock; index: number; total: number;
  onRemove: () => void; onMove: (dir: -1 | 1) => void;
  onUpload: (file: File, itemIdx?: number) => Promise<void>;
  onUrlChange: (url: string, itemIdx?: number) => void;
}) {
  const bt = BLOCK_TYPES.find(b => b.value === block.type)!;

  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: "10px", overflow: "hidden" }}>
      {/* Block header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#fafafa", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {index + 1}. {bt.label}
          </span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button className="admin-btn-ghost" style={{ padding: "4px 10px", fontSize: "12px" }} onClick={() => onMove(-1)} disabled={index === 0}>↑</button>
          <button className="admin-btn-ghost" style={{ padding: "4px 10px", fontSize: "12px" }} onClick={() => onMove(1)} disabled={index === total - 1}>↓</button>
          <button className="admin-btn-danger" onClick={onRemove}>Kaldır</button>
        </div>
      </div>

      {/* Block body */}
      <div style={{ padding: "16px" }}>
        {block.type === "dual-portrait" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {block.items.map((item, j) => (
              <MediaField key={j} src={item.src} mediaType={item.mediaType} aspect="9/16" label={`Görsel ${j + 1}`}
                onUpload={f => onUpload(f, j)} onUrlChange={url => onUrlChange(url, j)} />
            ))}
          </div>
        ) : (
          <MediaField src={block.src} mediaType={block.mediaType}
            aspect={block.type === "wide" ? "16/9" : "1/1"} label="Görsel / Video"
            onUpload={f => onUpload(f)} onUrlChange={url => onUrlChange(url)} />
        )}
      </div>
    </div>
  );
}

function MediaField({ src, mediaType, aspect, label, onUpload, onUrlChange }: {
  src: string; mediaType: "image" | "video"; aspect: string; label: string;
  onUpload: (f: File) => Promise<void>; onUrlChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  }

  return (
    <div>
      <label className="admin-label">{label}</label>

      {src ? (
        <div style={{ position: "relative", aspectRatio: aspect, borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e5e5", marginBottom: "8px", maxHeight: "240px" }}>
          {mediaType === "video"
            ? <video src={src} muted loop autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          }
          <button onClick={() => onUrlChange("")} style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "6px", padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>
            Değiştir
          </button>
        </div>
      ) : (
        <div>
          <div className="upload-zone" onClick={() => fileRef.current?.click()}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>↑</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              {uploading ? "Yükleniyor..." : "Tıkla veya sürükle (görsel / video)"}
            </div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>Oran: {aspect.replace("/", ":")}</div>
          </div>
          <div style={{ marginTop: "8px" }}>
            <input className="admin-input" placeholder="veya URL girin..." onChange={e => onUrlChange(e.target.value)} style={{ fontSize: "12px" }} />
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}
