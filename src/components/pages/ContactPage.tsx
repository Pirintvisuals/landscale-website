"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, Globe, Clock, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { PHONE, EMAIL } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

const inputCls = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-gold/20 focus:border-gold text-cream font-inter text-sm px-5 py-4 outline-none transition-colors duration-200 placeholder:text-text-muted rounded-xl";

const content = {
  en: {
    eyebrow: "Get in Touch",
    h1: ["LET'S GROW YOUR", "TRADE BUSINESS."],
    heroSub: "Book a free 30-minute audit. We'll review your situation, identify the gaps, and show you how to fix them.",
    tabCall: "Book a Call",
    tabMessage: "Send a Message",
    callTitle: "Book Your Free Audit Call",
    callSub: "Pick a time that works for you, 30 minutes, no pressure.",
    formTitle: "Send Us a Message",
    sentTitle: "Message Sent!",
    sentSub: "We'll be in touch within 24 hours.",
    lblName: "Your Name *", phName: "James Thompson",
    lblEmail: "Email *", phEmail: "james@yourtradebusiness.co.uk",
    lblBusiness: "Business Name *", phBusiness: "Thompson Landscapes Ltd",
    lblLocation: "Location", phLocation: "Manchester, UK",
    lblPhone: "Phone", phPhone: "+44 7700 900000",
    lblService: "Service Interest",
    serviceOpts: [
      { value: "", label: "Select a service..." },
      { value: "website", label: "Website Design" },
      { value: "seo", label: "SEO & Marketing" },
      { value: "ai", label: "AI Lead Generation" },
      { value: "full", label: "Full Package" },
      { value: "unsure", label: "Not sure yet" },
    ],
    lblMessage: "Tell Us About Your Business",
    phMessage: "What's your biggest challenge? How many leads do you get per week?",
    sending: "Sending...", submit: "Book Free Audit Call →",
    errorMsg: "Something went wrong. Please email us directly.",
    infoTitle: "Contact Info",
    infoSub: "Book directly or fill in the form, we'll reach out within 24 hours.",
    lblCoverage: "Coverage", valCoverage: "UK (primary) & Worldwide",
    lblResponse: "Response Time", valResponse: "Within 24 hours, usually same day",
    lblPhoneInfo: "Phone", lblEmailInfo: "Email",
    expectTitle: "What to Expect on the Call",
    expect: [
      "Review of your current online presence",
      "Competitor analysis for your area",
      "Your biggest growth opportunities",
      "Clear, honest recommendations",
      "No hard sell, just straight talk",
    ],
    statMin: "minute audit call",
    statFree: "Free. No strings attached.",
  },
  hu: {
    eyebrow: "Lépj kapcsolatba",
    h1: ["NÖVELJÜK MEG A", "VÁLLALKOZÁSODAT."],
    heroSub: "Foglalj egy ingyenes, 30 perces igényfelmérést. Átnézzük a helyzetedet, megkeressük a hiányosságokat, és megmutatjuk, hogyan javítsd őket.",
    tabCall: "Foglalj hívást",
    tabMessage: "Írj üzenetet",
    callTitle: "Foglald az ingyenes igényfelmérő hívásodat",
    callSub: "Válassz egy időpontot, ami neked megfelel, 30 perc, nyomás nélkül.",
    formTitle: "Írj nekünk üzenetet",
    sentTitle: "Üzenet elküldve!",
    sentSub: "24 órán belül jelentkezünk.",
    lblName: "Neved *", phName: "Kovács János",
    lblEmail: "E-mail *", phEmail: "janos@avallalkozasod.hu",
    lblBusiness: "Cég neve *", phBusiness: "Kovács Kertépítő Kft.",
    lblLocation: "Helyszín", phLocation: "Budapest",
    lblPhone: "Telefon", phPhone: "+36 30 123 4567",
    lblService: "Melyik szolgáltatás érdekel",
    serviceOpts: [
      { value: "", label: "Válassz szolgáltatást..." },
      { value: "website", label: "Weboldal készítés" },
      { value: "seo", label: "SEO és marketing" },
      { value: "ai", label: "AI érdeklődő-szerzés" },
      { value: "full", label: "Teljes csomag" },
      { value: "unsure", label: "Még nem tudom" },
    ],
    lblMessage: "Mesélj a vállalkozásodról",
    phMessage: "Mi a legnagyobb kihívásod? Hetente hány érdeklődőd van?",
    sending: "Küldés...", submit: "Foglald az ingyenes igényfelmérést →",
    errorMsg: "Valami hiba történt. Kérlek, írj nekünk közvetlenül e-mailben.",
    infoTitle: "Elérhetőség",
    infoSub: "Foglalj közvetlenül, vagy töltsd ki az űrlapot, 24 órán belül jelentkezünk.",
    lblCoverage: "Lefedettség", valCoverage: "Magyarország és világszerte",
    lblResponse: "Válaszidő", valResponse: "24 órán belül, általában még aznap",
    lblPhoneInfo: "Telefon", lblEmailInfo: "E-mail",
    expectTitle: "Mire számíthatsz a híváson",
    expect: [
      "A jelenlegi online jelenléted áttekintése",
      "Versenytárs-elemzés a környékedre",
      "A legnagyobb növekedési lehetőségeid",
      "Világos, őszinte javaslatok",
      "Semmi nyomulós értékesítés, csak egyenes beszéd",
    ],
    statMin: "perces igényfelmérő hívás",
    statFree: "Ingyenes. Semmi kötelezettség.",
  },
} as const;

