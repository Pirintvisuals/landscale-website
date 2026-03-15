"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const SPRING = [0.16, 1, 0.3, 1] as const;


function Reveal({ children, delay = 0, className = "", y = 50 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  
  
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.65, delay, ease: SPRING }} className={className}>
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });
  const springScale = useSpring(scale, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotateX.set(-y * 6); rotateY.set(x * 6); scale.set(1.02);
  }, [rotateX, rotateY, scale]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0); scale.set(1);
  }, [rotateX, rotateY, scale]);

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, scale: springScale, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}>
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "", duration = 2.5 }: { target: number; suffix?: string; duration?: number }) {
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

function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute rounded-full orb-1"
        style={{ width: 900, height: 900, top: "-20%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute rounded-full orb-2"
        style={{ width: 650, height: 650, bottom: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute rounded-full orb-3"
        style={{ width: 450, height: 450, top: "40%", left: "52%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }} />
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-16 md:pb-24 lg:pb-32 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#080808]">
          <HeroOrbs />
          {/* Static grid */}
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        {/* Giant watermark */}
        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[20vw] leading-none text-white/[0.055] select-none pointer-events-none tracking-[-0.05em] translate-y-[15%]">
          LANDSCALE
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 mb-10">
            <motion.span className="w-8 h-px bg-gold" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.6, delay: 0.2 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">AI-Powered Lead Qualification for Landscapers</span>
          </motion.div>

          <div className="mb-10">
            <h1 className="font-grotesk font-bold leading-[0.88] tracking-[-0.04em]">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }}
                  className="text-[clamp(52px,9vw,128px)] text-gradient-gold">
                  LANDSCAPERS
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: SPRING }}
                  className="text-[clamp(52px,9vw,128px)] text-cream">
                  STOP CHASING
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.44, ease: SPRING }}
                  className="text-[clamp(52px,9vw,128px)] text-cream/20"
                  style={{ WebkitTextStroke: "1px rgba(245,241,232,0.25)" }}>
                  DEAD LEADS.
                </motion.div>
              </div>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end max-w-5xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/60 leading-relaxed font-light italic">
              I build premium websites with AI-powered lead filtering — featuring intelligent estimator agents that qualify leads and give instant quotes, so you only talk to serious buyers.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease: SPRING }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1">
                Get Your Free Audit
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </Link>
              <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 text-cream/70 font-grotesk font-medium text-base px-8 py-5 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300">
                See My Work
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-10 right-16 hidden md:flex flex-col items-center gap-3">
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-20 bg-gradient-to-b from-gold/80 to-transparent" />
            <span className="font-grotesk text-[9px] uppercase tracking-[0.35em] text-text-muted rotate-90 origin-center translate-y-10">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-gold/[0.08] bg-[#0D0D0D] py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            ["85% Time Saved on Quotes", "★ AI Estimator Agent", "300% More Qualified Leads", "★ Premium Landscaping Websites", "Intelligent Estimator Agents", "★ UK & Worldwide", "SEO That Actually Converts"].map((item, i) => (
              <span key={`${gi}-${i}`} className="font-grotesk font-medium text-xs text-gold/40 uppercase tracking-[0.2em] flex items-center gap-3">
                {item}
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── AI ESTIMATOR — FEATURED ── */}
      <section id="ai-estimator" className="py-16 md:py-28 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full orb-1"
            style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }} />
          <div className="absolute rounded-full orb-2"
            style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)", filter: "blur(70px)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal>
            <div className="relative bg-[#0D0D0D] border border-gold/25 rounded-3xl overflow-hidden">
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left — content */}
                <div className="p-8 md:p-12 xl:p-16 relative">
                  <div className="inline-flex items-center gap-2 mb-6 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full">
                    <motion.span className="w-2 h-2 rounded-full bg-gold" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <span className="font-grotesk text-xs font-bold uppercase tracking-[0.2em] text-gold">My Core Offering</span>
                  </div>

                  <h2 className="font-grotesk font-bold text-[clamp(32px,4.5vw,68px)] text-cream leading-[0.92] tracking-[-0.03em] mb-4">
                    STOP WASTING TIME<br /><span className="text-gradient-gold">ON QUOTES</span>
                  </h2>
                  <p className="font-cormorant text-lg md:text-xl text-cream/50 font-light italic leading-relaxed mb-8">
                    My AI Estimator Agent gives instant project quotes and qualifies every lead automatically — so you only talk to serious buyers.
                  </p>

                  {/* How it works */}
                  <div className="space-y-4 mb-10">
                    {[
                      { step: "01", text: "Visitor asks for a quote on your website" },
                      { step: "02", text: "AI asks qualifying questions — budget, timeline, scope" },
                      { step: "03", text: "Gives instant estimate based on your real pricing" },
                      { step: "04", text: "Only qualified, serious leads reach you" },
                    ].map((item, i) => (
                      <motion.div key={item.step}
                        initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: SPRING }}
                        className="flex items-center gap-4 group">
                        <span className="font-grotesk font-bold text-[11px] text-gold/50 tracking-[0.2em] w-6 flex-shrink-0">{item.step}</span>
                        <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] group-hover:border-gold/20 group-hover:bg-gold/[0.03] rounded-xl px-4 py-3 transition-all duration-300">
                          <motion.span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0 group-hover:bg-gold transition-colors duration-300" />
                          <span className="font-inter text-cream/70 text-sm group-hover:text-cream/90 transition-colors duration-300">{item.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stat callout */}
                  <div className="flex flex-wrap items-center gap-6 mb-10">
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[48px] text-gradient-gold leading-none tracking-[-0.04em]">15–20</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">hours saved / week</div>
                    </div>
                    <div className="w-px h-12 bg-gold/15 hidden sm:block" />
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[48px] text-gradient-gold leading-none tracking-[-0.04em]">24/7</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">works while you sleep</div>
                    </div>
                    <div className="w-px h-12 bg-gold/15 hidden sm:block" />
                    <div className="text-center">
                      <div className="font-grotesk font-bold text-[48px] text-gradient-gold leading-none tracking-[-0.04em]">0</div>
                      <div className="font-inter text-xs text-text-muted uppercase tracking-[0.15em] mt-1">wasted quote calls</div>
                    </div>
                  </div>

                  <Link href="/contact"
                    className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5">
                    See How It Works →
                  </Link>
                </div>

                {/* Right — demo card */}
                <div className="relative lg:border-l border-gold/[0.08] p-8 md:p-12 xl:p-16 flex flex-col justify-center">
                  <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
                  <div className="relative z-10">
                    {/* Chat UI — accurate flow */}
                    <div className="bg-[#0A0A0A] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      <div className="border-b border-white/[0.06] px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div className="w-2.5 h-2.5 rounded-full bg-gold" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                          <span className="font-grotesk text-xs font-semibold text-cream/50 uppercase tracking-[0.15em]">Estimator Agent — Online</span>
                        </div>
                        <span className="font-grotesk text-[9px] font-bold uppercase tracking-[0.15em] text-gold/40 border border-gold/15 px-2 py-0.5 rounded-full">Live example</span>
                      </div>

                      <div className="p-4 space-y-2 max-h-[520px] overflow-y-auto">

                        {/* Project type */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Project Type</div>
                        {[
                          { from: "ai", text: "Hi! I can give you an instant quote. What type of project are you looking for?" },
                          { from: "user", text: "Patio installation" },
                        ].map((msg, i) => (
                          <motion.div key={`p-${i}`} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4, ease: SPRING }} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </motion.div>
                        ))}

                        {/* Smart patio questions */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Patio-specific questions</div>
                        {[
                          { from: "ai", text: "Does anything need to be removed first? Is the ground sloped?" },
                          { from: "user", text: "Old decking needs removing, slightly sloped" },
                          { from: "ai", text: "How big is the area that needs to be patioed? (m²)" },
                          { from: "user", text: "About 40m²" },
                          { from: "ai", text: "How wide is the entrance for equipment? (e.g. can a wheelbarrow fit through?)" },
                          { from: "user", text: "Standard gate, about 90cm" },
                          { from: "ai", text: "What materials are you thinking? (pavers, concrete, natural stone, porcelain)" },
                          { from: "user", text: "Natural stone" },
                          { from: "ai", text: "What's your postcode? (so we can check we cover your area)" },
                          { from: "user", text: "SW11 4NL" },
                          { from: "ai", text: "And your ideal timeline — when would you like this done?" },
                          { from: "user", text: "Within the next 6–8 weeks" },
                        ].map((msg, i) => (
                          <motion.div key={`q-${i}`} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: SPRING }} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </motion.div>
                        ))}

                        {/* Budget */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Budget check</div>
                        {[
                          { from: "ai", text: "What's your approximate budget for this project?" },
                          { from: "user", text: "£5,000–8,000" },
                        ].map((msg, i) => (
                          <motion.div key={`b-${i}`} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55 + i * 0.08, duration: 0.4, ease: SPRING }} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </motion.div>
                        ))}

                        {/* Instant estimate — given before asking contact info */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Instant estimate — given right away</div>
                        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.5, ease: SPRING }} className="flex justify-start">
                          <div className="max-w-[90%] bg-[#111] border border-gold/20 rounded-2xl rounded-tl-sm overflow-hidden">
                            <div className="bg-gold/10 px-4 py-2 border-b border-gold/10">
                              <span className="font-grotesk font-bold text-xs text-gold">Estimated: £6,000 – £6,600</span>
                            </div>
                            <div className="px-4 py-2.5 space-y-1">
                              {[["Removal + prep", "£600–800"], ["Natural stone (40m²)", "£2,400–2,800"], ["Labour", "£3,000–3,000"]].map(([label, val]) => (
                                <div key={label} className="flex justify-between font-inter text-[10px]">
                                  <span className="text-cream/40">{label}</span><span className="text-cream/70">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* Contact info collected AFTER estimate */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Contact info collected after — so owner gets it</div>
                        {[
                          { from: "ai", text: "To send this quote to the team and follow up with you, can I get your name, phone number and email?" },
                          { from: "user", text: "James Thompson, 07700 900123, james@email.com" },
                        ].map((msg, i) => (
                          <motion.div key={`c-${i}`} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease: SPRING }} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[82%] px-3.5 py-2 rounded-2xl font-inter text-xs leading-relaxed ${msg.from === "ai" ? "bg-white/[0.04] border border-white/[0.07] text-cream/70 rounded-tl-sm" : "bg-gold/15 border border-gold/25 text-gold rounded-tr-sm"}`}>{msg.text}</div>
                          </motion.div>
                        ))}

                        {/* Score + VIP */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-gold/25 text-center py-1">Lead scored & routed automatically</div>
                        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.5, ease: SPRING }} className="flex justify-start">
                          <div className="max-w-[92%] bg-[#111] border border-gold/30 rounded-2xl rounded-tl-sm px-4 py-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-grotesk text-xs font-bold text-cream">Lead Score</span>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 bg-white/[0.06] rounded-full overflow-hidden">
                                  <motion.div className="h-full bg-gradient-to-r from-gold to-bright-gold rounded-full" initial={{ width: 0 }} whileInView={{ width: "88%" }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} />
                                </div>
                                <span className="font-grotesk font-bold text-gold text-sm">88/100</span>
                              </div>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 px-3 py-1.5 rounded-full">
                              <span className="text-[10px]">⭐</span>
                              <span className="font-grotesk font-bold text-[10px] text-gold uppercase tracking-[0.15em]">VIP — Calendar booking link sent</span>
                            </div>
                            <p className="font-inter text-[10px] text-cream/40">Budget fits, local area, urgent timeline. Full details emailed to owner immediately.</p>
                          </div>
                        </motion.div>

                        {/* Decline example */}
                        <div className="font-grotesk text-[9px] uppercase tracking-[0.2em] text-white/15 text-center py-1">If not a fit — AI declines politely, no email to owner</div>
                        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.4, ease: SPRING }} className="flex justify-start">
                          <div className="max-w-[88%] bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                            <p className="font-inter text-[11px] text-cream/35 leading-relaxed">Thanks for reaching out! Unfortunately your location is outside our service area. We&apos;re unable to take this on, but we wish you luck finding a local team. 🙏</p>
                            <p className="font-inter text-[9px] text-white/18 mt-1.5 italic">Owner never notified. Your time fully protected.</p>
                          </div>
                        </motion.div>

                        {/* Routing tiers */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.5 }} className="grid grid-cols-3 gap-1.5 pt-1">
                          {[
                            { score: "0–40", label: "Declined", color: "border-white/[0.07] text-white/18", dot: "bg-white/18" },
                            { score: "41–80", label: "Qualified", color: "border-gold/20 text-gold/50", dot: "bg-gold/50" },
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
                      &ldquo;This runs on your website 24/7. You only hear from the ones worth your time.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS — dramatic layout ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute rounded-full" style={{ width: 1000, height: 1000, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 400, height: 400, top: "10%", left: "5%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ x: [0, 60, -20, 0], y: [0, 30, -40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 350, height: 350, bottom: "5%", right: "8%", background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)", filter: "blur(55px)" }}
            animate={{ x: [0, -40, 30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }} />
        </div>

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            { value: 85, suffix: "%", label: "Time Saved on Lead Qualifying", desc: "Stop wasting hours on tyre-kickers. Our AI filters them before they reach you.", accent: "top-left" },
            { value: 300, suffix: "%", label: "Average Increase in Qualified Leads", desc: "Not just more leads — better ones. Higher budgets, clearer briefs, faster decisions.", accent: "top-right" },
            { value: 24, suffix: "/7", label: "Hours Your AI Works For You", desc: "While you sleep, your AI is qualifying leads, answering questions, booking calls.", accent: "bottom-left" },
            { value: 4, suffix: "+", label: "Live Projects Running Right Now", desc: "Real businesses, real results. Every project is live and proven in the market.", accent: "bottom-right" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className={`relative overflow-hidden p-7 md:p-12 xl:p-20 border-b border-r border-white/[0.04] group hover:bg-[#0D0D0D] transition-colors duration-500 flex flex-col items-center justify-center min-h-[280px] ${i % 2 === 1 ? "border-r-0" : ""} ${i >= 2 ? "border-b-0" : ""}`}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
                {/* Giant background number */}
                <div className="absolute bottom-0 right-4 font-grotesk font-bold leading-none text-white/[0.07] group-hover:text-gold/[0.18] transition-colors duration-500 select-none pointer-events-none"
                  style={{ fontSize: "clamp(120px,16vw,240px)" }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                {/* Decorative corner accent */}
                <motion.div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}>
                  <div className="w-full h-px bg-gold/40" />
                  <div className="w-px h-full bg-gold/40" />
                </motion.div>
                <div className="relative z-10 text-center">
                  <div className="font-grotesk font-bold text-[clamp(56px,7vw,96px)] text-gradient-gold leading-none tracking-[-0.04em] mb-4">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-grotesk font-semibold text-base md:text-lg text-cream mb-3 tracking-tight">{stat.label}</div>
                  <p className="font-inter text-text-muted text-sm leading-relaxed max-w-xs mx-auto">{stat.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* ── PROBLEMS ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-1" style={{ width: 700, height: 700, top: "10%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)", filter: "blur(90px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 500, height: 500, bottom: "5%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />Sound Familiar?
            </span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-2xl">
              The Problems<br /><span className="text-gradient-gold">Holding You Back</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: "01", title: "Your Website Isn't Generating Leads", desc: "You've got a website, but it collects digital dust. Visitors come, they leave, you never hear from them.", offset: "md:mt-0", color: "from-red-950/20 to-transparent" },
              { num: "02", title: "You Waste Hours on Unqualified Leads", desc: "Time-wasters who want the cheapest job, won't commit, or ghost you after quotes. Your time is worth more.", offset: "md:mt-16", color: "from-amber-950/20 to-transparent" },
              { num: "03", title: "You're Invisible on Google", desc: "Your competitors show up first when local customers search. You're on page 3 — practically invisible.", offset: "md:mt-8", color: "from-orange-950/15 to-transparent" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.12} className={item.offset}>
                <TiltCard className="h-full">
                  <div className="relative bg-[#111111] border border-white/[0.05] hover:border-gold/45 hover:-translate-y-1.5 p-8 md:p-10 h-full min-h-[320px] flex flex-col transition-all duration-300 rounded-3xl overflow-hidden group">
                    {/* Gradient bg on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(212,175,55,0.06)" }} />
                    <div className="relative z-10">
                      <motion.div className="font-grotesk font-bold text-[80px] leading-none text-white/[0.08] group-hover:text-gold/25 transition-all duration-700 mb-6 select-none"
                        whileHover={{ scale: 1.05 }}>
                        {item.num}
                      </motion.div>
                      <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-4 leading-tight tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                      <p className="font-inter text-text-muted text-base leading-relaxed flex-1">{item.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-2" style={{ width: 800, height: 800, top: "20%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 60%)", filter: "blur(100px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 600, height: 600, bottom: "10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />What I Do</span>
            <h2 className="font-grotesk font-bold text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[-0.03em] text-cream">
              Everything You Need<br /><span className="text-gradient-gold">Under One Roof</span>
            </h2>
          </Reveal>
          {/* Three core services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01", tag: "AI Estimator", href: "/services/ai-lead-generation",
                title: "AI Estimator Agent",
                italic: "Instant project quotes — no phone call needed.",
                desc: "Visitors ask for a quote. The AI collects area, materials, postcode and timeline, then gives an accurate estimate immediately. You hear from leads who already know the price.",
                features: ["Project-specific questions", "Instant line-item estimate", "Contact collected after quote", "Saves 15–20 hrs/week"],
              },
              {
                num: "02", tag: "AI Chatbot", href: "/services/ai-lead-generation",
                title: "AI Chatbot",
                italic: "Qualifies leads 24/7, filters out time-wasters.",
                desc: "The chatbot greets every visitor, checks budget, location and timeline, and makes a decision. Wrong fit? It declines politely. Right fit? Their details land straight in your inbox.",
                features: ["Budget & location check", "Automatic lead scoring", "Declines bad fits politely", "Instant alert to you"],
              },
              {
                num: "03", tag: "Website", href: "/services/website-design",
                title: "Premium Website",
                italic: "Built to convert — with local SEO included.",
                desc: "A bespoke, fast-loading website that positions you as the premium choice. Luxury design, smart lead capture, local SEO and Google Business Profile setup from day one.",
                features: ["Bespoke luxury design", "Under 2s load time", "Local SEO built in", "Google Business setup"],
              },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <Link href={card.href} className="block h-full group">
                    <div className="relative bg-[#111111] border border-gold/18 group-hover:border-gold/50 p-7 h-full flex flex-col transition-all duration-300 rounded-3xl overflow-hidden group-hover:-translate-y-1.5 min-h-[360px]">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-5">
                          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 px-3 py-1.5 rounded-full">
                            <motion.span className="w-1.5 h-1.5 rounded-full bg-gold" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{card.tag}</span>
                          </div>
                          <span className="font-grotesk font-bold text-[48px] leading-none text-white/[0.08] group-hover:text-gold/22 transition-colors duration-500 select-none">{card.num}</span>
                        </div>
                        <h3 className="font-grotesk font-bold text-xl text-cream mb-2 tracking-tight group-hover:text-gold transition-colors duration-300">{card.title}</h3>
                        <p className="font-cormorant text-sm text-gold/50 italic mb-3 leading-relaxed">{card.italic}</p>
                        <p className="font-inter text-text-muted text-sm leading-relaxed mb-5 flex-1">{card.desc}</p>
                        <ul className="space-y-2 mb-5 pt-4 border-t border-white/[0.04]">
                          {card.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 font-inter text-xs text-text-muted group-hover:text-cream/60 transition-colors duration-300">
                              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />{f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 font-grotesk font-semibold text-sm text-gold/40 group-hover:text-gold transition-all duration-300">
                          Learn More →
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* See all services CTA */}
          <Reveal className="mt-10 text-center">
            <p className="font-inter text-sm text-text-muted mb-4">Looking for something else? I also build AI Review Agents, AI Receptionists, Operations Dashboards, and more.</p>
            <Link href="/services"
              className="inline-flex items-center gap-2 border border-gold/30 text-gold font-grotesk font-semibold text-sm px-7 py-3 rounded-full hover:bg-gold/10 hover:border-gold/60 transition-all duration-300">
              See All Services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── WHY ME — dramatic ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute rounded-full" style={{ width: 750, height: 750, bottom: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)", filter: "blur(70px)" }}
            animate={{ x: [0, 50, -30, 0], y: [0, 60, -40, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 300, height: 300, top: "40%", left: "45%", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
            animate={{ x: [0, -60, 40, 0], y: [0, -50, 30, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 10 }} />
        </div>
        {/* Large decorative text */}
        <div className="absolute top-0 left-0 font-grotesk font-bold text-[18vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em]">WHY</div>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="md:sticky md:top-32">
              <Reveal>
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />Why Me</span>
                <h2 className="font-grotesk font-bold text-[clamp(40px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em] mb-8">
                  WHY ELITE<br />LANDSCAPERS<br /><span className="text-gradient-gold">CHOOSE ME</span>
                </h2>
                <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed max-w-sm mb-10">
                  I grew up around landscaping. I understand your industry at a level a generalist agency never could.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 font-grotesk text-sm font-semibold text-gold/60 hover:text-gold transition-colors border-b border-gold/20 hover:border-gold pb-1">
                  My story →
                </Link>
              </Reveal>
            </div>
            <div className="space-y-0">
              {[
                { num: "01", title: "Deep Industry Knowledge", desc: "My family works in landscaping. I understand the seasonality, the client types, the challenges. You won't need to educate me.", icon: "◆" },
                { num: "02", title: "AI-First Approach", desc: "I use the latest AI tools to automate lead qualification, estimates, and follow-ups — so you focus on the work you love.", icon: "▲" },
                { num: "03", title: "Results-Driven, Always", desc: "I measure success in leads and revenue, not impressions. If something isn't working, I change it.", icon: "●" },
              ].map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.15}>
                  <motion.div className="border-b border-white/[0.05] py-10 group relative overflow-hidden cursor-default"
                    whileHover={{ x: 6 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />
                    <div className="flex items-start gap-6 pl-4">
                      <span className="font-grotesk font-bold text-[36px] text-white/[0.09] group-hover:text-gold/35 transition-colors duration-500 mt-1 flex-shrink-0 leading-none">{pillar.num}</span>
                      <div>
                        <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{pillar.title}</h3>
                        <p className="font-inter text-text-muted text-base leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          <div className="absolute rounded-full orb-1" style={{ width: 700, height: 700, top: "20%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 60%)", filter: "blur(90px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 300, height: 300, top: "5%", right: "10%", background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)", filter: "blur(50px)" }} />
        </div>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
              WHAT CLIENTS<br /><span className="text-gradient-gold">SAY</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "The form has completely transformed how we handle inquiries. It filters out unqualified leads automatically and acts like a 24/7 receptionist — saving us hours every week. We only talk to serious buyers now.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5 },
              { quote: "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen. It's already paying for itself in the quality of leads we're getting.", name: "Basil", company: "Mimosa Gardens", stars: 5 },
              { quote: "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients. Working with him was smooth from start to finish — highly recommend.", name: "Péter Mantlik", company: "ViszCAD", stars: 5 },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <TiltCard className="h-full">
                  <div className="relative bg-[#111111] border border-white/[0.05] hover:border-gold/45 hover:-translate-y-1.5 p-8 rounded-3xl flex flex-col gap-5 transition-all duration-300 h-full overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {/* Giant quote mark */}
                    <div className="absolute top-4 right-6 font-cormorant text-[100px] leading-none text-gold/[0.06] select-none pointer-events-none group-hover:text-gold/[0.1] transition-colors duration-500">&ldquo;</div>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.stars }).map((_, si) => (
                          <motion.span key={si} className="text-gold text-sm" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: si * 0.08 + i * 0.12 }}>★</motion.span>
                        ))}
                      </div>
                      <p className="font-cormorant text-xl font-light text-cream italic leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                        <span className="font-grotesk font-bold text-xs text-gold">{t.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-grotesk font-semibold text-sm text-cream">{t.name}</div>
                        <div className="font-inter text-xs text-text-muted">{t.company}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── CHATBOT ── */}
      <Link href="/contact">
        <motion.div className="fixed bottom-6 right-6 z-[200]" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <div className="relative w-14 h-14 rounded-full bg-[#111111] border border-gold/30 flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-gold/70 hover:bg-[#1a1a1a] transition-all duration-300">
            <motion.div className="absolute inset-0 rounded-full border border-gold/20" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold relative z-10">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </motion.div>
      </Link>
    </>
  );
}
