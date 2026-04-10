"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  MessageCircle,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Phone,
  ArrowRight,
  CheckCircle,
  Wrench,
  Hammer,
  Droplets,
  Leaf,
  Sparkles,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

const SPRING = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────
   TESTIMONIALS
   Replace placeholder content with real client
   testimonials. Set placeholder: false when live.
───────────────────────────────────────────── */
const testimonials = [
  {
    name: "Balázs Lavotha",
    business: "Lavotha Kert Kft",
    quote:
      "The form has completely transformed how we handle inquiries. It filters out unqualified leads automatically and acts like a 24/7 receptionist — saving us hours every week. We only talk to serious buyers now.",
    initials: "BL",
    rating: 5,
    placeholder: false,
  },
  {
    name: "Basil",
    business: "Mimosa Gardens",
    quote:
      "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen. It's already paying for itself in the quality of leads we're getting.",
    initials: "B",
    rating: 5,
    placeholder: false,
  },
  {
    name: "Péter Mantlik",
    business: "ViszCAD",
    quote:
      "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients. Working with him was smooth from start to finish — highly recommend.",
    initials: "PM",
    rating: 5,
    placeholder: false,
  },
];

const services = [
  { icon: Leaf, label: "Tereprendezés & Kertészet" },
  { icon: Hammer, label: "Építőipar & Felújítás" },
  { icon: Sparkles, label: "Takarítás & Portaszolgálat" },
  { icon: Droplets, label: "Vízvezetékszerelés" },
  { icon: Zap, label: "Elektromos munkák" },
  { icon: Wrench, label: "Karbantartás & Handyman" },
];

const features = [
  {
    num: "01",
    icon: MessageCircle,
    title: "24/7 Automatikus Válaszadás",
    desc: "Az AI éjjel-nappal fogadja az érdeklődőket — hétvégén és ünnepnapokon is. Egyetlen potenciális ügyfél sem marad válasz nélkül.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Azonnali Árajánlat Generálás",
    desc: "A rendszer az árajánlatot a te valós áraidra alapozva adja ki. Automatikusan, azonnal, emberi beavatkozás nélkül.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Komoly Ügyfelek Szűrése",
    desc: "Az AI kiszűri az időpazarló kérdezősködőket. Csak azok jutnak el hozzád, akik valóban fizetni is hajlandók.",
  },
  {
    num: "04",
    icon: MessageCircle,
    title: "Magyar és Angol Nyelven",
    desc: "A rendszer magyar és angol nyelven is kommunikál — tökéletesen alkalmas a külföldön dolgozó magyar vállalkozásoknak.",
  },
  {
    num: "05",
    icon: TrendingUp,
    title: "Több Megrendelés, Kevesebb Munka",
    desc: "Miközben dolgozol, az AI megrendeléseket gyűjt. Átlagosan heti 15–20 óra megtakarítás és jelentősen több konverzió.",
  },
  {
    num: "06",
    icon: Phone,
    title: "WhatsApp & Email Integráció",
    desc: "Zökkenőmentesen integrálódik a meglévő kommunikációs csatornáidba. Nem kell új rendszert tanulnod.",
  },
];

