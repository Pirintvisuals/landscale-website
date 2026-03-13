"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "button" | "text";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Dot follows immediately (no spring)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Hover detection
    const addHover = (selector: string, state: CursorState) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorState(state));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
    };

    const observer = new MutationObserver(() => {
      addHover("a, button", "button");
      addHover("p, h1, h2, h3, h4, span", "text");
    });
    observer.observe(document.body, { childList: true, subtree: true });

    addHover("a, button", "button");
    addHover("p, h1, h2, h3, h4, span", "text");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, dotX, dotY, isVisible]);

  if (isTouch) return null;

  const cursorSize = cursorState === "button" ? 56 : cursorState === "text" ? 28 : 40;
  const cursorOpacity = isVisible ? 1 : 0;
  const isFilled = cursorState === "button";

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          opacity: cursorOpacity,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: isFilled ? "rgba(212,175,55,0.15)" : "transparent",
          border: isFilled
            ? "1.5px solid rgba(212,175,55,0.8)"
            : "1.5px solid rgba(245,241,232,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          opacity: cursorOpacity,
          width: 6,
          height: 6,
        }}
      />
    </>
  );
}
