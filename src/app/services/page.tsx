"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Star, Phone, Search, LayoutDashboard } from "lucide-react";
import { Reveal } from "@/components/Reveal";


const SPRING = [0.16, 1, 0.3, 1] as const;


// ── 3 core services ──────────────────────────────────────────────────────────
const coreServices = [
  {
    num: "01",
    tag: "AI Estimator",
    tagPulse: true,
    title: "AI Estimator\nAgent",
    titleGold: "Instant Quotes",
    subtitle: "Project estimates delivered on your site — no phone call needed.",
    desc: "A visitor asks for a quote. The AI asks specific questions about scope, area, materials, entrance, postcode and timeline — then gives an accurate estimate immediately, 24/7. You only hear from leads who already know the price and still want to book.",
    features: ["Patio, lawn, landscaping & more", "Project-specific questions", "Instant line-item breakdown", "Postcode & site-access checks", "Contact details collected after quote", "Saves 15–20 hrs/week on quoting"],
    stats: [
      { label: "Quote delivery", val: "<2s" },
      { label: "Hours saved", val: "15–20/wk" },
      { label: "Wasted quote calls", val: "0" },
    ],
    href: "/services/ai-lead-generation",
    cta: "See How It Works",
  },
  {
    num: "02",
    tag: "AI Chatbot",
    tagPulse: true,
    title: "AI Chatbot\n& Qualifier",
    titleGold: "24/7 on Your Site",
    subtitle: "Engages every visitor, filters out time-wasters, passes the rest straight to you.",
    desc: "The chatbot greets every visitor, asks about budget, location and timeline, and makes a decision. Wrong area, wrong budget, not the right fit? It declines politely — you never hear about it. Serious lead? Their full details land in your inbox.",
    features: ["Budget, location & timeline check", "Automatic lead scoring", "Declines unfit leads politely", "Owner never bothered by junk", "Instant contact via SMS or email", "24/7 with no extra effort from you"],
    stats: [
      { label: "Qualified leads", val: "+300%" },
      { label: "Response time", val: "<2s" },
      { label: "Junk leads reaching you", val: "0" },
    ],
    href: "/services/ai-lead-generation",
    cta: "See How It Works",
  },
  {
    num: "03",
    tag: "Website",
    tagPulse: false,
    title: "Premium\nWebsite",
    titleGold: "Built to Convert",
    subtitle: "Luxury websites for landscaping businesses — with local SEO built in.",
    desc: "A bespoke, fast-loading website that positions you as the premium choice in your area. Built on Next.js or Framer, designed to convert visitors into enquiries — and optimised for local Google search and Google Business Profile from day one.",
    features: ["Bespoke luxury design", "Mobile-first & under 2s load", "Lead capture & contact forms", "Local SEO built in from day one", "Google Business Profile setup", "Analytics & conversion tracking"],
    stats: [
      { label: "Load time", val: "<2s" },
      { label: "Local SEO", val: "Included" },
      { label: "Google Business", val: "Setup" },
    ],
    href: "/services/website-design",
    cta: "Learn More",
  },
];

