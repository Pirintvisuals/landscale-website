"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ARROW = "M 2 2 L 2 18 L 6 14 L 10 22 L 12.5 21 L 8.5 13 L 14 13 Z";

interface TrailDot { id: number; x: number; y: number; opacity: number }

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);

  const trailRef = useRef<TrailDot[]>([]);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 600, damping: 38, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 600, damping: 38, mass: 0.3 });

  const startFade = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const fade = () => {
      trailRef.current = trailRef.current
        .map((d) => ({ ...d, opacity: d.opacity * 0.78 }))
        .filter((d) => d.opacity > 0.025);
      setTrail([...trailRef.current]);
      if (trailRef.current.length > 0) rafRef.current = requestAnimationFrame(fade);
    };
    rafRef.current = requestAnimationFrame(fade);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) { setIsTouch(true); return; }

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      posRef.current = { x: cx, y: cy };
      rawX.set(cx);
      rawY.set(cy);
      if (!isVisible) setIsVisible(true);

      const id = ++trailIdRef.current;
      trailRef.current = [{ id, x: cx, y: cy, opacity: 0.5 }, ...trailRef.current.slice(0, 7)];
      setTrail([...trailRef.current]);
      startFade();
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onEnterInteractive = () => { setIsHover(true); };
    const onLeaveInteractive = () => { setIsHover(false); setIsButton(false); };
    const onEnterButton = () => { setIsHover(true); setIsButton(true); };

    const bindElements = () => {
      document.querySelectorAll("a, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      document.querySelectorAll("button").forEach((el) => {
        el.addEventListener("mouseenter", onEnterButton);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    const observer = new MutationObserver(bindElements);
    observer.observe(document.body, { childList: true, subtree: true });
    bindElements();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [rawX, rawY, isVisible, startFade]);

  if (isTouch) return null;

  const glowBlur = isHover ? 10 : 5;
  const glowSpread = isHover ? 3 : 1.5;
  const tilt = isButton ? -18 : 0;

  return (
    <>
      {/* ── Trail arrows ── */}
      {trail.map((dot, i) => {
        const scale = 1 - i * 0.09;
        return (
          <div
            key={dot.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: dot.x,
              top: dot.y,
              opacity: dot.opacity * (1 - i * 0.1),
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              willChange: "opacity",
            }}>
            <svg width="16" height="24" viewBox="0 0 16 26" fill="none"
              style={{ filter: `drop-shadow(0 0 ${3 - i * 0.3}px rgba(212,175,55,${0.6 - i * 0.06}))` }}>
              <path d={ARROW} fill="rgba(212,175,55,0.5)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
            </svg>
          </div>
        );
      })}

      {/* ── Main cursor arrow ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, opacity: isVisible ? 1 : 0 }}
        animate={{ rotate: tilt }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}>

        {/* Outer glow halo */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={isHover
            ? { opacity: [0.5, 0.2, 0.5], scale: [1, 1.4, 1] }
            : { opacity: [0.2, 0.07, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: isHover ? 0.9 : 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 36, height: 36,
            top: -8, left: -8,
            background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Arrow SVG */}
        <svg width="16" height="24" viewBox="0 0 16 26" fill="none"
          style={{
            filter: `drop-shadow(0 0 ${glowBlur}px rgba(212,175,55,0.95)) drop-shadow(0 0 ${glowSpread}px rgba(255,220,80,1))`,
            transition: "filter 0.25s ease",
          }}>
          <path d={ARROW}
            fill={isHover ? "#FFD700" : "#D4AF37"}
            stroke={isHover ? "rgba(255,240,120,0.9)" : "rgba(212,175,55,0.6)"}
            strokeWidth="0.75"
            strokeLinejoin="round"
            style={{ transition: "fill 0.2s ease" }}
          />
        </svg>
      </motion.div>
    </>
  );
}
