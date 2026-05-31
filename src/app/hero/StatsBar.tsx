"use client";

import React from "react";

const STATS = [
  { icon: "✦", value: "12+",    label: "Years of Experience" },
  { icon: "✦", value: "8,400+", label: "Cars Detailed" },
  { icon: "✦", value: "3,200+", label: "Happy Clients" },
  { icon: "✦", value: "24+",    label: "Awards Won" },
];

export default function StatsBar() {
  return (
    <section
      className="w-full"
      style={{ minHeight: "100px", background: "#ff6600", display: "flex", alignItems: "center" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');

        .bebas-font { font-family: 'Bebas Neue', sans-serif; }
        .dm-sans    { font-family: 'DM Sans', sans-serif; }

        .stat-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 16px;
          position: relative;
        }
        .stat-item + .stat-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 22%;
          height: 56%;
          width: 1px;
          background: rgba(255,255,255,0.25);
        }

        /* ── MOBILE ONLY (≤540px) ── */
        @media (max-width: 540px) {
          .stats-inner {
            flex-wrap: wrap;
            padding: 12px 0;
          }
          .stat-item {
            flex: 1 1 50%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 4px;
            padding: 12px 8px;
          }
          .stat-item + .stat-item::before { display: none; }
          .stat-item:nth-child(2)::before,
          .stat-item:nth-child(4)::before {
            display: block;
            top: 15%;
            height: 70%;
          }
          .stat-item:nth-child(3),
          .stat-item:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.20);
          }
          .stat-text {
            align-items: center;
          }
        }
      `}} />

      <div className="stats-inner" style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {STATS.map((stat, i) => (
          <div className="stat-item" key={i}>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>{stat.icon}</span>
            <div className="stat-text" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                className="bebas-font"
                style={{ fontSize: "1.75rem", color: "#fff", lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span
                className="dm-sans"
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}