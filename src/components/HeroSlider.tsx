"use client";

import { useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    alt: "Slide 1",
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
    alt: "Slide 2",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Slide 3",
  },
  {
    id: 4,
    type: "image",
    src: "https://images.unsplash.com/photo-1734204813584-0d9b9046b78c?w=800&q=80",
    alt: "Slide 4",
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
    alt: "Slide 5",
  },
  {
    id: 6,
    type: "image",
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    alt: "Slide 6",
  },
  {
    id: 7,
    type: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    alt: "Slide 7",
  },
  {
    id: 8,
    type: "image",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    alt: "Slide 8",
  },
];

// Duplicate for seamless loop
const allSlides = [...slides, ...slides, ...slides];

export default function HeroSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    const speed = 0.6; // px per frame
    let animId: number;

    const cardWidth = 240; // width + gap approx
    const totalWidth = cardWidth * slides.length;

    const animate = () => {
      pos += speed;
      if (pos >= totalWidth) {
        pos = 0;
      }
      track.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex items-end relative" aria-label="Hero slider">
      <div
        ref={trackRef}
        className="flex gap-2 md:gap-[0.75vw] will-change-transform items-end h-full"
        style={{ width: "max-content", paddingBottom: "0" }}
      >
        {allSlides.map((slide, idx) => {
          const isAlternate = idx % 2 === 1;
          return (
            <div
              key={`${slide.id}-${idx}`}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
