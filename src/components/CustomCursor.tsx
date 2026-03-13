"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Ripple { id: number; x: number; y: number }
interface Trail { id: number; x: number; y: number; opacity: number }

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [trail, setTrail] = useState<Trail[]>([]);
  const trailRef = useRef<Trail[]>([]);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>(0);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth follow with spring
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  const addRipple = useCallback((cx: number, cy: number) => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: cx, y: cy }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) { setIsTouch(true); return; }

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      rawX.set(cx - 12);
      rawY.set(cy - 12);
      if (!isVisible) setIsVisible(true);

      // Add trail dot
      const id = ++trailIdRef.current;
      const dot: Trail = { id, x: cx, y: cy, opacity: 0.55 };
      trailRef.current = [dot, ...trailRef.current.slice(0, 10)];
      setTrail([...trailRef.current]);

      // Fade trail
      cancelAnimationFrame(rafRef.current);
      const fade = () => {
        trailRef.current = trailRef.current
          .map((d) => ({ ...d, opacity: d.opacity * 0.82 }))
          .filter((d) => d.opacity > 0.02);
        setTrail([...trailRef.current]);
        if (trailRef.current.length > 0) rafRef.current = requestAnimationFrame(fade);
      };
      rafRef.current = requestAnimationFrame(fade);
    };

    const onClick = (e: MouseEvent) => addRipple(e.clientX, e.clientY);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const setHover = (val: boolean) => () => setIsHover(val);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", setHover(true));
        el.addEventListener("mouseleave", setHover(false));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", setHover(true));
      el.addEventListener("mouseleave", setHover(false));
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [rawX, rawY, isVisible, addRipple]);

  if (isTouch) return null;

  return (
    <>
      {/* ── Trail dots ── */}
      {trail.map((dot, i) => {
        const size = Math.max(3, 10 - i * 0.8);
        return (
          <div
            key={dot.id}
            className="fixed pointer-events-none z-[9997] rounded-full"
            style={{
              left: dot.x - size / 2,
              top: dot.y - size / 2,
              width: size,
              height: size,
              opacity: dot.opacity * (1 - i * 0.07),
              background: `radial-gradient(circle, rgba(212,175,55,${0.9 - i * 0.06}) 0%, rgba(255,200,50,0) 100%)`,
              filter: `blur(${1 + i * 0.3}px)`,
              transform: "translate3d(0,0,0)",
            }}
          />
        );
      })}

      {/* ── Ripples on click ── */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="fixed pointer-events-none z-[9998] rounded-full border border-gold/60"
            style={{ left: r.x, top: r.y, marginLeft: -2, marginTop: -2 }}
            initial={{ width: 4, height: 4, opacity: 0.9, x: 0, y: 0 }}
            animate={{ width: 80, height: 80, opacity: 0, x: -38, y: -38 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={`inner-${r.id}`}
            className="fixed pointer-events-none z-[9998] rounded-full border border-gold/30"
            style={{ left: r.x, top: r.y, marginLeft: -2, marginTop: -2 }}
            initial={{ width: 4, height: 4, opacity: 0.6, x: 0, y: 0 }}
            animate={{ width: 130, height: 130, opacity: 0, x: -63, y: -63 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          />
        ))}
      </AnimatePresence>

      {/* ── Main orb ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ x, y, opacity: isVisible ? 1 : 0 }}
        animate={{
          width: isHover ? 40 : 24,
          height: isHover ? 40 : 24,
          x: isHover ? undefined : undefined,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}>

        {/* Outer glow ring */}
        <motion.div
          className="absolute rounded-full"
          animate={isHover
            ? { scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }
            : { scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: isHover ? 1 : 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            inset: "-8px",
            background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Core orb */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(255,220,80,1) 0%, rgba(212,175,55,0.9) 50%, rgba(180,140,30,0.7) 100%)",
            boxShadow: isHover
              ? "0 0 20px rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.5), 0 0 70px rgba(212,175,55,0.2)"
              : "0 0 12px rgba(212,175,55,0.7), 0 0 28px rgba(212,175,55,0.35), 0 0 50px rgba(212,175,55,0.12)",
          }}
        />
      </motion.div>
    </>
  );
}
