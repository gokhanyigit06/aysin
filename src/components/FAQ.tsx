"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const faqs = [
  {
    q: "What's included in a the monthly package?",
    a: "Each monthly package includes a set number of design or development hours, dedicated project management, weekly updates, and priority support. We tailor it to fit your needs — whether that's ongoing branding, web updates, or new creative assets.",
  },
  {
    q: "How long does a project usually take?",
    a: "Project timelines vary depending on scope. A brand identity takes 2–4 weeks, while a full website can range from 4–10 weeks. We'll give you a clear timeline at the start.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — we offer monthly retainer plans for ongoing support, updates, and creative work after your project launches.",
  },
  {
    q: "Can I hire you for just a logo or one-off design?",
    a: "Absolutely. We take on standalone logo and brand identity projects as well as one-off design requests.",
  },
  {
    q: "What platforms do you build websites on?",
    a: "We primarily build with Next.js, Webflow, and Shopify — depending on what best fits your needs and team.",
  },
  {
    q: "How do payments work?",
    a: "We typically work with a 50% deposit upfront and the remainder on delivery. For retainer plans, billing is monthly.",
  },
  {
    q: "What if I'm not happy with the first concept?",
    a: "We include revision rounds in every project. If a concept isn't right, we iterate until it is — your satisfaction is part of the process.",
  },
  {
    q: "Do you work with clients from any country?",
    a: "Yes, we work with clients worldwide. Most of our collaboration happens async, so timezone differences are rarely an issue.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full bg-white"
      style={{ paddingLeft: "120px", paddingRight: "120px", paddingTop: "40px", paddingBottom: "160px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left — Heading */}
        <div>
          <h2
            className={`${inter.className} text-[52px] md:text-[72px] font-medium text-[#1a1a1a] tracking-tight leading-none`}
          >
            FAQ.
          </h2>
        </div>

        {/* Right — Accordion */}
        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#e5e5e5]" style={{ marginTop: i === 0 ? 0 : "10px" }}>
              <button
                className={`${inter.className} w-full flex items-center justify-between text-left gap-6`}
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="text-[16px] md:text-[18px] font-medium text-[#1a1a1a] tracking-tight leading-snug">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 text-[#1a1a1a] transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: openIndex === i ? "300px" : "0px",
                  opacity: openIndex === i ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.25s ease",
                }}
              >
                <p
                  className={`${inter.className} text-[13px] md:text-[14px] text-[#6b7280] leading-relaxed`}
                  style={{ paddingBottom: "32px" }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
