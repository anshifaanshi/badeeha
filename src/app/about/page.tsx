"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BRAND = "Badeeha"; // change if you want "UpHolsery Works" here

const HERO_IMAGE = "https://i.postimg.cc/MGqp9wkd/Chat-GPT-Image-Jul-5-2026-11-16-55-AM.png";
const STORY_IMAGE = "https://i.postimg.cc/W3Dk8S0x/Warm-Minimalist-Luxury-Living-Room.png";

const GROUPS = [
  {
    title: "Car Care",
    text: "Cleaning, polishing, tinting, ceramic coating, paint protection film, accessories and body styling.",
    href: "/services#interior-cleaning",
    image: "https://i.postimg.cc/MGqp9wkd/Chat-GPT-Image-Jul-5-2026-11-16-55-AM.png",
  },
  {
    title: "Upholstery & Interiors",
    text: "Vehicle upholstery, sofas, majlis seating, curtains, and hotel and office furniture.",
    href: "/services#upholstery-work",
    image: "https://i.postimg.cc/vHYSqsxS/black-interior-details-modern-luxury-car.jpg",
  },
  {
    title: "Outdoor & Shades",
    text: "Car parking shades and event umbrellas built to last in the Qatar sun.",
    href: "/services#car-parking-shade",
    image: "https://i.postimg.cc/ZqpcY7yv/angled-shot-three-yellow-curved-roofs-city-with-lights-dark-sky.jpg",
  },
];

const VALUES = [
  {
    title: "Craftsmanship",
    text: "Every stitch, film and coating is applied with care. We would rather take longer than leave a flaw.",
  },
  {
    title: "Honest work",
    text: "Clear quotes, straight advice and no unnecessary add-ons. We tell you what you actually need.",
  },
  {
    title: "Lasting results",
    text: "Quality materials and proven methods, so the work looks good long after it leaves our shop.",
  },
];

