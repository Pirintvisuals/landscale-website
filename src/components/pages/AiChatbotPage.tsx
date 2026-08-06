"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

const SPRING = [0.16, 1, 0.3, 1] as const;

const content = {
  en: {
    eyebrow: "AI Chatbot",
    h1a: "STOP WASTING TIME ON ",
    h1b: "UNQUALIFIED LEADS.",
    sub: "Your AI chatbot qualifies every visitor 24/7, only the right clients ever reach you.",
    ctaDemo: "Get Free Demo →",
    ctaAction: "See It In Action",
    defTitle: "What Is an AI Lead Qualification Chatbot?",
    def: "An AI lead qualification chatbot is a 24/7 automated system that evaluates every visitor to a tradesman's website before they can make contact. The chatbot conducts a structured conversation covering budget, project type, location, and intended start date. Visitors outside the tradesman's service area, below minimum job size, or not ready to proceed are declined automatically with a polite message, the tradesman never sees these enquiries. Qualifying visitors have their full brief forwarded to the tradesman's inbox instantly: name, phone number, email, project description, budget, and postcode. The tool operates around the clock and typically increases the proportion of qualified to unqualified enquiries by 300%.",
    howTitleA: "How the ",
    howTitleB: "Chatbot Works",
    steps: [
      { step: "01", title: "Visitor Arrives on Your Site", desc: "The AI greets them immediately and starts a natural conversation, even at 2am when you're off the tools." },
      { step: "02", title: "AI Qualifies the Lead", desc: "Budget, project type, location, and timeline, the chatbot asks the right questions and makes a decision." },
      { step: "03", title: "Bad Fit? Declined Politely", desc: "Wrong area, wrong budget, or just browsing? The AI declines gracefully. You never hear about it." },
      { step: "04", title: "Good Fit? Straight to You", desc: "Serious leads arrive in your inbox with their full brief, budget, and contact details attached." },
    ],
    featTitleA: "Everything ",
    featTitleB: "Included",
    features: [
      { num: "01", title: "24/7 Lead Qualification", desc: "Never miss a lead. The chatbot is always on, qualifying visitors while you focus on the work." },
      { num: "02", title: "Budget & Location Check", desc: "Filters out leads outside your area or below your minimum job size before they waste your time." },
      { num: "03", title: "Automatic Lead Scoring", desc: "Every lead is scored based on your criteria. High scorers get fast-tracked straight to you." },
      { num: "04", title: "Polite Decline for Bad Fits", desc: "Unqualified visitors are declined professionally, protecting your time without burning bridges." },
      { num: "05", title: "Instant SMS & Email Alerts", desc: "The moment a qualified lead comes in, you get a full brief delivered to your phone." },
      { num: "06", title: "Zero Junk Leads", desc: "Only pre-vetted, serious enquiries reach you. Your inbox stays clean." },
    ],
    ctaTitleA: "SEE THE CHATBOT",
    ctaTitleB: "IN ACTION",
    ctaSub: "Book a free demo and we'll show you exactly how the AI chatbot would work for your business.",
    ctaBtn: "Book Free Demo →",
  },
  hu: {
    eyebrow: "AI Chatbot",
    h1a: "NE PAZAROLD AZ IDŐDET ",
    h1b: "KOMOLYTALAN ÉRDEKLŐDŐKRE.",
    sub: "Az AI chatbotod 0–24 minősít minden látogatót, így már csak a megfelelő ügyfelek jutnak el hozzád.",
    ctaDemo: "Kérj ingyenes demót →",
    ctaAction: "Nézd meg működés közben",
    defTitle: "Mi az az AI érdeklődő-minősítő chatbot?",
    def: "Az AI érdeklődő-minősítő chatbot egy 0–24 működő automata rendszer, ami a vállalkozó weboldalának minden látogatóját felméri, mielőtt kapcsolatba léphetne. A chatbot strukturált beszélgetést folytat a büdzséről, a projekt típusáról, a helyszínről és a tervezett kezdési időpontról. A szolgáltatási területen kívüli, a minimális munkaméret alatti vagy még nem döntésképes látogatókat automatikusan, udvarias üzenettel elutasítja, ezeket a vállalkozó soha nem is látja. A megfelelő látogatók teljes leírását azonnal a vállalkozó postaládájába továbbítja: név, telefonszám, e-mail, projektleírás, büdzsé és irányítószám. Az eszköz éjjel-nappal működik, és jellemzően 300%-kal növeli a minőségi érdeklődések arányát a komolytalanokhoz képest.",
    howTitleA: "Hogyan működik ",
    howTitleB: "a chatbot",
    steps: [
      { step: "01", title: "A látogató az oldaladra érkezik", desc: "Az AI azonnal köszönti, és természetes beszélgetést kezd vele, akár hajnali 2-kor is, amikor épp nem érsz rá." },
      { step: "02", title: "Az AI minősíti az érdeklődőt", desc: "Büdzsé, projekttípus, helyszín és határidő, a chatbot felteszi a megfelelő kérdéseket, és dönt." },
      { step: "03", title: "Nem passzol? Udvarias elutasítás", desc: "Rossz terület, rossz büdzsé, vagy csak nézelődik? Az AI elegánsan elutasítja. Te soha nem is hallasz róla." },
      { step: "04", title: "Passzol? Egyből hozzád kerül", desc: "A komoly érdeklődők a postaládádba érkeznek, csatolva a teljes leírásukkal, büdzséjükkel és elérhetőségükkel." },
    ],
    featTitleA: "Minden ",
    featTitleB: "benne van",
    features: [
      { num: "01", title: "0–24 érdeklődő-minősítés", desc: "Egyetlen érdeklődő sem vész el. A chatbot mindig aktív, minősíti a látogatókat, miközben te a munkára figyelsz." },
      { num: "02", title: "Büdzsé- és helyszín-ellenőrzés", desc: "Kiszűri a területeden kívüli vagy a minimális munkaméret alatti érdeklődőket, mielőtt elrabolnák az idődet." },
      { num: "03", title: "Automatikus lead-pontozás", desc: "Minden érdeklődő pontszámot kap a kritériumaid alapján. A legjobbak egyből, gyorsított úton jutnak hozzád." },
      { num: "04", title: "Udvarias elutasítás, ha nem passzol", desc: "A nem megfelelő látogatókat profin utasítja el, megvédi az idődet anélkül, hogy bárkit megbántana." },
      { num: "05", title: "Azonnali SMS- és e-mail-értesítés", desc: "Amint minőségi érdeklődő érkezik, a teljes leírás egyből a telefonodra kerül." },
      { num: "06", title: "Nulla felesleges érdeklődő", desc: "Csak előre megszűrt, komoly megkeresések jutnak el hozzád. A postaládád tiszta marad." },
    ],
    ctaTitleA: "NÉZD MEG A CHATBOTOT",
    ctaTitleB: "MŰKÖDÉS KÖZBEN",
    ctaSub: "Foglalj egy ingyenes demót, és pontosan megmutatjuk, hogyan működne az AI chatbot a te vállalkozásodnál.",
    ctaBtn: "Foglalj ingyenes demót →",
  },
} as const;

export default function AiChatbotPage({ lang }: { lang: Locale }) {
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
            <Link href={localize("/contact", lang)} className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
              {c.ctaDemo}
            </Link>
            <Link href={localize("/case-studies", lang)} className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 rounded-full hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
              {c.ctaAction}
            </Link>
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
            <Link href={localize("/contact", lang)} className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              {c.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
