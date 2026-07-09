"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, type Project } from "@/lib/adminDb";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LatestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let alive = true;
    getProjects()
      .then((list) => {
        if (!alive) return;
        if (Array.isArray(list)) setProjects(list.slice(0, 6));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="w-full px-6 md:px-[120px]" style={{ paddingTop: "0px", paddingBottom: "120px" }}>
      <div className="flex justify-between items-end" style={{ marginBottom: "80px" }}>
        <h2 className={`${inter.className} text-[36px] md:text-[52px] leading-[1.05] font-medium text-[#1a1a1a] tracking-tight`}>
          Latest
          <br />
          Projects.
        </h2>
        <div className="text-[12px] md:text-[13px] tracking-widest text-[#1a1a1a] font-medium mb-3">
          ( ©25 )
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <Link
            key={project.id ?? i}
            href={`/projeler/${project.id}`}
            className="flex flex-col gap-4 group cursor-pointer"
          >
            <div className="w-full aspect-square bg-[#f2f2f2] rounded-[20px] overflow-hidden relative">
              {project.coverMediaType === "video" ? (
                <video
                  src={project.coverSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.coverSrc}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Hover Overlay — Frosted Glass */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10"
                style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(255,255,255,0.18)" }}
              >
                <span className={`${inter.className} text-white text-[32px] md:text-[40px] font-semibold tracking-tight drop-shadow-lg`}>
                  {project.title}
                </span>
              </div>
            </div>
            {/* Caption */}
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-semibold tracking-widest text-[#1a1a1a] uppercase">{project.title}</span>
              <span className="text-[11px] font-medium tracking-widest text-gray-400">{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
