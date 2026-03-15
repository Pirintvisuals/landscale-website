"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const SPRING = [0.16, 1, 0.3, 1] as const;


const inputCls = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-gold/20 focus:border-gold text-cream font-inter text-sm px-5 py-4 outline-none transition-colors duration-200 placeholder:text-text-muted rounded-xl";

export default function ContactPage() {
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
        body: JSON.stringify({ access_key: "YOUR_WEB3FORMS_KEY", ...formData, subject: `New Landscale Enquiry from ${formData.name} - ${formData.business}` }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[65vh] flex items-end">
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
          style={{ width: 400, height: 400, top: "35%", right: "25%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }}
          animate={{ x: [0, 60, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

        {/* Moving grid */}
        <motion.div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />

        {/* Diagonal scan */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.025) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 6 }} />

        {/* Watermark */}
        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[14vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[25%]">
          CONTACT
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full pb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Get in Touch</span>
          </motion.div>

          {["LET'S GROW YOUR", "LANDSCAPING BUSINESS."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(36px,6.5vw,96px)] leading-[0.92] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mt-8">
            Book a free 30-minute audit. I&apos;ll review your situation, identify the gaps, and show you how to fix them.
          </motion.p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 pb-36 bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "0%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 md:gap-20">

            {/* Left: tabs */}
            <Reveal>
              <div className="relative bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/15 transition-colors duration-500 p-5 md:p-8 lg:p-10 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <div className="flex gap-2 mb-8 bg-white/[0.03] p-1 rounded-full w-fit">
                  <button
                    onClick={() => setTab("calendly")}
                    className={`font-grotesk font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 ${tab === "calendly" ? "bg-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-text-muted hover:text-cream"}`}>
                    Book a Call
                  </button>
                  <button
                    onClick={() => setTab("form")}
                    className={`font-grotesk font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 ${tab === "form" ? "bg-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-text-muted hover:text-cream"}`}>
                    Send a Message
                  </button>
                </div>

                {tab === "calendly" ? (
                  <div>
                    <h2 className="font-grotesk font-bold text-2xl md:text-3xl text-cream mb-2 tracking-tight">Book Your Free Audit Call</h2>
                    <p className="font-inter text-text-muted text-sm mb-6">Pick a time that works for you — 30 minutes, no pressure.</p>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                      <iframe
                        src="https://calendly.com/pirint-milan/weboldal"
                        width="100%"
                        height="680"
                        style={{ minWidth: "320px", border: "none" }}
                        title="Book a call with Landscale"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-grotesk font-bold text-2xl md:text-3xl text-cream mb-8 tracking-tight">Send Us a Message</h2>
                    {status === "success" ? (
                      <div className="py-20 text-center">
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: SPRING }}
                          className="w-20 h-20 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                          <span className="font-grotesk font-bold text-3xl text-gold">✓</span>
                        </motion.div>
                        <h3 className="font-grotesk font-bold text-2xl text-cream mb-2">Message Sent!</h3>
                        <p className="font-inter text-text-muted">We&apos;ll be in touch within 24 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Your Name *</label>
                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="James Thompson" />
                          </div>
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Email *</label>
                            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder="james@yourlandscaping.co.uk" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Business Name *</label>
                            <input type="text" required value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} className={inputCls} placeholder="Thompson Landscapes Ltd" />
                          </div>
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Location</label>
                            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputCls} placeholder="Manchester, UK" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Phone</label>
                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} placeholder="+44 7700 900000" />
                          </div>
                          <div>
                            <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Service Interest</label>
                            <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`${inputCls} appearance-none`}>
                              <option value="">Select a service...</option>
                              <option value="website">Website Design</option>
                              <option value="seo">SEO &amp; Marketing</option>
                              <option value="ai">AI Lead Generation</option>
                              <option value="full">Full Package</option>
                              <option value="unsure">Not sure yet</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] text-gold/50 mb-2 block">Tell Us About Your Business</label>
                          <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} placeholder="What's your biggest challenge? How many leads do you get per week?" />
                        </div>
                        <button type="submit" disabled={status === "loading"}
                          className="w-full relative bg-gold text-deep-black font-grotesk font-bold text-base py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 disabled:opacity-50 overflow-hidden group">
                          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />
                          <span className="relative z-10">{status === "loading" ? "Sending..." : "Book Free Audit Call →"}</span>
                        </button>
                        {status === "error" && <p className="font-inter text-red-400 text-xs text-center">Something went wrong. Please email us directly.</p>}
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
                  <h2 className="font-grotesk font-bold text-2xl text-cream mb-4 tracking-tight">Contact Info</h2>
                  <p className="font-inter text-text-muted text-sm leading-relaxed">Book directly or fill in the form — I&apos;ll reach out within 24 hours.</p>
                </div>

                {[
                  { label: "Phone", value: "+44 7478 075473", href: "tel:+447478075473", icon: "◎" },
                  { label: "Email", value: "landscale.agency@gmail.com", href: "mailto:landscale.agency@gmail.com", icon: "◆" },
                  { label: "Coverage", value: "UK (primary) & Worldwide", href: null, icon: "▲" },
                  { label: "Response Time", value: "Within 24 hours, usually same day", href: null, icon: "●" },
                ].map((item, i) => (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: SPRING }}
                    className="border-b border-white/[0.06] pb-6 group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gold/40 text-xs">{item.icon}</span>
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
                  <h3 className="font-grotesk font-bold text-lg text-cream mb-5 relative z-10">What to Expect on the Call</h3>
                  <ul className="space-y-4 relative z-10">
                    {[
                      "Review of your current online presence",
                      "Competitor analysis for your area",
                      "Your biggest growth opportunities",
                      "Clear, honest recommendations",
                      "No hard sell — just straight talk",
                    ].map((item, i) => (
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
                  <div className="font-grotesk font-semibold text-sm text-cream mb-1">minute audit call</div>
                  <div className="font-inter text-xs text-text-muted">Free. No strings attached.</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
