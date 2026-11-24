"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Database, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { CALENDLY_URL } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

const content = {
  en: {
    eyebrow: "New · AI Receptionist",
    h1a: "EVERY CALL ANSWERED. ",
    h1b: "EVERY CALL LOGGED.",
    sub: "An AI receptionist that picks up your phone, checks your CRM to tell customers where their order stands, answers the routine questions, and writes every call back into the CRM.",
    ctaMain: "Book a Free Call →",
    ctaNote: "Currently being set up for an insulation company that gets up to 40 calls a day.",
    call: {
      title: "Incoming call", live: "Live",
      lines: [
        { who: "caller", text: "Hi, I ordered last week. Can you tell me when you're coming?" },
        { who: "ai", text: "Of course. What name was the order under?" },
        { who: "caller", text: "Peter Smith." },
        { who: "ai", text: "Found it. The job starts next Tuesday at 8am, and the team will call you the day before." },
      ],
      crm: "CRM updated", crmNote: "Call logged · Order status · Peter Smith",
    },
    defTitle: "What Is an AI Receptionist?",
    def: "An AI receptionist is a voice assistant that answers your business phone. It's connected to your CRM, so it can look up a customer's order and tell them where it stands, answer the questions you get every day (opening hours, prices, what happens next), take down new enquiries, and pass the call to a person when it needs one. After every call it writes a summary of what the caller wanted back into the CRM, so nothing depends on someone remembering to log it. It's built for businesses that get dozens of calls a day, most of them about the same few things.",
    featTitleA: "What It ",
    featTitleB: "Handles",
    features: [
      { num: "01", title: "Answers every call", desc: "Day or night, the fortieth call as patiently as the first. No voicemail, no missed calls." },
      { num: "02", title: "Reads from your CRM", desc: "Order status, appointment times, what was agreed. It looks it up instead of making the customer wait for a callback." },
      { num: "03", title: "Writes back to your CRM", desc: "Every call is logged with who called and what they needed, without anyone typing it in." },
      { num: "04", title: "Handles the routine questions", desc: "Opening hours, service area, how the process works, what to prepare. The questions your team answers ten times a day." },
      { num: "05", title: "Takes new enquiries", desc: "Collects the details of a new job and puts them in the CRM, ready for your team to follow up." },
      { num: "06", title: "Knows when to hand over", desc: "Complaints, complex jobs, anything that needs a person goes straight to the right colleague." },
    ],
    ctaTitleA: "STOP LOSING THE DAY",
    ctaTitleB: "TO THE PHONE",
    ctaSub: "Book a short call. Tell me what your calls are usually about and which CRM you use, and I'll show you what the receptionist could take off your team.",
    ctaBtn: "Book a Free Call →",
  },
  hu: {
    eyebrow: "Új · AI recepciós",
    h1a: "MINDEN HÍVÁS FELVÉVE. ",
    h1b: "MINDEN HÍVÁS RÖGZÍTVE.",
    sub: "AI recepciós, amely felveszi a telefont, a CRM-ből megmondja az ügyfélnek, hol tart a rendelése, megválaszolja a visszatérő kérdéseket, és minden hívást visszaír a CRM-be.",
    ctaMain: "Foglalj időpontot →",
    ctaNote: "Jelenleg egy szigeteléssel foglalkozó cégnél állítjuk be, ahová naponta akár 40 hívás is érkezik.",
    call: {
      title: "Bejövő hívás", live: "Élő",
      lines: [
        { who: "caller", text: "Jó napot! Múlt héten rendeltem, meg tudná mondani, mikor jönnek?" },
        { who: "ai", text: "Persze. Kinek a nevére szól a rendelés?" },
        { who: "caller", text: "Kovács Péter." },
        { who: "ai", text: "Megvan. A munka jövő kedden reggel 8-kor kezdődik, és a kollégák előtte nap telefonon is jelentkeznek." },
      ],
      crm: "CRM frissítve", crmNote: "Hívás rögzítve · Rendelés állapota · Kovács Péter",
    },
    defTitle: "Mi az az AI recepciós?",
    def: "Az AI recepciós egy hangalapú asszisztens, amely felveszi a céged telefonját. Össze van kötve a CRM-eddel, így meg tudja nézni egy ügyfél rendelését, és megmondja, hol tart. Megválaszolja a mindennap visszatérő kérdéseket (nyitvatartás, árak, mi a következő lépés), felveszi az új megkereséseket, és ha kell, átadja a hívást egy kollégának. Minden hívás után összefoglalót ír a CRM-be arról, mit szeretett volna a hívó, így semmi nem múlik azon, hogy valaki eszébe jut-e rögzíteni. Azoknak a cégeknek készül, ahová naponta több tucat hívás érkezik, és a legtöbb ugyanarról a néhány dologról szól.",
    featTitleA: "Mit ",
    featTitleB: "intéz el?",
    features: [
      { num: "01", title: "Minden hívást felvesz", desc: "Éjjel-nappal, a negyvenedik hívásnál is ugyanolyan türelemmel, mint az elsőnél. Nincs hangposta, nincs elmaradt hívás." },
      { num: "02", title: "Olvas a CRM-ből", desc: "Rendelés állapota, időpont, megbeszélt részletek. Utánanéz, ahelyett hogy az ügyfél visszahívásra várna." },
      { num: "03", title: "Ír a CRM-be", desc: "Minden hívás rögzítve: ki hívott, és mire volt szüksége. Senkinek nem kell begépelnie." },
      { num: "04", title: "Megválaszolja a visszatérő kérdéseket", desc: "Nyitvatartás, szolgáltatási terület, a folyamat menete, mire kell készülni. Amit a kollégáid naponta tízszer elmondanak." },
      { num: "05", title: "Felveszi az új megkereséseket", desc: "Bekéri az új munka adatait, és beírja a CRM-be, hogy a csapatod fel tudja venni a fonalat." },
      { num: "06", title: "Tudja, mikor kell ember", desc: "Panasz, összetett munka, bármi, amihez ember kell: egyenesen a megfelelő kollégához kerül." },
    ],
    ctaTitleA: "NE A TELEFON",
    ctaTitleB: "VIGYE EL A NAPOD",
    ctaSub: "Foglalj egy rövid hívást. Mondd el, miről szólnak általában a hívásaid, és milyen CRM-et használtok, én pedig megmutatom, mit tudna levenni a csapatod válláról a recepciós.",
    ctaBtn: "Foglalj időpontot →",
  },
} as const;

