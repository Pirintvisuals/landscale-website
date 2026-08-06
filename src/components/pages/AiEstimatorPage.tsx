"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

const SPRING = [0.16, 1, 0.3, 1] as const;

const content = {
  en: {
    eyebrow: "AI Estimator Agent",
    h1a: "INSTANT QUOTES. ",
    h1b: "NO PHONE CALL NEEDED.",
    sub: "A visitor asks for a quote. The AI asks the right questions and gives an accurate estimate, immediately, 24/7.",
    ctaDemo: "Get Free Demo →",
    ctaAction: "See It In Action",
    defTitle: "What Is an AI Estimator Agent?",
    def: "An AI Estimator Agent is a chat widget that integrates into a tradesman's website and delivers instant, accurate price estimates without a phone call. When a visitor requests a quote, the agent asks project-specific questions, covering scope, area size, materials, postcode, and access requirements, then produces a structured, line-item estimate in under two seconds. Contact details are only collected after the estimate is displayed, so every enquiry comes from a price-aware, serious buyer. The result: tradesmen save 15–20 hours per week on preliminary quote calls and receive fewer, better-quality enquiries.",
    liveEyebrow: "Live In Production",
    liveTitleA: "Not a concept.",
    liveTitleB: "It's already live.",
    liveBody: "NM Bau, a renovation company on the Hungary–Austria border, runs a Landscale AI estimator right now. Visitors describe their bathroom or full-property renovation, and the agent returns an instant preliminary estimate, 24/7, in three languages (HU / EN / DE). Go and try it yourself.",
    liveBodyStrong1: "NM Bau",
    liveBodyStrong2: "three languages (HU / EN / DE)",
    liveTags: ["Live AI quoting agent", "Trilingual HU / EN / DE", "100/100 SEO", "Self-managed blog"],
    liveTryBtn: "Try It Live on nmbau.hu →",
    liveCaseBtn: "Full Case Study",
    liveImgAlt: "NM Bau, live AI quoting system in production",
    liveImgTag2: "AI Quoting System · Live",
    howTitleA: "How the ",
    howTitleB: "Estimator Works",
    steps: [
      { step: "01", title: "Visitor Requests a Quote", desc: "Someone lands on your site and asks for a price. The AI engages them immediately, even at 2am." },
      { step: "02", title: "Smart Project Questions", desc: "It asks about scope, area size, materials, postcode, and site access, specific to the type of job." },
      { step: "03", title: "Instant Line-Item Estimate", desc: "A detailed estimate is delivered on the spot, before they've given their contact details." },
      { step: "04", title: "Contact Details Collected", desc: "Only after seeing the estimate do they provide their info, so you only hear from serious buyers." },
    ],
    featTitleA: "Everything ",
    featTitleB: "Included",
    features: [
      { num: "01", title: "24/7 Availability", desc: "The estimator works around the clock. Visitors get instant quotes whether you're on a job or asleep." },
      { num: "02", title: "Project-Specific Questions", desc: "Patio, lawn, landscaping, fencing, different questions for different jobs so the estimate is accurate." },
      { num: "03", title: "Instant Line-Item Breakdown", desc: "Not a vague range, a structured estimate with clear line items, delivered in under 2 seconds." },
      { num: "04", title: "Postcode & Site Checks", desc: "Checks coverage area and site access before investing time in a full quote." },
      { num: "05", title: "Contact Collected After Quote", desc: "Visitors provide details after seeing the estimate, pre-filtering out anyone not serious." },
      { num: "06", title: "Saves 15–20 hrs/week", desc: "No more back-and-forth quote calls. Leads arrive ready to book." },
    ],
    ctaTitleA: "SEE THE ESTIMATOR",
    ctaTitleB: "IN ACTION",
    ctaSub: "Book a free demo and we'll show you exactly how the AI estimator would work on your site.",
    ctaBtn: "Book Free Demo →",
  },
  hu: {
    eyebrow: "AI Árajánló Ügynök",
    h1a: "AZONNALI ÁRAJÁNLAT. ",
    h1b: "TELEFONHÍVÁS NÉLKÜL.",
    sub: "A látogató árajánlatot kér. Az AI felteszi a megfelelő kérdéseket, és pontos becslést ad, azonnal, a nap 24 órájában.",
    ctaDemo: "Kérj ingyenes demót →",
    ctaAction: "Nézd meg működés közben",
    defTitle: "Mi az az AI Árajánló Ügynök?",
    def: "Az AI Árajánló Ügynök egy csevegő widget, ami beépül a vállalkozó weboldalába, és telefonhívás nélkül ad azonnali, pontos árbecslést. Amikor a látogató árajánlatot kér, az ügynök projektspecifikus kérdéseket tesz fel, a munka jellege, a terület mérete, az anyagok, az irányítószám és a helyszín megközelíthetősége alapján, majd két másodpercen belül strukturált, tételes becslést készít. Az elérhetőséget csak azután kéri be, hogy a becslés már megjelent, így minden megkeresés árérzékeny, komoly megrendelőtől érkezik. Az eredmény: a vállalkozó heti 15–20 órát spórol az előzetes árajánló hívásokon, és kevesebb, de jobb minőségű érdeklődést kap.",
    liveEyebrow: "Élesben működik",
    liveTitleA: "Nem elmélet.",
    liveTitleB: "Már élesben fut.",
    liveBody: "Az NM Bau, egy magyar–osztrák határ menti felújító cég, épp most használ egy Landscale AI árajánlót. A látogatók leírják a fürdőszoba- vagy teljes ingatlanfelújításukat, az ügynök pedig azonnali előzetes becslést ad, a nap 24 órájában, három nyelven (HU / EN / DE). Nézd meg te is.",
    liveBodyStrong1: "NM Bau",
    liveBodyStrong2: "három nyelven (HU / EN / DE)",
    liveTags: ["Éles AI árajánló ügynök", "Háromnyelvű: HU / EN / DE", "100/100 SEO", "Önállóan kezelt blog"],
    liveTryBtn: "Próbáld ki élesben: nmbau.hu →",
    liveCaseBtn: "Teljes esettanulmány",
    liveImgAlt: "NM Bau, éles, működő AI árajánló rendszer",
    liveImgTag2: "AI árajánló rendszer · Élesben",
    howTitleA: "Hogyan működik ",
    howTitleB: "az árajánló",
    steps: [
      { step: "01", title: "A látogató árajánlatot kér", desc: "Valaki az oldaladra érkezik és árat kér. Az AI azonnal foglalkozni kezd vele, akár hajnali 2-kor is." },
      { step: "02", title: "Okos, projektre szabott kérdések", desc: "Rákérdez a munka jellegére, a terület méretére, az anyagokra, az irányítószámra és a helyszín megközelíthetőségére, a munkatípusra szabva." },
      { step: "03", title: "Azonnali, tételes becslés", desc: "A részletes becslés a helyszínen elkészül, még mielőtt megadták volna az elérhetőségüket." },
      { step: "04", title: "Elérhetőség bekérése", desc: "Csak a becslés megtekintése után adják meg az adataikat, így már csak a komoly megrendelők keresnek meg." },
    ],
    featTitleA: "Minden ",
    featTitleB: "benne van",
    features: [
      { num: "01", title: "0–24 elérhetőség", desc: "Az árajánló éjjel-nappal dolgozik. A látogatók azonnal kapnak árat, akár munkában vagy, akár alszol." },
      { num: "02", title: "Projektre szabott kérdések", desc: "Terasz, gyep, tereprendezés, kerítés, más munkához más kérdések, hogy a becslés pontos legyen." },
      { num: "03", title: "Azonnali, tételes bontás", desc: "Nem homályos ártartomány, strukturált becslés világos tételekkel, 2 másodpercen belül." },
      { num: "04", title: "Irányítószám- és helyszín-ellenőrzés", desc: "Ellenőrzi a lefedettségi területet és a helyszín megközelíthetőségét, mielőtt teljes árajánlatra fordítana időt." },
      { num: "05", title: "Elérhetőség az árajánlat után", desc: "A látogatók a becslés megtekintése után adják meg az adataikat, előre kiszűrve azokat, akik nem komolyak." },
      { num: "06", title: "Heti 15–20 óra megtakarítás", desc: "Nincs többé oda-vissza árajánló hívás. Az érdeklődők már foglalásra készen érkeznek." },
    ],
    ctaTitleA: "NÉZD MEG AZ ÁRAJÁNLÓT",
    ctaTitleB: "MŰKÖDÉS KÖZBEN",
    ctaSub: "Foglalj egy ingyenes demót, és pontosan megmutatjuk, hogyan működne az AI árajánló a te oldaladon.",
    ctaBtn: "Foglalj ingyenes demót →",
  },
} as const;

