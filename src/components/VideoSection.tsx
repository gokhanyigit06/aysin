"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function VideoSection() {
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
        Ayşın® is a creative studio shaping
        bold brands and daring ideas.
      </p>

      {/* Video — 3:2 aspect ratio */}
      <div
        className="relative w-full overflow-hidden group cursor-pointer"
        style={{ aspectRatio: "3/2", borderRadius: "20px", background: "#f2f2f2" }}
      >
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => { (e.currentTarget as HTMLVideoElement).pause(); }}
        />

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
