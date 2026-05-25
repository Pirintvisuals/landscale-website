"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroVisual } from "@/components/ui/hero-visual";

const SPRING = [0.16, 1, 0.3, 1] as const;




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
        style={{ width: 700, height: 700, top: "-20%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.26) 0%, transparent 65%)", filter: "blur(48px)" }} />
      <div className="absolute rounded-full orb-2"
        style={{ width: 520, height: 520, bottom: "-15%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 65%)", filter: "blur(42px)" }} />
      <div className="absolute rounded-full orb-3"
        style={{ width: 360, height: 360, top: "40%", left: "52%", background: "radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 65%)", filter: "blur(32px)" }} />
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI Estimator for tradesmen and contractors?",
      acceptedAnswer: { "@type": "Answer", text: "An AI Estimator is a chat widget on your website that asks visitors about their project (scope, area, budget, postcode) and delivers an instant price estimate 24/7 — before they even give their contact details. This filters out unserious inquiries and saves you 15–20 hours per week." },
    },
    {
      "@type": "Question",
      name: "How does the AI chatbot qualify leads?",
      acceptedAnswer: { "@type": "Answer", text: "The chatbot asks qualifying questions about budget, location, project type, and timeline. Leads outside your service area or below your minimum job size are politely declined automatically. Serious buyers are forwarded to you with their full brief attached." },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a trade or contractor website?",
      acceptedAnswer: { "@type": "Answer", text: "Most projects are completed in 2–4 weeks from the discovery call. The site includes local SEO, sub-1-second load times, and AI lead qualification built in from day one." },
    },
    {
      "@type": "Question",
      name: "Do I need a website already to use the AI tools?",
      acceptedAnswer: { "@type": "Answer", text: "No. If you don't have a website, Landscale builds one for you. If you already have a site, the AI estimator and chatbot can be integrated directly into it." },
    },
    {
      "@type": "Question",
      name: "What types of businesses does Landscale work with?",
      acceptedAnswer: { "@type": "Answer", text: "Landscale works with landscaping, gardening, construction, plumbing, cleaning, electrical, and other home service businesses in the UK and Hungary." },
    },
  ],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Landscale Agency",
  url: "https://landscale.agency",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "5",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Balázs Lavotha" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Milan built our new website with great care and attention to every detail. His input gave the site an aesthetic and professional look that our new clients have spoken highly of.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Basil" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Péter Mantlik" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients.",
    },
  ],
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#080808]">
          <HeroOrbs />
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[20vw] leading-none text-white/[0.04] select-none pointer-events-none tracking-[-0.05em] translate-y-[15%]">
          LANDSCALE
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">

            {/* ── LEFT: text ── */}
            <div className="flex flex-col justify-center py-16 lg:py-0">

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 mb-10">
                <motion.span className="w-8 h-px bg-gold" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.6, delay: 0.2 }} style={{ transformOrigin: "left" }} />
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">AI-Powered Lead Qualification for Tradesmen</span>
              </motion.div>

              <h1 className="font-grotesk font-bold leading-[0.88] tracking-[-0.04em] mb-8">
                <div className="overflow-hidden py-1">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }}
                    className="text-[clamp(42px,7vw,108px)] text-gradient-gold">
                    TRADESMEN
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.32, ease: SPRING }}
                    className="text-[clamp(42px,7vw,108px)] text-cream">
                    STOP CHASING
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.44, ease: SPRING }}
                    className="text-[clamp(42px,7vw,108px)] text-cream/20"
                    style={{ WebkitTextStroke: "1px rgba(245,241,232,0.25)" }}>
                    DEAD LEADS.
                  </motion.div>
                </div>
              </h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: SPRING }}
                className="font-cormorant text-xl md:text-2xl text-cream/60 leading-relaxed font-light italic max-w-xl mb-8">
                We build premium websites with AI-powered lead filtering — intelligent estimator agents that qualify leads and give instant quotes, so you only talk to serious buyers.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95, ease: SPRING }}
                className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 cursor-pointer">
                  Get Your Free Audit
                  <span>→</span>
                </Link>
                <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 text-cream/70 font-grotesk font-medium text-base px-8 py-5 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer">
                  See Our Work
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["/images/lavotha-logo.jpg", "/images/mimosa-logo.jpg", "/images/viszcad-logo.png"].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-[#111] overflow-hidden flex-shrink-0">
                      <Image src={src} alt="" width={32} height={32} className="object-contain w-full h-full" priority />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-gold text-xs leading-none mb-1">★★★★★</div>
                  <p className="font-inter text-[11px] text-cream/40">Trusted by trade businesses</p>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: AI visual ── */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: SPRING }}
              className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-[400px] h-[560px] bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.07)] flex flex-col">
                <HeroVisual />
              </div>
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="absolute bottom-10 right-16 hidden md:flex flex-col items-center gap-3">
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-20 bg-gradient-to-b from-gold/80 to-transparent" />
            <span className="font-grotesk text-[9px] uppercase tracking-[0.35em] text-text-muted rotate-90 origin-center translate-y-10">Scroll</span>
          </motion.div>

        </motion.div>
      </section>

      {/* ── STATS — dramatic layout ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full orb-1" style={{ width: 1000, height: 1000, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(80px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 400, height: 400, top: "10%", left: "5%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 350, height: 350, bottom: "5%", right: "8%", background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)", filter: "blur(55px)" }} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Your Website Isn't Generating Leads", desc: "You've got a website, but it collects digital dust. Visitors come, they leave, you never hear from them.", offset: "lg:mt-0", color: "from-red-950/20 to-transparent" },
              { num: "02", title: "You Waste Hours on Unqualified Leads", desc: "Time-wasters who want the cheapest job, won't commit, or ghost you after quotes. Your time is worth more.", offset: "lg:mt-16", color: "from-amber-950/20 to-transparent" },
              { num: "03", title: "You're Invisible on Google", desc: "Your competitors show up first when local customers search. You're on page 3 — practically invisible.", offset: "lg:mt-8", color: "from-orange-950/15 to-transparent" },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.12} className={item.offset}>
                  <div className="relative bg-[#111111] border border-white/[0.05] hover:border-gold/45 hover:-translate-y-1.5 p-8 md:p-10 h-full min-h-[320px] flex flex-col transition-all duration-300 rounded-3xl overflow-hidden group">
                    {/* Gradient bg on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(212,175,55,0.06)" }} />
                    <div className="relative z-10">
                      <div className="font-grotesk font-bold text-[80px] leading-none text-white/[0.08] group-hover:text-gold/25 transition-all duration-700 mb-6 select-none hover:scale-105">
                        {item.num}
                      </div>
                      <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-4 leading-tight tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                      <p className="font-inter text-text-muted text-base leading-relaxed flex-1">{item.desc}</p>
                    </div>
                  </div>
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
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />What We Do</span>
            <h2 className="font-grotesk font-bold text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[-0.03em] text-cream">
              Everything You Need<br /><span className="text-gradient-gold">Under One Roof</span>
            </h2>
          </Reveal>
          {/* Three core services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01", tag: "AI Estimator", href: "/services/ai-estimator",
                title: "AI Estimator Agent",
                italic: "Instant project quotes — no phone call needed.",
                desc: "Visitors ask for a quote. The AI collects area, materials, postcode and timeline, then gives an accurate estimate immediately. You hear from leads who already know the price.",
                features: ["Project-specific questions", "Instant line-item estimate", "Contact collected after quote", "Saves 15–20 hrs/week"],
                stats: [{ val: "24/7", label: "Availability" }, { val: "<0.8s", label: "Response" }, { val: "0", label: "Missed leads" }],
              },
              {
                num: "02", tag: "AI Chatbot", href: "/services/ai-chatbot",
                title: "AI Chatbot",
                italic: "Qualifies leads 24/7, filters out time-wasters.",
                desc: "The chatbot greets every visitor, checks budget, location and timeline, and makes a decision. Wrong fit? It declines politely. Right fit? Their details land straight in your inbox.",
                features: ["Budget & location check", "Automatic lead scoring", "Declines bad fits politely", "Instant alert to you"],
                stats: [{ val: "+300%", label: "Qualified leads" }, { val: "<0.8s", label: "Response" }, { val: "0", label: "Junk leads" }],
              },
              {
                num: "03", tag: "Website", href: "/services/website-design",
                title: "Premium Website",
                italic: "Built to convert — with local SEO included.",
                desc: "A bespoke, fast-loading website that positions you as the premium choice. Luxury design, smart lead capture, local SEO and Google Business Profile setup from day one.",
                features: ["Bespoke luxury design", "<0.8s load time", "Local SEO built in", "Google Business setup"],
                stats: [{ val: "100", label: "PageSpeed" }, { val: "<0.8s", label: "Load time" }, { val: "100", label: "SEO Score" }],
              },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 0.1}>
                  <Link href={card.href} className="block h-full group">
                    <div className="relative bg-[#111111] border border-gold/18 group-hover:border-gold/50 p-7 h-full flex flex-col transition-all duration-300 rounded-3xl overflow-hidden group-hover:-translate-y-1.5 min-h-[360px]">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)" }} />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-5">
                          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 px-3 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{card.tag}</span>
                          </div>
                          <span className="font-grotesk font-bold text-[48px] leading-none text-white/[0.08] group-hover:text-gold/22 transition-colors duration-500 select-none">{card.num}</span>
                        </div>
                        <h3 className="font-grotesk font-bold text-xl text-cream mb-2 tracking-tight group-hover:text-gold transition-colors duration-300">{card.title}</h3>
                        <p className="font-cormorant text-sm text-gold/50 italic mb-3 leading-relaxed">{card.italic}</p>
                        <p className="font-inter text-text-muted text-sm leading-relaxed mb-5 flex-1">{card.desc}</p>
                        {/* Metric stats */}
                        <div className="grid grid-cols-3 gap-2 mb-5 pt-4 border-t border-white/[0.04]">
                          {card.stats.map((s) => (
                            <div key={s.label} className="flex flex-col items-center bg-[#0A0A0A] border border-white/[0.05] group-hover:border-gold/15 rounded-xl py-2.5 transition-colors duration-300">
                              <span className="font-grotesk font-bold text-sm text-gold leading-none">{s.val}</span>
                              <span className="font-inter text-[9px] text-text-muted mt-1 text-center">{s.label}</span>
                            </div>
                          ))}
                        </div>
                        <ul className="space-y-2 mb-5">
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
              </Reveal>
            ))}
          </div>

          {/* See all services CTA */}
          <Reveal className="mt-10 text-center">
            <p className="font-inter text-sm text-text-muted mb-4">Looking for something else? We also build AI Review Agents, AI Receptionists, Operations Dashboards, and more.</p>
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
          <div className="absolute rounded-full orb-1" style={{ width: 750, height: 750, bottom: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 500, height: 500, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)", filter: "blur(70px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 300, height: 300, top: "40%", left: "45%", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
        </div>
        {/* Large decorative text */}
        <div className="absolute top-0 left-0 font-grotesk font-bold text-[18vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em]">WHY</div>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="md:sticky md:top-32">
              <Reveal>
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />Why Me</span>
                <h2 className="font-grotesk font-bold text-[clamp(40px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em] mb-8">
                  WHY ELITE<br />TRADESMEN<br /><span className="text-gradient-gold">CHOOSE ME</span>
                </h2>
                <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed max-w-sm mb-10">
                  I grew up around tradespeople. I understand your industry at a level a generalist agency never could.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 font-grotesk text-sm font-semibold text-gold/60 hover:text-gold transition-colors border-b border-gold/20 hover:border-gold pb-1">
                  My story →
                </Link>
              </Reveal>
            </div>
            <div className="space-y-0">
              {[
                { num: "01", title: "Deep Industry Knowledge", desc: "My family are tradespeople. I understand the work cycles, the client types, the pressures. You won't need to explain your business to me.", icon: "◆" },
                { num: "02", title: "AI-First Approach", desc: "I use the latest AI tools to automate lead qualification, estimates, and follow-ups — so you focus on the work you love.", icon: "▲" },
                { num: "03", title: "Results-Driven, Always", desc: "I measure success in leads and revenue, not impressions. If something isn't working, I change it.", icon: "●" },
              ].map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.15}>
                  <div className="border-b border-white/[0.05] py-10 group relative overflow-hidden cursor-default hover:translate-x-1.5 transition-transform duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />
                    <div className="flex items-start gap-6 pl-4">
                      <span className="font-grotesk font-bold text-[36px] text-white/[0.09] group-hover:text-gold/35 transition-colors duration-500 mt-1 flex-shrink-0 leading-none">{pillar.num}</span>
                      <div>
                        <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{pillar.title}</h3>
                        <p className="font-inter text-text-muted text-base leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "Milan built our new website with great care and attention to every detail. His input gave the site an aesthetic and professional look that our new clients have spoken highly of. I recommend him to everyone who values a quality online presence.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5, logo: "/images/lavotha-logo.jpg" },
              { quote: "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen. It's already paying for itself in the quality of leads we're getting.", name: "Basil", company: "Mimosa Gardens", stars: 5, logo: "/images/mimosa-logo.jpg" },
              { quote: "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients. Working with him was smooth from start to finish — highly recommend.", name: "Péter Mantlik", company: "ViszCAD", stars: 5, logo: "/images/viszcad-logo.png" },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                  <div className="relative bg-[#111111] border border-white/[0.05] hover:border-gold/45 hover:-translate-y-1.5 p-8 rounded-3xl flex flex-col gap-5 transition-all duration-300 h-full overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {/* Giant quote mark */}
                    <div className="absolute top-4 right-6 font-cormorant text-[100px] leading-none text-gold/[0.06] select-none pointer-events-none group-hover:text-gold/[0.1] transition-colors duration-500">&ldquo;</div>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="font-cormorant text-xl font-light text-cream italic leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                        {t.logo ? (
                          <Image src={t.logo} alt={t.company} width={36} height={36} className="object-contain w-full h-full" />
                        ) : (
                          <span className="font-grotesk font-bold text-xs text-gold">{t.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-grotesk font-semibold text-sm text-cream">{t.name}</div>
                        <div className="font-inter text-xs text-text-muted">{t.company}</div>
                      </div>
                    </div>
                  </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── TRUST METRICS ── */}
      <section className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-16 md:mb-20" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <Reveal className="mb-12 md:mb-16 text-center">
            <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-gold/50 block mb-4">By The Numbers</span>
            <h2 className="font-grotesk font-bold text-[clamp(28px,4vw,56px)] text-cream tracking-[-0.03em]">
              Why Tradesmen<br /><span className="text-gradient-gold">Trust Landscale</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "100/100", label: "Google PageSpeed Score", desc: "Perfect performance on every build" },
              { value: "<0.8s", label: "Average Load Time", desc: "Faster than 99% of competitor sites" },
              { value: "4", label: "Trade Businesses Live", desc: "Real results across roofing, landscaping, construction & more" },
              { value: "UK + INT", label: "Coverage", desc: "Serving clients across UK & internationally" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="relative bg-[#0D0D0D] border border-white/[0.06] hover:border-gold/30 rounded-2xl p-6 md:p-8 flex flex-col gap-3 transition-all duration-300 group hover:-translate-y-1 h-full">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
                  <div className="font-grotesk font-bold text-[clamp(24px,3vw,42px)] text-gradient-gold tracking-[-0.03em] leading-none">
                    {item.value}
                  </div>
                  <div className="font-grotesk font-semibold text-sm text-cream">{item.label}</div>
                  <p className="font-inter text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-16 md:mt-20" />
      </section>

      {/* ── CHATBOT ── */}
      <Link href="/contact">
        <motion.div className="fixed bottom-6 right-6 z-[200]" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <div className="relative w-14 h-14 rounded-full bg-[#111111] border border-gold/30 flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-gold/70 hover:bg-[#1a1a1a] transition-all duration-300">
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-50" />
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold relative z-10">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </motion.div>
      </Link>
    </>
  );
}
