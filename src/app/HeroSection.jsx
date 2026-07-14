"use client";

import { useState, useEffect, useRef } from "react";

const VIDEOS = ["/carfacelifting.mp4", "/cartransition.mp4", "/carinterior.mp4", "/car.mp4"];
const FADE_MS = 1000;

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const videoRefs = useRef([]);
  const transitioningRef = useRef(false); // stable ref to avoid stale closure
  const fadeTimerRef = useRef(null);

  const goToNext = (fromIdx) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTransitioning(true);

    const next = (fromIdx + 1) % VIDEOS.length;

    // Start playing next video immediately
    const nextVid = videoRefs.current[next];
    if (nextVid) {
      nextVid.muted = true;
      nextVid.currentTime = 0;
      nextVid.play().catch(() => {});
    }

    setNextIdx(next);

    fadeTimerRef.current = setTimeout(() => {
      // Pause old
      const oldVid = videoRefs.current[fromIdx];
      if (oldVid) oldVid.pause();

      setActiveIdx(next);
      setNextIdx(null);
      setTransitioning(false);
      transitioningRef.current = false;
    }, FADE_MS);
  };

  // Play first video on mount
  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      first.muted = true;
      first.play().catch(() => {});
    }
    return () => { if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current); };
  }, []);

  // Attach timeupdate to detect near-end (more reliable than "ended")
  useEffect(() => {
    const vid = videoRefs.current[activeIdx];
    if (!vid) return;

    const handleTimeUpdate = () => {
      if (!vid.duration) return;
      // Trigger transition 0.3s before video ends
      if (vid.currentTime >= vid.duration - 0.3) {
        goToNext(activeIdx);
      }
    };

    // Also keep "ended" as a fallback
    const handleEnded = () => goToNext(activeIdx);

    vid.addEventListener("timeupdate", handleTimeUpdate);
    vid.addEventListener("ended", handleEnded);

    return () => {
      vid.removeEventListener("timeupdate", handleTimeUpdate);
      vid.removeEventListener("ended", handleEnded);
    };
  }, [activeIdx]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vid-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: opacity;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(44px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .anim-slide-up { animation: slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .anim-fade-in  { animation: fadeIn 1s ease both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }

        .cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f97316; color: #fff;
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: clamp(0.85rem, 2vw, 1rem); letter-spacing: 0.06em;
          text-transform: uppercase; padding: 16px 38px;
          border: none; border-radius: 50px; cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 30px rgba(249,115,22,0.5); text-decoration: none;
        }
        .cta-primary:hover { background: #ea6b0e; transform: scale(1.05); box-shadow: 0 14px 40px rgba(249,115,22,0.65); }
        .cta-primary:active { transform: scale(0.97); }

        .cta-secondary {
          display: inline-flex; align-items: center;
          background: transparent; color: #fff;
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: clamp(0.85rem, 2vw, 1rem); letter-spacing: 0.06em;
          text-transform: uppercase; padding: 15px 36px;
          border: 2px solid rgba(255,255,255,0.6); border-radius: 50px; cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          text-decoration: none;
        }
        .cta-secondary:hover { background: rgba(255,255,255,0.12); border-color: #fff; transform: scale(1.04); }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85); font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.68rem, 1.4vw, 0.76rem); letter-spacing: 0.06em;
          padding: 7px 16px; border-radius: 50px; white-space: nowrap;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #f97316; flex-shrink: 0; }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        .scroll-hint { animation: bounce 2.2s ease-in-out infinite; }

        .badge-strip { display: flex; gap: 10px; justify-content: center; margin-bottom: 44px; }
        .cta-row     { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        @media (min-width: 641px) and (max-width: 1024px) {
          .badge-strip { flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
        }
        @media (max-width: 640px) {
          .badge-strip  { flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
          .cta-row      { flex-direction: column; align-items: center; width: 100%; gap: 10px; }
          .cta-primary, .cta-secondary { width: 100%; justify-content: center; padding: 13px 20px; font-size: 0.75rem; }
          .scroll-hint  { display: none; }
          .badge        { font-size: 0.62rem; padding: 5px 10px; }
        }
        @media (max-width: 370px) {
          .badge-strip  { display: none; }
          .cta-primary, .cta-secondary { padding: 12px 16px; font-size: 0.72rem; }
        }
        @media (max-width: 640px) and (max-height: 700px) {
          .badge-strip { display: none; }
        }
      `}</style>

      <section style={{
        position: "relative", width: "100%", height: "100svh",
        minHeight: "560px", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {/* VIDEO LAYERS */}
        {VIDEOS.map((src, i) => {
          let opacity = 0;
          let zIndex = 0;

          if (i === activeIdx && !transitioning) {
            opacity = 1; zIndex = 2;
          } else if (i === activeIdx && transitioning) {
            opacity = 0; zIndex = 2;
          } else if (i === nextIdx && transitioning) {
            opacity = 1; zIndex = 3;
          }

          return (
            <video
              key={src}
              ref={(el) => { videoRefs.current[i] = el; }}
              className="vid-layer"
              src={src}
              muted
              playsInline
              preload="auto"
              style={{
                opacity,
                zIndex,
                transition: (i === activeIdx || i === nextIdx)
                  ? `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : "none",
              }}
              aria-hidden="true"
            />
          );
        })}

        {/* DARK GRADIENT OVERLAY */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 4,
          background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.75) 100%)",
        }} />

        {/* HERO CONTENT */}
        <div style={{
          position: "relative", zIndex: 5, textAlign: "center",
          padding: "0 clamp(12px, 4vw, 24px)", maxWidth: "900px", width: "100%",
        }}>
          <p className="anim-fade-in" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            fontSize: "clamp(0.6rem, 1.4vw, 0.78rem)", letterSpacing: "0.26em",
            textTransform: "uppercase", color: "#f97316",
            marginBottom: "clamp(8px, 2vw, 18px)",
          }}>
            ✦ UpHolsery WOrks
          </p>

          <h1 className="anim-slide-up delay-200" style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900,
            fontSize: "clamp(1.7rem, 7.5vw, 5.8rem)", lineHeight: 1.06,
            color: "#ffffff", marginBottom: "clamp(10px, 3vw, 26px)",
            textShadow: "0 4px 32px rgba(0,0,0,0.5)", letterSpacing: "-0.01em",
          }}>
            Your Car Deserves
            <br />
            <span style={{ fontStyle: "italic", color: "#fed7aa" }}>the Best Treatment.</span>
          </h1>

          <p className="anim-slide-up delay-400" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: "clamp(0.82rem, 2.2vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.82)", maxWidth: "600px",
            margin: "0 auto clamp(14px, 4vw, 36px)",
          }}>
            From expert car lifting &amp; body facelifts to deep interior
            detailing and premium accessories — we give your vehicle the
            transformation it deserves.
          </p>

          <div className="badge-strip anim-fade-in delay-600">
            {["UpHolsery&accessories", "Body polishing", "Interior Cleaning", "Tinting"].map((label) => (
              <span key={label} className="badge">
                <span className="badge-dot" />
                {label}
              </span>
            ))}
          </div>

          <div className="cta-row anim-fade-in delay-800">
            <a href="#services" className="cta-primary">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="cta-secondary">Book an Appointment</a>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div className="scroll-hint anim-fade-in delay-800" aria-hidden="true" style={{
          position: "absolute", bottom: "32px", left: "50%",
          transform: "translateX(-50%)", zIndex: 5,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          color: "rgba(255,255,255,0.45)", fontSize: "0.65rem",
          letterSpacing: "0.18em", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span>Scroll</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </section>
    </>
  );
}