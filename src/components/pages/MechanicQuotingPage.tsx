"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { MESSENGER_URL } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

export const MECHANIC_DEMO_URL = "https://autoszerviz-mukodo-demo.vercel.app/";

const content = {
  en: {
    eyebrow: "Full Quoting Agent · For Mechanics & Garages",
    h1a: "REAL PRICED QUOTES ",
    h1b: "FROM A VIN.",
    sub: "The customer enters their VIN, your agent finds the exact parts and adds your labour. They get an itemised quote, you get a booking.",
    ctaDemo: "Try the Demo →",
    ctaAction: "Talk to Me About It",
    demoNote: "The demo runs on sample prices. VIN lookup comes with the full build.",
    defTitle: "What Is a Full Quoting Agent for Garages?",
    def: "A full quoting agent is an AI assistant on a garage's website that produces a real, itemised repair or service quote instead of a ballpark estimate. The customer enters their vehicle identification number (VIN) and describes the problem or the service they need. The agent decodes the VIN to identify the exact make, model, engine and year, looks up the correct parts by part number, adds labour using the garage's own hourly rate and job times, and returns an itemised quote the customer can accept. It works for cars, vans, motorbikes and commercial vehicles, and runs 24/7, so the garage stops spending time on the phone pricing jobs by hand.",
    howTitleA: "How the ",
    howTitleB: "Quoting Agent Works",
    steps: [
      { step: "01", title: "Customer Enters the VIN", desc: "Along with a short description of the fault or the service they want, on your website, any time of day." },
      { step: "02", title: "The Exact Vehicle Is Identified", desc: "The VIN tells the agent the precise make, model, engine and year, so there's no guessing which parts fit." },
      { step: "03", title: "Parts and Labour Are Priced", desc: "The right parts are found by part number, and labour is added at your hourly rate and your job times." },
      { step: "04", title: "An Itemised Quote, Ready to Accept", desc: "The customer sees every line of the quote and can accept it. You get their details and the job, already priced." },
    ],
    featTitleA: "Everything ",
    featTitleB: "Included",
    features: [
      { num: "01", title: "VIN-Based Vehicle Lookup", desc: "The exact vehicle from the VIN, not from whatever the customer thinks they drive." },
      { num: "02", title: "Exact Parts by Part Number", desc: "Parts matched to that specific vehicle, so the quote reflects what the job really needs." },
      { num: "03", title: "Your Labour Rates", desc: "Your hourly rate and your job times, not a generic national average." },
      { num: "04", title: "Itemised, Accept-Ready Quotes", desc: "Every part and every hour on the page. No vague ranges, no 'it depends'." },
      { num: "05", title: "All Vehicle Types", desc: "Cars, vans, motorbikes and commercial vehicles." },
      { num: "06", title: "Works 24/7", desc: "Customers get their quote in the evening or at the weekend, while you're under a car or off the clock." },
    ],
    ctaTitleA: "STOP PRICING JOBS",
    ctaTitleB: "ON THE PHONE",
    ctaSub: "Message me on Facebook and I'll show you how the quoting agent would work for your garage.",
    ctaBtn: "Message Me on Facebook →",
  },
  hu: {
    eyebrow: "Teljes Árajánló Ügynök · Autószerelőknek és szervizeknek",
    h1a: "VALÓDI ÁRAJÁNLAT ",
    h1b: "ALVÁZSZÁMBÓL.",
    sub: "Az ügyfél megadja az alvázszámot, az ügynök kikeresi a pontos alkatrészeket és hozzáadja a munkadíjat. Ő tételes árajánlatot kap, te pedig egy munkát.",
    ctaDemo: "Próbáld ki a demót →",
    ctaAction: "Beszéljünk róla",
    demoNote: "A demó mintaárakkal számol. Az alvázszám-keresés a teljes verzió része.",
    defTitle: "Mi az a teljes árajánló ügynök autószervizeknek?",
    def: "A teljes árajánló ügynök egy AI-asszisztens a szerviz weboldalán, ami hasraütéses becslés helyett valódi, tételes javítási vagy szervizárajánlatot ad. Az ügyfél megadja a jármű alvázszámát, és leírja a hibát vagy a kért szervizt. Az ügynök az alvázszámból beazonosítja a pontos gyártmányt, típust, motort és évjáratot, cikkszám alapján kikeresi a megfelelő alkatrészeket, hozzáadja a munkadíjat a szerviz saját óradíjával és normaidejével, majd tételes árajánlatot ad, amit az ügyfél el is tud fogadni. Autóra, kisbuszra, motorra és haszonjárműre is működik, a nap 24 órájában, így a szerviznek nem kell telefonon, kézzel áraznia a munkákat.",
    howTitleA: "Hogyan működik ",
    howTitleB: "az árajánló ügynök",
    steps: [
      { step: "01", title: "Az ügyfél megadja az alvázszámot", desc: "Mellé röviden leírja a hibát vagy a kért szervizt, a weboldaladon, bármikor." },
      { step: "02", title: "Beazonosítja a pontos járművet", desc: "Az alvázszámból kiderül a pontos gyártmány, típus, motor és évjárat, így nincs találgatás, melyik alkatrész passzol." },
      { step: "03", title: "Beárazza az alkatrészt és a munkát", desc: "Cikkszám alapján megtalálja a megfelelő alkatrészeket, a munkadíjat pedig a te óradíjaddal és normaidőddel számolja." },
      { step: "04", title: "Tételes, elfogadható árajánlat", desc: "Az ügyfél minden tételt lát, és el tudja fogadni. Te megkapod az adatait és a már beárazott munkát." },
    ],
    featTitleA: "Minden ",
    featTitleB: "benne van",
    features: [
      { num: "01", title: "Jármű-azonosítás alvázszámból", desc: "A pontos jármű az alvázszámból, nem abból, amit az ügyfél gondol, hogy vezet." },
      { num: "02", title: "Pontos alkatrész cikkszám alapján", desc: "Az adott járműhöz illő alkatrészek, így az ajánlat azt tükrözi, amit a munka tényleg igényel." },
      { num: "03", title: "A saját óradíjad", desc: "A te óradíjad és normaidőd, nem valami országos átlag." },
      { num: "04", title: "Tételes, elfogadható ajánlat", desc: "Minden alkatrész és minden munkaóra látszik. Nincs homályos sáv, nincs „attól függ”." },
      { num: "05", title: "Minden járműtípus", desc: "Autó, kisbusz, motor és haszonjármű." },
      { num: "06", title: "0–24 működik", desc: "Az ügyfél este vagy hétvégén is megkapja az árajánlatot, miközben te épp egy autó alatt fekszel vagy pihensz." },
    ],
    ctaTitleA: "NE TELEFONON",
    ctaTitleB: "ÁRAZD A MUNKÁKAT",
    ctaSub: "Írj nekem Facebookon, és megmutatom, hogyan működne az árajánló ügynök a te szervizedben.",
    ctaBtn: "Írj nekem Messengeren →",
  },
} as const;

