"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, X, Menu, Zap, MessageCircle, Globe } from "lucide-react";

const services = [
  { href: "/services/ai-lead-generation", label: "AI Estimator Agent", desc: "Instant project quotes on your site — no call needed", Icon: Zap, tag: "Core" },
  { href: "/services/ai-lead-generation", label: "AI Chatbot", desc: "Qualifies leads 24/7, filters out time-wasters", Icon: MessageCircle, tag: null },
  { href: "/services/website-design", label: "Website Design", desc: "Luxury sites with local SEO built in", Icon: Globe, tag: null },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SPRING = [0.16, 1, 0.3, 1] as const;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isServicesActive = pathname.startsWith("/services");

  useEffect(() => { setMenuOpen(false); setMobileServicesOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide on scroll-down past 100px, show on scroll-up — never hide when menu is open
      if (y > 100) {
        setNavHidden(y > lastScrollY.current);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={`nav-entrance fixed top-0 left-0 right-0 z-[100] transition-[transform,background-color,border-color,box-shadow] duration-300 ${
          navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            : "bg-[#0D0D0D]/75 backdrop-blur-md border-b border-white/[0.04]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center flex-shrink-0 z-10">
            <div
              className="w-[180px] h-[60px] rounded-xl"
              style={{
                backgroundImage: "url('/landscape_1.png')",
                backgroundSize: "180px 180px",
                backgroundPosition: "center 38%",
                backgroundRepeat: "no-repeat",
              }}
              aria-label="Landscale Agency"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">

            {/* Home */}
            <Link href="/"
              className={`relative px-4 py-2 rounded-full font-grotesk text-sm font-semibold tracking-wide transition-all duration-200 ${
                pathname === "/"
                  ? "bg-gold text-deep-black shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                  : "text-cream/60 hover:text-cream hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
              }`}>
              Home
            </Link>

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`relative flex items-center gap-1 px-4 py-2 rounded-full font-grotesk text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isServicesActive
                    ? "bg-gold text-deep-black shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                    : "text-cream/60 hover:text-cream hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                }`}>
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} className="opacity-70 mt-px" />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: SPRING }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[340px] bg-[#141414] border border-white/[0.09] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden">
                    <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                    <div className="relative p-2 space-y-0.5">
                      {services.map((svc) => (
                        <Link key={svc.label} href={svc.href}
                          onClick={() => setServicesOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group/item ${
                            pathname === svc.href
                              ? "bg-gold/10 border border-gold/20"
                              : "hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                          }`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            pathname === svc.href
                              ? "bg-gold/15 border border-gold/30 text-gold"
                              : "bg-white/[0.04] border border-white/[0.07] text-gold/60 group-hover/item:bg-gold/10 group-hover/item:border-gold/30 group-hover/item:text-gold"
                          }`}>
                            <svc.Icon size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-grotesk font-semibold text-sm ${pathname === svc.href ? "text-gold" : "text-cream/80 group-hover/item:text-cream"}`}>{svc.label}</span>
                              {svc.tag && <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.15em] text-gold bg-gold/10 border border-gold/25 px-1.5 py-0.5 rounded-full">{svc.tag}</span>}
                            </div>
                            <div className="font-inter text-[11px] text-text-muted mt-0.5 truncate">{svc.desc}</div>
                          </div>
                          <ArrowRight size={12} className="flex-shrink-0 opacity-0 group-hover/item:opacity-50 group-hover/item:translate-x-0.5 transition-all duration-150 text-gold" />
                        </Link>
                      ))}
                    </div>
                    <div className="relative px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                      <Link href="/services" onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between group/all">
                        <span className="font-grotesk text-xs font-bold uppercase tracking-[0.15em] text-gold/50 group-hover/all:text-gold transition-colors duration-150">View all services</span>
                        <ArrowRight size={11} className="text-gold/40 group-hover/all:text-gold group-hover/all:translate-x-0.5 transition-all duration-150" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Case Studies, About, Contact */}
            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href}
                className={`relative px-4 py-2 rounded-full font-grotesk text-sm font-semibold tracking-wide transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-gold text-deep-black shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                    : "text-cream/60 hover:text-cream hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA ── */}
          <Link href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-5 py-2.5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 flex-shrink-0">
            Free Audit
            <ArrowRight size={14} />
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 z-10"
            aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} className="text-gold" /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} className="text-cream/80" /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: SPRING }}
            className="fixed inset-0 z-[90] bg-[#080808]/98 backdrop-blur-xl flex flex-col pt-[68px] overflow-y-auto">
            <div className="absolute top-0 right-0 w-72 h-72 opacity-[0.08] pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />

            <div className="flex-1 flex flex-col px-6 py-6">
              {/* Home */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, ease: SPRING }}>
                <Link href="/"
                  className={`flex items-center justify-between py-5 border-b border-white/[0.05] group ${pathname === "/" ? "text-gold" : "text-cream/80 hover:text-cream"}`}>
                  <span className="font-grotesk font-bold text-3xl">Home</span>
                  <ArrowRight size={18} className={`transition-all duration-200 group-hover:translate-x-1 ${pathname === "/" ? "text-gold" : "text-cream/20 group-hover:text-gold/50"}`} />
                </Link>
              </motion.div>

              {/* Services — collapsible */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, ease: SPRING }}>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between py-5 border-b ${mobileServicesOpen ? "border-transparent" : "border-white/[0.05]"} ${isServicesActive ? "text-gold" : "text-cream/80"}`}>
                  <span className="font-grotesk font-bold text-3xl">Services</span>
                  <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="opacity-50" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-b border-white/[0.05]">
                      <div className="space-y-1 pb-4 pl-2 pt-1">
                        {services.map((svc, i) => (
                          <motion.div key={svc.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, ease: SPRING }}>
                            <Link href={svc.href} onClick={() => setMenuOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/s ${
                                pathname === svc.href ? "bg-gold/10 text-gold" : "text-cream/50 hover:text-cream hover:bg-white/[0.03]"
                              }`}>
                              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gold/60 flex-shrink-0"><svc.Icon size={13} /></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-grotesk font-semibold text-base">{svc.label}</span>
                                  {svc.tag && <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.15em] text-gold bg-gold/10 border border-gold/20 px-1.5 py-0.5 rounded-full">{svc.tag}</span>}
                                </div>
                                <div className="font-inter text-xs text-text-muted">{svc.desc}</div>
                              </div>
                              <ArrowRight size={14} className="opacity-0 group-hover/s:opacity-60 group-hover/s:translate-x-0.5 transition-all duration-150 text-gold" />
                            </Link>
                          </motion.div>
                        ))}
                        <Link href="/services" onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 font-grotesk text-xs font-bold uppercase tracking-[0.15em] text-gold/50 hover:text-gold transition-colors duration-150">
                          <ArrowRight size={11} />View all services
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other links */}
              {navLinks.slice(1).map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.27 + i * 0.06, ease: SPRING }}>
                  <Link href={link.href}
                    className={`flex items-center justify-between py-5 border-b border-white/[0.05] group ${pathname === link.href ? "text-gold" : "text-cream/80 hover:text-cream"}`}>
                    <span className="font-grotesk font-bold text-3xl">{link.label}</span>
                    <ArrowRight size={18} className={`transition-all duration-200 group-hover:translate-x-1 ${pathname === link.href ? "text-gold" : "text-cream/20 group-hover:text-gold/50"}`} />
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, ease: SPRING }} className="mt-8 space-y-4">
                <Link href="/contact"
                  className="flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300">
                  Book Free Audit
                  <ArrowRight size={16} />
                </Link>
                <div className="text-center space-y-1">
                  <a href="tel:+447478075473" className="block font-grotesk font-semibold text-sm text-gold/70 hover:text-gold transition-colors">+44 7478 075473</a>
                  <p className="font-inter text-text-muted text-xs">landscale.agency@gmail.com</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
