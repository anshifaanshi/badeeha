"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Slightly deepen the glass when user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ══════════════════════════════════════════
           OUTER WRAPPER  (fixed strip across top)
        ══════════════════════════════════════════ */
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 18px 24px;
          pointer-events: none;          /* let clicks pass through the gap */
        }

        /* ══════════════════════════════════════════
           PILL CONTAINER
        ══════════════════════════════════════════ */
        .nav-pill {
          pointer-events: all;
          width: 100%;
          max-width: 860px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-radius: 999px;
          border: 1.5px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255,255,255,0.18);
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .nav-pill.scrolled {
          background: rgba(10, 10, 10, 0.45);
          border-color: rgba(255, 255, 255, 0.20);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }

        /* ══════════════════════════════════════════
           LOGO
        ══════════════════════════════════════════ */
        .nav-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .nav-logo-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(249,115,22,0.45);
        }

        /* ══════════════════════════════════════════
           DESKTOP LINKS
        ══════════════════════════════════════════ */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links li a {
          position: relative;
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 0.92rem;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.82);
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 999px;
          transition: color 0.25s ease, background 0.25s ease;
          display: block;
        }
        /* Hover: soft white pill bg */
        .nav-links li a::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .nav-links li a:hover { color: #fff; }
        .nav-links li a:hover::before { opacity: 1; transform: scale(1); }

        /* Animated underline accent */
        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 32px);
          height: 1.5px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          border-radius: 999px;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
        }
        .nav-links li a:hover::after { transform: translateX(-50%) scaleX(1); }

        /* ══════════════════════════════════════════
           CTA BUTTON
        ══════════════════════════════════════════ */
        .nav-cta {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          color: #fff;
          background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
          border: none;
          border-radius: 999px;
          padding: 9px 22px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
          box-shadow: 0 4px 18px rgba(249,115,22,0.45);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-cta:hover {
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.6);
          filter: brightness(1.08);
        }
        .nav-cta:active { transform: scale(0.97); }

        /* ══════════════════════════════════════════
           HAMBURGER BUTTON
        ══════════════════════════════════════════ */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .hamburger:hover { background: rgba(255,255,255,0.16); }

        .hamburger span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease, width 0.3s ease;
          transform-origin: center;
        }
        /* Open state */
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ══════════════════════════════════════════
           MOBILE MENU BACKDROP
        ══════════════════════════════════════════ */
        .mobile-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .mobile-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        /* ══════════════════════════════════════════
           MOBILE SLIDE-DOWN MENU
        ══════════════════════════════════════════ */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(-110%);
          z-index: 999;
          width: calc(100% - 32px);
          max-width: 420px;
          background: rgba(12,12,12,0.82);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1.5px solid rgba(255,255,255,0.16);
          border-radius: 24px;
          padding: 100px 28px 36px;
          transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease;
          opacity: 0;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .mobile-menu.open {
          transform: translateX(-50%) translateY(16px);
          opacity: 1;
        }

        .mobile-menu nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 28px;
        }
        .mobile-menu nav a {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.80);
          text-decoration: none;
          padding: 13px 18px;
          border-radius: 14px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-menu nav a::after {
          content: '→';
          font-size: 0.85rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          color: #f97316;
        }
        .mobile-menu nav a:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          transform: translateX(4px);
        }
        .mobile-menu nav a:hover::after {
          opacity: 1;
          transform: translateX(0);
        }

        /* Divider inside mobile menu */
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.10);
          margin-bottom: 24px;
          border: none;
        }

        .mobile-cta {
          display: block;
          text-align: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: #fff;
          background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
          border-radius: 999px;
          padding: 14px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(249,115,22,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mobile-cta:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 32px rgba(249,115,22,0.6);
        }

        /* ══════════════════════════════════════════
           RESPONSIVE BREAKPOINT
        ══════════════════════════════════════════ */
        @media (max-width: 700px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger        { display: flex; }
          .mobile-backdrop  { display: block; }
          .mobile-menu      { display: block; }
          .nav-wrapper      { padding: 14px 16px; }
        }
      `}</style>

      {/* ── MOBILE BACKDROP ── */}
      <div
        className={`mobile-backdrop${menuOpen ? " open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── MOBILE SLIDE MENU ── */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
        </nav>
        <hr className="mobile-divider" />
        <a href="#contact" className="mobile-cta" onClick={close}>
          Book an Appointment
        </a>
      </div>

      {/* ── FIXED NAVBAR ── */}
      <div className="nav-wrapper">
        <div className={`nav-pill${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <a href="#home" className="nav-logo" aria-label="AutoPro Home">
            <span className="nav-logo-icon" aria-hidden="true">B</span>
            Badeeha
          </a>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className="nav-cta">
            Book Now
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>
    </>
  );
}