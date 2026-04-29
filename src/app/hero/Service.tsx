"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const SERVICES = [
  //{ id: 1, index: "02", title: "Car Polishing",      description: "Professional paint correction and gloss enhancement." },
  { id: 2, index: "02", title: "Interior Cleaning",  description: "Deep sanitization and premium detailing." },
  { id: 3, index: "03", title: "Glass Tinting",      description: "Heat rejection and privacy with premium films." },
  { id: 4, index: "04", title: "Car Accessories",    description: "Bespoke additions to enhance your driving experience." },
  { id: 5, index: "05", title: "PPF / Ceramic Works",description: "Ultimate paint protection film and ceramic coatings." },
  { id: 6, index: "06", title: "Face Lift",          description: "Modern aesthetic upgrades and body kit styling." },
  { id: 7, index: "07", title: "Upholstery Work",    description: "Premium leather restoration and custom interior stitching." },
  { id: 8, index: "08", title: "Nano Ceramic",       description: "Advanced surface protection for a mirror-like finish." },
];

const TOTAL = SERVICES.length;

// ─────────────────────────────────────────────
// Sub-Component: Progress Dot
// ─────────────────────────────────────────────
function ProgressDot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / TOTAL;
  const start = index * step;
  const end = (index + 1) * step;
  const opacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.2, 1, 0.2]
  );
  return (
    <motion.div
      style={{ opacity }}
      className="w-1.5 h-1.5 rounded-full bg-orange-500"
    />
  );
}

// ─────────────────────────────────────────────
// Sub-Component: Service Card
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
  const step = 1 / TOTAL;
  const isFirst = index === 0;
  const isLast = index === TOTAL - 1;

  let inputRange: number[];
  let opacityOutput: number[];
  let scaleOutput: number[];
  let yOutput: number[];

  if (isFirst) {
    // First card: starts fully visible at scroll=0, fades out at end of its slot.
    // Key: input range must START at 0 with opacity 1 so Framer Motion
    // knows the initial value is 1, not 0.
    const fadeOutStart = step * 0.7;
    const fadeOutEnd   = step;
    inputRange    = [0,  fadeOutStart, fadeOutEnd];
    opacityOutput = [1,  1,            0          ];
    scaleOutput   = [1,  1,            0.95       ];
    yOutput       = [0,  0,            -20        ];
  } else if (isLast) {
    // Last card: fades in, stays visible forever.
    const start = index * step;
    inputRange    = [start,  start + step * 0.15, 1];
    opacityOutput = [0,      1,                   1];
    scaleOutput   = [0.95,   1,                   1];
    yOutput       = [20,     0,                   0];
  } else {
    // Middle cards: fade in, hold, fade out.
    const start = index * step;
    const end   = (index + 1) * step;
    inputRange    = [start,  start + step * 0.15, end - step * 0.15, end];
    opacityOutput = [0,      1,                   1,                  0  ];
    scaleOutput   = [0.95,   1,                   1,                  0.95];
    yOutput       = [20,     0,                   0,                  -20 ];
  }

  const opacity = useTransform(scrollYProgress, inputRange, opacityOutput);
  const scale   = useTransform(scrollYProgress, inputRange, scaleOutput);
  const y       = useTransform(scrollYProgress, inputRange, yOutput);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        zIndex: TOTAL - index,
        pointerEvents: useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none")),
      }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-20"
    >
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-orange-500 font-bold">
            {service.index}
          </span>
          <div className="flex-1 h-[1px] bg-orange-500/30" />
        </div>

        <h2 className="bebas-font font-black tracking-tighter leading-[0.85] text-white text-[clamp(2.4rem,12vw,7.5rem)] mb-5 uppercase break-words">
          {service.title}
        </h2>

        <p className="dm-sans text-zinc-400 font-light leading-relaxed text-[clamp(0.9rem,1.8vw,1.15rem)] max-w-xl tracking-wide mb-8">
          {service.description}
        </p>

        <button className="dm-sans group inline-flex items-center gap-3 border border-white/20 rounded-full px-6 py-3 md:px-8 md:py-3.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
          Learn More
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="w-full bg-black">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
            .bebas-font { font-family: 'Bebas Neue', sans-serif; }
            .dm-sans    { font-family: 'DM Sans', sans-serif; }
          `,
        }}
      />

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${TOTAL * 100}vh` }}
      >
        {mounted && (
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black flex flex-col justify-center">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-600/10 blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-800/10 blur-[100px]" />
            </div>

            {/* Top Branding */}
            <div className="absolute top-8 md:top-12 left-6 sm:left-12 md:left-20 z-50">
              <p className="dm-sans text-[10px] tracking-[0.5em] uppercase text-orange-500 font-bold">
                Premium Detailing
              </p>
            </div>

            {/* Sidebar Navigation */}
            <div className="fixed right-5 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
              {SERVICES.map((_, i) => (
                <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>

            {/* Cards Stack */}
            <div className="relative w-full h-full max-h-[900px]">
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