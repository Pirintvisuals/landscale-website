"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { MESSENGER_URL } from "@/content/ui";
import { GarageVisual } from "@/components/ui/garage-visual";

const SPRING = [0.16, 1, 0.3, 1] as const;

export const MECHANIC_DEMO_URL = "https://autoszerviz-mukodo-demo.vercel.app/";

const content = {
  en: {
    eyebrow: "Quote Builder · For Mechanics & Garages",
    h1a: "ITEMISED QUOTES ",
    h1b: "IN MINUTES.",
    sub: "You enter the VIN and pick the job. It finds the exact parts, asks what it needs to know, adds your labour and hands you a PDF quote, priced the way your workshop prices.",
    ctaDemo: "Try the Demo →",
    ctaAction: "Talk to Me About It",
    demoNote: "The demo runs on sample prices, without VIN lookup. During a 30-day pilot we set it up with your own data.",
    defTitle: "What Is a Quote Builder for Garages?",
    def: "A quote builder is a tool your mechanics or service desk use to price a repair or service job. You enter the vehicle identification number (VIN) and pick the job, for example brake pads and discs. The tool identifies the exact make, model and engine, lists the parts that job needs on that vehicle, and recommends one from the brands you use. Where the vehicle data alone can't decide, such as the disc diameter, it asks instead of guessing. It adds the extras the job usually needs, your parts prices, your hourly rate and VAT, and produces an itemised quote you can print or send as a PDF. When you correct a price, it remembers it for next time. Every setup is built around one garage: its brands, its prices, its labour rate and the jobs it quotes every week.",
    howTitleA: "How the ",
    howTitleB: "Quote Builder Works",
    steps: [
      { step: "01", title: "Enter the VIN", desc: "The exact make, model and engine come from the VIN, so there's no guessing which parts fit." },
      { step: "02", title: "Pick the Job", desc: "Oil change, service, timing belt, brakes, clutch. The jobs you price every week, set up as one-click tiles." },
      { step: "03", title: "Check the Parts", desc: "It recommends a part from your brands and shows every other option if you want them. If something can't be decided from the VIN, like the disc size, it asks." },
      { step: "04", title: "Send the Quote", desc: "Parts, extras, labour at your rate and VAT, totalled. Add the customer's name and reg, then print it or send it as a PDF." },
    ],
    featTitleA: "Everything ",
    featTitleB: "Included",
    features: [
      { num: "01", title: "VIN-Based Vehicle Lookup", desc: "The exact vehicle from the VIN, not the closest match." },
      { num: "02", title: "Recommends Your Brands", desc: "Your preferred brands first, with every other matching part one click away." },
      { num: "03", title: "Asks Instead of Guessing", desc: "When the vehicle data can't decide, it asks, so the quote doesn't miss anything." },
      { num: "04", title: "Your Prices, Your Labour Rate", desc: "Your parts prices, your markup and your hourly rate. Nothing generic." },
      { num: "05", title: "Remembers Your Corrections", desc: "Change a price once and it uses your price for that part next time." },
      { num: "06", title: "Itemised PDF Quote", desc: "Every part and every hour on the page, ready to print or send to the customer." },
    ],
    ctaTitleA: "STOP PRICING JOBS",
    ctaTitleB: "BY HAND",
    ctaSub: "Message me on Facebook and I'll show you how the quote builder would work with your brands and your prices.",
    ctaBtn: "Message Me on Facebook →",
  },
  hu: {
    eyebrow: "Árajánlat-készítő · Autószerelőknek és szervizeknek",
    h1a: "TÉTELES ÁRAJÁNLAT ",
    h1b: "PERCEK ALATT.",
    sub: "Beírod az alvázszámot és kiválasztod a munkát. Megkeresi a pontos alkatrészeket, rákérdez, amire kell, hozzáadja a munkadíjat, és kész PDF-árajánlatot ad, úgy beárazva, ahogy a te műhelyed áraz.",
    ctaDemo: "Próbáld ki a demót →",
    ctaAction: "Beszéljünk róla",
    demoNote: "A demó mintaárakkal, alvázszám-keresés nélkül működik. A 30 napos próbaidőszakban a saját adataiddal állítjuk be.",
    defTitle: "Mi az az árajánlat-készítő autószervizeknek?",
    def: "Az árajánlat-készítő egy eszköz, amivel a szerelők vagy a szervizpult beárazzák a javítási és szervizmunkákat. Beírod a jármű alvázszámát, és kiválasztod a munkát, például a fékbetét- és féktárcsacserét. Az eszköz beazonosítja a pontos gyártmányt, típust és motort, kilistázza az adott munkához szükséges, erre az autóra illő alkatrészeket, és a te márkáidból ajánl egyet. Ahol a jármű adataiból valami nem dönthető el, például a tárcsa átmérője, ott rákérdez ahelyett, hogy találgatna. Hozzáadja a munkához szokásos tételeket, a te alkatrészáraidat, az óradíjadat és az ÁFA-t, majd tételes árajánlatot készít, amit kinyomtathatsz vagy PDF-ben elküldhetsz. Ha kijavítasz egy árat, legközelebb már azzal számol. Minden rendszert egy szervizre szabunk: a márkáira, az áraira, az óradíjára és azokra a munkákra, amiket hetente áraz.",
    howTitleA: "Hogyan működik ",
    howTitleB: "az árajánlat-készítő",
    steps: [
      { step: "01", title: "Beírod az alvázszámot", desc: "Az alvázszámból kiderül a pontos gyártmány, típus és motor, így nincs találgatás, melyik alkatrész passzol." },
      { step: "02", title: "Kiválasztod a munkát", desc: "Olajcsere, szerviz, vezérműszíj, fék, kuplung. A munkák, amiket hetente árazol, egy kattintásra." },
      { step: "03", title: "Átnézed az alkatrészeket", desc: "A te márkáidból ajánl egyet, de ha kell, minden más opciót is megmutat. Ha valami nem dönthető el az alvázszámból, például a tárcsaméret, rákérdez." },
      { step: "04", title: "Elküldöd az ajánlatot", desc: "Alkatrész, mellé járó tételek, munkadíj a te óradíjaddal és ÁFA, összesítve. Beírod az ügyfél nevét és a rendszámot, aztán kinyomtatod vagy PDF-ben elküldöd." },
    ],
    featTitleA: "Minden ",
    featTitleB: "benne van",
    features: [
      { num: "01", title: "Jármű-azonosítás alvázszámból", desc: "A pontos jármű az alvázszámból, nem a legközelebbi találat." },
      { num: "02", title: "A te márkáidat ajánlja", desc: "Elöl a kedvenc márkáid, minden más illő alkatrész egy kattintásra." },
      { num: "03", title: "Rákérdez, nem találgat", desc: "Ha a jármű adataiból valami nem dönthető el, megkérdezi, így semmi nem marad ki az ajánlatból." },
      { num: "04", title: "A te áraid, a te óradíjad", desc: "A te alkatrészáraid, a te árrésed és a te óradíjad. Semmi általános." },
      { num: "05", title: "Megjegyzi a javításaidat", desc: "Ha egyszer átírsz egy árat, legközelebb azzal számol az adott alkatrésznél." },
      { num: "06", title: "Tételes PDF-árajánlat", desc: "Minden alkatrész és minden munkaóra látszik, nyomtatásra vagy az ügyfélnek küldésre készen." },
    ],
    ctaTitleA: "NE KÉZZEL",
    ctaTitleB: "ÁRAZD A MUNKÁKAT",
    ctaSub: "Írj nekem Facebookon, és megmutatom, hogyan működne az árajánlat-készítő a te márkáiddal és a te áraiddal.",
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
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
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
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: SPRING }}
            className="w-full h-[520px] bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.07)] flex flex-col">
            <GarageVisual lang={lang} />
          </motion.div>
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
