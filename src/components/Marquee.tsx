"use client";

import { useEffect, useState } from "react";
import { getContent, DEFAULT_MARQUEE } from "@/lib/adminDb";

export default function Marquee() {
  const [items, setItems] = useState<string[]>(DEFAULT_MARQUEE);

  useEffect(() => {
    let alive = true;
    getContent("home")
      .then((data) => {
        if (!alive) return;
        if (data && Array.isArray(data.marqueeItems) && data.marqueeItems.length > 0) {
          setItems(data.marqueeItems);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Duplicate for seamless loop
  const allItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden relative" style={{ marginTop: "56px" }}>
      {/* Edge fade masks — aligned to container edges */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: "60px", background: "linear-gradient(to right, white, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: "60px", background: "linear-gradient(to left, white, transparent)" }}
      />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marqueeScroll 30s linear infinite" }}
      >
        {allItems.map((label, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#9ca3af]"
            style={{ paddingLeft: "52px", paddingRight: "52px" }}
          >
            <span className="opacity-70">•</span>
            {label}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
