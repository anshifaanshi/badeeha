"use client";

import { motion } from "framer-motion";

const LINKS = ["About Us", "Services", "Book Now", "Contact"];
const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok",    href: "#" },
  { label: "WhatsApp",  href: "#" },
  { label: "Facebook",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
          .bebas-font { font-family: 'Bebas Neue', sans-serif; }
          .dm-sans    { font-family: 'DM Sans', sans-serif; }
        `,
      }} />

      {/* ── DIVIDER ── */}
      <div className="w-full h-[1px] bg-white/5" />

      {/* ── BOTTOM ROW ── */}
      <div className="px-6 sm:px-12 md:px-20 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Left — tagline + copyright */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <p className="dm-sans text-zinc-400 text-sm font-light tracking-wide">
            Premium Car Care · Doha, Qatar
          </p>
          <p className="dm-sans text-zinc-700 text-[11px] tracking-wide font-light">
            © {new Date().getFullYear()} Adeeha. All rights reserved.
          </p>
        </motion.div>

        {/* Center — nav */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-x-8 gap-y-3"
        >
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="dm-sans text-xs text-zinc-500 font-medium tracking-widest uppercase hover:text-orange-500 transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </motion.div>

        {/* Right — socials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-5"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="dm-sans text-[11px] text-zinc-600 font-medium tracking-wide hover:text-orange-500 transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}