export default function ContactPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  const phone = PHONE[lang];
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", business: "", location: "", message: "", service: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [tab, setTab] = useState<"calendly" | "form">("calendly");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "", ...formData, subject: `New Landscale Enquiry from ${formData.name} - ${formData.business}` }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const info = [
    { label: c.lblPhoneInfo, value: phone.display, href: phone.href, Icon: Phone },
    { label: c.lblEmailInfo, value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
    { label: c.lblCoverage, value: c.valCoverage, href: null, Icon: Globe },
    { label: c.lblResponse, value: c.valResponse, href: null, Icon: Clock },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[65vh] flex items-end">
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 800, height: 800, top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.26) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-2"
          style={{ width: 600, height: 600, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-3"
          style={{ width: 400, height: 400, top: "35%", right: "25%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[14vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[25%]">
          CONTACT
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full pb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
          </motion.div>

          {c.h1.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(36px,6.5vw,96px)] leading-[0.92] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mt-8">
            {c.heroSub}
          </motion.p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 pb-36 bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 700, height: 700, top: "0%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 md:gap-20">

            {/* Left: tabs */}
            <Reveal>
              <div className="relative bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/15 transition-colors duration-500 p-5 md:p-8 lg:p-10 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <div className="flex gap-2 mb-8 bg-white/[0.03] p-1 rounded-full w-fit">
                  <button
                    onClick={() => setTab("calendly")}
                    className={`font-grotesk font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${tab === "calendly" ? "bg-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-text-muted hover:text-cream"}`}>
                    {c.tabCall}
                  </button>
                  <button
                    onClick={() => setTab("form")}
                    className={`font-grotesk font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${tab === "form" ? "bg-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-text-muted hover:text-cream"}`}>
                    {c.tabMessage}
                  </button>
                </div>

                {tab === "calendly" ? (
                  <div>
                    <h2 className="font-grotesk font-bold text-2xl md:text-3xl text-cream mb-2 tracking-tight">{c.callTitle}</h2>
                    <p className="font-inter text-text-muted text-sm mb-6">{c.callSub}</p>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                      <iframe
                        src="https://calendly.com/pirint-milan/quoting-agent-sample"
                        width="100%"
                        height="680"
                        style={{ minWidth: "320px", border: "none" }}
                        title="Book a call with Landscale"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-grotesk font-bold text-2xl md:text-3xl text-cream mb-8 tracking-tight">{c.formTitle}</h2>
                    {status === "success" ? (
                      <div className="py-20 text-center">
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: SPRING }}
                          className="w-20 h-20 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                          <span className="font-grotesk font-bold text-3xl text-gold">✓</span>
                        </motion.div>
                        <h3 className="font-grotesk font-bold text-2xl text-cream mb-2">{c.sentTitle}</h3>
                        <p className="font-inter text-text-muted">{c.sentSub}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-name" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblName}</label>
                            <input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder={c.phName} />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblEmail}</label>
                            <input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder={c.phEmail} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-business" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblBusiness}</label>
                            <input id="contact-business" type="text" required value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} className={inputCls} placeholder={c.phBusiness} />
                          </div>
                          <div>
                            <label htmlFor="contact-location" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblLocation}</label>
                            <input id="contact-location" type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputCls} placeholder={c.phLocation} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-phone" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblPhone}</label>
                            <input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} placeholder={c.phPhone} />
                          </div>
                          <div>
                            <label htmlFor="contact-service" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblService}</label>
                            <div className="relative">
                              <select id="contact-service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                                {c.serviceOpts.map((o) => (
                                  <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <ChevronDown size={15} className="text-gold/40" aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="contact-message" className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">{c.lblMessage}</label>
                          <textarea id="contact-message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} placeholder={c.phMessage} />
                        </div>
                        <button type="submit" disabled={status === "loading"}
                          className="w-full relative bg-gold text-deep-black font-grotesk font-bold text-base py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 disabled:opacity-50 overflow-hidden group">
                          <span className="relative z-10">{status === "loading" ? c.sending : c.submit}</span>
                        </button>
                        {status === "error" && <p className="font-inter text-red-400 text-xs text-center">{c.errorMsg}</p>}
                      </form>
                    )}
                  </>
                )}
              </div>
            </Reveal>

            {/* Right: Info */}
            <Reveal delay={0.15}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-grotesk font-bold text-2xl text-cream mb-4 tracking-tight">{c.infoTitle}</h2>
                  <p className="font-inter text-text-muted text-sm leading-relaxed">{c.infoSub}</p>
                </div>

                {info.map((item, i) => (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: SPRING }}
                    className="border-b border-white/[0.06] pb-6 group">
                    <div className="flex items-center gap-3 mb-2">
                      <item.Icon size={13} className="text-gold/40 flex-shrink-0" aria-hidden="true" />
                      <div className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50">{item.label}</div>
                    </div>
                    {item.href ? (
                      <a href={item.href} className="font-inter text-cream text-sm hover:text-gold transition-colors duration-200">{item.value}</a>
                    ) : (
                      <p className="font-inter text-cream text-sm">{item.value}</p>
                    )}
                  </motion.div>
                ))}

                <div className="relative bg-[#0A0A0A] border border-gold/10 hover:border-gold/25 transition-colors duration-500 p-7 md:p-8 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 60%)" }} />
                  <h3 className="font-grotesk font-bold text-lg text-cream mb-5 relative z-10">{c.expectTitle}</h3>
                  <ul className="space-y-4 relative z-10">
                    {c.expect.map((item, i) => (
                      <motion.li key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.5, ease: SPRING }}
                        className="flex items-start gap-3 font-inter text-text-muted text-sm group/item">
                        <motion.span className="text-gold mt-0.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200">→</motion.span>
                        <span className="group-hover/item:text-cream/80 transition-colors duration-200">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Floating stat */}
                <motion.div
                  className="relative bg-[#0A0A0A] border border-gold/15 p-6 rounded-2xl text-center overflow-hidden"
                  whileHover={{ borderColor: "rgba(212,175,55,0.4)", y: -2 }}
                  transition={{ duration: 0.3 }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 65%)" }} />
                  <div className="font-grotesk font-bold text-[56px] text-gradient-gold leading-none tracking-[-0.04em] mb-1">30</div>
                  <div className="font-grotesk font-semibold text-sm text-cream mb-1">{c.statMin}</div>
                  <div className="font-inter text-xs text-text-muted">{c.statFree}</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
