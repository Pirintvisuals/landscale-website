"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, X, Menu, Zap, MessageCircle, Globe, TrendingUp } from "lucide-react";
import { localeFromPathname, localize, switchLocaleHref, toEnglishPath } from "@/lib/i18n";
import { NAV, PHONE } from "@/content/ui";

const serviceIcons = [Zap, MessageCircle, Globe, TrendingUp];

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

  const lang = localeFromPathname(pathname);
  const t = NAV[lang];
  const phone = PHONE[lang];
  // Path relative to the language root, used for active-state comparisons.
  const relPath = toEnglishPath(pathname);
  const services = t.services.map((s, i) => ({ ...s, Icon: serviceIcons[i] }));
  const homeHref = localize("/", lang);
  const isServicesActive = relPath.startsWith("/services");

  useEffect(() => { setMenuOpen(false); setMobileServicesOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide on scroll-down past 100px, show on scroll-up, never hide when menu is open
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
          <Link href={homeHref} className="flex items-center flex-shrink-0 z-10">
            <div className="relative w-[180px] h-[60px] overflow-hidden rounded-xl">
              <Image
                src="/landscape_1.png"
                alt="Landscale Agency"
                fill
                style={{ objectFit: "cover", objectPosition: "center 38%" }}
                priority
                sizes="180px"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">

            {/* Home */}
            <Link href={homeHref}
              className={`relative px-4 py-2 rounded-full font-grotesk text-sm font-semibold tracking-wide transition-all duration-200 ${
                relPath === "/"
                  ? "bg-gold text-deep-black shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                  : "text-cream/60 hover:text-cream hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
              }`}>
              {t.links[0].label}
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
                {lang === "hu" ? "Szolgáltatások" : "Services"}
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
                        <Link key={svc.label} href={localize(svc.href, lang)}
                          onClick={() => setServicesOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group/item ${
                            relPath === svc.href
                              ? "bg-gold/10 border border-gold/20"
                              : "hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                          }`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            relPath === svc.href
                              ? "bg-gold/15 border border-gold/30 text-gold"
                              : "bg-white/[0.04] border border-white/[0.07] text-gold/60 group-hover/item:bg-gold/10 group-hover/item:border-gold/30 group-hover/item:text-gold"
                          }`}>
                            <svc.Icon size={15} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-grotesk font-semibold text-sm ${relPath === svc.href ? "text-gold" : "text-cream/80 group-hover/item:text-cream"}`}>{svc.label}</span>
                              {svc.tag && <span className="font-grotesk text-[8px] font-bold uppercase tracking-[0.15em] text-gold bg-gold/10 border border-gold/25 px-1.5 py-0.5 rounded-full">{svc.tag}</span>}
                            </div>
                            <div className="font-inter text-[11px] text-text-muted mt-0.5 truncate">{svc.desc}</div>
                          </div>
                          <ArrowRight size={12} className="flex-shrink-0 opacity-0 group-hover/item:opacity-50 group-hover/item:translate-x-0.5 transition-all duration-150 text-gold" />
                        </Link>
                      ))}
                    </div>
                    <div className="relative px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                      <Link href={localize("/services", lang)} onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between group/all">
                        <span className="font-grotesk text-xs font-bold uppercase tracking-[0.15em] text-gold/50 group-hover/all:text-gold transition-colors duration-150">{t.viewAll}</span>
                        <ArrowRight size={11} className="text-gold/40 group-hover/all:text-gold group-hover/all:translate-x-0.5 transition-all duration-150" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Case Studies, About, Contact */}
            {t.links.slice(1).map((link) => (
              <Link key={link.href} href={localize(link.href, lang)}
                className={`relative px-4 py-2 rounded-full font-grotesk text-sm font-semibold tracking-wide transition-all duration-200 ${
                  relPath === link.href
                    ? "bg-gold text-deep-black shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                    : "text-cream/60 hover:text-cream hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                }`}>
                {link.label}
              </Link>
            ))}

          </nav>

          {/* ── Right side: language toggle + CTA ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href={switchLocaleHref(pathname, lang === "en" ? "hu" : "en")}
              aria-label={lang === "en" ? "Switch to Hungarian" : "Switch to English"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-grotesk text-xs font-bold tracking-wide transition-all duration-200 text-cream/35 border border-white/[0.07] hover:text-cream/70 hover:border-white/[0.14] hover:bg-white/[0.04]">
              <Globe size={12} className="opacity-70" />
              <span>{t.switchLabel}</span>
            </Link>
            <div className="w-px h-5 bg-white/[0.10]" />
            <Link href={localize("/contact", lang)}
              className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-5 py-2.5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] hover:-translate-y-0.5">
              {t.freeAudit}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 z-10"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}>
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
                <Link href={homeHref}
                  className={`flex items-center justify-between py-5 border-b border-white/[0.05] group ${relPath === "/" ? "text-gold" : "text-cream/80 hover:text-cream"}`}>
                  <span className="font-grotesk font-bold text-3xl">{t.links[0].label}</span>
                  <ArrowRight size={18} className={`transition-all duration-200 group-hover:translate-x-1 ${relPath === "/" ? "text-gold" : "text-cream/20 group-hover:text-gold/50"}`} />
                </Link>
              </motion.div>

              {/* Services, collapsible */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, ease: SPRING }}>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between py-5 border-b ${mobileServicesOpen ? "border-transparent" : "border-white/[0.05]"} ${isServicesActive ? "text-gold" : "text-cream/80"}`}>
                  <span className="font-grotesk font-bold text-3xl">{lang === "hu" ? "Szolgáltatások" : "Services"}</span>
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
                            <Link href={localize(svc.href, lang)} onClick={() => setMenuOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/s ${
                                relPath === svc.href ? "bg-gold/10 text-gold" : "text-cream/50 hover:text-cream hover:bg-white/[0.03]"
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
                        <Link href={localize("/services", lang)} onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 font-grotesk text-xs font-bold uppercase tracking-[0.15em] text-gold/50 hover:text-gold transition-colors duration-150">
                          <ArrowRight size={11} />{t.viewAll}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other links */}
              {t.links.slice(1).map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.27 + i * 0.06, ease: SPRING }}>
                  <Link href={localize(link.href, lang)}
                    className={`flex items-center justify-between py-5 border-b border-white/[0.05] group ${relPath === link.href ? "text-gold" : "text-cream/80 hover:text-cream"}`}>
                    <span className="font-grotesk font-bold text-3xl">{link.label}</span>
                    <ArrowRight size={18} className={`transition-all duration-200 group-hover:translate-x-1 ${relPath === link.href ? "text-gold" : "text-cream/20 group-hover:text-gold/50"}`} />
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, ease: SPRING }} className="mt-8 space-y-4">
                <Link href={localize("/contact", lang)}
                  className="flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300">
                  {t.bookFreeAudit}
                  <ArrowRight size={16} />
                </Link>
                <div className="text-center space-y-1">
                  <a href={phone.href} className="block font-grotesk font-semibold text-sm text-gold/70 hover:text-gold transition-colors">{phone.display}</a>
                  <p className="font-inter text-text-muted text-xs">milan@landscale.net</p>
                </div>
                <Link href={switchLocaleHref(pathname, lang === "en" ? "hu" : "en")} onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border border-white/[0.08] rounded-full py-3 font-grotesk text-sm font-semibold text-cream/40 hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all duration-200">
                  <span className="text-base leading-none">{t.otherSiteFlag}</span>
                  {t.otherSiteLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