type CallDict = (typeof content)[Locale]["call"];

/** Scripted call: lines appear one by one, then the CRM update. Loops. */
function CallVisual({ c }: { c: CallDict }) {
  const [step, setStep] = useState(0);
  const total = c.lines.length + 2;
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % total), step === total - 1 ? 3000 : 1700);
    return () => clearTimeout(t);
  }, [step, total]);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-5 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#D4AF37 0%,#B8941F 100%)" }}>
            <PhoneCall size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </div>
          <p className="font-grotesk font-bold text-[12px] text-[#F5F1E8]/90">{c.title}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[10px] text-emerald-400">{c.live}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2.5 justify-end">
        <AnimatePresence>
          {c.lines.slice(0, Math.min(step, c.lines.length)).map((l, i) => (
            <motion.div key={`${i}-${l.text}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 font-inter text-[12px] leading-snug ${l.who === "ai" ? "self-start text-[#F5F1E8]/85" : "self-end text-[#0A0A0A]"}`}
              style={l.who === "ai"
                ? { background: "rgba(245,241,232,0.05)", border: "1px solid rgba(245,241,232,0.08)" }
                : { background: "#D4AF37" }}>
              {l.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {step === total - 1 && (
            <motion.div key="crm" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.35)" }}>
              <Database size={14} className="text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-grotesk font-bold text-[11px] text-emerald-400 flex items-center gap-1">{c.crm} <Check size={11} strokeWidth={3} /></p>
                <p className="font-inter text-[10px] text-[#F5F1E8]/55">{c.crmNote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AiReceptionistPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  return (
    <>
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 30% 60%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
            </motion.div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(40px,6vw,88px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
                {c.h1a}<span className="text-gradient-gold">{c.h1b}</span>
              </motion.h1>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
              {c.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }}>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
                {c.ctaMain}
              </a>
              <p className="font-inter text-xs text-text-muted mt-4">{c.ctaNote}</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: SPRING }}
            className="w-full h-[440px] bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.07)] flex flex-col">
            <CallVisual c={c.call} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#080808] border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal>
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />{c.defTitle}
            </span>
            <p className="font-inter text-cream/65 text-base md:text-lg leading-relaxed max-w-3xl">{c.def}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              {c.featTitleA}<span className="text-gradient-gold">{c.featTitleB}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.features.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative bg-[#0D0D0D] border border-white/[0.06] hover:border-gold/50 rounded-2xl p-8 h-full flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1">
                  <span className="font-grotesk font-bold text-[11px] uppercase tracking-[0.25em] text-gold/60">{item.num}</span>
                  <h3 className="font-grotesk font-bold text-lg text-cream">{item.title}</h3>
                  <p className="font-inter text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0D0D0D] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,64px)] text-cream leading-[0.95] tracking-[-0.03em] mb-6">
              {c.ctaTitleA}<br /><span className="text-gradient-gold">{c.ctaTitleB}</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">{c.ctaSub}</p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              {c.ctaBtn}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
