"use client";

import { useState, useEffect, useRef } from "react";

// FIXED FILENAMES based on your screenshot
const VIDEOS = [
  "/carfacelifting.mp4", 
  "/cartransition.mp4", 
  "/carinterior.mp4", // Changed from cartinting.mp4
  "/car.mp4"
];

const FADE_MS = 1200; 

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const videoRefs = useRef([]);

  // Auto-play the first video on mount
  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {});
    }
  }, []);

  const handleVideoEnded = () => {
    if (transitioning) return;

    const next = (activeIdx + 1) % VIDEOS.length;
    const nextVid = videoRefs.current[next];

    if (nextVid) {
      nextVid.currentTime = 0;
      nextVid.play().then(() => {
        setNextIdx(next);
        setTransitioning(true);

        setTimeout(() => {
          setActiveIdx(next);
          setNextIdx(null);
          setTransitioning(false);
        }, FADE_MS);
      }).catch((err) => {
        console.error("Video play failed", err);
        // If play fails, jump immediately to avoid getting stuck
        setActiveIdx(next);
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .vid-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f97316;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          padding: 16px 38px;
          border-radius: 50px;
          transition: all 0.25s ease;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(249,115,22,0.5);
        }
        .cta-primary:hover { transform: scale(1.05); background: #ea6b0e; }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          padding: 15px 36px;
          border: 2px solid rgba(255,255,255,0.6);
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .cta-secondary:hover { background: rgba(255,255,255,0.12); border-color: #fff; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', sans-serif;
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.75rem;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #f97316; }
        
        .badge-strip { display: flex; gap: 10px; justify-content: center; margin-bottom: 44px; }
        .cta-row     { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 640px) {
          .cta-row { flex-direction: column; width: 100%; }
          .badge-strip { display: none; }
        }
      `}</style>

      <section style={{ position: "relative", width: "100%", height: "100svh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => (videoRefs.current[i] = el)}
            className="vid-layer"
            src={src}
            muted
            playsInline
            onEnded={handleVideoEnded} // Using React's built-in event is safer
            style={{
              zIndex: i === nextIdx ? 3 : i === activeIdx ? 2 : 1,
              opacity: i === nextIdx || (i === activeIdx && !transitioning) ? 1 : 0,
              transition: transitioning && (i === activeIdx || i === nextIdx)
                ? `opacity ${FADE_MS}ms ease-in-out`
                : "none",
            }}
          />
        ))}

        <div style={{ position: "absolute", inset: 0, zIndex: 4, background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)" }} />

        <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "0 24px", maxWidth: "900px" }}>
          <p className="anim-fade-in" style={{ color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "1rem" }}>
            ✦ Upholstery Works
          </p>

          <h1 className="anim-slide-up delay-200" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 7vw, 5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Your Car Deserves<br />
            <span style={{ fontStyle: "italic", color: "#fed7aa" }}>the Best Treatment.</span>
          </h1>

          <p className="anim-slide-up delay-400" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Expert car lifting, body facelifts, and deep interior detailing.
          </p>

          <div className="badge-strip anim-fade-in delay-600">
            {["Upholstery", "Body Polishing", "Interior Cleaning", "Tinting"].map((label) => (
              <span key={label} className="badge"><span className="badge-dot" />{label}</span>
            ))}
          </div>

          <div className="cta-row anim-fade-in delay-800">
            <a href="#services" className="cta-primary">Explore Services</a>
            <a href="#contact" className="cta-secondary">Book Appointment</a>
          </div>
        </div>
      </section>
    </>
  );
}