"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

function CountUp({ target, suffix = "", duration = 2.2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

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
      "Az ajánlatkérő teljesen átalakította, ahogy az érdeklődőket kezeljük. Automatikusan kiszűri a nem komoly ajánlatkérőket, és 24/7 recepciósként működik — hetente órákat spórolunk. Most már csak azokkal beszélünk, akik valóban megrendelők lesznek.",
    initials: "BL",
    rating: 5,
    placeholder: false,
  },
  {
    name: "Basil",
    business: "Mimosa Gardens",
    quote:
      "A weboldal lenyűgöző, és azonnal prémium szolgáltatásnak pozicionál minket. Több ügyfelünk is elmondta, hogy ez a leglátványosabb kerttervezős oldal, amit valaha láttak. Már most megtérül az érdeklődők minőségén keresztül.",
    initials: "B",
    rating: 5,
    placeholder: false,
  },
  {
    name: "Péter Mantlik",
    business: "ViszCAD",
    quote:
      "Milan pontosan azt szállította, amire szükségünk volt, rekordidő alatt. Az oldal gyors, profi, és jobb ügyfeleket vonz. Az együttműködés elejétől a végéig gördülékeny volt — csak ajánlani tudom.",
    initials: "PM",
    rating: 5,
    placeholder: false,
  },
];

