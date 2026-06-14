"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: "01",
    name: "Khalid Al-Mansoori",
    role: "Porsche 911 Owner",
    review:
      "The nano ceramic coating is simply flawless. Six months on and the car still beads water like the day it left their workshop. Adeeha's attention to detail is unlike anything I've experienced in Qatar.",
    service: "Nano Ceramic",
    avatar: "KA",
    color: "#1a1a2e",
  },
  {
    id: "02",
    name: "Sara Al-Kuwari",
    role: "Range Rover Sport Owner",
    review:
      "I brought my car in looking worn and left with something that felt completely new. The interior detailing was immaculate — every seam, every corner. Worth every riyal without question.",
    service: "Interior Cleaning",
    avatar: "SA",
    color: "#2d1b00",
  },
  {
    id: "03",
    name: "Faisal Al-Thani",
    role: "Mercedes G-Class Owner",
    review:
      "The PPF installation was done with such precision — zero bubbles, perfect edges. My G-Class looks sharper than it did when I drove it off the showroom floor.",
    service: "PPF / Ceramic Works",
    avatar: "FA",
    color: "#0a1628",
  },
  {
    id: "04",
    name: "Noor Al-Rashidi",
    role: "BMW M5 Owner",
    review:
      "The glass tinting they did is exactly what I wanted — dark enough for privacy, light enough to feel open. Professional, fast, and genuinely passionate about their craft.",
    service: "Glass Tinting",
    avatar: "NA",
    color: "#1a0a00",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="w-full bg-white overflow-hidden flex items-center justify-center min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');
          .bebas-font { font-family: 'Bebas Neue', sans-serif; }
          .dm-sans    { font-family: 'DM Sans', sans-serif; }
          .cormorant  { font-family: 'Cormorant Garamond', Georgia, serif; }
        `,
      }} />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 py-20">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="dm-sans text-[10px] tracking-[0.5em] uppercase text-orange-500 font-bold mb-6 text-center"
        >
          Client Stories
        </motion.p>

        {/* Reduced Heading Size */}
        <div className="overflow-hidden mb-16 text-center">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bebas-font text-black leading-tight tracking-tight text-[clamp(2rem,6vw,3.5rem)]"
          >
            What Our <span className="text-orange-500">Clients</span> Say
          </motion.h2>
        </div>

        {/* Content Centered Card */}
        <div className="w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center text-center max-w-2xl"
            >
              {/* Profile Image/Initial */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                style={{ background: current.color }}
              >
                <span className="dm-sans text-white font-bold text-lg tracking-wider">
                  {current.avatar}
                </span>
              </div>

              {/* Review Badge & Stars */}
              <div className="flex flex-col items-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1">
                  <GoogleIcon />
                  <span className="dm-sans text-[9px] text-zinc-500 font-bold tracking-widest uppercase">
                    Google Review
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-orange-500">
                      <path d="M6 0l1.5 4H12L8.5 6.5 10 11 6 8.5 2 11l1.5-4.5L0 4h4.5z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="cormorant italic text-zinc-800 leading-relaxed text-[clamp(1.1rem,2.5vw,1.5rem)] mb-8">
                "{current.review}"
              </p>

              {/* Divider Line */}
              <div className="w-10 h-[1px] bg-orange-500/30 mb-8" />

              {/* Name & Title */}
              <div className="flex flex-col items-center">
                <span className="dm-sans text-black font-bold text-sm tracking-tight mb-1">
                  {current.name}
                </span>
              
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-16">
            <button
              onClick={() => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              <span className="text-lg">←</span>
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? "24px" : "6px",
                    height: "6px",
                    background: active === i ? "#f97316" : "#e5e5e5",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((p) => (p + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}