"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin } from "lucide-react";
import { localeFromPathname, localize } from "@/lib/i18n";
import { FOOTER, PHONE, EMAIL } from "@/content/ui";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const pathname = usePathname();
  const lang = localeFromPathname(pathname);
  const t = FOOTER[lang];
  const phone = PHONE[lang];

  return (
    <footer ref={ref} className="bg-[#080808] border-t border-white/[0.04] pt-24 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-20 max-w-2xl">
          <p className="font-grotesk font-bold text-3xl md:text-4xl text-cream leading-tight mb-3">
            {t.ctaHeadA}<span className="text-gradient-gold">{t.ctaHeadB}</span>
          </p>
          <p className="font-cormorant text-lg text-cream/45 font-light italic leading-relaxed mb-7">
            {t.ctaSub}
          </p>
          <Link href={localize("/contact", lang)} className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
            {t.ctaButton} <span className="text-lg">→</span>
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
            <p className="font-inter text-text-muted text-sm leading-relaxed mb-4">{t.brandTagline}</p>
            <a href={`mailto:${EMAIL}`} className="font-inter text-gold text-sm hover:text-bright-gold transition-colors">{EMAIL}</a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">{t.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {t.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href, lang)} className="font-inter text-text-muted text-sm hover:text-gold transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">{t.servicesTitle}</h4>
            <ul className="space-y-3">
              {t.services.map((link) => (
                <li key={link.label}>
                  <Link href={localize(link.href, lang)} className="font-inter text-text-muted text-sm hover:text-gold transition-colors inline-block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-grotesk font-semibold text-cream text-sm uppercase tracking-[0.12em] mb-5">{t.connectTitle}</h4>
            <ul className="space-y-3">
              <li><a href={phone.href} className="font-inter text-text-muted text-sm hover:text-gold transition-colors">{phone.display}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="font-inter text-text-muted text-sm hover:text-gold transition-colors">{EMAIL}</a></li>
              <li>
                <a href="https://www.instagram.com/pirintmilan/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-text-muted text-sm hover:text-gold transition-colors">
                  <Instagram size={13} className="flex-shrink-0" />Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mil%C3%A1n-pirint-0598413b7/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-text-muted text-sm hover:text-gold transition-colors">
                  <Linkedin size={13} className="flex-shrink-0" />LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-inter text-text-muted/50 text-xs">© {new Date().getFullYear()} Landscale Agency. {t.builtWith}</p>
          <p className="font-inter text-text-muted/50 text-xs">{t.coverage}</p>
        </div>
      </div>
    </footer>
  );
}