export default function AiEstimatorPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 70% 40%, #D4AF37 0%, transparent 55%)" }} />
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

      {/* Live Proof, NM Bau */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 30%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                {c.liveEyebrow}
              </span>
              <h2 className="font-grotesk font-bold text-[clamp(30px,4vw,52px)] text-cream tracking-[-0.02em] leading-[0.95] mb-5">
                {c.liveTitleA}<br /><span className="text-gradient-gold">{c.liveTitleB}</span>
              </h2>
              <p className="font-inter text-cream/65 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                {c.liveBody}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {c.liveTags.map((t) => (
                  <span key={t} className="font-inter text-xs text-cream/60 border border-white/[0.08] hover:border-gold/30 hover:text-gold/80 px-3 py-1.5 rounded-full transition-all duration-200">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.nmbau.hu/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
                  {c.liveTryBtn}
                </a>
                <Link href={localize("/case-studies", lang)} className="inline-flex items-center gap-2 border border-cream/20 text-cream font-grotesk font-medium text-sm px-8 py-4 rounded-full hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300">
                  {c.liveCaseBtn}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="https://www.nmbau.hu/" target="_blank" rel="noopener noreferrer" className="block relative group">
                <div className="absolute -inset-px rounded-2xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.4), transparent 60%)", borderRadius: "inherit" }} />
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111] rounded-2xl border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <Image src="/images/case-studies/nmbau.png" alt={c.liveImgAlt} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-gold/20 text-gold/80">Sopron · Burgenland</span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between z-10">
                    <span className="font-grotesk font-bold text-cream text-sm">NM Bau</span>
                    <span className="font-grotesk text-[10px] font-semibold uppercase tracking-[0.15em] text-gold/60">{c.liveImgTag2}</span>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
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
