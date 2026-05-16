"use client";

import React, { useState } from "react";

// Same services & descriptions as ScrollServices
const SERVICES = [
  {
    id: 1,
    index: "01",
    title: "Nano Ceramic",
    description: "Advanced surface protection technology for a lasting mirror-like finish.",
    // car ceramic coating gloved hand applying product
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=900&q=80",
    span: "large-left",
  },
  {
    id: 2,
    index: "02",
    title: "Car Polishing",
    description: "Professional paint correction and gloss enhancement for showroom results.",
    // person polishing red car with machine
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=900&q=80",
    span: "small",
  },
  {
    id: 3,
    index: "03",
    title: "Interior Cleaning",
    description: "Deep sanitization and premium detailing for every surface inside your vehicle.",
    // vacuuming car interior seat
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    span: "small",
  },
  {
    id: 4,
    index: "04",
    title: "Glass Tinting",
    description: "Heat rejection and privacy with professionally installed premium films.",
    // tinting car window film install
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=900&q=80",
    span: "small",
  },
  {
    id: 5,
    index: "05",
    title: "PPF / Ceramic Works",
    description: "Ultimate paint protection film and long-lasting ceramic coatings.",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=900&q=80",
    span: "large-right",
  },
  {
    id: 6,
    index: "06",
    title: "Face Lift",
    description: "Modern aesthetic upgrades — new headlights, bumpers, and grilles for a refreshed exterior look.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80",
    span: "half",
  },
  {
    id: 7,
    index: "07",
    title: "Upholstery Work",
    description: "Premium leather restoration and custom interior stitching — seats, roof, and panels crafted to perfection.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    span: "half",
  },
];

export default function ServicesGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: "#030303", width: "100%", padding: "80px 40px", borderTop: "none", outline: "none" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');
        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }

        .sg-header {
          max-width: 1400px;
          margin: 0 auto 52px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border: none;
        }

        .sg-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          grid-template-rows: 320px 320px 280px;
          gap: 10px;
          max-width: 1400px;
          margin: 0 auto;
          background: #030303;
        }

        .sg-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #111;
        }

        .sg-card-large-left  { grid-column: 1; grid-row: 1 / 3; }
        .sg-card-s1          { grid-column: 2; grid-row: 1; }
        .sg-card-s2          { grid-column: 3; grid-row: 1; }
        .sg-card-s3          { grid-column: 2; grid-row: 2; }
        .sg-card-large-right { grid-column: 3; grid-row: 2; }
        .sg-card-half-left   { grid-column: 1 / 3; grid-row: 3; }
        .sg-card-half-right  { grid-column: 3; grid-row: 3; }

        .sg-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease;
          filter: brightness(0.75);
        }
        .sg-card:hover img {
          transform: scale(1.07);
          filter: brightness(0.55);
        }

        .sg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
        }

        .sg-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px 28px;
        }

        .sg-idx {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #ff6600;
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }

        .sg-title {
          font-family: 'Bebas Neue', sans-serif;
          color: #fff;
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 0;
          transition: margin-bottom 0.35s ease;
        }

        .sg-desc {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
          font-style: italic;
          line-height: 1.7;
          font-size: 13px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease;
          margin-top: 0;
        }

        .sg-card:hover .sg-desc {
          max-height: 80px;
          opacity: 1;
          margin-top: 10px;
        }

        @media (max-width: 860px) {
          .sg-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .sg-card-large-left  { grid-column: 1 / 3; grid-row: auto; height: 280px; }
          .sg-card-s1          { grid-column: 1; grid-row: auto; height: 220px; }
          .sg-card-s2          { grid-column: 2; grid-row: auto; height: 220px; }
          .sg-card-s3          { grid-column: 1; grid-row: auto; height: 220px; }
          .sg-card-large-right { grid-column: 2; grid-row: auto; height: 220px; }
          .sg-card-half-left   { grid-column: 1; grid-row: auto; height: 220px; }
          .sg-card-half-right  { grid-column: 2; grid-row: auto; height: 220px; }
        }
      `}} />

      {/* Header — matches ScrollServices branding style */}
      <div className="sg-header">
        <div>
          <p
            className="dm-sans"
            style={{ fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#ff6600", fontWeight: 700, marginBottom: "8px", display: "block" }}
          >
            What We Offer
          </p>
          <h2
            className="bebas-font"
            style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)", color: "#fff", lineHeight: 0.9, textTransform: "uppercase" }}
          >
            Our Services
          </h2>
        </div>
       
      </div>

      {/* Bento Grid */}
      <div className="sg-grid">

        {/* Large Left — Nano Ceramic */}
        <div
          className="sg-card sg-card-large-left"
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[0].image} alt={SERVICES[0].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[0].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>{SERVICES[0].title}</h3>
            <p className="sg-desc">{SERVICES[0].description}</p>
          </div>
        </div>

        {/* Small — Car Polishing */}
        <div
          className="sg-card sg-card-s1"
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[1].image} alt={SERVICES[1].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[1].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[1].title}</h3>
            <p className="sg-desc">{SERVICES[1].description}</p>
          </div>
        </div>

        {/* Small — Interior Cleaning */}
        <div
          className="sg-card sg-card-s2"
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[2].image} alt={SERVICES[2].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[2].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[2].title}</h3>
            <p className="sg-desc">{SERVICES[2].description}</p>
          </div>
        </div>

        {/* Small — Glass Tinting */}
        <div
          className="sg-card sg-card-s3"
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[3].image} alt={SERVICES[3].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[3].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[3].title}</h3>
            <p className="sg-desc">{SERVICES[3].description}</p>
          </div>
        </div>

        {/* Large Right — PPF */}
        <div
          className="sg-card sg-card-large-right"
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[4].image} alt={SERVICES[4].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[4].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[4].title}</h3>
            <p className="sg-desc">{SERVICES[4].description}</p>
          </div>
        </div>

        {/* Half Left — Face Lift */}
        <div
          className="sg-card sg-card-half-left"
          onMouseEnter={() => setHovered(6)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[5].image} alt={SERVICES[5].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[5].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[5].title}</h3>
            <p className="sg-desc">{SERVICES[5].description}</p>
          </div>
        </div>

        {/* Half Right — Upholstery Work */}
        <div
          className="sg-card sg-card-half-right"
          onMouseEnter={() => setHovered(7)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={SERVICES[6].image} alt={SERVICES[6].title} />
          <div className="sg-overlay" />
          <div className="sg-content">
            <span className="sg-idx">{SERVICES[6].index}</span>
            <h3 className="sg-title" style={{ fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>{SERVICES[6].title}</h3>
            <p className="sg-desc">{SERVICES[6].description}</p>
          </div>
        </div>

      </div>
    </section>
  );
}