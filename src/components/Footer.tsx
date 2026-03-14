"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="bg-[#080808] border-t border-white/[0.04] pt-24 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-20 max-w-2xl">
          <p className="font-grotesk font-bold text-3xl md:text-4xl text-cream leading-tight mb-3">
            Ready to dominate your{" "}<span className="text-gradient-gold">local market?</span>
          </p>
          <p className="font-cormorant text-lg text-cream/45 font-light italic leading-relaxed mb-7">
            Book a free 30-minute audit. I&apos;ll show you exactly where you&apos;re losing leads and how to fix it — no obligation.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
            Book Your Free Audit <span className="text-lg">→</span>
          </Link>
        </motion.div>

        {/* 4-column grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <span className="font-grotesk font-bold text-2xl tracking-[0.05em] text-gold">LANDSCALE</span>
              <div className="font-grotesk font-medium text-[10px] tracking-[0.25em] uppercase text-[#666666] mt-0.5">Agency</div>
            </div>
            <p className="font-inter text-text-muted text-sm leading-relaxed mb-4">Premium websites &amp; AI automation for landscaping businesses.</p>
            <a href="mailto:landscale.agency@gmail.com" className="font-inter text-gold text-sm hover:text-bright-gold transition-colors">landscale.agency@gmail.com</a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/case-studies", label: "Case Studies" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-inter text-text-muted text-sm hover:text-gold transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { href: "/services/ai-lead-generation", label: "AI Lead Filtering" },
                { href: "/services/website-design", label: "Custom Websites" },
                { href: "/services/seo-marketing", label: "SEO & Marketing" },
                { href: "/services/ai-lead-generation", label: "AI Chatbots" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-inter text-text-muted text-sm hover:text-gold transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">Connect</h4>
            <ul className="space-y-3">
              <li><a href="mailto:landscale.agency@gmail.com" className="font-inter text-text-muted text-sm hover:text-gold transition-colors">Email</a></li>
              <li><a href="#" className="font-inter text-text-muted text-sm hover:text-gold transition-colors">Instagram (coming soon)</a></li>
              <li><a href="#" className="font-inter text-text-muted text-sm hover:text-gold transition-colors">LinkedIn (coming soon)</a></li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-text-muted/50 text-xs">© {new Date().getFullYear()} Landscale Agency. Built with care.</p>
          <p className="font-inter text-text-muted/50 text-xs">UK &amp; Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
