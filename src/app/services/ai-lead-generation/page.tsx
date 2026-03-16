"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const SPRING = [0.16, 1, 0.3, 1] as const;


export default function AiLeadGenerationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 70% 40%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">AI Lead Generation</span>
          </motion.div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(44px,7vw,96px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
              STOP WASTING TIME ON{" "}
              <span className="text-gradient-gold">UNQUALIFIED LEADS</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
            Imagine only speaking to clients who are ready to commit. Our AI systems make that your reality — 24/7.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
              Get Free Demo →
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 rounded-full hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
              See It In Action
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              How Our <span className="text-gradient-gold">AI System Works</span>
            </h2>
          </Reveal>
          <div className="space-y-0">
            {[
              { step: "01", title: "Visitor Arrives on Your Site", desc: "Someone finds you on Google or clicks your ad. Our AI chatbot engages them immediately — even at 2am." },
              { step: "02", title: "AI Qualifies the Lead", desc: "Smart questions: budget, project type, timeline, location. Serious clients identified vs. time-wasters — instantly." },
              { step: "03", title: "Instant Quote Estimate", desc: "Qualifying leads get a rough estimate range based on project details. This filters out price shoppers automatically." },
              { step: "04", title: "Warm Lead Delivered to You", desc: "Only pre-qualified leads reach you — with full project brief, budget, and contact details attached." },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div className="flex gap-8 md:gap-16 items-start py-10 border-b border-white/[0.06] group">
                  <div className="font-grotesk font-bold text-[56px] leading-none text-white/[0.08] group-hover:text-gold/15 transition-colors duration-500 flex-shrink-0 w-20">{item.step}</div>
                  <div className="pt-2">
                    <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="font-inter text-text-muted text-base leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              Everything <span className="text-gradient-gold">Included</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "24/7 AI Chatbot", desc: "Never miss a lead. Our chatbot engages visitors around the clock, even when you're on a job." },
              { num: "02", title: "Automated Estimates", desc: "Smart pricing calculator that gives ballpark quotes, filters price-shoppers, and sets expectations upfront." },
              { num: "03", title: "Smart Qualification", desc: "Custom criteria based on your ideal client profile. You set the standards, AI enforces them." },
              { num: "04", title: "CRM Integration", desc: "Qualified leads automatically added to your CRM with full project details and lead score." },
              { num: "05", title: "Follow-Up Sequences", desc: "Automated email and SMS follow-ups for leads who don't convert immediately." },
              { num: "06", title: "Lead Analytics", desc: "Track every lead, conversion rate, and time saved. Clear ROI reporting every month." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative bg-[#0D0D0D] border border-white/[0.06] hover:border-gold/50 hover:bg-[#121212] rounded-2xl p-8 h-full flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-4 overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.12)]">
                  {/* Top accent — slides from center */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 60%)" }} />
                  {/* Ghost number */}
                  <div className="absolute bottom-0 right-3 font-grotesk font-bold text-[88px] leading-none text-white/0 group-hover:text-gold/[0.07] transition-colors duration-500 select-none pointer-events-none tracking-[-0.04em]">{item.num}</div>
                  {/* Number + arrow */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-grotesk font-bold text-[11px] uppercase tracking-[0.25em] text-white/[0.15] group-hover:text-gold/70 transition-colors duration-300">{item.num}</span>
                    <div className="w-7 h-7 rounded-full border border-white/[0.06] group-hover:border-gold/45 group-hover:bg-gold/10 flex items-center justify-center transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 group-hover:text-gold transition-colors duration-300"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col gap-2 flex-1">
                    <h3 className="font-grotesk font-bold text-lg text-cream group-hover:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="font-inter text-text-muted text-sm leading-relaxed group-hover:text-cream/60 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0D0D0D] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,64px)] text-cream leading-[0.95] tracking-[-0.03em] mb-6">
              SEE THE SYSTEM<br /><span className="text-gradient-gold">IN ACTION</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              Book a free demo and we&apos;ll show you exactly how our AI would work for your specific business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              Book Free Demo →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