const industries = [
  {
    icon: Leaf,
    label: "Tereprendezés & Kertészet",
    desc: "Szezonális roham, felesleges árajánlat-kérők, véget nem érő egyeztetések. Az AI szűri, mi éri meg az idődet — a komoly megrendelők jutnak csak el hozzád.",
    project: {
      name: "Lavotha Kert Kft.",
      tagline: "Webdesign · Miskolc",
      metrics: ["96 Teljesítmény", "100 SEO"],
      image: "/images/case-studies/lavothakertkft.png",
      url: "https://www.kertepites-miskolc.hu/",
    },
  },
  {
    icon: Hammer,
    label: "Építőipar & Felújítás",
    desc: "Nagy projektek, komoly büdzsék — de rengeteg nem komoly érdeklődő. Az AI csak a valódi megrendelőket engedi át, te pedig az építéssel foglalkozol.",
    project: {
      name: "Tiszaújváros Transz Kft.",
      tagline: "Webdesign · Kazincbarcika",
      metrics: ["95 Teljesítmény", "100 SEO"],
      image: "/images/case-studies/tiszaujvarostransz.png",
      url: "https://tiszaujvarostransz.hu/",
    },
  },
  {
    icon: Droplets,
    label: "Vízvezetékszerelés",
    desc: "Sürgős hívások, gyors döntések — az AI kiszűri, mi valóban sürgős, és csak a fizető ügyfeleket kapcsolja hozzád. Nincs több éjjeli spam.",
    project: {
      name: "ViszCAD",
      tagline: "Webdesign · Magyarország",
      metrics: ["★★★★★", "Ajánlott"],
      image: "/images/case-studies/viszcad.png",
      url: null,
    },
  },
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
            <h1 className="font-grotesk font-bold leading-[0.92] tracking-[-0.04em]">
              <div className="overflow-hidden pt-2">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-gradient-gold">
                  LEGYÉL TE
                </motion.div>
              </div>
              <div className="overflow-hidden pt-2">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-cream">
                  A KÖRNYÉK
                </motion.div>
              </div>
              <div className="overflow-hidden pt-2">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.44, ease: SPRING }} className="text-[clamp(40px,8.5vw,120px)] text-cream/20" style={{ WebkitTextStroke: "1px rgba(245,241,232,0.25)" }}>
                  LEGKERESETTEBB
                </motion.div>
              </div>
              <div className="overflow-hidden pt-2">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.56, ease: SPRING }} className="text-[clamp(28px,5.5vw,80px)] text-cream/15" style={{ WebkitTextStroke: "1px rgba(245,241,232,0.18)" }}>
                  FELÚJÍTÁSI SZAKEMBERE.
                </motion.div>
              </div>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end max-w-5xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/60 leading-relaxed font-light italic">
              AI chatbot és automatikus árajánlat-rendszer — miközben te dolgozol, a rendszer szűri az érdeklődőket és megrendeléseket hoz.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease: SPRING }} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                Ingyenes konzultáció
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 text-cream/70 font-grotesk font-medium text-base px-8 py-5 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300"
              >
                Korábbi projektjeink
                <ArrowRight size={16} />
              </Link>
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
      <section className="bg-[#0A0A0A] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {[
              {
                num: 85, suffix: "%",
                label: "Megtakarított idő az érdeklődők szűrésénél",
                desc: "Vége a felesleges telefonoknak. Az AI kiszűri a nem komoly érdeklődőket, mielőtt hozzád érnének.",
              },
              {
                num: 300, suffix: "%",
                label: "Átlagos növekedés a minősített érdeklődőkben",
                desc: "Nem csak több érdeklődő — jobbak. Nagyobb büdzsé, átgondoltabb igény, gyorsabb döntés.",
              },
              {
                num: 24, suffix: "/7",
                label: "Órán át dolgozik az AI",
                desc: "Amíg te alszol, az AI szűri az érdeklődőket, válaszol a kérdésekre és időpontot foglal.",
              },
              {
                num: 4, suffix: "+",
                label: "Élő projekt fut most is",
                desc: "Valódi vállalkozások, valódi eredmények. Minden projekt éles, és igazolt a piacon.",
              },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group px-4">
                  <div className="font-grotesk font-bold text-[clamp(40px,5vw,72px)] text-gradient-gold leading-none tracking-[-0.04em]">
                    <CountUp target={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="font-grotesk font-semibold text-cream text-sm mt-3 mb-2 leading-snug">{stat.label}</div>
                  <div className="font-inter text-xs text-text-muted leading-relaxed">{stat.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#0D0D0D] relative overflow-hidden">
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
      <section className="py-16 md:py-20 lg:py-24 bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-1 pointer-events-none"
          style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-8">
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
                    AZ AI DOLGOZIK.<br /><span className="text-gradient-gold">TE CSAK ÉPÍTSZ.</span>
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
                          <span className="font-grotesk text-xs font-semibold text-cream/50 uppercase tracking-[0.15em]">Árajánlat Ügynök — Online</span>
                        </div>
                        <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.15em] text-gold/40 border border-gold/15 px-2 py-0.5 rounded-full">Élő példa</span>
                      </div>

                      <div className="p-4 space-y-2 max-h-[520px] overflow-y-auto">

                        {/* Project type */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Projekt típusa</div>
                        {[
                          { from: "ai", text: "Szia! Azonnali árajánlatot tudok adni. Milyen munkáról van szó?" },
                          { from: "user", text: "Terasz lerakás" },
                        ].map((msg, i) => (
                          <div key={`pt-${i}`} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </div>
                        ))}

                        {/* Project-specific questions */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Terasz-specifikus kérdések</div>
                        {[
                          { from: "ai", text: "Kell-e valamit elbontani előtte? Lejtős a terep?" },
                          { from: "user", text: "Régi teraszlapok vannak, kis lejtés van" },
                          { from: "ai", text: "Mekkora a terület hozzávetőlegesen? (m²)" },
                          { from: "user", text: "Kb. 40m²" },
                          { from: "ai", text: "Mekkora a bejáró szélessége a gépeknek? (pl. elfér egy talicska?)" },
                          { from: "user", text: "Normál kapu, kb. 90cm" },
                          { from: "ai", text: "Milyen anyagot gondolt? (kő, porcelán, tégla, beton)" },
                          { from: "user", text: "Természetes kő" },
                          { from: "ai", text: "Melyik városban/kerületben van a projekt?" },
                          { from: "user", text: "Miskolc" },
                          { from: "ai", text: "Mi az ideális határidő — mikor kellene elkészülnie?" },
                          { from: "user", text: "6–8 héten belül" },
                        ].map((msg, i) => (
                          <div key={`q-${i}`} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </div>
                        ))}

                        {/* Budget */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Büdzsé ellenőrzés</div>
                        {[
                          { from: "ai", text: "Mi a hozzávetőleges büdzsé erre a projektre?" },
                          { from: "user", text: "350 000–500 000 Ft körül" },
                        ].map((msg, i) => (
                          <div key={`b-${i}`} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </div>
                        ))}

                        {/* Instant estimate — given before asking contact info */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Azonnali árajánlat — azonnal megkapja</div>
                        <div className="flex justify-start">
                          <div className="max-w-[90%] bg-[#111] border border-gold/20 rounded-2xl rounded-tl-sm overflow-hidden">
                            <div className="bg-gold/10 px-4 py-2 border-b border-gold/10">
                              <span className="font-grotesk font-bold text-xs text-gold">Becsült ár: 370 000 – 450 000 Ft</span>
                            </div>
                            <div className="px-4 py-2.5 space-y-1">
                              {[["Elbontás + előkészítés", "40–60 000 Ft"], ["Természetes kő (40m²)", "180–220 000 Ft"], ["Munkadíj", "150–170 000 Ft"]].map(([label, val]) => (
                                <div key={label} className="flex justify-between font-inter text-[10px]">
                                  <span className="text-cream/40">{label}</span><span className="text-cream/70">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Contact info collected AFTER estimate */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Kapcsolati adatok — az árajánlat után kérdezzük</div>
                        {[
                          { from: "ai", text: "Az árajánlat elküldéséhez és visszahíváshoz megadná a nevét, telefonszámát és e-mail-címét?" },
                          { from: "user", text: "Kovács Péter, 06 20 123 4567, kovacs.peter@gmail.com" },
                        ].map((msg, i) => (
                          <div key={`c-${i}`} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </div>
                        ))}

                        {/* Lead score */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Érdeklődő pontozva és automatikusan irányítva</div>
                        <div className="flex justify-start">
                          <div className="max-w-[92%] bg-[#111] border border-gold/30 rounded-2xl rounded-tl-sm px-4 py-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-grotesk text-xs font-bold text-cream">Lead pontszám</span>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 bg-white/[0.06] rounded-full overflow-hidden">
                                  <motion.div className="h-full bg-gradient-to-r from-gold to-bright-gold rounded-full" initial={{ width: 0 }} whileInView={{ width: "92%" }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} />
                                </div>
                                <span className="font-grotesk font-bold text-gold text-sm">92/100</span>
                              </div>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 px-3 py-1.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                              <span className="font-grotesk font-bold text-[10px] text-gold uppercase tracking-[0.15em]">VIP — Naptármeghívó elküldve</span>
                            </div>
                            <p className="font-inter text-[10px] text-cream/40">Büdzsé megfelelő, helyi terület, sürgős határidő. Adatok azonnal elküldve a csapatnak.</p>
                          </div>
                        </div>

                        {/* Decline example */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-white/15 text-center py-1">Ha nem megfelelő — az AI udvariasan elutasítja, nincs értesítés</div>
                        <div className="flex justify-start">
                          <div className="max-w-[88%] bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                            <p className="font-inter text-[11px] text-cream/35 leading-relaxed">Köszönjük érdeklődését! Sajnos a projekt helyszíne kívül esik a szolgáltatási területünkön. Nem tudjuk vállalni, de sok sikert kívánunk a megfelelő csapat megtalálásához.</p>
                            <p className="font-inter text-[9px] text-white/18 mt-1.5 italic">A tulaj nem kap értesítést. Ideje teljesen védett.</p>
                          </div>
                        </div>

                        {/* Routing tiers */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.5 }} className="grid grid-cols-3 gap-1.5 pt-1">
                          {[
                            { score: "0–40", label: "Elutasítva", color: "border-white/[0.07] text-white/18", dot: "bg-white/18" },
                            { score: "41–80", label: "Minősített", color: "border-gold/20 text-gold/50", dot: "bg-gold/50" },
                            { score: "81–100", label: "VIP ★", color: "border-gold/50 text-gold bg-gold/5", dot: "bg-gold" },
                          ].map((tier) => (
                            <div key={tier.label} className={`border ${tier.color} rounded-lg px-2 py-1.5 text-center`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${tier.dot} mx-auto mb-1`} />
                              <div className="font-grotesk font-bold text-[9px] uppercase tracking-[0.1em]">{tier.label}</div>
                              <div className="font-inter text-[8px] text-cream/25 mt-0.5">{tier.score}</div>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                    <p className="font-cormorant text-sm text-gold/40 italic mt-4 text-center">
                      &ldquo;Ez fut a weboldaladon 24/7. Csak azokkal találkozol, akik megérik az idődet.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-16 md:py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-3 pointer-events-none"
          style={{ width: 700, height: 700, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-8">
          <Reveal className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold block" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Iparágak</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
                MINDEN<br /><span className="text-gradient-gold">SZOLGÁLTATÓ</span><br />VÁLLALKOZÁSNAK.
              </h2>
              <p className="font-cormorant text-lg text-cream/40 font-light italic leading-relaxed max-w-sm">
                Nem csak kertészet — az AI bármilyen felújítási, szolgáltató és kézműves vállalkozásnál működik.
              </p>
            </div>
          </Reveal>

          {/* Featured industry cards — 3 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-10">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: SPRING }}
                className="group relative bg-[#0D0D0D] border border-white/[0.07] rounded-3xl overflow-hidden hover:border-gold/30 hover:shadow-[0_16px_50px_rgba(0,0,0,0.6)] transition-all duration-400"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/50 transition-all duration-400" />

                {/* Screenshot */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={ind.project.image}
                    alt={ind.project.name}
                    fill
                    className="object-cover object-top transition-transform duration-600 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/30 to-transparent" />
                  {/* Live badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.15em] text-gold bg-black/70 border border-gold/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      Élő projekt
                    </span>
                  </div>
                  {/* External link */}
                  {ind.project.url ? (
                    <a href={ind.project.url} target="_blank" rel="noopener noreferrer"
                      className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/10 transition-all duration-200 backdrop-blur-sm">
                      <ExternalLink size={11} className="text-white/50 hover:text-gold transition-colors duration-200" />
                    </a>
                  ) : (
                    <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                      <ExternalLink size={11} className="text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Industry */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300 flex-shrink-0">
                      <ind.icon size={15} />
                    </div>
                    <span className="font-grotesk font-bold text-[11px] uppercase tracking-[0.2em] text-gold/60">{ind.label}</span>
                  </div>

                  {/* Project name */}
                  <h3 className="font-grotesk font-bold text-xl text-cream mb-2 group-hover:text-white transition-colors duration-300">{ind.project.name}</h3>
                  <p className="font-inter text-[10px] text-text-muted mb-4">{ind.project.tagline}</p>

                  {/* Desc */}
                  <p className="font-inter text-sm text-cream/45 leading-relaxed mb-5">{ind.desc}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2">
                    {ind.project.metrics.map((m) => (
                      <span key={m} className="font-grotesk text-[9px] font-bold text-gold/70 bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other industries — compact CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: SPRING }}
            className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl px-8 py-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { icon: Sparkles, label: "Takarítás & Portaszolgálat" },
                  { icon: Zap, label: "Elektromos munkák" },
                  { icon: Wrench, label: "Karbantartás & Handyman" },
                ].map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-1.5 font-grotesk text-[10px] font-semibold text-cream/35 border border-white/[0.07] px-3 py-1.5 rounded-full">
                    <item.icon size={10} className="text-gold/40" />
                    {item.label}
                  </span>
                ))}
              </div>
              <p className="font-inter text-sm text-cream/40 leading-relaxed">
                Ezek csak példák — rengeteg más iparágban is dolgoztam már. Ha bizonytalan vagy, keress meg és megmondom, tudok-e segíteni.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-3.5 rounded-full btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Kérdezz bátran
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-8" />
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#0D0D0D] relative overflow-hidden">
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
              AZ AI ELVÉGZI<br /><span className="text-gradient-gold">HELYETTED.</span>
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
      <section className="py-16 md:py-20 lg:py-24 bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-2 pointer-events-none"
          style={{ width: 700, height: 700, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-8">
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
      <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full orb-1 pointer-events-none"
          style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-8">
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
      <section className="relative py-20 md:py-28 lg:py-36 bg-[#060606] overflow-hidden text-center">
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