export default function MechanicQuotingPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 30% 60%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
          </motion.div>
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(44px,7vw,96px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
              {c.h1a}
              <span className="text-gradient-gold">{c.h1b}</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
            {c.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }} className="flex flex-wrap gap-4">
            <a href={MECHANIC_DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
              {c.ctaDemo}
            </a>
            <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 rounded-full hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
              {c.ctaAction}
            </a>
          </motion.div>
          <p className="font-inter text-xs text-text-muted mt-4">{c.demoNote}</p>
        </div>
      </section>

      {/* GEO, Definition */}
      <section className="py-16 bg-[#080808] border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal>
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />{c.defTitle}
            </span>
            <p className="font-inter text-cream/65 text-base md:text-lg leading-relaxed max-w-3xl">
              {c.def}
            </p>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              {c.howTitleA}<span className="text-gradient-gold">{c.howTitleB}</span>
            </h2>
          </Reveal>
          <div className="space-y-0">
            {c.steps.map((item, i) => (
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
              {c.featTitleA}<span className="text-gradient-gold">{c.featTitleB}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.features.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative bg-[#0D0D0D] border border-white/[0.06] hover:border-gold/50 hover:bg-[#121212] rounded-2xl p-8 h-full flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-4 overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.12)]">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-0 right-3 font-grotesk font-bold text-[88px] leading-none text-white/0 group-hover:text-gold/[0.07] transition-colors duration-500 select-none pointer-events-none tracking-[-0.04em]">{item.num}</div>
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
              {c.ctaTitleA}<br /><span className="text-gradient-gold">{c.ctaTitleB}</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              {c.ctaSub}
            </p>
            <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              {c.ctaBtn}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
