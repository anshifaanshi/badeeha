"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─────────────────────────────────────────────
// EDIT THESE WITH YOUR REAL DETAILS
// ─────────────────────────────────────────────
const WHATSAPP_NUMBER = "97452037373"; // country code + number, no "+" or spaces
const PHONE_DISPLAY = "+97477078424";
const EMAIL = "info@yourdomain.com";
const ADDRESS = "Doha, Qatar";
const MAP_QUERY = "Doha, Qatar"; // replace with your exact address for a precise pin
const HOURS = [
  { day: "Saturday – Thursday", time: "8:00 AM – 10:00 PM" },
  { day: "Friday", time: "4:00 PM – 10:00 PM" },
];

const HERO_IMAGE = "https://i.postimg.cc/X7SxH1JF/Gemini-Generated-Image-jukf07jukf07jukf.png";

const SERVICE_OPTIONS = [
  "Interior Cleaning",
  "Glass Tinting",
  "Car Accessories",
  "PPF / Ceramic Works",
  "Face Lift",
  "Upholstery Work",
  "Nano Ceramic",
  "Car Polishing",
  "Hotel Upholstery",
  "Majlis Work",
  "Vehicle Upholstery",
  "Car Parking Shade",
  "Event Umbrellas",
  "Hotel Dining Chairs",
  "Office Chairs",
  "Curtains",
  "Sofas",
  "Other",
];

const METHODS = [
  {
    title: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9 8.5c.5 3 2.5 5 5.5 5.5l1.2-1.4-2-1-.8.7a4 4 0 0 1-2-2l.7-.8-1-2L9 8.5Z" />
      </svg>
    ),
  },
  {
    title: "Call us",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    ),
  },
  {
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

const inputClass =
  "dm-sans w-full rounded-xl bg-white/5 border border-white/15 px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-colors duration-300";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.phone.trim()) next.phone = "Please enter your phone number";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      "Hello, I would like to make an enquiry.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm({ name: "", phone: "", service: "", message: "" });
  };

  return (
    <main className="w-full min-h-screen" style={{ background: "#030303" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }
        .contact-select option { background: #0a0a0a; color: #fff; }
      `,
        }}
      />

      {/* ═════════ HERO (dark, image) ═════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 md:px-14 pt-32 pb-24 text-center">
        <Navbar/>
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
            CONTACT US
          </span>
          <h1 className="bebas-font text-white uppercase leading-[0.88] mt-6 mb-7 text-[clamp(3.5rem,10vw,8rem)]">
            Let&apos;s talk about
            <br />
            your project
          </h1>
          <p className="dm-sans text-white/60 font-light italic leading-relaxed text-[clamp(0.95rem,1.6vw,1.15rem)] max-w-xl">
            Ask for a quote, book a service or just ask a question. We reply quickly.
          </p>
        </motion.div>
      </section>

      {/* ═════════ QUICK CONTACT (white) ═════════ */}
      <section className="bg-white px-6 md:px-14 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal} className="text-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              GET IN TOUCH
            </span>
            <h2 className="bebas-font text-neutral-950 uppercase leading-[0.9] mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              Reach us directly
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {METHODS.map((m) => (
              <motion.a
                key={m.title}
                {...reveal}
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group bg-neutral-100 hover:bg-neutral-950 rounded-2xl border-t-2 border-orange-500 px-8 py-10 text-center transition-colors duration-300"
              >
                <span className="mx-auto mb-5 w-14 h-14 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center">
                  {m.icon}
                </span>
                <h3 className="bebas-font text-neutral-950 group-hover:text-white uppercase text-3xl mb-2 transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="dm-sans text-neutral-500 group-hover:text-white/60 font-light text-sm break-words transition-colors duration-300">
                  {m.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FORM (dark) ═════════ */}
      <section className="relative overflow-hidden px-6 md:px-14 py-24 md:py-32">
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-800/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-600/7 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              SEND AN ENQUIRY
            </span>
            <h2 className="bebas-font text-white uppercase leading-[0.9] mt-5 mb-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              Book a service
            </h2>
            <p className="dm-sans text-white/45 font-light italic leading-relaxed max-w-md mx-auto">
              Fill in your details and we will continue the conversation on WhatsApp.
            </p>
          </motion.div>

          <motion.form
            {...reveal}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="dm-sans block text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && <p className="dm-sans text-xs text-orange-500 mt-2">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="dm-sans block text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+974 0000 0000"
                  className={inputClass}
                />
                {errors.phone && <p className="dm-sans text-xs text-orange-500 mt-2">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="service" className="dm-sans block text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
                Service
              </label>
              <select
                id="service"
                value={form.service}
                onChange={update("service")}
                className={`${inputClass} contact-select`}
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="dm-sans block text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your vehicle or space"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="dm-sans mt-2 inline-flex items-center justify-center px-8 py-4 rounded-full bg-orange-500 text-black text-[11px] tracking-[0.3em] uppercase hover:bg-orange-400 transition-colors duration-300"
            >
              Send via WhatsApp
            </button>

            {sent && (
              <p className="dm-sans text-sm text-orange-500 text-center">
                Thank you. WhatsApp should open with your message ready to send.
              </p>
            )}
          </motion.form>
        </div>
      </section>

      {/* ═════════ VISIT US (white) ═════════ */}
      <section className="bg-white px-6 md:px-14 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] text-orange-500 font-bold">
              VISIT US
            </span>
            <h2 className="bebas-font text-neutral-950 uppercase leading-[0.9] mt-5 mb-5 text-[clamp(2.75rem,7vw,5.5rem)]">
              Find our workshop
            </h2>
            <p className="dm-sans text-neutral-500 font-light">{ADDRESS}</p>
          </motion.div>

          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[16/8] shadow-2xl shadow-black/20 mb-12"
          >
            <iframe
              title="Our location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: "grayscale(0.85) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            {...reveal}
            className="max-w-md mx-auto bg-neutral-100 rounded-2xl border-t-2 border-orange-500 px-8 py-8 text-center"
          >
            <h3 className="bebas-font text-neutral-950 uppercase text-3xl mb-5">Opening hours</h3>
            <ul className="flex flex-col gap-3">
              {HOURS.map((h) => (
                <li key={h.day} className="dm-sans flex items-center justify-between gap-4 text-sm">
                  <span className="text-neutral-500 font-light">{h.day}</span>
                  <span className="text-neutral-950">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <Footer/>
      </section>
    </main>
  );
}