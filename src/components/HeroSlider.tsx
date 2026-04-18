"use client";

import { useEffect, useRef, useState } from "react";
import { getContent } from "@/lib/adminDb";

type Slide = { src: string; mediaType: "image" | "video" };

const FALLBACK_SLIDES: Slide[] = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1734204813584-0d9b9046b78c?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", mediaType: "image" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", mediaType: "image" },
];

export default function HeroSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<Slide[]>([]);

  // ── Fetch slides from Firestore (fallback to static) ──
  useEffect(() => {
    getContent("home").then(d => {
      const firestoreSlides = d?.heroSlides as Slide[] | undefined;
      setSlides(firestoreSlides?.length ? firestoreSlides : FALLBACK_SLIDES);
    }).catch(() => setSlides(FALLBACK_SLIDES));
  }, []);

  // ── Animation ──
  useEffect(() => {
    if (slides.length === 0) return;
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    const speed = 0.6;
    let animId: number;
    const cardWidth = 214; // 200px + gap ~14px
    const totalWidth = cardWidth * slides.length;

    const animate = () => {
      pos += speed;
      if (pos >= totalWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [slides]);

  if (slides.length === 0) return null;

  // Triple for seamless loop
  const allSlides = [...slides, ...slides, ...slides];

  return (
    <div className="w-full h-full overflow-hidden flex items-end relative" aria-label="Hero slider">
      <div
        ref={trackRef}
        className="flex gap-2 md:gap-[0.75vw] will-change-transform items-end h-full"
        style={{ width: "max-content" }}
      >
        {allSlides.map((slide, idx) => {
          const isAlternate = idx % 2 === 1;
          return (
            <div
              key={idx}
              className="relative flex-shrink-0 overflow-hidden group"
              style={{
                width: "200px",
                height: "520px",
                borderTopLeftRadius: isAlternate ? "0px" : "100px",
                borderTopRightRadius: isAlternate ? "100px" : "0px",
                borderBottomLeftRadius: isAlternate ? "100px" : "0px",
                borderBottomRightRadius: isAlternate ? "0px" : "100px",
              }}
            >
              {slide.mediaType === "video" ? (
                <video
                  src={slide.src}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
