"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    id: 2,
    index: "02",
    title: "Interior Cleaning",
    description: "Deep sanitization and premium detailing for every surface inside your vehicle.",
    // Person vacuuming / cleaning car interior
    image: "https://i.postimg.cc/C1QLLK8r/Gemini-Generated-Image-xzkgg1xzkgg1xzkg.png",
  },
  {
    id: 3,
    index: "03",
    title: "Glass Tinting",
    description: "Heat rejection and privacy with professionally installed premium films.",
    // Dark tinted car window close-up
    image: "https://i.postimg.cc/wTJJZK8j/Gemini-Generated-Image-bv1hvzbv1hvzbv1h.png",
  },
  {
    id: 4,
    index: "04",
    title: "Car Accessories",
    description: "Bespoke additions to enhance and personalise your driving experience.",
    // Luxury Porsche / premium car accessories angle
    image: "https://i.postimg.cc/zBvTvKGp/Jul-5-2026-10-52-47-AM.png",
  },
  {
    id: 5,
    index: "05",
    title: "PPF / Ceramic Works",
    description: "Ultimate paint protection film and long-lasting ceramic coatings.",
    // PPF vinyl wrap being applied on car panel
    image: "https://i.postimg.cc/X7SxH1JF/Gemini-Generated-Image-jukf07jukf07jukf.png",
  },
  {
    id: 6,
    index: "06",
    title: "Face Lift",
    description: "Modern aesthetic upgrades and precision body kit styling.",
    // Aggressive sporty car front angle / body kit
    image: "https://i.postimg.cc/sDs7Gkxc/Gemini-Generated-Image-ty7i5cty7i5cty7i.png",
  },
  {
    id: 7,
    index: "07",
    title: "Upholstery Work",
    description: "Premium leather restoration and custom interior stitching by hand.",
    // Luxury leather car seat close-up stitching
    image: "https://i.postimg.cc/MKJ27DJY/Gemini-Generated-Image-uecqeguecqeguecq.png",
  },
  {
    id: 8,
    index: "08",
    title: "Nano Ceramic",
    description: "Advanced surface protection technology for a lasting mirror-like finish.",
    // Ultra-glossy mirror-like car paint reflection
    image: "https://i.postimg.cc/Y21yHBTh/Gemini-Generated-Image-3ehz3t3ehz3t3ehz.png",
  },
  {
    id: 9,
    index: "09",
    title: "Car Polishing",
    description: "Professional paint correction and gloss enhancement for showroom results.",
    // Polishing/buffing machine being used on car hood
    image: "https://i.postimg.cc/MGqp9wkd/Chat-GPT-Image-Jul-5-2026-11-16-55-AM.png",
  },
];

const TOTAL = SERVICES.length;

// ─────────────────────────────────────────────
// Sub-Component: Service Card (right panel)
// ─────────────────────────────────────────────
function ServiceCard({ service }: { service: (typeof SERVICES)[0] }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      {/* Index */}
      <div className="mb-6">
        <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
          {service.index}
        </span>
      </div>

      {/* Title */}
      <h2 className="bebas-font text-white uppercase leading-[0.9] mb-5 text-[clamp(3rem,7vw,5.5rem)]">
        {service.title}
      </h2>

      {/* Description */}
      <p className="dm-sans text-white/45 font-light italic leading-relaxed text-[clamp(0.9rem,1.5vw,1.05rem)] max-w-sm mb-9">
        {service.description}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Sub-Component: Service Image (full-bleed bg)
// ─────────────────────────────────────────────
function ServiceImage({ service }: { service: (typeof SERVICES)[0] }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0"
    >
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.5) saturate(0.8)" }}
      />
      {/* Left-to-right fade: blends image into left panel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(3,3,3,1) 0%, rgba(3,3,3,0.75) 35%, rgba(3,3,3,0.15) 70%, rgba(3,3,3,0.05) 100%)",
        }}
      />
      {/* Bottom fade for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(3,3,3,0.65) 0%, transparent 45%)",
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function ScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drive active index from scroll
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(TOTAL - 1, Math.floor(v * TOTAL));
      if (idx !== prevRef.current) {
        prevRef.current = idx;
        setCurrent(idx);
      }
    });
  }, [scrollYProgress]);

  const navigate = useCallback((dir: number) => {
    const next = Math.max(0, Math.min(TOTAL - 1, current + dir));
    setCurrent(next);
  }, [current]);

  return (
    <section className="w-full" style={{ background: "#030303" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }
      `}} />

      {/* Scroll driver */}
      <div ref={containerRef} className="relative w-full" style={{ height: `${TOTAL * 100}vh` }}>
        {mounted && (
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex" style={{ background: "rgba(0,0,0,0.72)" }}>

            {/* ── Full-bleed background image per service ── */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <ServiceImage key={current} service={SERVICES[current]} />
              </AnimatePresence>
            </div>

            {/* ── Ambient orbs ── */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/7 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-800/5 blur-[100px]" />
            </div>

            {/* ══════════════════════════════
                LEFT PANEL
            ══════════════════════════════ */}
            <div className="relative z-20 w-[42%] flex flex-col justify-between px-10 py-12 shrink-0 items-center">

              {/* Top branding */}
              <div className="flex flex-col gap-1 w-full" />

              {/* Counter — centered */}
              <div className="py-10 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p
                      className="bebas-font text-white leading-[0.85]"
                      style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
                    >
                      {String(current + 1).padStart(2, "0")}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <p className="bebas-font text-white/20" style={{ fontSize: "clamp(1rem,2.5vw,2rem)" }}>
                  / {String(TOTAL).padStart(2, "0")}
                </p>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={current + "-label"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="dm-sans text-[11px] tracking-[0.35em] uppercase text-white/40 mt-4"
                  >
                    {SERVICES[current].title}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === current ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "9999px",
                      background: i === current ? "#f60" : "rgba(255,100,0,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ══════════════════════════════
                RIGHT PANEL
            ══════════════════════════════ */}
            <div className="relative z-20 flex-1 flex flex-col px-12 py-12 md:px-14">

              {/* Top nav arrows */}
              <div className="flex justify-end gap-2 mb-auto">
                <button
                  onClick={() => navigate(-1)}
                  disabled={current === 0}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none"
                >
                  ↑
                </button>
                <button
                  onClick={() => navigate(1)}
                  disabled={current === TOTAL - 1}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none"
                >
                  ↓
                </button>
              </div>

              {/* Card area */}
              <div className="relative flex-1">
                <AnimatePresence mode="wait">
                  <ServiceCard key={current} service={SERVICES[current]} />
                </AnimatePresence>
              </div>

              {/* Bottom footer */}
              <div className="flex items-center justify-between mt-auto pt-6" />
            </div>

          </div>
        )}
      </div>
    </section>
  );
}