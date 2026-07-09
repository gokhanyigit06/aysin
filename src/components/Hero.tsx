"use client";

import { useEffect, useState } from "react";
import { getContent, DEFAULT_HERO, HeroContent } from "@/lib/adminDb";

export default function Hero() {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);

  useEffect(() => {
    let active = true;
    getContent("home")
      .then((data) => {
        if (!active) return;
        const merged: HeroContent = {
          ...DEFAULT_HERO,
          ...(data && data.hero ? data.hero : {}),
        };
        setHero(merged);
      })
      .catch(() => {
        /* keep defaults on error */
      });
    return () => {
      active = false;
    };
  }, []);

  const useVideo =
    hero.backgroundType === "video" &&
    typeof hero.backgroundVideoSrc === "string" &&
    hero.backgroundVideoSrc.trim() !== "";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 640,
        overflow: "hidden",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background media */}
      {useVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={hero.backgroundVideoSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.backgroundImageSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Dark scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0,0,0,${hero.overlayOpacity})`,
        }}
      />

      {/* Foreground */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#fff",
            fontWeight: 800,
            fontSize: "clamp(72px, 15vw, 300px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          {hero.wordmark}
          {hero.showRegistered && (
            <sup
              style={{
                fontSize: "0.28em",
                verticalAlign: "super",
                marginLeft: "0.05em",
                opacity: 0.9,
              }}
            >
              &reg;
            </sup>
          )}
        </h1>

        {hero.caption && (
          <div style={{ marginTop: 24 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 9999,
                padding: "10px 22px",
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {hero.caption}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
