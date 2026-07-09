"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import LatestProjects from "@/components/LatestProjects";
import Services from "@/components/Services";
import Showreel from "@/components/Showreel";
import FAQ from "@/components/FAQ";
import { getContent, DEFAULT_ABOUT_TEXT } from "@/lib/adminDb";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function About() {
  const [aboutText, setAboutText] = useState<string>(DEFAULT_ABOUT_TEXT);

  useEffect(() => {
    let alive = true;
    getContent("home")
      .then((data) => {
        if (!alive) return;
        if (data && typeof data.aboutText === "string" && data.aboutText.trim()) {
          setAboutText(data.aboutText);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center justify-center bg-white px-6 md:px-[100px]"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      <div style={{ width: "100%", maxWidth: "800px", overflow: "hidden" }}>
        <p
          className={`${inter.className} text-[24px] md:text-[36px] leading-tight text-center font-medium text-[#1a1a1a] tracking-tight`}
        >
          {aboutText}
        </p>
        <Marquee />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative flex flex-col bg-[#ffffff] overflow-x-hidden">
        {/* ─── HERO ─── */}
        <Hero />

        {/* ─── ABOUT / BRAND SECTION ─── */}
        <About />

        {/* ─── LATEST PROJECTS SECTION ─── */}
        <LatestProjects />

        {/* ─── SERVICES SECTION ─── */}
        <Services />

        {/* ─── VIDEO / SHOWREEL SECTION ─── */}
        <Showreel />
      </main>

      {/* ─── FAQ SECTION ─── */}
      <FAQ />
    </>
  );
}