const PROCESS = [
  { title: "Tell us what you need", text: "Call, message us on WhatsApp or fill in the booking form." },
  { title: "We inspect and quote", text: "We look at your vehicle or space and give you a clear price and timeline." },
  { title: "We do the work", text: "Our team completes the job with the agreed materials and finish." },
  { title: "You approve", text: "We go through the result with you and only finish once you are happy." },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

export default function AboutPage() {
  return (
    
    <main className="w-full min-h-screen" style={{ background: "#030303" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }
      `,
        }}
      />
      <Navbar/>

      {/* ═════════ HERO (dark, image) ═════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 md:px-14 pt-32 pb-24 text-center">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,3,3,0.5) 0%, rgba(3,3,3,0.25) 50%, rgba(3,3,3,1) 100%)",
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
            ABOUT US
          </span>
          <h1 className="bebas-font text-white uppercase leading-[0.88] mt-6 mb-7 text-[clamp(3.5rem,10vw,8rem)]">
            Care for your car.
            <br />
            Craft for your space.
          </h1>
          <p className="dm-sans text-white/60 font-light italic leading-relaxed text-[clamp(0.95rem,1.6vw,1.15rem)] max-w-xl">
            {BRAND} is a Doha-based workshop for car care, upholstery and outdoor shading, built on skilled hands and honest service.
          </p>
        </motion.div>
      </section>

      {/* ═════════ STORY (white) ═════════ */}
      <section className="bg-white px-6 md:px-14 py-24 md:py-32">
        <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
            OUR STORY
          </span>
          <h2 className="bebas-font text-neutral-950 uppercase leading-[0.9] mt-5 mb-8 text-[clamp(2.75rem,7vw,5.5rem)]">
            Built on skilled hands
          </h2>
          <p className="dm-sans text-neutral-600 font-light leading-relaxed text-lg mb-6">
            {BRAND} started with a simple idea: your vehicle and your furniture deserve the same level of attention
            as anything else you value. What began as a small upholstery workshop has grown into a full service
            team covering car detailing, protection and styling, as well as custom interiors for homes, hotels and offices.
          </p>
          <p className="dm-sans text-neutral-500 font-light leading-relaxed">
            Today we work with individual car owners, hotels, restaurants and businesses across Qatar. Whatever the
            size of the job, we treat it with the same care and finish it to the same standard.
          </p>
        </motion.div>

        <motion.div {...reveal} className="max-w-5xl mx-auto mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] shadow-2xl shadow-black/20">
            <img src={STORY_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(3,3,3,0.35) 0%, transparent 45%)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═════════ WHAT WE DO (dark, image cards) ═════════ */}
      <section className="relative overflow-hidden px-6 md:px-14 py-24 md:py-32">
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-800/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              WHAT WE DO
            </span>
            <h2 className="bebas-font text-white uppercase leading-[0.9] mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              Three ways we help
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GROUPS.map((g) => (
              <motion.div key={g.title} {...reveal}>
                <Link
                  href={g.href}
                  className="group relative block overflow-hidden rounded-2xl aspect-[3/4] border border-white/10 hover:border-orange-500 transition-colors duration-300"
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.55) saturate(0.85)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.2) 60%, transparent 100%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-center">
                    <h3 className="bebas-font text-white group-hover:text-orange-500 uppercase text-3xl mb-3 transition-colors duration-300">
                      {g.title}
                    </h3>
                    <p className="dm-sans text-white/55 font-light leading-relaxed text-sm">
                      {g.text}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/services"
              className="dm-sans group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-orange-500 transition-colors duration-300"
            >
              <span className="border-b border-white/20 group-hover:border-orange-500 pb-1 transition-colors duration-300">
                View All Services
              </span>
              <span className="w-9 h-9 rounded-full border border-white/15 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════ VALUES (white) ═════════ */}
      <section className="bg-neutral-100 px-6 md:px-14 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              OUR VALUES
            </span>
            <h2 className="bebas-font text-neutral-950 uppercase leading-[0.9] mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              What we stand for
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                {...reveal}
                className="bg-white rounded-2xl border-t-2 border-orange-500 px-8 py-10 text-center shadow-xl shadow-black/5"
              >
                <h3 className="bebas-font text-neutral-950 uppercase text-3xl mb-4">
                  {v.title}
                </h3>
                <p className="dm-sans text-neutral-500 font-light leading-relaxed text-sm">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ PROCESS (dark) ═════════ */}
      <section className="relative overflow-hidden px-6 md:px-14 py-24 md:py-32">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-600/7 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              HOW IT WORKS
            </span>
            <h2 className="bebas-font text-white uppercase leading-[0.9] mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              Four simple steps
            </h2>
          </motion.div>

          <div className="relative flex flex-col gap-12">
            {/* vertical connector */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-orange-500/50 via-white/10 to-transparent" />

            {PROCESS.map((p, i) => (
              <motion.div key={p.title} {...reveal} className="relative flex flex-col items-center text-center">
                <span
                  className="bebas-font relative z-10 w-12 h-12 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center text-xl mb-5"
                  style={{ background: "#030303" }}
                >
                  {i + 1}
                </span>
                <h3 className="bebas-font text-white uppercase text-2xl md:text-3xl mb-2">
                  {p.title}
                </h3>
                <p className="dm-sans text-white/45 font-light leading-relaxed text-sm max-w-sm">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ CTA (orange band) ═════════ */}
      <section className="bg-orange-500 px-6 md:px-14 py-20 md:py-24 text-center">
        <motion.div {...reveal} className="max-w-2xl mx-auto">
          <h2 className="bebas-font text-black uppercase leading-[0.9] mb-5 text-[clamp(2.75rem,7vw,5.5rem)]">
            Let&apos;s work together
          </h2>
          <p className="dm-sans text-black/70 font-light leading-relaxed max-w-md mx-auto mb-9">
            Book a service or ask us for a quote. We will get back to you quickly.
          </p>
          <Link
            href="/contact"
            className="dm-sans inline-flex items-center px-8 py-4 rounded-full bg-black text-white text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-900 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
        
      </section>
      <Footer/>
    </main>
  );
}