// lib/services.ts  — single source of truth for the home slider AND the service pages
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MouseFogEffect from "../components/MouseFogEffect";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Category = "all" | "automotive" | "upholstery" | "outdoor";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "automotive", label: "Automotive" },
  { key: "upholstery", label: "Upholstery & Interiors" },
  { key: "outdoor", label: "Outdoor & Shades" },
];

const SERVICES = [
  {
    id: 2,
    index: "02",
    slug: "interior-cleaning",
    category: "automotive" as const,
    title: "Interior Cleaning",
    description: "Deep sanitization and premium detailing for every surface inside your vehicle.",
    details:
      "We clean every surface inside your car, from seats and carpets to the headliner, dashboard and door panels. Stains, odours and built-up dirt are removed with professional-grade products that are safe for leather, fabric and plastics.",
    highlights: ["Steam and deep extraction", "Leather and fabric safe products", "Odour and bacteria removal", "Dashboard and panel detailing"],
    image: "https://i.postimg.cc/C1QLLK8r/Gemini-Generated-Image-xzkgg1xzkgg1xzkg.png",
  },
  {
    id: 3,
    index: "03",
    slug: "glass-tinting",
    category: "automotive" as const,
    title: "Glass Tinting",
    description: "Heat rejection and privacy with professionally installed premium films.",
    details:
      "Premium window films fitted with precision to keep your cabin cooler and more private. Our installers cut and apply each film for a clean, bubble-free finish that lasts.",
    highlights: ["High heat rejection films", "UV protection", "Bubble-free installation", "Multiple shade options"],
    image: "https://i.postimg.cc/wTJJZK8j/Gemini-Generated-Image-bv1hvzbv1hvzbv1h.png",
  },
  {
    id: 4,
    index: "04",
    slug: "car-accessories",
    category: "automotive" as const,
    title: "Car Accessories",
    description: "Bespoke additions to enhance and personalise your driving experience.",
    details:
      "From interior comfort upgrades to exterior styling parts, we supply and fit accessories that suit your vehicle and your taste, all installed neatly with no damage to the original finish.",
    highlights: ["Supply and fitting", "Interior and exterior options", "Model-specific parts", "Clean, damage-free installation"],
    image: "https://i.postimg.cc/zBvTvKGp/Jul-5-2026-10-52-47-AM.png",
  },
  {
    id: 5,
    index: "05",
    slug: "ppf-ceramic-works",
    category: "automotive" as const,
    title: "PPF / Ceramic Works",
    description: "Ultimate paint protection film and long-lasting ceramic coatings.",
    details:
      "Protect your paint from stone chips, scratches and fading. Paint protection film absorbs impact while ceramic coating adds a hard, glossy, water-repellent layer on top.",
    highlights: ["Self-healing protection film", "Hydrophobic ceramic layer", "Full or partial coverage", "Long-term warranty options"],
    image: "https://i.postimg.cc/X7SxH1JF/Gemini-Generated-Image-jukf07jukf07jukf.png",
  },
  {
    id: 6,
    index: "06",
    slug: "face-lift",
    category: "automotive" as const,
    title: "Face Lift",
    description: "Modern aesthetic upgrades and precision body kit styling.",
    details:
      "Give an older car a current look with new bumpers, grilles, lights and body kits. We handle the fitment, alignment and finish so the upgrade looks factory-made.",
    highlights: ["Body kit fitting", "Bumper and grille upgrades", "Light conversions", "Paint-matched finishing"],
    image: "https://i.postimg.cc/sDs7Gkxc/Gemini-Generated-Image-ty7i5cty7i5cty7i.png",
  },
  {
    id: 7,
    index: "07",
    slug: "upholstery-work",
    category: "upholstery" as const,
    title: "Upholstery Work",
    description: "Premium leather restoration and custom interior stitching by hand.",
    details:
      "Worn seats, cracked leather and torn fabric restored or replaced by skilled craftsmen. We stitch by hand and match colours, patterns and textures closely.",
    highlights: ["Leather restoration", "Hand stitching", "Colour and pattern matching", "Repair and full replacement"],
    image: "https://i.postimg.cc/MKJ27DJY/Gemini-Generated-Image-uecqeguecqeguecq.png",
  },
  {
    id: 8,
    index: "08",
    slug: "nano-ceramic",
    category: "automotive" as const,
    title: "Nano Ceramic",
    description: "Advanced surface protection technology for a lasting mirror-like finish.",
    details:
      "A nano-ceramic coating bonds with the surface to protect against dirt, water spots, UV and light chemical damage, and makes washing the car much easier.",
    highlights: ["Mirror-like gloss", "Water and dirt repellent", "UV and oxidation protection", "Easier maintenance"],
    image: "https://i.postimg.cc/Y21yHBTh/Gemini-Generated-Image-3ehz3t3ehz3t3ehz.png",
  },
  {
    id: 9,
    index: "09",
    slug: "car-polishing",
    category: "automotive" as const,
    title: "Car Polishing",
    description: "Professional paint correction and gloss enhancement for showroom results.",
    details:
      "Machine polishing removes swirl marks, light scratches and dull patches, restoring depth and shine to the paint. Finished with a protective wax or sealant.",
    highlights: ["Swirl and scratch removal", "Multi-stage paint correction", "Deep gloss restoration", "Wax or sealant finish"],
    image: "https://i.postimg.cc/MGqp9wkd/Chat-GPT-Image-Jul-5-2026-11-16-55-AM.png",
  },
  {
    id: 10,
    index: "10",
    slug: "hotel-upholstery",
    category: "upholstery" as const,
    title: "Hotel Upholstery",
    description: "Durable, elegant upholstery solutions tailored for hotels, lobbies and guest rooms.",
    details:
      "Upholstery for hospitality spaces built to handle heavy daily use while still looking refined. We work with commercial-grade fabrics and leathers and can complete large projects to your schedule.",
    highlights: ["Commercial-grade materials", "Lobby, lounge and room furniture", "Bulk project handling", "Flexible on-site scheduling"],
    image: "https://i.postimg.cc/fytQJQ7L/luxury-lounge-area-hotel-reception.jpg",
  },
  {
    id: 11,
    index: "11",
    slug: "majlis-work",
    category: "upholstery" as const,
    title: "Majlis Work",
    description: "Traditional and modern majlis seating crafted with refined comfort and detail.",
    details:
      "Custom majlis seating made to fit your room exactly, in traditional or contemporary styles. We build the frames, choose the cushioning and finish with quality fabrics.",
    highlights: ["Made-to-measure seating", "Traditional and modern styles", "Comfort-focused cushioning", "Wide fabric selection"],
    image: "https://i.postimg.cc/MK5gqT8K/contemporary-house-interior-design-(1).jpg",
  },
  {
    id: 12,
    index: "12",
    slug: "vehicle-upholstery",
    category: "automotive" as const,
    title: "Vehicle Upholstery",
    description: "Custom seat covers, leather finishing and complete interior re-trims for any vehicle.",
    details:
      "Full or partial interior re-trims for cars, SUVs and commercial vehicles. Choose from leather and fabric options with custom colours, stitching and patterns.",
    highlights: ["Custom seat covers", "Full interior re-trim", "Leather finishing", "Custom stitching patterns"],
    image: "https://i.postimg.cc/vHYSqsxS/black-interior-details-modern-luxury-car.jpg",
  },
  {
    id: 13,
    index: "13",
    slug: "car-parking-shade",
    category: "outdoor" as const,
    title: "Car Parking Shade",
    description: "Strong, weather-resistant parking shades that protect your vehicles from sun and heat.",
    details:
      "Parking shades for homes, offices and commercial sites. Built with strong frames and weather-resistant fabric to keep vehicles cooler and protect the paint from sun damage.",
    highlights: ["Sturdy steel structure", "UV and weather-resistant fabric", "Custom sizes and shapes", "Professional installation"],
    image: "https://i.postimg.cc/ZqpcY7yv/angled-shot-three-yellow-curved-roofs-city-with-lights-dark-sky.jpg",
  },
  {
    id: 14,
    index: "14",
    slug: "event-umbrellas",
    category: "outdoor" as const,
    title: "Event Umbrellas",
    description: "Stylish, sturdy umbrellas and canopies for events, outdoor venues and gatherings.",
    details:
      "Large umbrellas and canopies for events, restaurants, resorts and outdoor venues. Stable in wind, easy to set up and available in a range of colours and sizes.",
    highlights: ["Wind-stable construction", "Various sizes and colours", "Suitable for events and venues", "Supply and installation"],
    image: "https://i.postimg.cc/SsVcjwQm/pure-relaxation-luxurious-resort-trawangan-indonesia.jpg",
  },
  {
    id: 15,
    index: "15",
    slug: "hotel-dining-chairs",
    category: "upholstery" as const,
    title: "Hotel Dining Chairs",
    description: "Comfortable, long-lasting dining chairs designed for hotels and restaurants.",
    details:
      "Dining chairs made or re-upholstered for hotels and restaurants. We focus on comfort for guests and durability for staff, with easy-clean finishes.",
    highlights: ["New builds and re-upholstery", "Easy-clean fabrics and leathers", "Consistent finish across large sets", "Fast turnaround"],
    image: "https://i.postimg.cc/zGWWTLD9/indoor-with-elegant-wooden-dining-table-chairs.jpg",
  },
  {
    id: 16,
    index: "16",
    slug: "office-chairs",
    category: "upholstery" as const,
    title: "Office Chairs",
    description: "Ergonomic office chair upholstery and repair for comfort through the working day.",
    details:
      "We repair and re-upholster office chairs so they stay comfortable and presentable. Worn foam, torn covers and damaged mechanisms can be fixed without buying new.",
    highlights: ["Foam and cover replacement", "Mechanism repair", "Ergonomic support restoration", "Bulk office orders"],
    image: "https://i.postimg.cc/ZnCvnnDD/office-chair-still-life.jpg",
  },
  {
    id: 17,
    index: "17",
    slug: "curtains",
    category: "upholstery" as const,
    title: "Curtains",
    description: "Custom-made curtains in premium fabrics, designed and fitted to suit your space.",
    details:
      "Curtains measured, made and fitted for your windows. Choose from premium fabrics in sheer, blackout and layered styles that match your interior.",
    highlights: ["Free measuring", "Sheer and blackout options", "Premium fabric range", "Rails, tracks and fitting"],
    image: "https://i.postimg.cc/PJpNhcP4/stylish-living-room-with-natural-light-curtains-minimalist-design.jpg",
  },
  {
    id: 18,
    index: "18",
    slug: "sofas",
    category: "upholstery" as const,
    title: "Sofas",
    description: "Bespoke sofas and sofa re-upholstery built for comfort, style and durability.",
    details:
      "Custom-built sofas in the size, shape and fabric you choose, or give your existing sofa new life with fresh upholstery and rebuilt cushions.",
    highlights: ["Custom design and sizing", "Re-upholstery and cushion rebuild", "Quality frames and foam", "Fabric and leather options"],
    image: "https://i.postimg.cc/W3Dk8S0x/Warm-Minimalist-Luxury-Living-Room.png",
  },
];