export default function HuPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end pb-16 md:pb-24 lg:pb-32 overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-[#080808]">
          {/* Orbs */}
          <div
            className="absolute rounded-full orb-1 pointer-events-none"
            style={{ width: 900, height: 900, top: "-20%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 65%)", filter: "blur(90px)" }}
          />
          <div
            className="absolute rounded-full orb-2 pointer-events-none"
            style={{ width: 650, height: 650, bottom: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute rounded-full orb-3 pointer-events-none"
            style={{ width: 450, height: 450, top: "40%", left: "52%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
          />
        </div>

        {/* Watermark */}
        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[18vw] leading-none text-white/[0.045] select-none pointer-events-none tracking-[-0.05em] translate-y-[15%]">
          LANDSCALE
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full">
          {/* Label */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 mb-10">
            <motion.span className="w-8 h-px bg-gold" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.6, delay: 0.2 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Magyar vállalkozásoknak · Landscale
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-10">
            <h1 className="font-grotesk font-bold leading-[0.88] tracking-[-0.04em]">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-gradient-gold">
                  VÉGE A
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-cream">
                  FELESLEGES
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.44, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-cream/20" style={{ WebkitTextStroke: "1px rgba(245,241,232,0.25)" }}>
                  ÉRDEKLŐDŐKNEK.
                </motion.div>
              </div>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end max-w-5xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/60 leading-relaxed font-light italic">
              AI chatbot és automatikus árajánlat-rendszer magyar szolgáltató vállalkozásoknak — tereprendezéstől az elektromos munkákig.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease: SPRING }} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                Ingyenes konzultáció
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/447478075473"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 text-cream/70 font-grotesk font-medium text-base px-8 py-5 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300"
              >
                <MessageCircle size={16} />
                WhatsApp üzenet
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-10 right-16 hidden md:flex flex-col items-center gap-3">
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-20 bg-gradient-to-b from-gold/80 to-transparent" />
            <span className="font-grotesk text-[9px] uppercase tracking-[0.35em] text-text-muted rotate-90 origin-center translate-y-10">Görgetés</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-gold/[0.08] bg-[#0D0D0D] py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            ["Tereprendezés", "• Építőipar", "Takarítás", "• Vízvezetékszerelés", "Elektromos munkák", "• Karbantartás", "24/7 Automatikus válasz", "• Magyar & Angol nyelv", "Azonnali árajánlat"].map((item, i) => (
              <span key={`${gi}-${i}`} className="font-grotesk font-medium text-xs text-gold/40 uppercase tracking-[0.2em] flex items-center gap-3">
                {item}
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0A0A0A] py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { val: "15–20", suffix: "óra", label: "Megtakarítás hetente" },
              { val: "24/7", suffix: "", label: "Folyamatos elérhetőség" },
              { val: "3×", suffix: "", label: "Több komoly érdeklődő" },
              { val: "0", suffix: " percen belül", label: "Azonnali válasz" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="font-grotesk font-bold text-[clamp(28px,4vw,52px)] text-gradient-gold leading-none tracking-[-0.04em]">
                    {stat.val}<span className="text-[0.5em] text-gold/70">{stat.suffix}</span>
                  </div>
                  <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-2">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-0 right-0 font-grotesk font-bold text-[15vw] leading-none text-white/[0.06] select-none pointer-events-none tracking-[-0.05em]">PROBLÉMA</div>
        <div className="absolute rounded-full orb-2 pointer-events-none"
          style={{ width: 700, height: 700, top: "10%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Ismerős ez?</span>
            </div>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5.5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              MINDEN NAP<br /><span className="text-gradient-gold">UGYANAZOK</span><br />A PROBLÉMÁK.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              {
                num: "01",
                title: "Naponta 10–20 érdeklődés — de csak 2–3 komoly vevő",
                desc: "Az időd nagy részét olyan emberek veszik el, akik soha nem fognak rendelni. Az AI kiszűri őket — helyetted.",
              },
              {
                num: "02",
                title: "Este és hétvégén is jönnek az üzenetek",
                desc: "Nem tudsz 24 órában rendelkezésre állni. Az AI igen. Egyetlen érdeklődő sem esik el azért, mert éppen dolgoztál.",
              },
              {
                num: "03",
                title: "Lassú válasz = elveszített megrendelés",
                desc: "Ha nem válaszolsz gyorsan, a potenciális ügyfél a konkurenciahoz megy. Az AI másodperceken belül reagál.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: SPRING }}
                className="relative bg-[#0D0D0D] p-8 md:p-10 xl:p-14 group hover:bg-[#111111] transition-colors duration-500 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.06) 0%, transparent 65%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
                <div className="absolute bottom-2 right-4 font-grotesk font-bold leading-none text-white/[0.06] group-hover:text-gold/[0.18] transition-colors duration-500 select-none pointer-events-none" style={{ fontSize: "clamp(90px,12vw,160px)" }}>{item.num}</div>
                <div className="relative z-10">
                  <div className="font-grotesk font-bold text-[10px] uppercase tracking-[0.3em] text-gold/40 mb-4">{item.num}</div>
                  <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-4 tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                  <p className="font-inter text-text-muted text-base leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-1 pointer-events-none"
          style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-16">
          <Reveal className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">A folyamat</span>
            </div>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5.5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              HOGYAN<br /><span className="text-gradient-gold">MŰKÖDIK?</span>
            </h2>
          </Reveal>

          {/* Featured card — AI Estimator flow */}
          <Reveal>
            <div className="relative bg-[#0D0D0D] border border-gold/25 rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left — Steps */}
                <div className="p-8 md:p-12 xl:p-16 relative">
                  <div className="inline-flex items-center gap-2 mb-6 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span className="font-grotesk text-xs font-bold uppercase tracking-[0.2em] text-gold">Automatikus folyamat</span>
                  </div>

                  <h3 className="font-grotesk font-bold text-[clamp(28px,3.5vw,54px)] text-cream leading-[0.92] tracking-[-0.03em] mb-4">
                    AZ AI DOLGOZIK.<br /><span className="text-gradient-gold">TE CSAK ÉPÍT​SZ.</span>
                  </h3>
                  <p className="font-cormorant text-lg md:text-xl text-cream/50 font-light italic leading-relaxed mb-8">
                    A rendszer automatikusan kezeli az érdeklődőket — te csak a komoly megrendelőkkel találkozol.
                  </p>

                  <div className="space-y-4 mb-10">
                    {[
                      { step: "01", text: "Érdeklődő érkezik a weboldaladra és kér egy árajánlatot" },
                      { step: "02", text: "Az AI felméri az igényeit — budget, határidő, méret" },
                      { step: "03", text: "Azonnali becslést ad a te valós áraidra alapozva" },
                      { step: "04", text: "Csak a komoly, fizetőkész ügyfelek jutnak el hozzád" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: SPRING }}
                        className="flex items-center gap-4 group"
                      >
                        <span className="font-grotesk font-bold text-[11px] text-gold/50 tracking-[0.2em] w-6 flex-shrink-0">{item.step}</span>
                        <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] group-hover:border-gold/20 group-hover:bg-gold/[0.03] rounded-xl px-4 py-3 transition-all duration-300">
                          <motion.span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0 group-hover:bg-gold transition-colors duration-300" />
                          <span className="font-inter text-cream/70 text-sm group-hover:text-cream/90 transition-colors duration-300">{item.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mb-10">
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[44px] text-gradient-gold leading-none tracking-[-0.04em]">15–20</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">óra/hét megtakarítás</div>
                    </div>
                    <div className="w-px h-12 bg-gold/15 hidden sm:block" />
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[44px] text-gradient-gold leading-none tracking-[-0.04em]">24/7</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">alvás közben is dolgozik</div>
                    </div>
                    <div className="w-px h-12 bg-gold/15 hidden sm:block" />
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[44px] text-gradient-gold leading-none tracking-[-0.04em]">0</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">elveszített érdeklődő</div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
                  >
                    Mutasd meg, hogyan működne nálam →
                  </Link>
                </div>

                {/* Right — Chat preview */}
                <div className="relative lg:border-l border-gold/[0.08] p-8 md:p-12 xl:p-16 flex flex-col justify-center">
                  <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.10) 0%, transparent 60%)" }} />
                  <div className="relative z-10">
                    <div className="bg-[#0A0A0A] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      <div className="border-b border-white/[0.06] px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                          <span className="font-grotesk text-xs font-semibold text-cream/50 uppercase tracking-[0.15em]">AI Asszisztens — Online</span>
                        </div>
                        <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.15em] text-gold/40 border border-gold/15 px-2 py-0.5 rounded-full">Élő példa</span>
                      </div>
                      <div className="p-4 space-y-2">
                        {[
                          { from: "ai", text: "Szia! Segíthetek azonnali árajánlattal. Milyen munkáról van szó?" },
                          { from: "user", text: "Teraszt szeretnék lerakni" },
                          { from: "ai", text: "Mekkora területről van szó hozzávetőlegesen? (m²)" },
                          { from: "user", text: "Kb. 35 m²" },
                          { from: "ai", text: "Milyen anyagot szeretne? (kő, porcelán, tégla)" },
                          { from: "user", text: "Természetes kő" },
                          { from: "ai", text: "Mi a hozzávetőleges kerete a projektre?" },
                          { from: "user", text: "£4,000–6,000 körül" },
                          { from: "ai", text: "Köszönöm! Az Ön projektjére vonatkozó becsült ár: £4,200–5,800. Mikor lenne ideális az elvégzés?" },
                          { from: "user", text: "4–6 héten belül" },
                          { from: "ai", text: "Tökéletes — most összekötöm Önt a csapattal a pontos felméréshez. ✓" },
                        ].map((msg, i) => (
                          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES COVERED ── */}
      <section className="py-16 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-3 pointer-events-none"
          style={{ width: 700, height: 700, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-16">
          <Reveal className="mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Iparágak</span>
            </div>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
              MINDEN<br /><span className="text-gradient-gold">SZOLGÁLTATÓ</span><br />VÁLLALKOZÁSNAK.
            </h2>
            <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed max-w-2xl mt-6">
              Nem csak tereprendezés — az AI rendszerünk bármilyen magyar szolgáltató vállalkozásnak tökéletesen működik.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/[0.04]">
            {services.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: SPRING }}
                className="bg-[#0A0A0A] p-8 md:p-10 xl:p-12 group hover:bg-[#0F0F0F] transition-colors duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/25 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                    <svc.icon size={20} />
                  </div>
                  <h3 className="font-grotesk font-bold text-base md:text-lg text-cream group-hover:text-gold transition-colors duration-300">{svc.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-0" />
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute left-0 top-0 font-grotesk font-bold text-[15vw] leading-none text-white/[0.06] select-none pointer-events-none tracking-[-0.05em]">FUNKCIÓK</div>
        <div className="absolute rounded-full orb-1 pointer-events-none"
          style={{ width: 700, height: 700, top: "20%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Mit kapsz</span>
            </div>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              AZ AI AMIT<br /><span className="text-gradient-gold">ELVÉGEZ HELYETTED.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {features.map((feat, i) => (
              <motion.div
                key={feat.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: SPRING }}
                className="relative bg-[#0D0D0D] p-8 md:p-10 group hover:-translate-y-4 hover:border-gold/50 hover:bg-[#121212] hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.12)] border border-transparent transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Top accent — slides from center */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center" />
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 60%)" }} />
                {/* Ghost number */}
                <div className="absolute bottom-0 right-3 font-grotesk font-bold text-[88px] leading-none text-white/0 group-hover:text-gold/[0.07] transition-colors duration-400 select-none pointer-events-none">{feat.num}</div>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                    <feat.icon size={18} />
                  </div>
                  <div className="font-grotesk font-bold text-[10px] uppercase tracking-[0.25em] text-gold/35 mb-3">{feat.num}</div>
                  <h3 className="font-grotesk font-bold text-lg text-cream mb-3 tracking-tight group-hover:text-white transition-colors duration-300">{feat.title}</h3>
                  <p className="font-inter text-text-muted text-sm leading-relaxed group-hover:text-cream/60 transition-colors duration-300">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-0 font-grotesk font-bold text-[14vw] leading-none text-white/[0.06] select-none pointer-events-none tracking-[-0.05em]">MUNKÁK</div>
        <div className="absolute rounded-full orb-2 pointer-events-none"
          style={{ width: 700, height: 700, bottom: "0%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-16">
          <Reveal className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Referenciák</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
                VALÓDI<br /><span className="text-gradient-gold">PROJEKTEK.</span>
              </h2>
              <Link href="/case-studies"
                className="inline-flex items-center gap-2 font-grotesk text-sm font-semibold text-gold/60 hover:text-gold transition-colors duration-200 border border-gold/20 hover:border-gold/50 px-5 py-2.5 rounded-full flex-shrink-0 self-start sm:self-auto">
                Összes projekt
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="space-y-6 md:space-y-8">
            {[
              {
                name: "Lavotha Kert Kft.",
                tagline: "Magyar kertépítés — Digitális átalakulás",
                location: "Miskolc, Magyarország",
                tag: "Webdesign",
                desc: "Tapasztalt kertészeti vállalkozás, amely évtizedes szakmai múlttal rendelkezett, de elavult online jelenléttel. Olyan weboldalt kaptak, amely valóban tükrözi munkájuk minőségét és automatikusan szűri az érdeklődőket.",
                metrics: [
                  { label: "Teljesítmény", val: "96" },
                  { label: "SEO", val: "100" },
                  { label: "Betöltés", val: "<1s" },
                ],
                url: "https://www.kertepites-miskolc.hu/",
                file: "lavothakertkft",
                index: "01",
              },
              {
                name: "Tiszaújváros Transz Kft.",
                tagline: "Prémium építőipari vállalat — Professzionális online megjelenés",
                location: "Kazincbarcika, Magyarország",
                tag: "Webdesign",
                desc: "A régió egyik vezető építőipari vállalkozása, 25 éves iparági tapasztalattal. Mérnöki kivitelezés, általános vállalkozás és infrastruktúra-projektek — olyan weboldalt igényeltek, amely megfelel súlyuknak és hitelességüknek a megrendelők szemében.",
                metrics: [
                  { label: "Teljesítmény", val: "95" },
                  { label: "SEO", val: "100" },
                  { label: "Betöltés", val: "<1s" },
                ],
                url: "https://tiszaujvarostransz.hu/",
                file: "tiszaujvarostransz",
                index: "02",
              },
            ].map((project, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: SPRING }}
                  className="relative bg-[#0D0D0D] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-gold/20 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at ${isEven ? "0%" : "100%"} 50%, rgba(212,175,55,0.05) 0%, transparent 60%)` }} />

                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${!isEven ? "lg:[direction:rtl]" : ""}`}>
                    {/* Image */}
                    <div className={`${!isEven ? "[direction:ltr]" : ""} relative`}>
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] overflow-hidden">
                        <Image
                          src={`/images/case-studies/${project.file}.png`}
                          alt={project.name}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/30" />

                        {/* Location badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 text-gold/80">
                            {project.location}
                          </span>
                        </div>

                        {/* Index watermark */}
                        <div className="absolute bottom-2 right-4 font-grotesk font-bold text-[80px] leading-none text-white/[0.07] select-none pointer-events-none tracking-[-0.05em]">
                          {project.index}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${!isEven ? "[direction:ltr]" : ""} p-8 md:p-10 xl:p-12 flex flex-col justify-center space-y-5`}>
                      <div className="flex items-center gap-3">
                        <span className="font-grotesk font-bold text-[10px] uppercase tracking-[0.25em] text-gold/40">{project.index}</span>
                        <span className="h-px flex-1 bg-gold/10" />
                        <span className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-gold/60 border border-gold/20 px-3 py-1 rounded-full">{project.tag}</span>
                      </div>

                      <div>
                        <h3 className="font-grotesk font-bold text-[clamp(24px,3vw,44px)] text-cream mb-2 tracking-[-0.02em] leading-[0.95]">
                          {project.name}
                        </h3>
                        <p className="font-cormorant text-base text-gold/50 italic leading-relaxed">{project.tagline}</p>
                      </div>

                      <p className="font-inter text-text-muted text-sm leading-relaxed">{project.desc}</p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-4 py-4 border-t border-white/[0.05]">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-center min-w-[70px]">
                            <div className="font-grotesk font-bold text-[clamp(20px,2.5vw,32px)] text-gradient-gold leading-none tracking-[-0.04em]">{m.val}</div>
                            <div className="font-inter text-[10px] text-text-muted uppercase tracking-[0.12em] mt-1">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-grotesk font-bold text-sm text-gold/70 hover:text-gold transition-colors duration-200 group/link"
                      >
                        Weboldal megtekintése
                        <ExternalLink size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA to full case studies */}
          <Reveal delay={0.1} className="mt-12 text-center">
            <Link href="/case-studies"
              className="inline-flex items-center gap-3 border border-gold/25 text-cream/70 font-grotesk font-semibold text-sm px-8 py-4 rounded-full hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300">
              Összes referencia projekt megtekintése
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/*
        ╔══════════════════════════════════════════════════════════════╗
        ║  HOW TO ADD REAL TESTIMONIALS                               ║
        ║  1. Open src/app/hu/page.tsx                                ║
        ║  2. Find the `testimonials` array at the top of the file    ║
        ║  3. Replace each object's fields:                           ║
        ║     - name: "Ügyfél teljes neve"                            ║
        ║     - business: "Iparág, Város"                             ║
        ║     - quote: "A valódi vélemény szövege..."                  ║
        ║     - initials: "KA" (monogram a fotó helyett)              ║
        ║     - rating: 5                                             ║
        ║     - placeholder: false  ← set this to false!             ║
        ║  4. Save and deploy                                         ║
        ╚══════════════════════════════════════════════════════════════╝
      */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-2 pointer-events-none"
          style={{ width: 700, height: 700, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-16">
          <Reveal className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Ügyfeleink mondják</span>
            </div>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
              VALÓDI<br /><span className="text-gradient-gold">EREDMÉNYEK.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: SPRING }}
                className={`relative bg-[#0D0D0D] border rounded-2xl p-8 group hover:border-gold/30 transition-all duration-400 overflow-hidden ${t.placeholder ? "border-white/[0.04] opacity-50" : "border-white/[0.07]"}`}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/25 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className={`font-cormorant text-lg leading-relaxed mb-6 ${t.placeholder ? "text-cream/20 italic" : "text-cream/70 italic"}`}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <span className="font-grotesk font-bold text-xs text-gold">{t.initials}</span>
                    </div>
                    <div>
                      <div className={`font-grotesk font-bold text-sm ${t.placeholder ? "text-cream/20" : "text-cream"}`}>{t.name}</div>
                      <div className="font-inter text-xs text-text-muted">{t.business}</div>
                    </div>
                    {t.placeholder && (
                      <span className="ml-auto font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/20 border border-gold/10 px-2 py-1 rounded-full">
                        Hamarosan
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER / PRICING ── */}
      <section className="py-16 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-1 pointer-events-none"
          style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold block" />
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Az ajánlatunk</span>
              </div>
              <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em] mb-6">
                INGYENES<br /><span className="text-gradient-gold">KONZULTÁCIÓ.</span><br />NINCS KÖTÖTTSÉG.
              </h2>
              <p className="font-inter text-text-muted text-base leading-relaxed max-w-lg">
                30 perces online megbeszélés — megmutatjuk, pontosan hogyan működne a rendszer a te vállalkozásodban. Nincs értékesítési nyomás, nincs rejtett díj. Ha nem látod az értékét, nem kell folytatni.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-[#0D0D0D] border border-gold/25 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
                <div className="p-8 md:p-10 relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span className="font-grotesk text-xs font-bold uppercase tracking-[0.2em] text-gold">Mit kapsz az első hívásból</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[
                      "Pontos képet, hogyan működne a rendszer nálad",
                      "Becsült megtakarítás — órában és fontban",
                      "Versenyképes árajánlat, egyedi igényeidre szabva",
                      "Teljes átláthatóság — kérdezz bármit",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-cream/70 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
                    >
                      <CalendarDays size={15} />
                      Foglalj időpontot
                    </Link>
                    <a
                      href="https://wa.me/447478075473"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 text-cream/70 font-grotesk font-medium text-sm px-6 py-4 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-16 md:mt-24" />
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 md:py-48 lg:py-64 bg-[#060606] overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full orb-1"
            style={{ width: 1000, height: 1000, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(100px)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: SPRING }}
              className="font-grotesk font-bold text-[clamp(44px,7.5vw,104px)] text-cream leading-[0.88] tracking-[-0.04em]"
            >
              KÉSZEN ÁLLSZ<br /><span className="text-gradient-gold">TÖBB ÜGYFÉLRE?</span>
            </motion.h2>
          </div>

          <Reveal delay={0.2} className="mb-12">
            <p className="font-cormorant text-xl md:text-2xl text-cream/40 font-light italic leading-relaxed max-w-2xl mx-auto">
              Vedd fel velünk a kapcsolatot — megmutatjuk, mennyit spórolhatsz és mennyivel növelheted a bevételed.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-lg px-12 py-6 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1.5"
              >
                Ingyenes konzultáció foglalása
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <a
                href="https://wa.me/447478075473"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-inter text-text-muted text-sm hover:text-gold transition-colors group"
              >
                <MessageCircle size={16} className="group-hover:text-gold transition-colors" />
                WhatsApp üzenet küldése
              </a>
              <span className="hidden sm:block text-white/10">|</span>
              <a
                href="tel:+447478075473"
                className="inline-flex items-center gap-2 font-inter text-text-muted text-sm hover:text-gold transition-colors group"
              >
                <Phone size={16} className="group-hover:text-gold transition-colors" />
                +44 7478 075473
              </a>
              <span className="hidden sm:block text-white/10">|</span>
              <a
                href="mailto:landscale.agency@gmail.com"
                className="font-inter text-text-muted/60 text-sm hover:text-gold transition-colors"
              >
                landscale.agency@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
