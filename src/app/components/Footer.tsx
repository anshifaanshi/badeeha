"use client";

import { motion } from "framer-motion";

const SERVICES = [
  "Car Polishing",
  "Interior Cleaning",
  "Glass Tinting",
  "PPF / Ceramic Works",
  "Face Lift",
  "Upholstery Work",
  "Nano Ceramic",
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok",    href: "#" },
  { label: "WhatsApp",  href: "#" },
  { label: "Facebook",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
          .bebas-font { font-family: 'Bebas Neue', sans-serif; }
          .dm-sans    { font-family: 'DM Sans', sans-serif; }
        `,
      }} />

      {/* ── BIG CTA BAND ── */}
      
      

       
      {/* ── DIVIDER ── */}
      <div className="w-full h-[1px] bg-white/5" />

      {/* ── MAIN FOOTER GRID ── */}
      <div className="px-6 sm:px-12 md:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 sm:col-span-2 md:col-span-1"
        >
          <div>
            <h3 className="bebas-font text-white text-5xl leading-none tracking-tight">BAdeeha</h3>
            <p className="dm-sans text-zinc-600 text-[10px] tracking-[0.3em] uppercase font-medium mt-1">
              Doha, Qatar
            </p>
          </div>
          <p className="dm-sans text-zinc-600 text-xs font-light leading-relaxed tracking-wide">
            Elite car care and accessories — transforming vehicles since 2012.
          </p>
          <div className="flex flex-col gap-2">
            <span className="dm-sans text-[9px] tracking-[0.3em] uppercase text-zinc-700 font-bold">Follow Us</span>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="dm-sans text-[10px] text-zinc-500 hover:text-orange-500 transition-colors duration-200 font-medium tracking-wide"
                >
                  {s.label.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <p className="dm-sans text-[9px] tracking-[0.4em] uppercase text-orange-500 font-bold">Services</p>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#" className="dm-sans text-xs text-zinc-500 font-light tracking-wide hover:text-white transition-colors duration-200">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-5"
        >
          <p className="dm-sans text-[9px] tracking-[0.4em] uppercase text-orange-500 font-bold">Company</p>
          <ul className="flex flex-col gap-3">
            {["About Us", "Our Team", "Careers", "Privacy Policy"].map((s) => (
              <li key={s}>
                <a href="#" className="dm-sans text-xs text-zinc-500 font-light tracking-wide hover:text-white transition-colors duration-200">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          <p className="dm-sans text-[9px] tracking-[0.4em] uppercase text-orange-500 font-bold">Contact</p>
          <ul className="flex flex-col gap-4">
            {[
              { label: "Phone",  value: "+974 0000 0000" },
              { label: "Email",  value: "hello@adeeha.qa" },
              { label: "Hours",  value: "Sat–Thu 8AM–8PM" },
            ].map((c) => (
              <li key={c.label} className="flex flex-col gap-0.5">
                <span className="dm-sans text-[9px] tracking-[0.3em] uppercase text-zinc-700 font-bold">{c.label}</span>
                <span className="dm-sans text-xs text-zinc-500 font-light tracking-wide">{c.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/5 px-6 sm:px-12 md:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="dm-sans text-[10px] text-zinc-700 tracking-wide font-light">
          © {new Date().getFullYear()} Adeeha Auto Detailing. All rights reserved.
        </p>
        <p className="dm-sans text-[10px] text-zinc-700 tracking-wide font-light">
          Crafted with precision in Doha 🇶🇦
        </p>
      </div>
    </footer>
  );
}