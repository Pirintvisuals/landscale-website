"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const SPRING = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "", y = 50 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: SPRING }} className={className}>
      {children}
    </motion.div>
  );
}

const webServices = [
  {
    number: "01",
    title: "Website Design",
    subtitle: "Websites That Convert Visitors into High-Value Clients",
    href: "/services/website-design",
    desc: "Premium, conversion-optimised websites built exclusively for landscaping businesses. Luxury design with smart lead capture — your website becomes your best salesperson.",
    features: ["Luxury bespoke design", "Mobile-first & responsive", "Lead capture optimisation", "Fast loading (under 2s)", "CRM integration", "Analytics setup"],
  },
  {
    number: "02",
    title: "SEO & Marketing",
    subtitle: "Dominate Local Search and Attract Premium Clients",
    href: "/services/seo-marketing",
    desc: "Get found by the right customers at the right time. Our SEO strategies are built specifically for landscaping businesses in the UK.",
    features: ["Local SEO domination", "Google Business Profile", "Keyword strategy & content", "Link building", "Monthly reporting", "Competitor analysis"],
  },
  {
    number: "03",
    title: "AI Lead Generation",
    subtitle: "Stop Wasting Time on Unqualified Leads",
    href: "/services/ai-lead-generation",
    desc: "Our AI-powered systems work 24/7 to capture, qualify, and nurture leads — so you only talk to clients who are serious.",
    features: ["24/7 AI chatbot", "Automated quote estimates", "Smart lead qualification", "CRM automation", "Follow-up sequences", "Lead scoring"],
  },
];

