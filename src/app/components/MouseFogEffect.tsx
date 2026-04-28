"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  maxR: number;
  opacity: number;
  maxOpacity: number;
  age: number;
  life: number;
  phase: "in" | "out";
}

export default function MouseFogEffect(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ensure we are on the client
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let isMounted = true;

    // ── State ────────────────────────────────────────────────────────────
    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const setCanvasSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Initial positions
    let mouseX = W / 2;
    let mouseY = H / 2;
    let fogX = mouseX;
    let fogY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    let prevFogX = fogX;
    let prevFogY = fogY;
    let speed = 0;
    let hasMoved = false;

    const particles: Particle[] = [];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    function spawnParticle(x: number, y: number, spd: number) {
      const angle = Math.random() * Math.PI * 2;
      const spread = clamp(spd * 0.6, 4, 40);
      const baseR = clamp(spd * 2.5 + 18, 18, 90);
      
      particles.push({
        x: x + (Math.random() - 0.5) * spread * 2,
        y: y + (Math.random() - 0.5) * spread * 2,
        vx: Math.cos(angle) * (0.2 + Math.random() * 0.4),
        vy: Math.sin(angle) * (0.2 + Math.random() * 0.4) - 0.3,
        r: baseR * (0.6 + Math.random() * 0.8),
        maxR: baseR * (0.6 + Math.random() * 0.8),
        opacity: 0,
        maxOpacity: 0.13 + Math.random() * 0.09,
        age: 0,
        life: 38 + Math.random() * 30,
        phase: "in",
      });
    }

    function tick() {
      if (!isMounted || !ctx) return;

      ctx.clearRect(0, 0, W, H);

      fogX = lerp(fogX, mouseX, 0.072);
      fogY = lerp(fogY, mouseY, 0.072);
      dotX = lerp(dotX, mouseX, 0.18);
      dotY = lerp(dotY, mouseY, 0.18);

      const dx = fogX - prevFogX;
      const dy = fogY - prevFogY;
      speed = lerp(speed, Math.sqrt(dx * dx + dy * dy), 0.15);
      prevFogX = fogX; 
      prevFogY = fogY;

      if (hasMoved || speed > 0.1) {
        // Draw Large Aura
        const radius = clamp(speed * 5 + 80, 80, 260);
        const alpha = clamp(0.04 + speed * 0.003, 0.04, 0.11);
        const grad = ctx.createRadialGradient(fogX, fogY, 0, fogX, fogY, radius);
        grad.addColorStop(0, `rgba(255,170,80,${alpha})`);
        grad.addColorStop(0.35, `rgba(251,130,30,${alpha * 0.55})`);
        grad.addColorStop(0.7, `rgba(249,115,22,${alpha * 0.20})`);
        grad.addColorStop(1, `rgba(249,115,22,0)`);
        ctx.beginPath();
        ctx.arc(fogX, fogY, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        const spawnCount = Math.floor(clamp(speed * 0.5, 0.3, 3));
        for (let i = 0; i < spawnCount; i++) spawnParticle(fogX, fogY, speed);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;

        const halfLife = p.life * 0.35;
        if (p.phase === "in") {
          p.opacity = lerp(p.opacity, p.maxOpacity, 0.12);
          p.r = lerp(p.r, p.maxR, 0.08);
          if (p.age > halfLife) p.phase = "out";
        } else {
          p.opacity = lerp(p.opacity, 0, 0.06);
          p.r = lerp(p.r, p.maxR * 1.35, 0.04);
        }

        if (p.age > p.life || p.opacity < 0.002) {
          particles.splice(i, 1);
          continue;
        }

        const safeR = Math.max(0.1, p.r);
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, safeR);
        pGrad.addColorStop(0, `rgba(255,160,60,${p.opacity})`);
        pGrad.addColorStop(0.4, `rgba(251,120,20,${p.opacity * 0.5})`);
        pGrad.addColorStop(1, `rgba(249,115,22,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, safeR, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      }

      if (dot) {
        dot.style.transform = `translate3d(${dotX - 5}px, ${dotY - 5}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        mouseX = e.clientX; mouseY = e.clientY;
        fogX = mouseX; fogY = mouseY;
        dotX = mouseX; dotY = mouseY;
        hasMoved = true;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", setCanvasSize);
    rafId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* 
        Fixed Hydration Error: Use dangerouslySetInnerHTML for style tags 
        containing global selectors in Next.js 
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body, a, button { 
          cursor: none !important; 
        }
        #cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          background: #f97316;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          box-shadow: 0 0 8px rgba(249,115,22,0.9), 0 0 18px rgba(249,115,22,0.45);
        }
        #fog-canvas {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: screen;
        }
      `}} />

      <canvas ref={canvasRef} id="fog-canvas" aria-hidden="true" />
      <div ref={dotRef} id="cursor-dot" aria-hidden="true" />
    </>
  );
}