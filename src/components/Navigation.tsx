"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] bg-[#222222] border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <div
              className="w-[148px] h-[52px] rounded-xl"
              style={{
                backgroundImage: "url('/landscape_1.png')",
                backgroundSize: "148px 148px",
                backgroundPosition: "center 38%",
                backgroundRepeat: "no-repeat",
              }}
              aria-label="Landscale Agency"
            />
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-grotesk text-sm font-medium tracking-wide transition-colors duration-200 group ${
                  pathname === link.href ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-3 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5"
          >
            Get Free Audit
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-10"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-cream origin-center"
            />
            <motion.span
              animate={menuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1.5px] bg-cream"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-cream origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-deep-black flex flex-col justify-center px-10"
          >
            {/* Gold orb bg */}
            <div
              className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
            />
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`block font-grotesk font-bold text-5xl py-3 border-b border-white/5 transition-colors ${
                      pathname === link.href ? "text-gold" : "text-cream/80 hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="inline-flex bg-gold text-deep-black font-grotesk font-bold text-lg px-8 py-4 btn-shine"
              >
                Get Free Audit →
              </Link>
              <p className="mt-6 font-inter text-text-muted text-sm">
                landscale.agency@gmail.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
