"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const SPRING = [0.16, 1, 0.3, 1] as const;


export default function WebsiteDesignPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 20% 60%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Website Design</span>
          </motion.div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(44px,7vw,96px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
              WEBSITES THAT CONVERT VISITORS INTO{" "}
              <span className="text-gradient-gold">HIGH-VALUE CLIENTS</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
            Your website is your most powerful sales tool — or it should be. We build luxury, conversion-focused websites that make you look premium.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
              Get Free Website Audit →
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300">
              See Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Included */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              What&apos;s <span className="text-gradient-gold">Included</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Luxury Bespoke Design", desc: "Custom-built to reflect your brand. No templates, no shortcuts — premium design that sets you apart." },
              { num: "02", title: "Mobile-First & Responsive", desc: "Over 60% of your visitors are on mobile. Your site looks and performs flawlessly on every device." },
              { num: "03", title: "Lead Capture Optimisation", desc: "Strategic placement of contact forms, phone CTAs, and quote request forms that actually get filled in." },
              { num: "04", title: "Loads Under 0.8s", desc: "Slow sites lose customers. Every element is optimised for sub-second load times — 100/100 PageSpeed." },
              { num: "05", title: "SEO-Ready Foundation", desc: "Proper structure, meta tags, schema markup, and technical SEO built in from day one." },
              { num: "06", title: "Analytics & Tracking", desc: "Google Analytics 4 setup so you know exactly where your leads are coming from." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/40 rounded-2xl p-8 h-full flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 65%)" }} />
                  {/* Number */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-grotesk font-bold text-[10px] uppercase tracking-[0.25em] text-gold/40 group-hover:text-gold/70 transition-colors duration-300">{item.num}</span>
                    <div className="w-6 h-6 rounded-full border border-gold/20 group-hover:border-gold/50 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/10">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gold/40 group-hover:text-gold transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col gap-2 flex-1">
                    <h3 className="font-grotesk font-bold text-lg text-cream group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="font-inter text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              Our <span className="text-gradient-gold">Process</span>
            </h2>
          </Reveal>
          <div className="space-y-0">
            {[
              { step: "01", title: "Discovery Call", desc: "We learn about your business, your ideal clients, and your goals. 30 minutes that shapes everything." },
              { step: "02", title: "Strategy & Wireframes", desc: "We map out site structure, content strategy, and conversion pathways before writing a single line of code." },
              { step: "03", title: "Design & Build", desc: "Luxury aesthetics and conversion-focused structure. You review every step — no surprises." },
              { step: "04", title: "Launch & Optimise", desc: "We launch your site, set up analytics, and monitor performance. We iterate based on real data." },
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

      {/* CTA */}
      <section className="py-32 bg-[#0D0D0D] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,64px)] text-cream leading-[0.95] tracking-[-0.03em] mb-6">
              READY FOR A WEBSITE<br /><span className="text-gradient-gold">THAT ACTUALLY WORKS?</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              We&apos;ll show you exactly what&apos;s costing you leads and how to fix it.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              Book Free Audit →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
