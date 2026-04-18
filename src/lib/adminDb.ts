import { db, storage } from "@/lib/firebase";
import {
  collection, doc, getDocs, getDoc, addDoc, setDoc,
  updateDoc, deleteDoc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// ─── TYPES ───────────────────────────────────────────────
export type MediaBlock =
  | { type: "wide";          src: string; mediaType: "image" | "video"; alt: string }
  | { type: "square";        src: string; mediaType: "image" | "video"; alt: string }
  | { type: "dual-portrait"; items: { src: string; mediaType: "image" | "video"; alt: string }[] };

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  year: string;
  scope: string;
  timeline: string;
  liveUrl?: string;
  coverSrc: string;
  coverMediaType: "image" | "video";
  coverAspect: "1:1" | "9:16" | "16:9";
  media: MediaBlock[];
  isSeed?: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FAQItem { q: string; a: string; }
export interface AwardItem { name: string; category: string; date: string; }

export interface SiteContent {
  home?: {
    heroSlides: { src: string; mediaType: "image" | "video"; caption?: string }[];
    aboutText: string;
    marqueeItems: string[];
  };
  about?: {
    heroVideoSrc: string;
    tagline: string;
    stats: { value: number; suffix: string; label: string }[];
    teamImageSrc: string;
    teamTitle: string;
    teamText: string;
    awards: AwardItem[];
  };
  faq?: { items: FAQItem[] };
  footer?: { email: string; socials: { label: string; url: string }[] };
}

// ─── SEED DATA ───────────────────────────────────────────
const SEED_PROJECTS: Omit<Project, "id">[] = [
  {
    title: "Nova Brand Identity",
    slug: "nova-brand-identity",
    description: "Nova, pazardaki payını altı ayda %20 büyütmek için bize geldi. Kalıcı ve güçlü bir marka kimliği istediler.",
    year: "2024", scope: "Marka Kimliği, UI/UX", timeline: "9 Hafta", liveUrl: "#",
    coverSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    coverMediaType: "image", coverAspect: "16:9",
    isSeed: true,
    media: [
      { type: "wide", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80", mediaType: "image", alt: "Nova hero" },
      { type: "dual-portrait", items: [
        { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", mediaType: "image", alt: "d1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", mediaType: "image", alt: "d2" },
      ]},
      { type: "square", src: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&q=80", mediaType: "image", alt: "mockup" },
    ],
  },
  {
    title: "Forma Editorial",
    slug: "forma-editorial",
    description: "Basılı ve dijital arasındaki sınırı eriten bir editöryal dil geliştirdik.",
    year: "2024", scope: "Editöryal Tasarım", timeline: "6 Hafta",
    coverSrc: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    coverMediaType: "image", coverAspect: "1:1",
    isSeed: true,
    media: [
      { type: "square", src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80", mediaType: "image", alt: "hero" },
      { type: "wide", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80", mediaType: "image", alt: "wide" },
    ],
  },
];

// ─── PROJECTS ─────────────────────────────────────────────
export async function seedProjectsIfEmpty() {
  const snap = await getDocs(collection(db, "projects"));
  if (snap.empty) {
    for (const p of SEED_PROJECTS) {
      await addDoc(collection(db, "projects"), { ...p, createdAt: serverTimestamp() });
    }
  }
}

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
}

export async function getProject(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, "projects", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } as Project : null;
}

export async function createProject(data: Omit<Project, "id">) {
  return addDoc(collection(db, "projects"), { ...data, isSeed: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function updateProject(id: string, data: Partial<Project>) {
  return updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(db, "projects", id));
}

// ─── UPLOAD MEDIA ─────────────────────────────────────────
export async function uploadMedia(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const r = ref(storage, `${folder}/${name}`);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}

export async function deleteMedia(url: string) {
  try {
    const r = ref(storage, url);
    await deleteObject(r);
  } catch { /* ignore */ }
}

// ─── SITE CONTENT ───────────────────────────────────────
export async function getContent(section: string) {
  const snap = await getDoc(doc(db, "content", section));
  return snap.exists() ? snap.data() : null;
}

export async function setContent(section: string, data: unknown) {
  return setDoc(doc(db, "content", section), data as object, { merge: true });
}
