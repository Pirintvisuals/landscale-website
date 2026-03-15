"use client";


import { motion } from "framer-motion";
import Link from "next/link";

const SPRING = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  
  
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.65, delay, ease: SPRING }} className={className}>
      {children}
    </motion.div>
  );
}

export default function SeoMarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 80% 40%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">SEO & Marketing</span>
          </motion.div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(44px,7vw,96px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
              DOMINATE LOCAL SEARCH.{" "}
              <span className="text-gradient-gold">ATTRACT PREMIUM CLIENTS.</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
            When someone in your area searches &ldquo;landscapers near me,&rdquo; you should be first. We make that happen.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
              Get Free SEO Audit →
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300">
              See Our Results
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              Our <span className="text-gradient-gold">SEO Strategy</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              { title: "Local SEO Domination", desc: "We optimise your entire online presence for your local area — so you appear when it matters most." },
              { title: "Google Business Profile", desc: "Fully optimised GMB profile that gets you into the local pack — the 3 results above everything else." },
              { title: "Keyword Strategy", desc: "Research-backed targeting of keywords your ideal clients actually search for — not just generic terms." },
              { title: "Content Marketing", desc: "Educational content that builds authority, attracts links, and keeps you relevant in Google's eyes." },
              { title: "Link Building", desc: "High-quality backlinks from relevant sites that signal to Google you&apos;re the real deal." },
              { title: "Monthly Reporting", desc: "Clear, jargon-free reports showing rankings, traffic, and — most importantly — leads generated." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="bg-[#0A0A0A] p-8 md:p-10 h-full group hover:bg-[#0D0D0D] transition-colors border-r border-b border-white/[0.04]">
                  <h3 className="font-grotesk font-bold text-lg md:text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                  <p className="font-inter text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              What Real <span className="text-gradient-gold">SEO Results</span> Look Like
            </h2>
            <p className="font-inter text-text-muted mt-3">Not impressions. Not clicks. Leads and revenue.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              { metric: "3–6 mo", label: "To see meaningful ranking improvements" },
              { metric: "Top 3", label: "Local pack positions we target first" },
              { metric: "£0/click", label: "Unlike Google Ads — organic is free" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.12}>
                <div className="bg-[#0A0A0A] p-10 md:p-14 text-center group hover:bg-[#0D0D0D] transition-colors">
                  <div className="font-grotesk font-bold text-[clamp(40px,5vw,72px)] text-gradient-gold leading-none tracking-[-0.03em] mb-3">{item.metric}</div>
                  <div className="font-inter text-text-muted text-sm">{item.label}</div>
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
              READY TO RANK #1<br /><span className="text-gradient-gold">IN YOUR AREA?</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              We&apos;ll show you where you rank now, what competitors are doing, and exactly how to beat them.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              Book Free SEO Audit →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
