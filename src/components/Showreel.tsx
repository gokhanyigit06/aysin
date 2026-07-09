"use client";

import { useEffect, useState } from "react";
import { getContent, DEFAULT_SHOWREEL, type ShowreelContent } from "@/lib/adminDb";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Showreel() {
  const [showreel, setShowreel] = useState<ShowreelContent>(DEFAULT_SHOWREEL);

  useEffect(() => {
    let alive = true;
    getContent("home")
      .then((data) => {
        if (!alive) return;
        if (data && data.showreel) {
          setShowreel({ ...DEFAULT_SHOWREEL, ...data.showreel });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const hasVideo = typeof showreel.videoSrc === "string" && showreel.videoSrc.trim().length > 0;

  return (
    <section
      className="w-full"
      style={{ paddingLeft: "120px", paddingRight: "120px", paddingBottom: "80px" }}
    >
      {/* Headline */}
      <p
        className={`${inter.className} text-[28px] md:text-[40px] font-medium text-[#1a1a1a] leading-tight tracking-tight`}
        style={{ marginBottom: "32px", maxWidth: "540px" }}
      >
        {showreel.headline}
      </p>

      {/* Video — 3:2 aspect ratio */}
      <div
        className="relative w-full overflow-hidden group cursor-pointer"
        style={{ aspectRatio: "3/2", borderRadius: "20px", background: "#f2f2f2" }}
      >
        {hasVideo && (
          <video
            src={showreel.videoSrc}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLVideoElement).pause();
            }}
          />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4l14 8-14 8V4z" fill="#1a1a1a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
