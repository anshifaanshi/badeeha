"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const VALUES = [
  {
    index: "01",
    title: "Precision",
    description:
      "Every detail matters. We treat each vehicle as a masterpiece, applying meticulous care to every surface and finish.",
  },
  {
    index: "02",
    title: "Excellence",
    description:
      "We use only premium-grade materials and cutting-edge techniques to deliver results that exceed expectations.",
  },
  {
    index: "03",
    title: "Passion",
    description:
      "Our love for automobiles drives everything we do — from the first consultation to the final reveal.",
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden" style={{ background: "#ffffff" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
            .bebas-font { font-family: 'Bebas Neue', sans-serif; }
            .dm-sans    { font-family: 'DM Sans', sans-serif; }
          `,
        }}
      />

      {/* ── HERO BLOCK ── */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 py-24 md:py-32">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-orange-500/8 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-400/6 blur-[100px]" />
        </div>

        {/* Decorative vertical text */}
        <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-orange-500/30" />
          <p
            className="dm-sans text-[9px] tracking-[0.5em] uppercase font-bold"
            style={{ writingMode: "vertical-rl", color: "#ff6600" }}
          >
            Badeeha Auto
          </p>
          <div className="w-[1px] h-16 bg-orange-500/30" />
        </div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="dm-sans text-[10px] tracking-[0.5em] uppercase font-bold mb-6"
          style={{ color: "#ff6600" }}
        >
          About Us
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bebas-font leading-[0.88] tracking-tighter text-[clamp(3.5rem,14vw,10rem)]"
            style={{ color: "#111111" }}
          >
            We Are
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bebas-font leading-[0.88] tracking-tighter text-[clamp(3.5rem,14vw,10rem)]"
            style={{ color: "#ff6600" }}
          >
            Badeeha
          </motion.h1>
        </div>

        {/* Animated divider */}
        <div className="w-full h-[1px] mb-10 overflow-hidden" style={{ background: "#e5e5e5" }}>
          <motion.div style={{ width: lineWidth }} className="h-full" css={{ background: "rgba(255,102,0,0.5)" }} />
        </div>

        {/* Description */}
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="dm-sans font-light leading-relaxed text-[clamp(0.95rem,1.8vw,1.15rem)] tracking-wide text-center"
            style={{ color: "#444444" }}
          >
            Founded on a passion for automobiles, Badeeha has been Qatar's
            premier destination for elite car care and accessories. From nano
            ceramic coatings to bespoke upholstery, we transform vehicles into
            expressions of perfection — combining craftsmanship, technology, and
            an obsessive eye for detail.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="dm-sans font-light leading-relaxed text-[clamp(0.85rem,1.5vw,1rem)] tracking-wide text-center"
            style={{ color: "#666666" }}
          >
            Based in Doha, our state-of-the-art facility is staffed by
            certified specialists who share one goal: to deliver a result
            you'll never forget.
          </motion.p>
        </div>
      </div>

      {/* ── VALUES BLOCK ── */}
      <div
        className="relative w-full px-6 sm:px-12 md:px-20 flex flex-col items-center"
        style={{ background: "#f7f7f7", paddingTop: "96px", paddingBottom: "120px" }}
      >

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[100px]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="dm-sans text-[10px] tracking-[0.5em] uppercase font-bold text-center"
          style={{ color: "#ff6600", marginBottom: "64px" }}
        >
          What Drives Us
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto w-full">
          {VALUES.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`group py-10 px-8 text-center flex flex-col items-center ${
                i < VALUES.length - 1
                  ? "border-b md:border-b-0 md:border-r"
                  : ""
              }`}
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-4 mb-6 w-full">
                <div className="flex-1 h-[1px]" style={{ background: "rgba(255,102,0,0.25)" }} />
                <span className="font-mono text-[10px] tracking-[0.3em] font-bold" style={{ color: "#ff6600" }}>
                  {val.index}
                </span>
                <div className="flex-1 h-[1px]" style={{ background: "rgba(255,102,0,0.25)" }} />
              </div>
              <h3
                className="bebas-font text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight mb-4 transition-colors duration-300 group-hover:text-orange-500"
                style={{ color: "#111111" }}
              >
                {val.title}
              </h3>
              <p
                className="dm-sans font-light leading-relaxed text-[clamp(0.85rem,1.5vw,1rem)] tracking-wide"
                style={{ color: "#666666" }}
              >
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}