"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  "Car Polishing",
  "Interior Cleaning",
  "Glass Tinting",
  "Car Accessories",
  "PPF / Ceramic Works",
  "Face Lift",
  "Upholstery Work",
  "Nano Ceramic",
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  carModel: string;
  notes: string;
};

const EMPTY: FormData = {
  name: "", phone: "", email: "",
  service: "", carModel: "", notes: "",
};

function Field({
  label,
  children,
  active,
  full,
}: {
  label: string;
  children: React.ReactNode;
  active: boolean;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${full ? "md:col-span-2" : ""}`}>
      <span className={`dm-sans text-[10px] tracking-[0.4em] uppercase font-bold transition-colors duration-200 ${active ? "text-orange-500" : "text-zinc-600"}`}>
        {label}
      </span>
      <div className="relative">
        {children}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute bottom-0 left-0 h-[1px] bg-orange-500 transition-all duration-300" style={{ width: active ? "100%" : "0%" }} />
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (key: keyof FormData, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.service) return;
    setSubmitted(true);
  };

  const inputCls = "w-full bg-transparent py-2.5 text-white dm-sans text-base font-light tracking-wide outline-none caret-orange-500";

  return (
    <section className="w-full bg-black overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
          .bebas-font { font-family: 'Bebas Neue', sans-serif; }
          .dm-sans    { font-family: 'DM Sans', sans-serif; }
          select option { background: #111; color: white; }
        `,
      }} />

      <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-16 md:px-24 py-28 md:py-36">

        {/* Decorative vertical text */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-orange-500/30" />
          <p className="dm-sans text-[9px] tracking-[0.5em] uppercase text-orange-500/60 font-bold"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Book Now
          </p>
          <div className="w-[1px] h-16 bg-orange-500/30" />
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl"
            >
              {/* Header */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="dm-sans text-[10px] tracking-[0.5em] uppercase text-orange-500 font-bold mb-8 text-center"
              >
                Reserve Your Slot
              </motion.p>

              <div className="overflow-hidden mb-3 text-center">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bebas-font text-white leading-[0.88] tracking-tighter text-[clamp(3.5rem,12vw,8rem)]"
                >
                  Book A
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-16 text-center">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                  className="bebas-font text-orange-500 leading-[0.88] tracking-tighter text-[clamp(3.5rem,12vw,8rem)]"
                >
                  Service
                </motion.h2>
              </div>

              {/* Form Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
              >
                <Field label="Full Name" active={focused === "name"}>
                  <input type="text" value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    className={inputCls} />
                </Field>

                <Field label="Phone Number" active={focused === "phone"}>
                  <input type="tel" value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                    className={inputCls} />
                </Field>

                <Field label="Email Address" active={focused === "email"}>
                  <input type="email" value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    className={inputCls} />
                </Field>

                <Field label="Car Model" active={focused === "carModel"}>
                  <input type="text" value={form.carModel}
                    onChange={(e) => set("carModel", e.target.value)}
                    onFocus={() => setFocused("carModel")} onBlur={() => setFocused(null)}
                    className={inputCls} />
                </Field>

                <Field label="Select Service" active={focused === "service"} full>
                  <select value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                    className={`${inputCls} cursor-pointer`} style={{ colorScheme: "dark" }}>
                    <option value="" disabled hidden></option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="Additional Notes" active={focused === "notes"} full>
                  <textarea value={form.notes} rows={3}
                    onChange={(e) => set("notes", e.target.value)}
                    onFocus={() => setFocused("notes")} onBlur={() => setFocused(null)}
                    className={`${inputCls} resize-none`} />
                </Field>
              </motion.div>

              {/* Divider + Submit */}
              <div className="w-full h-[1px] bg-white/5 mt-14 mb-8" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <p className="dm-sans text-zinc-600 text-xs tracking-widest uppercase text-center sm:text-left">
                  We'll confirm within 24 hours.
                </p>
                <button type="button" onClick={handleSubmit}
                  className="dm-sans group inline-flex items-center gap-4 border border-white/20 rounded-full px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 whitespace-nowrap">
                  Confirm Booking
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </motion.div>
            </motion.div>

          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl flex flex-col items-center text-center gap-10"
            >
              <div className="w-20 h-20 rounded-full border border-orange-500/30 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                  <motion.path d="M8 20 L16 28 L32 12"
                    stroke="rgb(249 115 22)" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }} />
                </svg>
              </div>

              <div className="flex flex-col gap-4">
                <p className="dm-sans text-[10px] tracking-[0.5em] uppercase text-orange-500 font-bold">
                  Booking Received
                </p>
                <h2 className="bebas-font text-white text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-tight">
                  See You Soon,<br />
                  <span className="text-orange-500">{form.name.split(" ")[0]}</span>
                </h2>
                <p className="dm-sans text-zinc-500 font-light leading-relaxed text-sm tracking-wide">
                  Your <span className="text-white">{form.service}</span> appointment has been received.
                  We'll confirm shortly via phone or email.
                </p>
              </div>

              <button type="button" onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                className="dm-sans group inline-flex items-center gap-4 border border-white/20 rounded-full px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
                Book Another
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}