"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const SPRING = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: SPRING }} className={className}>
      {children}
    </motion.div>
  );
}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {[
              { title: "Luxury Bespoke Design", desc: "Custom-built to reflect your brand. No templates, no shortcuts — premium design that sets you apart." },
              { title: "Mobile-First & Responsive", desc: "Over 60% of your visitors are on mobile. Your site looks and performs flawlessly on every device." },
              { title: "Lead Capture Optimisation", desc: "Strategic placement of contact forms, phone CTAs, and quote request forms that actually get filled in." },
              { title: "Fast Loading (Under 2s)", desc: "Slow sites lose customers. Every element is optimised for blazing fast load times." },
              { title: "SEO-Ready Foundation", desc: "Proper structure, meta tags, schema markup, and technical SEO built in from day one." },
              { title: "Analytics & Tracking", desc: "Google Analytics 4 setup so you know exactly where your leads are coming from." },
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
                  <div className="font-grotesk font-bold text-[56px] leading-none text-white/[0.04] group-hover:text-gold/15 transition-colors duration-500 flex-shrink-0 w-20">{item.step}</div>
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