const aiServices = [
  { icon: "★", title: "AI Review Agents", href: "/services/ai-lead-generation", desc: "Intelligent agents that qualify leads, answer common questions, and filter out time-wasters 24/7 — so only serious buyers reach you.", detail: "Our review agents are trained on your service area, pricing range, and project types. They ask the right questions upfront and score each lead automatically.", features: ["Lead qualification", "Auto-responses", "Smart filtering", "CRM integration"] },
  { icon: "◆", title: "AI Receptionist Agents", href: "/services/ai-lead-generation", desc: "Virtual receptionists that book appointments, handle enquiries, and manage your calendar automatically — without lifting a finger.", detail: "Syncs directly with your calendar. Responds to enquiries within seconds. Handles rescheduling, reminders, and follow-ups — so nothing slips through the cracks.", features: ["Appointment booking", "Enquiry handling", "Calendar sync", "24/7 availability"] },
  { icon: "▲", title: "AI Estimator Agents", href: "/services/ai-lead-generation", desc: "Instant quote generation based on project specs — save 80% of time on estimates and give clients immediate answers.", detail: "Clients input their project details and get a ballpark estimate instantly. You get a full lead summary. Win the job before the competitor even picks up the phone.", features: ["Instant quotes", "Accurate calculations", "Custom parameters", "Auto follow-ups"] },
  { icon: "●", title: "Custom AI Chatbots", href: "/services/ai-lead-generation", desc: "Tailored chatbots for your website that engage visitors, answer questions in your brand voice, and convert them into qualified leads — 24 hours a day.", detail: "Trained on your services, your FAQs, and your tone of voice. Not a generic bot — a digital version of your best salesperson, always on.", features: ["Custom training", "Brand voice match", "Multi-language", "Lead capture"] },
  { icon: "■", title: "Form Automation with AI", href: "/services/ai-lead-generation", desc: "Smart forms that adapt based on user input, validate data, and route leads intelligently — no more manual sorting through junk submissions.", detail: "Conditional logic, spam filtering, and automatic routing to the right person on your team. Integrates with your CRM, email, or Slack.", features: ["Dynamic fields", "Auto-validation", "Smart routing", "Integration ready"] },
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-40 pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 900, height: 900, top: "-30%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ x: [0, -60, 20, 0], y: [0, 50, -40, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 60%)", filter: "blur(80px)" }}
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 400, height: 400, top: "40%", left: "40%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 65%)", filter: "blur(60px)" }}
          animate={{ x: [0, 80, -50, 0], y: [0, -80, 40, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 10 }} />

        <motion.div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />

        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.025) 50%, transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 5 }} />

        <div className="absolute bottom-0 left-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.015] select-none pointer-events-none tracking-[-0.05em] translate-y-[20%]">
          SERVICES
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">What I Do</span>
          </motion.div>
          {["THREE SERVICES.", "ONE GOAL."].map((line, i) => (
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

      {/* ── WEB SERVICES ── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* Background orb that drifts slowly */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 800, height: 800, top: "20%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ y: [0, -100, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          {webServices.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.06}>
              <div className="relative border-b border-white/[0.05] py-16 md:py-20 group overflow-hidden">
                {/* Hover wash */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                {/* Left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:via-gold/40 group-hover:to-transparent transition-all duration-500" />
                {/* Diagonal scan on hover */}
                <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.02) 50%, transparent 60%)" }} />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-10 md:gap-16 items-start pl-4">
                  <div>
                    <motion.span
                      className="font-grotesk font-bold text-[90px] leading-none text-white/[0.04] group-hover:text-gold/10 transition-colors duration-700 block select-none"
                      whileHover={{ scale: 1.05 }}>
                      {service.number}
                    </motion.span>
                  </div>
                  <div>
                    <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{service.title}</h2>
                    <p className="font-cormorant text-lg text-gold/60 italic mb-5 leading-relaxed">{service.subtitle}</p>
                    <p className="font-inter text-text-muted text-base leading-relaxed mb-8">{service.desc}</p>
                    <Link href={service.href} className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-7 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
                      Learn More →
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-gold/40 mb-5">Included</h4>
                    <ul className="space-y-3">
                      {service.features.map((f, fi) => (
                        <motion.li key={f}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.06 + i * 0.1 }}
                          className="flex items-center gap-3 font-inter text-sm text-text-muted group-hover:text-cream/70 transition-colors duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0 group-hover:bg-gold transition-colors duration-300" />{f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#080808] py-4 overflow-hidden relative border-y border-gold/[0.06]">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            ["Premium Websites", "★ AI Lead Filtering", "Local SEO", "★ 24/7 Chatbots", "Instant Estimators", "★ CRM Automation", "Smart Forms"].map((item, j) => (
              <span key={`${gi}-${j}`} className="font-grotesk text-xs font-medium text-gold/30 uppercase tracking-[0.2em]">{item}</span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── AI AUTOMATION ── */}
      <section className="py-28 md:py-36 bg-[#0D0D0D] relative overflow-hidden">
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 900, height: 900, top: "-20%", left: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(110px)" }}
          animate={{ x: [0, 80, -30, 0], y: [0, -60, 80, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, bottom: "0%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(80px)" }}
          animate={{ x: [0, -50, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 }} />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <Reveal className="mb-16">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5">
              <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "left" }} />
              AI Automation
            </span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              INTELLIGENT TOOLS<br /><span className="text-gradient-gold">THAT WORK FOR YOU</span>
            </h2>
            <p className="font-inter text-text-muted mt-5 max-w-xl text-base leading-relaxed">Beyond websites — we build AI systems that automate the parts of your business that eat your time.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiServices.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08}>
                <Link href={svc.href} className="block h-full group">
                  <motion.div
                    className="relative bg-[#111111] border border-white/[0.05] hover:border-gold/25 p-8 rounded-3xl flex flex-col gap-4 h-full overflow-hidden cursor-pointer"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.14) 0%, transparent 60%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />

                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-3xl"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.04) 50%, transparent 60%)" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />

                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xl group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                      {svc.icon}
                    </div>
                    <h3 className="relative z-10 font-grotesk font-bold text-xl text-cream group-hover:text-gold transition-colors duration-300">{svc.title}</h3>
                    <p className="relative z-10 font-inter text-text-muted text-sm leading-relaxed">{svc.desc}</p>
                    <p className="relative z-10 font-cormorant text-sm text-gold/50 italic leading-relaxed flex-1">{svc.detail}</p>
                    <ul className="relative z-10 space-y-1.5 pt-3 border-t border-white/[0.04]">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 font-inter text-xs text-text-muted group-hover:text-cream/60 transition-colors duration-300">
                          <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0 group-hover:bg-gold transition-colors duration-300" />{f}
                        </li>
                      ))}
                    </ul>
                    <span className="relative z-10 font-grotesk text-xs font-semibold text-gold/40 group-hover:text-gold transition-colors duration-300 flex items-center gap-1.5">
                      Learn more
                      <motion.span className="inline-block" animate={{ x: 0 }} whileHover={{ x: 4 }}>→</motion.span>
                    </span>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 bg-[#0A0A0A] relative overflow-hidden">
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "50%", right: "-15%", transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)", filter: "blur(90px)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <Reveal className="mb-12">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />Transparent Pricing</span>
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,64px)] text-cream leading-[0.92] tracking-[-0.03em]">
              Budget <span className="text-gradient-gold">Ranges</span>
            </h2>
            <p className="font-inter text-text-muted mt-3 max-w-xl">Every project is different — here are general ranges. You&apos;ll get a custom quote during your free audit.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] mb-10">
            {[
              { label: "Framer Template Customisation", range: "£800 – £1,500" },
              { label: "Custom Website (Next.js / HTML)", range: "£2,000 – £5,000+" },
              { label: "AI Chatbot Integration", range: "£500 – £1,200" },
              { label: "AI Estimator Agent", range: "£800 – £2,000" },
              { label: "Full Package (Website + AI)", range: "£3,000 – £8,000+" },
              { label: "SEO & Marketing (monthly)", range: "£400 – £1,200/mo" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <motion.div className="bg-[#0A0A0A] p-8 flex items-center justify-between gap-6 group cursor-default relative overflow-hidden"
                  whileHover={{ backgroundColor: "#111111" }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                  <span className="font-inter text-text-muted text-sm group-hover:text-cream transition-colors duration-300 relative z-10">{item.label}</span>
                  <motion.span className="font-grotesk font-bold text-lg text-gradient-gold flex-shrink-0 relative z-10"
                    whileHover={{ scale: 1.05 }}>{item.range}</motion.span>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="text-center">
            <p className="font-inter text-text-muted text-sm mb-6">Not sure what you need? Book a free audit — I&apos;ll tell you exactly what will move the needle.</p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
              Get Free Audit →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-44 bg-[#060606] overflow-hidden text-center">
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
