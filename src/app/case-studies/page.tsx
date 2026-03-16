"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const SPRING = [0.16, 1, 0.3, 1] as const;


const projects = [
  {
    id: "lavothakertkft",
    name: "Lavothakertkft",
    tagline: "Hungarian Landscaping — Digital Transformation",
    location: "Hungary",
    tag: "Website Design",
    desc: "Professional landscaping company with decades of experience but a dated web presence. Needed a site that matched the quality of their work and started capturing leads automatically.",
    what: ["Custom Framer website", "Multilingual (HU/EN)", "Smart contact forms", "Mobile-first design"],
    metrics: [
      { label: "Performance", val: "96" },
      { label: "SEO", val: "100" },
      { label: "Load time", val: "<1s" },
    ],
    url: "https://lavothakertkft.framer.website/",
    file: "lavothakertkft",
    index: "01",
  },
  {
    id: "mimosa-gardens",
    name: "Mimosa Gardens",
    tagline: "Premium UK Landscaping — Luxury Online Presence",
    location: "United Kingdom",
    tag: "Website + Lead Capture",
    desc: "High-end residential landscaping business targeting premium clients. The brief: look as luxurious as the gardens they build. Elegant design with conversion-optimised lead capture throughout.",
    what: ["Luxury Framer build", "Premium photography layout", "Lead capture optimisation", "Portfolio showcase"],
    metrics: [
      { label: "Performance", val: "96" },
      { label: "SEO", val: "100" },
      { label: "Load time", val: "<0.8s" },
    ],
    url: "https://mimosagardens.framer.website/",
    file: "mimosa-gardens",
    index: "02",
  },
  {
    id: "viszcad",
    name: "ViszCAD",
    tagline: "Engineering Office — Technical Showcase Platform",
    location: "Hungary",
    tag: "Custom Next.js Build",
    desc: "Engineering office needing a professional web platform to showcase technical projects, attract quality clients, and handle enquiries. Built from scratch in Next.js for full performance and control.",
    what: ["Custom Next.js build", "Portfolio & project showcase", "Technical documentation", "Client enquiry system"],
    metrics: [
      { label: "Performance", val: "96" },
      { label: "Best Practices", val: "100" },
      { label: "Load time", val: "<0.6s" },
    ],
    url: "https://viszcad.vercel.app/index.html",
    file: "viszcad",
    index: "03",
  },
  {
    id: "landscale-template",
    name: "Landscale Template",
    tagline: "Full AI Stack — The Complete Landscaping Website",
    location: "Worldwide",
    tag: "AI Chatbot + Estimator + Smart Forms",
    desc: "A full demonstration of everything Landscale can build — live AI chatbot for lead qualification, an instant estimator agent, and smart form automation. This is the gold standard for landscaping websites.",
    what: ["Live AI chatbot", "Instant estimator agent", "Smart form automation", "Full Framer build"],
    metrics: [
      { label: "Performance", val: "96" },
      { label: "SEO", val: "100" },
      { label: "Availability", val: "100" },
    ],
    url: "https://landscaletemplate.framer.website/",
    file: "landscale-template",
    index: "04",
  },
];

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  
  
  const [hovered, setHovered] = useState(false);
  const isEven = i % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, delay: 0.05, ease: SPRING }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative">

      {i > 0 && <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />}

      <div className="relative overflow-hidden py-10 md:py-20 lg:py-28">
        {/* Per-card moving orb */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{
            width: 700, height: 700,
            [isEven ? "left" : "right"]: "-20%",
            top: "50%", transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
          animate={hovered
            ? { scale: 1.4, opacity: 1 }
            : { scale: [1, 1.08, 1], opacity: 0.5 }}
          transition={hovered
            ? { duration: 0.6, ease: "easeOut" }
            : { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }} />

        {/* Hover background wash */}
        <div className={`absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-transparent transition-opacity duration-700 ${hovered ? "opacity-100" : "opacity-0"}`} />

        {/* Top shimmer line on hover */}
        <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }} />

        {/* Giant watermark number */}
        <div className={`absolute font-grotesk font-bold select-none pointer-events-none tracking-[-0.06em] transition-all duration-700 ${hovered ? "text-gold/[0.05]" : "text-white/[0.06]"} ${isEven ? "-right-4 bottom-0" : "-left-4 bottom-0"}`}
          style={{ fontSize: "clamp(160px,20vw,280px)", lineHeight: 1 }}>
          {project.index}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center ${!isEven ? "lg:[direction:rtl]" : ""}`}>

            {/* Screenshot */}
            <div className={`${!isEven ? "[direction:ltr]" : ""}`}>
              <motion.div
                animate={hovered ? { scale: 1.015, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative">
                {/* Glow frame */}
                <motion.div
                  className="absolute -inset-px rounded-2xl pointer-events-none z-20"
                  animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.4), transparent 60%)", borderRadius: "inherit", filter: "blur(0.5px)" }} />

                <div className="relative aspect-[16/10] overflow-hidden bg-[#111] rounded-2xl border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <Image
                    src={`/images/case-studies/${project.file}.png`}
                    alt={project.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Location badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 text-gold/80">
                      {project.location}
                    </span>
                  </div>

                  {/* Hover overlay button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-3 rounded-full hover:bg-bright-gold transition-colors shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                      View Live Site →
                    </a>
                  </motion.div>

                  {/* Bottom gradient info */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between z-10">
                    <span className="font-grotesk font-bold text-cream text-sm">{project.name}</span>
                    <span className="font-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-gold/60">{project.tag}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className={`${!isEven ? "[direction:ltr]" : ""} space-y-6`}>
              <div className="flex items-center gap-3">
                <span className="font-grotesk font-bold text-[10px] uppercase tracking-[0.25em] text-gold/40">{project.index}</span>
                <span className="h-px flex-1 bg-gold/10" />
                <span className="font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-gold/60 border border-gold/20 px-3 py-1 rounded-full">{project.tag}</span>
              </div>

              <div>
                <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,60px)] text-cream mb-3 tracking-[-0.02em] leading-[0.92]">
                  {project.name}
                </h2>
                <p className="font-cormorant text-lg text-gold/50 italic leading-relaxed">{project.tagline}</p>
              </div>

              <p className="font-inter text-text-muted text-base leading-relaxed">{project.desc}</p>

              <div>
                <h4 className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted/40 mb-3">What Was Built</h4>
                <div className="flex flex-wrap gap-2">
                  {project.what.map((item) => (
                    <motion.span key={item}
                      className="font-inter text-xs text-cream/60 border border-white/[0.07] hover:border-gold/30 hover:text-gold/80 px-3 py-1.5 rounded-full transition-all duration-200 cursor-default"
                      whileHover={{ scale: 1.05 }}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Performance metrics */}
              <div className="flex flex-wrap items-center gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col items-center bg-[#0A0A0A] border border-gold/15 rounded-xl px-4 py-2.5 min-w-[72px]">
                    <span className="font-grotesk font-bold text-base text-gold leading-none">{m.val}</span>
                    <span className="font-inter text-[10px] text-text-muted mt-1">{m.label}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center bg-[#0A0A0A] border border-white/[0.07] rounded-xl px-4 py-2.5">
                  <span className="font-grotesk font-bold text-base text-cream/70 leading-none">Mobile</span>
                  <span className="font-inter text-[10px] text-text-muted mt-1">Optimized</span>
                </div>
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-7 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
                Visit Live Site →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        {/* Orbs */}
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 800, height: 800, top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.26) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-2"
          style={{ width: 500, height: 500, bottom: "0%", right: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 60%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-3"
          style={{ width: 350, height: 350, top: "35%", right: "25%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />

        {/* Moving grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
          />


        {/* Watermark */}
        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[15vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[25%]">
          WORK
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full pb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">Live Work</span>
          </motion.div>

          {["BUILT BY ME.", "LIVE RIGHT NOW."].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-2xl mt-8 mb-10">
            Four live projects you can click and explore right now. Real websites, real businesses — all built by Landscale.
          </motion.p>

          {/* Project name pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="flex flex-wrap gap-3">
            {projects.map((p, i) => (
              <motion.a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.07, duration: 0.4 }}
                className="font-grotesk text-xs font-semibold uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-gold/25 text-gold/70 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                {p.name} →
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="bg-[#0A0A0A] relative overflow-hidden">
        {/* Global slow-moving background orb */}
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 1200, height: 1200, top: "20%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 55%)", filter: "blur(120px)" }} />

        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-gold/[0.07] bg-[#080808] py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            ["Framer Websites", "• Custom Next.js", "AI Chatbots", "• Lead Generation", "SEO & Marketing", "• UK & Worldwide", "Smart Forms", "• Estimator Agents"].map((item, j) => (
              <span key={`${gi}-${j}`} className="font-grotesk text-xs font-medium text-gold/30 uppercase tracking-[0.2em]">{item}</span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-44 bg-[#060606] overflow-hidden text-center">



        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-8 justify-center">
              <span className="w-8 h-px bg-gold" />Your Project Next
            </span>
            <h2 className="font-grotesk font-bold text-[clamp(40px,6vw,88px)] text-cream leading-[0.92] tracking-[-0.04em] mb-6">
              WANT RESULTS<br /><span className="text-gradient-gold">LIKE THESE?</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              Book a free audit — we&apos;ll analyse your current online presence and show you exactly what&apos;s possible for yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact"
                className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
                Book Free Audit →
              </Link>
              <a href="mailto:landscale.agency@gmail.com" className="font-inter text-text-muted/60 text-sm hover:text-gold transition-colors">
                landscale.agency@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
