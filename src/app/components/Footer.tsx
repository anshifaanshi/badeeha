import React from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
// EDIT THESE WITH YOUR REAL DETAILS
// ─────────────────────────────────────────────
const BRAND = "Badeeha"; // change if you want "UpHolsery Works" here
const TAGLINE = "Car care, upholstery and outdoor shading in Doha, Qatar.";
const WHATSAPP_NUMBER = "97400000000"; // country code + number, no "+" or spaces
const PHONE_DISPLAY = "+974 0000 0000";
const EMAIL = "info@yourdomain.com";
const ADDRESS = "Doha, Qatar";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Car Care", href: "/services#interior-cleaning" },
  { label: "PPF / Ceramic Works", href: "/services#ppf-ceramic-works" },
  { label: "Vehicle Upholstery", href: "/services#vehicle-upholstery" },
  { label: "Sofas & Majlis", href: "/services#majlis-work" },
  { label: "Parking Shades", href: "/services#car-parking-shade" },
];

const linkClass =
  "dm-sans text-sm font-light text-white/45 hover:text-orange-500 transition-colors duration-300";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#030303" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }
      `,
        }}
      />

      {/* Orange top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[60%] rounded-full bg-orange-600/7 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-5%] w-[35%] h-[50%] rounded-full bg-orange-800/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-14 pt-20 pb-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/" className="bebas-font text-white uppercase text-4xl md:text-5xl leading-none hover:text-orange-500 transition-colors duration-300">
            {BRAND}
          </Link>
          <p className="dm-sans text-white/45 font-light italic leading-relaxed text-sm max-w-sm mt-4">
            {TAGLINE}
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center mb-16">
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold mb-6">
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold mb-6">
              SERVICES
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold mb-6">
              CONTACT
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-words`}>
                  {EMAIL}
                </a>
              </li>
              <li className="dm-sans text-sm font-light text-white/45">{ADDRESS}</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-16">
         
<a
  href="https://wa.me/97452037373"
  target="_blank"
  rel="noopener noreferrer"
  className="dm-sans inline-flex items-center px-8 py-4 rounded-full border border-orange-500 text-orange-500 text-[11px] tracking-[0.3em] uppercase hover:bg-orange-500 hover:text-black transition-all duration-300"
>
  Chat on WhatsApp
</a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-2 text-center">
          <p className="dm-sans text-[11px] tracking-[0.2em] uppercase text-white/30">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}