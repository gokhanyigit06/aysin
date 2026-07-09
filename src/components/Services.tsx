"use client";

import { useEffect, useState } from "react";
import { getContent, DEFAULT_SERVICES, type ServiceItem } from "@/lib/adminDb";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    let alive = true;
    getContent("home")
      .then((data) => {
        if (!alive) return;
        if (data && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="w-full" style={{ paddingBottom: "120px" }}>
      {/* Header */}
      <div
        className="flex justify-between items-center px-6 md:px-[120px]"
        style={{ marginBottom: "40px" }}
      >
        <h2 className={`${inter.className} text-[32px] md:text-[52px] leading-[1.05] font-medium text-[#1a1a1a] tracking-tight`}>
          Services.
        </h2>
        <a
          href="/iletisim"
          className={`${inter.className} flex items-center gap-2 text-[13px] md:text-[14px] font-medium text-[#1a1a1a] hover:opacity-60 transition-opacity tracking-wide`}
        >
          Get in touch
          <span className="text-[20px] font-light leading-none">+</span>
        </a>
      </div>

      {/* Scrollable Cards */}
      <div
        className="flex gap-[10px] overflow-x-auto"
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "16px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {services.map((service, i) => (
          <div
            key={service.num ?? i}
            className="flex-shrink-0 flex flex-col justify-between cursor-pointer group"
            style={{
              width: "min(80vw, 380px)",
              height: "440px",
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
                <rect x="20" y="4" width="8" height="8" fill="#1a1a1a" />
                <rect x="12" y="12" width="8" height="8" fill="#1a1a1a" />
                <rect x="28" y="12" width="8" height="8" fill="#1a1a1a" />
                <rect x="4" y="20" width="8" height="8" fill="#1a1a1a" />
                <rect x="36" y="20" width="8" height="8" fill="#1a1a1a" />
                <rect x="12" y="28" width="8" height="8" fill="#1a1a1a" />
                <rect x="28" y="28" width="8" height="8" fill="#1a1a1a" />
                <rect x="20" y="36" width="8" height="8" fill="#1a1a1a" />
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
  );
}
