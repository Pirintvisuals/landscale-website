"use client";

import { useEffect, useRef } from "react";

const ARROW = "M 2 2 L 2 18 L 6 14 L 10 22 L 12.5 21 L 8.5 13 L 14 13 Z";
const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const target = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );
  const rafRef = useRef<number>(0);
  const tiltRef = useRef(0);
  const tiltTargetRef = useRef(0);
  const tiltAnimRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.style.cursor = "none";

    const tick = () => {
      // Snap main cursor — lerp 0.72 = near-instant, no lag
      pos.current.x += (target.current.x - pos.current.x) * 0.72;
      pos.current.y += (target.current.y - pos.current.y) * 0.72;

      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${tiltRef.current}deg)`;
      }

      // Trail chain
      trail.current[0].x += (pos.current.x - trail.current[0].x) * 0.45;
      trail.current[0].y += (pos.current.y - trail.current[0].y) * 0.45;
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.45;
        trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.45;
      }
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${trail.current[i].x}px, ${trail.current[i].y}px) scale(${1 - i * 0.1})`;
        el.style.opacity = String((1 - i / TRAIL_COUNT) * 0.32);
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Tilt lerp loop
    const animTilt = () => {
      tiltRef.current += (tiltTargetRef.current - tiltRef.current) * 0.18;
      if (Math.abs(tiltTargetRef.current - tiltRef.current) > 0.1) {
        tiltAnimRef.current = requestAnimationFrame(animTilt);
      } else {
        tiltRef.current = tiltTargetRef.current;
      }
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (mainRef.current) mainRef.current.style.opacity = "1";
    };
    const onLeave = () => { if (mainRef.current) mainRef.current.style.opacity = "0"; };
    const onEnter = () => { if (mainRef.current) mainRef.current.style.opacity = "1"; };

    const setHover = (hover: boolean, btn: boolean) => {
      tiltTargetRef.current = btn ? -18 : 0;
      cancelAnimationFrame(tiltAnimRef.current);
      animTilt();

      const svg = mainRef.current?.querySelector("svg");
      if (svg) {
        svg.style.filter = hover
          ? "drop-shadow(0 0 10px rgba(212,175,55,0.95)) drop-shadow(0 0 4px rgba(255,220,80,1))"
          : "drop-shadow(0 0 5px rgba(212,175,55,0.95)) drop-shadow(0 0 1.5px rgba(255,220,80,1))";
      }
      const path = mainRef.current?.querySelector("path");
      if (path) path.setAttribute("fill", hover ? "#FFD700" : "#D4AF37");
    };

    const bindElements = () => {
      document.querySelectorAll("a, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () => setHover(true, false));
        el.addEventListener("mouseleave", () => setHover(false, false));
      });
      document.querySelectorAll("button").forEach((el) => {
        el.addEventListener("mouseenter", () => setHover(true, true));
        el.addEventListener("mouseleave", () => setHover(false, false));
      });
    };

    const observer = new MutationObserver(bindElements);
    observer.observe(document.body, { childList: true, subtree: true });
    bindElements();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(tiltAnimRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ willChange: "transform, opacity", opacity: 0 }}
        >
          <svg width="14" height="22" viewBox="0 0 16 26" fill="none"
            style={{ filter: `drop-shadow(0 0 ${3 - i * 0.4}px rgba(212,175,55,0.7))` }}>
            <path d={ARROW} fill="rgba(212,175,55,0.5)" />
          </svg>
        </div>
      ))}

      {/* Main cursor */}
      <div
        ref={mainRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform", opacity: 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 36, height: 36,
            top: -8, left: -8,
            background: "radial-gradient(circle, rgba(212,175,55,0.55) 0%, transparent 70%)",
            filter: "blur(10px)",
            animation: "cursorPulse 1.8s ease-in-out infinite",
          }}
        />
        <svg width="16" height="24" viewBox="0 0 16 26" fill="none"
          style={{
            filter: "drop-shadow(0 0 5px rgba(212,175,55,0.95)) drop-shadow(0 0 1.5px rgba(255,220,80,1))",
            transition: "filter 0.2s ease",
          }}>
          <path d={ARROW} fill="#D4AF37" stroke="rgba(212,175,55,0.6)" strokeWidth="0.75" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}
