"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const SERVICES = [
  { id: 1, index: "01", title: "Nano Ceramic",       description: "Advanced surface protection for a mirror-like finish." },
  { id: 2, index: "02", title: "Car Polishing",      description: "Professional paint correction and gloss enhancement." },
  { id: 3, index: "03", title: "Interior Cleaning",  description: "Deep sanitization and premium detailing." },
  { id: 4, index: "04", title: "Glass Tinting",      description: "Heat rejection and privacy with premium films." },
  { id: 5, index: "05", title: "Car Accessories",    description: "Bespoke additions to enhance your driving experience." },
  { id: 6, index: "06", title: "PPF / Ceramic Works",description: "Ultimate paint protection film and ceramic coatings." },
  { id: 7, index: "07", title: "Face Lift",          description: "Modern aesthetic upgrades and body kit styling." },
  { id: 8, index: "08", title: "Upholstery Work",    description: "Premium leather restoration and custom interior stitching." },
];

const TOTAL = SERVICES.length;
const SLICE = 1 / TOTAL;

// ─────────────────────────────────────────────
// Progress Dot
// ─────────────────────────────────────────────
function ProgressDot({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const start = index * SLICE;
  const mid   = start + SLICE / 2;
  const end   = (index + 1) * SLICE;

  const dotOpacity = useTransform(scrollYProgress, [start, mid, end], [0.3, 1, 0.3]);
  const dotScale   = useTransform(scrollYProgress, [start, mid, end], [0.8, 1.3, 0.8]);

  return (
    <motion.div
      style={{ opacity: dotOpacity, scale: dotScale }}
      className="w-1.5 h-1.5 rounded-full bg-orange-500"
    />
  );
}

// ─────────────────────────────────────────────
// Service Card
// ─────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  scrollYProgress,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast  = index === TOTAL - 1;

  // Each card "owns" one SLICE of scroll [start … end].
  const start = index * SLICE;
  const end   = (index + 1) * SLICE;

  //
  // KEY IDEA for "old card fades AFTER new one arrives":
  //
  // The NEW card fades IN during the first 30% of the slice  → [start … start+0.3s]
  // Both cards are fully visible for a brief overlap          → [start+0.3s … start+0.5s]
  // The OLD card (index-1) fades OUT during [start+0.3s … start+0.6s]
  //   — but we control that from THIS card's perspective as its own fade-out.
  //
  // So for card[i]:
  //   Fade-IN  window : [start,        start + SLICE*0.30]   0 → 1
  //   Hold-full window: [start+0.30s,  end   - SLICE*0.35]   1 → 1
  //   Fade-OUT window : [end - 0.35s,  end   - SLICE*0.05]   1 → 0
  //   (last card never fades out; first card starts visible)

  const fadeInEnd   = start + SLICE * 0.30;
  const holdEnd     = end   - SLICE * 0.35;
  const fadeOutEnd  = end   - SLICE * 0.05;

  // Build input range — must be strictly increasing
  const range = [start, fadeInEnd, holdEnd, fadeOutEnd, end];

  const opacityOutput = [
    isFirst ? 1 : 0,   // before this card's slice: first card is already visible, others are not
    1,                  // fully faded in (30% through slice)
    1,                  // still holding
    isLast  ? 1 : 0,   // faded out (95% through slice); last card stays visible
    isLast  ? 1 : 0,
  ];

  const scaleOutput = [
    isFirst ? 1 : 0.94,
    1,
    1,
    isLast ? 1 : 0.94,
    isLast ? 1 : 0.94,
  ];

  const yOutput = [
    isFirst ? 0 : 28,
    0,
    0,
    isLast ? 0 : -28,
    isLast ? 0 : -28,
  ];

  const opacity = useTransform(scrollYProgress, range, opacityOutput);
  const scale   = useTransform(scrollYProgress, range, scaleOutput);
  const y       = useTransform(scrollYProgress, range, yOutput);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pointer-events-none z-20"
    >
      <div className="w-full max-w-4xl pointer-events-auto">

        {/* Counter + rule */}
        <div className="flex items-center gap-4 mb-6 md:mb-10">
          <span className="font-mono text-xs tracking-[0.25em] text-orange-500 whitespace-nowrap">
            {service.index} / {String(TOTAL).padStart(2, "0")}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/60 to-transparent" />
        </div>

        {/* Title */}
        <h2 className="bebas-font font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,10vw,7rem)] mb-6 uppercase">
          {service.title}
        </h2>

        {/* Description */}
        <p className="dm-sans text-zinc-400 font-light leading-relaxed text-[clamp(1rem,1.5vw,1.25rem)] max-w-xl tracking-wide">
          {service.description}
        </p>

        {/* CTA */}
        <div className="mt-8 md:mt-12">
          <button className="dm-sans group inline-flex items-center gap-3 border border-white/20 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
            Learn More
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function ScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="w-full bg-black">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
          .bebas-font { font-family: 'Bebas Neue', sans-serif; }
          .dm-sans    { font-family: 'DM Sans', sans-serif; }
        `,
      }} />

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${TOTAL * 100}vh` }}
      >
        {mounted && (
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

            {/* Ambient glows */}
            <div
              className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.15] blur-[120px] pointer-events-none"
              style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.1] blur-[120px] pointer-events-none"
              style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }}
            />

            {/* Progress dots */}
            <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
              {SERVICES.map((_, i) => (
                <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>

            {/* Top label */}
            <div className="absolute top-10 left-6 sm:left-12 md:left-20 z-30">
              <span className="dm-sans text-[10px] tracking-[0.5em] uppercase text-orange-500/80 font-bold">
                Our Services
              </span>
            </div>

            {/* Cards stack */}
            <div className="relative w-full h-full z-20">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}