// ── Additional / smaller services ────────────────────────────────────────────
const extraServices = [
  {
    Icon: Star,
    title: "AI Review Agent",
    desc: "After a job is done, the AI automatically messages the client asking them to rate their experience from 1–10. Score 7 or above? They get a direct link to leave a Google review. Below 7? The AI asks what went wrong — so you can fix it before it becomes a public complaint.",
  },
  {
    Icon: Phone,
    title: "AI Receptionist",
    desc: "An AI that answers calls exactly like a real receptionist — takes down the caller's name, number and reason for calling, and sends you a summary. Can run 24/7 or only kick in out of hours / when you don't pick up. Never miss a lead because you were on a job.",
  },
  {
    Icon: Search,
    title: "SEO & Google Business",
    desc: "Already have a website? We handle your local SEO and Google Business Profile setup separately — keyword strategy, content, local citations, and monthly reporting so you climb the rankings in your area.",
  },
  {
    Icon: LayoutDashboard,
    title: "Operations Dashboard",
    desc: "A bespoke dashboard that keeps your landscaping jobs perfectly sorted. It automatically logs what work was done, when it happened, the final cost, and the client's review. A crystal-clear picture of your daily operations — helping you spot your most profitable jobs and keeping admin strictly to a minimum.",
  },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-1" style={{ width: 900, height: 900, top: "-30%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.20) 0%, transparent 60%)", filter: "blur(100px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 600, height: 600, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.020] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="absolute bottom-0 left-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[20%]">
          SERVICES
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">What I Do</span>
          </motion.div>
          {["THREE CORE SERVICES.", "ONE GOAL."].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mt-8">
            Everything built specifically for landscaping businesses. We understand your industry, your clients, and what it takes to grow.
          </motion.p>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#080808] py-4 overflow-hidden relative border-y border-gold/[0.06]">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            ["Premium Websites", "★ AI Lead Filtering", "Local SEO", "★ 24/7 AI Estimator", "Instant Quotes", "★ Lead Qualification", "Smart Automation"].map((item, j) => (
              <span key={`${gi}-${j}`} className="font-grotesk text-xs font-medium text-gold/30 uppercase tracking-[0.2em]">{item}</span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── ALL SERVICES — unified cards ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-1" style={{ width: 900, height: 900, top: "5%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 60%)", filter: "blur(110px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 700, height: 700, bottom: "20%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 py-16 md:py-24 space-y-6 relative z-10">
          {coreServices.map((svc, i) => (
            <Reveal key={svc.num} delay={i * 0.06}>
              <div className="relative bg-[#0D0D0D] border border-gold/20 hover:border-gold/50 rounded-3xl overflow-hidden transition-all duration-300 group hover:-translate-y-1">
                {/* Top gold line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                {/* Hover glow */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 25% 30%, rgba(212,175,55,0.07) 0%, transparent 55%)" }} />

                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
                  {/* ── Left: content ── */}
                  <div className="p-7 md:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-gold/[0.07]">
                    {/* Tag + number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-full">
                        {svc.tagPulse && (
                          <motion.span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"
                            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        )}
                        <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{svc.tag}</span>
                      </div>
                      <span className="font-grotesk font-bold text-[56px] leading-none text-white/[0.075] group-hover:text-gold/08 transition-colors duration-500 select-none">{svc.num}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-grotesk font-bold text-[clamp(28px,3.5vw,52px)] text-cream leading-[0.92] tracking-[-0.03em] mb-2 group-hover:text-cream transition-colors duration-300">
                      {svc.title.split("\n").map((line, li) => (
                        <span key={li}>{line}{li < svc.title.split("\n").length - 1 && <br />}</span>
                      ))}
                      <br /><span className="text-gradient-gold">{svc.titleGold}</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="font-cormorant text-base md:text-lg text-gold/55 italic mb-5 leading-relaxed">{svc.subtitle}</p>

                    {/* Desc */}
                    <p className="font-inter text-text-muted text-sm leading-relaxed mb-7 max-w-xl">{svc.desc}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 font-inter text-xs text-text-muted group-hover:text-cream/55 transition-colors duration-300">
                          <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0 mt-1.5 group-hover:bg-gold transition-colors duration-300" />{f}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link href={svc.href}
                      className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-7 py-3.5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5">
                      {svc.cta} →
                    </Link>
                  </div>

                  {/* ── Right: stats ── */}
                  <div className="p-7 md:p-10 xl:p-12 flex flex-col justify-center gap-4 relative">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.055) 0%, transparent 60%)" }} />
                    <div className="relative z-10 space-y-3">
                      {svc.stats.map((s, si) => (
                        <motion.div key={s.label}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.08 + i * 0.05, duration: 0.6, ease: SPRING }}
                          className="bg-[#0A0A0A] border border-white/[0.06] group-hover:border-gold/15 rounded-2xl px-5 py-4 flex items-center justify-between transition-colors duration-300">
                          <span className="font-inter text-xs text-text-muted">{s.label}</span>
                          <span className="font-grotesk font-bold text-gold text-base">{s.val}</span>
                        </motion.div>
                      ))}
                    </div>
                    {/* Service number watermark */}
                    <div className="absolute bottom-6 right-8 font-grotesk font-bold text-[100px] leading-none text-white/[0.06] select-none pointer-events-none">
                      {svc.num}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* ── ALSO AVAILABLE ── */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 py-16 md:py-20 relative z-10">
          <Reveal className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gold/40 block" />
              <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-gold/50">Also Available</span>
            </div>
            <h3 className="font-grotesk font-bold text-[clamp(22px,3vw,40px)] text-cream/80 tracking-[-0.02em]">
              More tools I build
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extraServices.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.07}>
                <div className="relative bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/35 hover:-translate-y-1 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center text-gold group-hover:bg-gold/15 group-hover:border-gold/30 transition-all duration-300 flex-shrink-0">
                    <svc.Icon size={16} />
                  </div>
                  <h4 className="font-grotesk font-bold text-sm text-cream group-hover:text-gold transition-colors duration-300">{svc.title}</h4>
                  <p className="font-inter text-xs text-text-muted leading-relaxed flex-1">{svc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Book a call CTA */}
          <Reveal className="mt-10">
            <div className="relative bg-[#0D0D0D] border border-gold/15 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <p className="font-grotesk font-bold text-base text-cream mb-1">Have a different idea in mind?</p>
                <p className="font-inter text-sm text-text-muted">If you need something that&apos;s not listed here, get in touch — if it helps landscapers win better clients, I can probably build it.</p>
              </div>
              <a href="tel:+447478075473"
                className="relative z-10 flex-shrink-0 inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-3 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
                Book a Call →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute rounded-full orb-2 pointer-events-none" style={{ width: 700, height: 700, top: "50%", right: "-15%", transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal>
            <div className="relative bg-[#111111] border border-gold/15 rounded-3xl p-7 md:p-12 lg:p-20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />Pricing</span>
                  <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,60px)] text-cream leading-[0.92] tracking-[-0.03em] mb-5">
                    Every Project<br />Is <span className="text-gradient-gold">Different</span>
                  </h2>
                  <p className="font-inter text-text-muted text-base leading-relaxed max-w-md">
                    There&apos;s no one-size-fits-all price. The scope, complexity, and goals of each project are unique. Want a ballpark number? Just call — I&apos;ll give you an honest answer in 5 minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="tel:+447478075473"
                    className="group flex items-center gap-5 bg-[#0A0A0A] border border-white/[0.07] hover:border-gold/30 rounded-2xl px-8 py-6 transition-all duration-300 hover:bg-[#111111]">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 5.61 5.61l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <div className="font-grotesk font-bold text-lg text-cream group-hover:text-gold transition-colors duration-200">+44 7478 075473</div>
                      <div className="font-inter text-xs text-text-muted mt-0.5">Call for a ballpark number — no pressure</div>
                    </div>
                  </a>
                  <Link href="/contact"
                    className="flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
                    Book Free Audit →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-44 bg-[#060606] overflow-hidden text-center">
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.20) 0%, transparent 55%)" }}
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.12) 0%, transparent 45%)" }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        {[180, 320, 480, 640].map((size, i) => (
          <motion.div key={size} className="absolute rounded-full border border-gold/[0.05] pointer-events-none"
            style={{ width: size, height: size, top: "50%", left: "50%", marginLeft: -size / 2, marginTop: -size / 2 }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }} />
        ))}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.025) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 7 }} />

        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <h2 className="font-grotesk font-bold text-[clamp(36px,6vw,88px)] text-cream leading-[0.92] tracking-[-0.04em] mb-6">
              NOT SURE WHICH<br /><span className="text-gradient-gold">SERVICE YOU NEED?</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              Book a free audit — I&apos;ll analyse your business and tell you exactly what will move the needle.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>Get Free Audit →</motion.span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
