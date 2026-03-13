"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Info,
  Mail,
  ChevronDown,
  Monitor,
  TrendingUp,
  Bot,
  ArrowRight,
  X,
  Menu,
} from "lucide-react";

const services = [
  {
    href: "/services/website-design",
    label: "Website Design",
    desc: "Conversion-focused luxury sites",
    Icon: Monitor,
  },
  {
    href: "/services/seo-marketing",
    label: "SEO & Marketing",
    desc: "Dominate local Google search",
    Icon: TrendingUp,
  },
  {
    href: "/services/ai-lead-generation",
    label: "AI Lead Generation",
    desc: "24/7 automated lead filtering",
    Icon: Bot,
  },
];

const navLinks = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/case-studies", label: "Case Studies", Icon: Briefcase },
  { href: "/about", label: "About", Icon: Info },
  { href: "/contact", label: "Contact", Icon: Mail },
];

const SPRING = [0.16, 1, 0.3, 1] as const;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isServicesActive = pathname.startsWith("/services");

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: SPRING }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-[#111111]/80 backdrop-blur-md border-b border-white/[0.04]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center flex-shrink-0 z-10">
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

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

            {/* Home */}
            <Link href="/"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-grotesk text-sm font-medium tracking-wide transition-all duration-200 group ${
                pathname === "/" ? "text-gold bg-gold/8" : "text-cream/70 hover:text-cream hover:bg-white/[0.05]"
              }`}>
              <Home size={13} className={`flex-shrink-0 ${pathname === "/" ? "text-gold" : "text-cream/40 group-hover:text-cream/70"}`} />
              Home
              {pathname === "/" && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-gold/[0.08]" />}
            </Link>

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-grotesk text-sm font-medium tracking-wide transition-all duration-200 group ${
                  isServicesActive ? "text-gold bg-gold/8" : "text-cream/70 hover:text-cream hover:bg-white/[0.05]"
                }`}>
                <Monitor size={13} className={`flex-shrink-0 ${isServicesActive ? "text-gold" : "text-cream/40 group-hover:text-cream/70"}`} />
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} className="text-current opacity-60" />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: SPRING }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#141414] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Top accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="p-2">
                      {services.map((svc) => (
                        <Link key={svc.href} href={svc.href}
                          onClick={() => setServicesOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl group transition-all duration-200 ${
                            pathname === svc.href ? "bg-gold/10 text-gold" : "hover:bg-white/[0.04] text-cream/80 hover:text-cream"
                          }`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            pathname === svc.href ? "bg-gold/20 border border-gold/30" : "bg-white/[0.05] border border-white/[0.06] group-hover:bg-gold/10 group-hover:border-gold/20"
                          }`}>
                            <svc.Icon size={15} className={pathname === svc.href ? "text-gold" : "text-cream/50 group-hover:text-gold"} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-grotesk font-semibold text-sm leading-tight">{svc.label}</div>
                            <div className="font-inter text-xs text-text-muted mt-0.5 leading-tight">{svc.desc}</div>
                          </div>
                          <ArrowRight size={13} className="text-cream/20 group-hover:text-gold/60 flex-shrink-0 transition-colors duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-white/[0.05]">
                      <Link href="/services" onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between font-grotesk text-xs font-semibold text-gold/60 hover:text-gold transition-colors duration-200">
                        View all services
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Case Studies, About, Contact */}
            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-grotesk text-sm font-medium tracking-wide transition-all duration-200 group ${
                  pathname === link.href ? "text-gold bg-gold/8" : "text-cream/70 hover:text-cream hover:bg-white/[0.05]"
                }`}>
                <link.Icon size={13} className={`flex-shrink-0 ${pathname === link.href ? "text-gold" : "text-cream/40 group-hover:text-cream/70"}`} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA ── */}
          <Link href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-5 py-2.5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 flex-shrink-0">
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
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: SPRING }}
            className="fixed inset-0 z-[90] bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col pt-[68px] overflow-y-auto">

            {/* Background orb */}
            <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />

            <div className="flex-1 flex flex-col px-6 py-8">
              {/* Home */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, ease: SPRING }}>
                <Link href="/"
                  className={`flex items-center gap-4 py-4 border-b border-white/[0.06] group ${pathname === "/" ? "text-gold" : "text-cream/80"}`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pathname === "/" ? "bg-gold/15 border-gold/30" : "bg-white/[0.04] border-white/[0.08]"}`}>
                    <Home size={18} className={pathname === "/" ? "text-gold" : "text-cream/50"} />
                  </div>
                  <span className="font-grotesk font-bold text-2xl">{`Home`}</span>
                  <ArrowRight size={16} className="ml-auto text-cream/20 group-hover:text-gold/60 transition-colors" />
                </Link>
              </motion.div>

              {/* Services section */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, ease: SPRING }}>
                <div className={`flex items-center gap-4 pt-4 pb-2 ${isServicesActive ? "text-gold" : "text-cream/80"}`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${isServicesActive ? "bg-gold/15 border-gold/30" : "bg-white/[0.04] border-white/[0.08]"}`}>
                    <Monitor size={18} className={isServicesActive ? "text-gold" : "text-cream/50"} />
                  </div>
                  <span className="font-grotesk font-bold text-2xl">Services</span>
                </div>
                <div className="ml-14 space-y-1 mb-2 pb-4 border-b border-white/[0.06]">
                  {services.map((svc, i) => (
                    <motion.div key={svc.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 + i * 0.04, ease: SPRING }}>
                      <Link href={svc.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                          pathname === svc.href ? "bg-gold/10 text-gold" : "text-cream/60 hover:text-cream hover:bg-white/[0.04]"
                        }`}>
                        <svc.Icon size={15} className={pathname === svc.href ? "text-gold" : "text-cream/40 group-hover:text-gold/60"} />
                        <div>
                          <div className="font-grotesk font-semibold text-sm">{svc.label}</div>
                          <div className="font-inter text-xs text-text-muted">{svc.desc}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Other links */}
              {navLinks.slice(1).map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.27 + i * 0.06, ease: SPRING }}>
                  <Link href={link.href}
                    className={`flex items-center gap-4 py-4 border-b border-white/[0.06] group ${pathname === link.href ? "text-gold" : "text-cream/80"}`}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pathname === link.href ? "bg-gold/15 border-gold/30" : "bg-white/[0.04] border-white/[0.08]"}`}>
                      <link.Icon size={18} className={pathname === link.href ? "text-gold" : "text-cream/50"} />
                    </div>
                    <span className="font-grotesk font-bold text-2xl">{link.label}</span>
                    <ArrowRight size={16} className="ml-auto text-cream/20 group-hover:text-gold/60 transition-colors" />
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease: SPRING }} className="mt-8">
                <Link href="/contact"
                  className="flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Book Free Audit
                  <ArrowRight size={16} />
                </Link>
                <p className="mt-5 font-inter text-text-muted text-sm text-center">landscale.agency@gmail.com</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