// ─────────────────────────────────────────────
// Sub-Component: Single detailed service row
// ─────────────────────────────────────────────
function ServiceRow({
  service,
  flip,
}: {
  service: (typeof SERVICES)[0];
  flip: boolean;
}) {
  return (
    
    <motion.article
      id={service.slug}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] scroll-mt-28 border-t border-white/10"
    >
      {/* Image side */}
      <div
        className={`relative h-[45vh] lg:h-auto overflow-hidden ${
          flip ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Navbar/>
        
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.8)" }}
        />
        {/* Fade toward the text side */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: flip
              ? "linear-gradient(to right, rgba(3,3,3,1) 0%, rgba(3,3,3,0.6) 25%, rgba(3,3,3,0.1) 70%, rgba(3,3,3,0.05) 100%)"
              : "linear-gradient(to left, rgba(3,3,3,1) 0%, rgba(3,3,3,0.6) 25%, rgba(3,3,3,0.1) 70%, rgba(3,3,3,0.05) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(3,3,3,0.75) 0%, transparent 50%)",
          }}
        />
        {/* Big index */}
        <span className="bebas-font absolute bottom-4 left-6 lg:bottom-8 lg:left-10 text-white/15 leading-none text-[clamp(5rem,12vw,10rem)] select-none">
          {service.index}
        </span>
      </div>

      {/* Content side */}
      <div
        className={`relative flex flex-col justify-center px-6 py-12 md:px-14 lg:px-16 ${
          flip ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold mb-6">
          {service.index}
        </span>

        <h2 className="bebas-font text-white uppercase leading-[0.9] mb-5 text-[clamp(2.75rem,6vw,5rem)]">
          {service.title}
        </h2>

        <p className="dm-sans text-white/60 font-light italic leading-relaxed text-[clamp(0.95rem,1.5vw,1.1rem)] max-w-md mb-5">
          {service.description}
        </p>

        <p className="dm-sans text-white/40 font-light leading-relaxed text-sm max-w-md mb-8">
          {service.details}
        </p>

        {/* Highlights */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-lg mb-10">
          {service.highlights.map((h) => (
            <li key={h} className="dm-sans flex items-start gap-3 text-[13px] text-white/70">
              <span className="mt-[9px] block w-4 h-px bg-orange-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href={`/services/${service.slug}`}
            className="dm-sans group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-orange-500 transition-colors duration-300"
          >
            <span className="border-b border-white/20 group-hover:border-orange-500 pb-1 transition-colors duration-300">
              View Details
            </span>
            <span className="w-9 h-9 rounded-full border border-white/15 group-hover:border-orange-500 flex items-center justify-center transition-all duration-300">
              →
            </span>
          </Link>

          <Link
            href="/contact"
            className="dm-sans inline-flex items-center px-6 py-3 rounded-full border border-orange-500 text-orange-500 text-[11px] tracking-[0.3em] uppercase hover:bg-orange-500 hover:text-black transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function ServicesPage() {
  const [active, setActive] = useState<Category>("all");

  const list =
    active === "all" ? SERVICES : SERVICES.filter((s) => s.category === active);

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

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden px-6 md:px-14 pt-36 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/7 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-800/5 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
            {String(SERVICES.length).padStart(2, "0")} SERVICES
          </span>
          <h1 className="bebas-font text-white uppercase leading-[0.88] mt-6 mb-6 text-[clamp(3.5rem,11vw,9rem)]">
            Our Services
          </h1>
          <p className="dm-sans text-white/45 font-light italic leading-relaxed text-[clamp(0.95rem,1.6vw,1.15rem)] max-w-xl">
            Car care, upholstery and outdoor solutions, all handled by one team with the same attention to detail.
          </p>
        </div>
      </section>

      {/* ───────── Filter bar ───────── */}
      <div className="sticky top-0 z-30 border-y border-white/10 backdrop-blur-md" style={{ background: "rgba(3,3,3,0.88)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-14 py-4 flex gap-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`dm-sans shrink-0 px-5 py-2 rounded-full border text-[11px] tracking-[0.25em] uppercase transition-all duration-300 ${
                active === c.key
                  ? "bg-orange-500 border-orange-500 text-black"
                  : "border-white/15 text-white/50 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────── Service rows ───────── */}
      <section>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {list.map((service, i) => (
              <ServiceRow key={service.id} service={service} flip={i % 2 === 1} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ───────── Bottom CTA ───────── */}
      <section className="relative border-t border-white/10 px-6 md:px-14 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[50%] h-[60%] rounded-full bg-orange-600/7 blur-[120px]" />
        </div>
        <div className="relative z-10">
          <h2 className="bebas-font text-white uppercase leading-[0.9] mb-5 text-[clamp(2.5rem,7vw,5.5rem)]">
            Not sure what you need?
          </h2>
          <p className="dm-sans text-white/45 font-light italic leading-relaxed max-w-md mx-auto mb-9">
            Tell us about your vehicle or space and we will recommend the right service.
          </p>
          <Link
            href="/contact"
            className="dm-sans inline-flex items-center gap-3 px-8 py-4 rounded-full bg-orange-500 text-black text-[11px] tracking-[0.3em] uppercase hover:bg-orange-400 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
        <Footer/>
      </section>
    </main>
  );
}