import HeroSlider from "@/components/HeroSlider";
import Marquee from "@/components/Marquee";
import FAQ from "@/components/FAQ";
import VideoSection from "@/components/VideoSection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <main className="relative flex flex-col bg-[#ffffff] overflow-x-hidden">
      {/* ─── TITLE SECTION ─── */}
      <div className="flex flex-col items-center justify-center z-10" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
        <h1 
          className="font-black text-[15vw] md:text-[180px] leading-none text-[#1a1a1a] tracking-tight text-center relative z-10 w-full"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          AYŞIN
        </h1>
        <p 
          className="font-medium text-[19px] md:text-[22px] tracking-tight text-[#1a1a1a] z-10"
          style={{ fontFamily: "var(--font-inter), sans-serif", marginTop: "24px" }}
        >
          Creative studio based in Gotham.
        </p>
      </div>

      {/* ─── SLIDER SECTION ─── */}
      <div className="w-full relative px-0 md:px-6 flex justify-center z-0 overflow-hidden" style={{ minHeight: '540px', marginTop: '40px' }}>
        <HeroSlider />
        
        {/* Bottom Fade Mask */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#ffffff] to-transparent pointer-events-none z-10"></div>
      </div>

      {/* ─── ABOUT / BRAND SECTION ─── */}
      <section className="w-full flex flex-col items-center justify-center bg-white" style={{ paddingTop: "100px", paddingBottom: "100px", paddingLeft: "100px", paddingRight: "100px" }}>
        <div style={{ width: '100%', maxWidth: '800px', overflow: 'hidden' }}>
          <p className={`${inter.className} text-[24px] md:text-[36px] leading-tight text-center font-medium text-[#1a1a1a] tracking-tight`}>
          We’re Bungee<sup className="text-[0.4em] align-top relative top-[0.4em] -ml-[0.05em] mr-[0.1em]">®</sup> — a creative
          <br className="hidden md:block" /> studio cultivating bold brands,
          <br className="hidden md:block" /> beautiful websites, and ideas
          <br className="hidden md:block" /> that refuse to be ordinary.
          </p>
          <Marquee />
        </div>
      </section>

      {/* ─── LATEST PROJECTS SECTION ─── */}
      <section className="w-full" style={{ paddingTop: "0px", paddingBottom: "200px", paddingLeft: "120px", paddingRight: "120px" }}>
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

          {[
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2600&auto=format&fit=crop",
              alt: "Things Project",
              name: "Things",
              label: "THINGS®",
              date: "_ 07.25",
            },
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2640&auto=format&fit=crop",
              alt: "Lunar Project",
              name: "Lunar",
              label: "LUNAR+",
              date: "_ 10.25",
            },
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2600&auto=format&fit=crop",
              alt: "Studio Project",
              name: "Studio",
              label: "STUDIO°",
              date: "_ 03.25",
            },
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop",
              alt: "Form Project",
              name: "Form",
              label: "FORM.",
              date: "_ 01.25",
            },
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
              alt: "Atelier Project",
              name: "Atelier",
              label: "ATELIER",
              date: "_ 11.24",
            },
            {
              type: "img",
              src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop",
              alt: "Arc Project",
              name: "Arc",
              label: "ARC™",
              date: "_ 09.24",
            },
          ].map((project, i) => (
            <div key={i} className="flex flex-col gap-4 group cursor-pointer">
              <div className="w-full aspect-square bg-[#f2f2f2] rounded-[20px] overflow-hidden relative">
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay — Frosted Glass */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10"
                  style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(255,255,255,0.18)" }}
                >
                  <span className={`${inter.className} text-white text-[32px] md:text-[40px] font-semibold tracking-tight drop-shadow-lg`}>
                    {project.name}
                  </span>
                </div>
              </div>
              {/* Caption */}
              <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-semibold tracking-widest text-[#1a1a1a] uppercase">{project.label}</span>
                <span className="text-[11px] font-medium tracking-widest text-gray-400">{project.date}</span>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section className="w-full" style={{ paddingBottom: "200px" }}>
        {/* Header */}
        <div
          className="flex justify-between items-center"
          style={{ paddingLeft: "120px", paddingRight: "120px", marginBottom: "48px" }}
        >
          <h2 className={`${inter.className} text-[36px] md:text-[52px] leading-[1.05] font-medium text-[#1a1a1a] tracking-tight`}>
            Services.
          </h2>
          <a
            href="/iletisim"
            className={`${inter.className} flex items-center gap-2 text-[14px] font-medium text-[#1a1a1a] hover:opacity-60 transition-opacity tracking-wide`}
          >
            Get in touch
            <span className="text-[20px] font-light leading-none">+</span>
          </a>
        </div>

        {/* Scrollable Cards */}
        <div
          className="flex gap-[10px] overflow-x-auto"
          style={{
            paddingLeft: "120px",
            paddingRight: "120px",
            paddingBottom: "16px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[
            {
              num: "001",
              label: "Branding",
              desc: "We craft logos and brand systems that leave a lasting impression.",
              bg: "#DDD6F3",
            },
            {
              num: "002",
              label: "Development",
              desc: "Beautiful and functional websites built with purpose and precision.",
              bg: "#C8EFC0",
            },
            {
              num: "003",
              label: "SEO Optimization",
              desc: "Get found faster with tailored SEO strategies backed by real data.",
              bg: "#F5C4BC",
            },
            {
              num: "004",
              label: "Social Media",
              desc: "Content strategies that build communities and drive engagement.",
              bg: "#FAE0C4",
            },
            {
              num: "005",
              label: "Photography",
              desc: "Visual storytelling that captures the soul of your brand.",
              bg: "#C4DCF5",
            },
          ].map((service) => (
            <div
              key={service.num}
              className="flex-shrink-0 flex flex-col justify-between cursor-pointer group"
              style={{
                width: "420px",
                height: "480px",
                backgroundColor: service.bg,
                borderRadius: "20px",
                padding: "24px",
              }}
            >
              {/* Number tag */}
              <div className={`${inter.className} text-[12px] font-mono text-[#1a1a1a] tracking-widest opacity-60`}>
                ( {service.num} )
              </div>

              {/* Icon — pixel diamond */}
              <div className="flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="4" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="12" y="12" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="28" y="12" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="4" y="20" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="36" y="20" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="12" y="28" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="28" y="28" width="8" height="8" fill="#1a1a1a"/>
                  <rect x="20" y="36" width="8" height="8" fill="#1a1a1a"/>
                </svg>
              </div>

              {/* Label + Desc */}
              <div className="flex flex-col gap-2">
                <span className={`${inter.className} text-[11px] font-semibold tracking-widest text-[#1a1a1a] uppercase`}>
                  {service.label}
                </span>
                <p className={`${inter.className} text-[13px] leading-snug text-[#1a1a1a] opacity-70`}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VIDEO / SHOWREEL SECTION ─── */}
      <VideoSection />
    </main>

    {/* ─── FAQ SECTION ─── */}
    <FAQ />

    </>

  );
}
