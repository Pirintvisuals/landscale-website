"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SPRING = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "", y = 50 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: SPRING }} className={className}>
      {children}
    </motion.div>
  );
}

const faqs = [
  { q: "How long does it take to build a website?", a: "Depends on the project. A Framer template customisation can be done in 1–2 weeks. A fully custom Next.js site takes 3–6 weeks. I'll give you a clear timeline during the free audit." },
  { q: "Do you only work with landscapers?", a: "No, but they're my main priority and specialty. I also work with engineering firms, construction companies, and other home service businesses. Book an audit and we'll see if I'm the right fit." },
  { q: "What do you use to build websites — Framer or code?", a: "Depends on your needs and budget. Framer is great if you want to edit content yourself and need something fast. Custom Next.js is better for complex sites with advanced features. I'll recommend what makes sense during the audit." },
  { q: "What AI services do you offer?", a: "I build AI review agents (qualify leads), AI receptionists (book appointments), AI estimators (instant quotes), custom chatbots, and smart form automation. The exact solution depends on your business needs." },
  { q: "How much does a project cost?", a: "It depends on scope. I can't give a price upfront because every project is different. During the free audit, I'll give you a custom proposal with clear pricing based on what you actually need." },
  { q: "Can I edit the website myself after you build it?", a: "If you choose Framer, yes — it's designed for non-technical editing. For custom sites, I'll train you on the CMS or provide ongoing support for updates." },
  { q: "Do you offer payment plans?", a: "Yes, for larger projects. We'll discuss payment terms during the proposal phase. I'm flexible and want to make it work for your budget." },
  { q: "What happens after the website launches?", a: "I provide training on how to use your site and I'm available for ongoing support. Many clients keep me on retainer for updates, SEO, or adding new features. It's entirely up to you." },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-white/[0.06] group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.6, ease: SPRING }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-6 py-7 text-left relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold/40 transition-all duration-300" />
        <span className="font-grotesk font-bold text-base md:text-lg text-cream group-hover:text-gold transition-colors duration-300 pl-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="font-grotesk font-bold text-xl text-gold flex-shrink-0 mt-0.5">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="font-inter text-text-muted text-sm leading-relaxed pb-7 pl-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-40 pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        {/* Orbs */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 800, height: 800, top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.26) 0%, transparent 60%)", filter: "blur(90px)" }}
          animate={{ x: [0, 70, -20, 0], y: [0, -50, 60, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          animate={{ x: [0, -60, 30, 0], y: [0, 40, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 350, height: 350, top: "30%", right: "20%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }}
          animate={{ x: [0, 60, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }} />

        {/* Moving grid */}
        <motion.div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />

        {/* Diagonal scan */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.025) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 5 }} />

        {/* Watermark */}
        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[14vw] leading-none text-white/[0.015] select-none pointer-events-none tracking-[-0.05em] translate-y-[25%]">
          STORY
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 w-full pb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">About Landscale</span>
          </motion.div>

          {["NOT YOUR TYPICAL", "MARKETING AGENCY."].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(42px,7.5vw,110px)] leading-[0.92] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-2xl mt-8">
            Built exclusively for landscaping businesses — because I know the industry inside-out, from the ground up.
          </motion.p>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section className="py-32 md:py-44 bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.012] select-none pointer-events-none tracking-[-0.05em]">WHY</div>
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "-10%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">
            <Reveal>
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6">
                <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "left" }} />
                Our Story
              </span>
              <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em] mb-6">
                WHY I SPECIALISE<br />IN{" "}<span className="text-gradient-gold">LANDSCAPING</span>
              </h2>
              <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed">
                "I grew up in a family of landscapers. I saw the industry from the inside — and the gap in the market was obvious."
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 font-inter text-text-muted leading-relaxed text-base">
                <motion.p className="text-cream/70 border-l-2 border-gold/30 pl-5 italic font-cormorant text-lg"
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  I grew up in a family of landscapers. I saw firsthand how hard they work — early mornings, physical labour, dealing with demanding clients.
                </motion.p>
                <p>But I also saw them struggle with marketing. Outdated websites. Missed leads. Hours wasted on quotes for tyre-kickers. No system to filter serious buyers from window shoppers.</p>
                <p>The marketing agencies they hired didn&apos;t understand the industry — they treated every client the same. Generic strategies, vanity metrics, and no accountability.</p>
                <p>That&apos;s when I realised: landscapers don&apos;t need another generic marketing agency. They need someone who understands their business AND knows how to build tech that actually solves their problems.</p>
                <p>So I learned web development, studied AI automation, and built solutions specifically for landscaping businesses. Not one-size-fits-all templates — real tools that save time and make money.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 800, height: 800, bottom: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 py-32 md:py-44">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />How I Work
            </span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              MY <span className="text-gradient-gold">PROCESS</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {[
              { step: "01", title: "Discovery Call (Free Audit)", desc: "We talk about your business, goals, and challenges. I analyse your current website and marketing, then show you exactly where you're losing leads and money — no charge, no pressure." },
              { step: "02", title: "Custom Proposal", desc: "Based on your needs and budget, I recommend Framer or custom Next.js, with a clear timeline and deliverables. You decide what makes sense. No surprises." },
              { step: "03", title: "Build & Collaborate", desc: "I build your website or AI automation with regular check-ins and previews. Your feedback shapes the final product — full transparency throughout." },
              { step: "04", title: "Launch & Support", desc: "I handle the technical launch, train you on how to use your site, and stay available for ongoing support. You focus on running your business." },
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: SPRING }}
                className="relative bg-[#080808] p-10 md:p-14 group hover:bg-[#0D0D0D] transition-colors duration-500 overflow-hidden cursor-default">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.06) 0%, transparent 65%)" }} />
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
                {/* Giant ghost step */}
                <div className="absolute bottom-2 right-4 font-grotesk font-bold leading-none text-white/[0.025] group-hover:text-gold/[0.07] transition-colors duration-500 select-none pointer-events-none"
                  style={{ fontSize: "clamp(90px,12vw,160px)" }}>{item.step}</div>
                <div className="relative z-10">
                  <div className="font-grotesk font-bold text-[10px] uppercase tracking-[0.3em] text-gold/40 mb-4">{item.step}</div>
                  <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-4 tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                  <p className="font-inter text-text-muted text-base leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-32 md:py-44 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.012] select-none pointer-events-none tracking-[-0.05em]">EDGE</div>
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "20%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 60%)", filter: "blur(90px)" }}
          animate={{ scale: [1, 1.12, 1], y: [0, -50, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="md:sticky md:top-32">
              <Reveal>
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />Why Different</span>
                <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em] mb-8">
                  WHAT MAKES<br />US <span className="text-gradient-gold">DIFFERENT</span>
                </h2>
                <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed max-w-sm">
                  Industry knowledge you can&apos;t fake, tech you can&apos;t ignore, results you can measure.
                </p>
              </Reveal>
            </div>
            <div className="space-y-0">
              {[
                { num: "01", title: "Deep Industry Knowledge", desc: "My parents work in landscaping. I've grown up seeing the industry from the inside. I understand seasonality, client psychology, project types, margins. You won't need to explain your business to me.", detail: "Every strategy I build is grounded in industry reality — not generic marketing theory." },
                { num: "02", title: "Tech-Forward Approach", desc: "I use the latest AI and automation tools — not because it's trendy, but because it genuinely solves real problems. Lead qualification, automated estimates, 24/7 chatbots.", detail: "I stay ahead so you don't have to. You get the tools, without the headache." },
                { num: "03", title: "Results-Driven, Always", desc: "I don't measure success by impressions or clicks. Qualified leads and revenue generated. Every strategy has a clear ROI goal — I hold myself accountable.", detail: "If something isn't working, I change it. I'm invested in your growth." },
              ].map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.15}>
                  <motion.div className="border-b border-white/[0.05] py-10 group relative overflow-hidden cursor-default"
                    whileHover={{ x: 6 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />
                    <div className="flex items-start gap-6 pl-4">
                      <span className="font-grotesk font-bold text-[36px] text-white/[0.05] group-hover:text-gold/20 transition-colors duration-500 mt-1 flex-shrink-0 leading-none">{pillar.num}</span>
                      <div>
                        <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{pillar.title}</h3>
                        <p className="font-inter text-text-muted text-base leading-relaxed mb-3">{pillar.desc}</p>
                        <p className="font-cormorant text-base text-gold/60 italic">{pillar.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 py-32 md:py-40">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />Core Principles</span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              OUR <span className="text-gradient-gold">VALUES</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {[
              { title: "Honesty First", desc: "I tell you what you need to hear, not what you want to hear. If something won't work, I'll say so.", icon: "◎" },
              { title: "No Vanity Metrics", desc: "I don't celebrate page views or follower counts. I celebrate leads generated and revenue grown.", icon: "◆" },
              { title: "Industry-Only Focus", desc: "I only work with landscaping businesses (and a handful of others). This lets me be genuinely excellent at one thing.", icon: "▲" },
              { title: "Long-Term Thinking", desc: "I build strategies for sustainable growth, not quick wins that collapse in 6 months.", icon: "●" },
            ].map((value, i) => (
              <motion.div key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: SPRING }}
                className="bg-[#0D0D0D] p-10 md:p-14 group hover:bg-[#111111] transition-colors duration-500 relative overflow-hidden cursor-default">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/25 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-sm mb-6 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="font-grotesk font-bold text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">{value.title}</h3>
                  <p className="font-inter text-text-muted text-base leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 md:py-44 bg-[#0A0A0A] relative overflow-hidden">
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <Reveal className="mb-16">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />FAQ</span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
              FREQUENTLY ASKED<br /><span className="text-gradient-gold">QUESTIONS</span>
            </h2>
          </Reveal>
          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-48 md:py-64 bg-[#060606] overflow-hidden text-center">
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.22) 0%, transparent 55%)" }}
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.12) 0%, transparent 45%)" }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        {[180, 320, 500, 660].map((size, i) => (
          <motion.div key={size} className="absolute rounded-full border border-gold/[0.05] pointer-events-none"
            style={{ width: size, height: size, top: "50%", left: "50%", marginLeft: -size / 2, marginTop: -size / 2 }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.6, 0.15, 0.6] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }} />
        ))}

        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.025) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 7 }} />

        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <div className="overflow-hidden mb-4">
            <motion.h2 initial={{ y: "60%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1, ease: SPRING }}
              className="font-grotesk font-bold text-[clamp(48px,8vw,112px)] text-cream leading-[0.88] tracking-[-0.04em]">
              READY TO WORK<br /><span className="text-gradient-gold">TOGETHER?</span>
            </motion.h2>
          </div>
          <Reveal delay={0.2} className="mb-12">
            <p className="font-cormorant text-xl md:text-2xl text-cream/40 font-light italic leading-relaxed max-w-lg mx-auto">
              I&apos;m selective — I&apos;m genuinely invested in every client&apos;s success. Let&apos;s see if we&apos;re a fit.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact"
                className="group inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-lg px-12 py-6 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1.5">
                Book a Discovery Call
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xl">→</motion.span>
              </Link>
              <a href="mailto:landscale.agency@gmail.com" className="font-inter text-text-muted/60 text-sm hover:text-gold transition-colors">
                or email landscale.agency@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
