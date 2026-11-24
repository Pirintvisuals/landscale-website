"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Shield, BarChart3, Hammer, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { EMAIL, CALENDLY_URL } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

const valueIcons = [Shield, BarChart3, Hammer, TrendingUp];

const content = {
  en: {
    eyebrow: "About Landscale",
    h1: ["NOT YOUR TYPICAL", "MARKETING AGENCY."],
    heroSub: "AI quoting assistants, AI receptionists and plan-checking tools for trade, construction and service businesses, built around how each business actually works.",
    storyEyebrow: "The Founder",
    storyTitleA: "WHY I BUILD",
    storyTitleB: "THESE TOOLS",
    storyTitleMid: "",
    storyQuote: "“I'm Milán Pirint, founder of Landscale. AI has fascinated me since long before everyone started talking about it.”",
    storyP1: "I'm Milán, the founder of Landscale. Artificial intelligence has fascinated me for as long as I can remember, and I kept asking the same question: which part of a real business's day could it actually take over?",
    storyP2: "Again and again, the answer was quoting and admin. Tradespeople answering the same price questions every evening. Office staff picking up forty phone calls a day about order status. Estimators re-measuring a whole plan set by hand before a fixed-price bid.",
    storyP3: "That work is slow, repetitive and easy to get wrong, and it's rarely what the business is actually good at. It's also exactly the kind of work AI does well, if it's set up around the business and not the other way round.",
    storyP4: "So that's what Landscale builds: quoting assistants that give customers an estimate on the website, AI receptionists that answer the phone and update the CRM, and tools that read plans and tender packages and flag what doesn't add up.",
    storyP5: "Every project starts from how you already work: your jobs, your prices, your process. The goal is never to replace your judgement. It's to give you back the hours you spend on the parts that don't need it.",
    photoCaption: "Milán Pirint",
    photoRole: "Founder, Landscale",
    storyP6: "You deal with me directly, from the first call through launch and after it. If something isn't working, you know exactly who to call.",
    procEyebrow: "How I Work",
    procTitleA: "MY ",
    procTitleB: "PROCESS",
    process: [
      { step: "01", title: "Discovery Call", desc: "We talk about your business, how you work today and where the time goes. Then I show you what could be automated, free and with no obligation." },
      { step: "02", title: "Custom Proposal", desc: "Based on your needs and budget, you get in writing what I'll build, how long it takes and what it costs. You decide what makes sense. No surprises." },
      { step: "03", title: "Build & Collaborate", desc: "I build your website or AI automation with regular check-ins and previews. Your feedback shapes the final product, full transparency throughout." },
      { step: "04", title: "Launch & Support", desc: "I handle the technical launch, train you on how to use your site, and stay available for ongoing support. You focus on running your business." },
    ],
    diffEyebrow: "Why Different",
    diffTitleA: "WHAT MAKES",
    diffTitleB: "DIFFERENT",
    diffTitleMid: "US ",
    diffSub: "Built around your business, honest about what AI can and can't do, and measured on time saved.",
    pillars: [
      { num: "01", title: "Built Around Your Business", desc: "Before I build anything, I learn how you actually work: the jobs you quote, the questions you get, the prices you use, the software you already have. The tool fits your process, not the other way round.", detail: "No templates. Every assistant is set up with your own jobs, prices and wording." },
      { num: "02", title: "Tech-Forward Approach", desc: "I use the latest AI and automation tools, not because it's trendy, but because it genuinely solves real problems. Lead qualification, automated estimates, 24/7 chatbots.", detail: "I stay ahead so you don't have to. You get the tools, without the headache." },
      { num: "03", title: "Results-Driven, Always", desc: "I don't measure success by impressions or clicks. Qualified leads and revenue generated. Every strategy has a clear ROI goal, I hold myself accountable.", detail: "If something isn't working, I change it. I'm invested in your growth." },
    ],
    valEyebrow: "Core Principles",
    valTitleA: "OUR ",
    valTitleB: "VALUES",
    values: [
      { title: "Honesty First", desc: "I tell you what you need to hear, not what you want to hear. If something won't work, I'll say so." },
      { title: "No Vanity Metrics", desc: "I don't celebrate page views or follower counts. I celebrate leads generated and revenue grown." },
      { title: "One Clear Focus", desc: "I work on one problem: the time businesses lose to quoting, calls and admin. Staying focused on that is what lets me do it properly." },
      { title: "Long-Term Thinking", desc: "I build strategies for sustainable growth, not quick wins that collapse in 6 months." },
    ],
    faqEyebrow: "FAQ",
    faqTitleA: "FREQUENTLY ASKED",
    faqTitleB: "QUESTIONS",
    faqs: [
      { q: "How long does it take to build a website?", a: "Depends on the project. A Framer template customisation can be done in 1–2 weeks. A fully custom Next.js site takes 3–6 weeks. I'll give you a clear timeline when we talk." },
      { q: "What types of businesses do you work with?", a: "Mostly trade and construction businesses: renovation companies, gas and heating engineers, air-con installers, general contractors and manufacturers who price from drawings, plus garages and service businesses that take a lot of calls. If quoting or the phone eats your day, it's worth a short call." },
      { q: "What do you use to build websites, Framer or code?", a: "Depends on your needs and budget. Framer is great if you want to edit content yourself and need something fast. Custom Next.js is better for complex sites with advanced features. I'll recommend what makes sense during the audit." },
      { q: "What AI services do you offer?", a: "AI quoting assistants (instant estimates on your website), AI receptionists connected to your CRM, plan and tender review for contractors and manufacturers, chatbots and automatic review collection. The right one depends on where your time goes." },
      { q: "How much does a project cost?", a: "Starting prices are on the Services page. The Quoting Assistant starts at £295 setup + £99/month, and a website with the assistant built in starts at £1,195 + £79/month. Your final price depends on what you need, and you get it in writing before anything starts." },
      { q: "Can I edit the website myself after you build it?", a: "If you choose Framer, yes, it's designed for non-technical editing. For custom sites, I'll train you on the CMS or provide ongoing support for updates." },
      { q: "Do you offer payment plans?", a: "Yes, for larger projects. We'll discuss payment terms during the proposal phase. I'm flexible and want to make it work for your budget." },
      { q: "What happens after the website launches?", a: "I provide training on how to use your site and I'm available for ongoing support. Many clients keep me on retainer for updates, SEO, or adding new features. It's entirely up to you." },
    ],
    ctaTitleA: "READY TO WORK",
    ctaTitleB: "TOGETHER?",
    ctaSub: "I take on a limited number of projects at a time, so each one gets my full attention. Book a short call and let's see if we're a fit.",
    ctaBtn: "Book a Free Call",
    ctaEmail: "or email ",
  },
  hu: {
    eyebrow: "A Landscale-ről",
    h1: ["NEM EGY ÚJABB", "MARKETINGÜGYNÖKSÉG."],
    heroSub: "AI árajánló asszisztensek, AI recepciósok és tervellenőrző eszközök szakipari, építőipari és szolgáltató cégeknek, mindig az adott cég működésére szabva.",
    storyEyebrow: "Az alapító",
    storyTitleA: "MIÉRT ÉPPEN",
    storyTitleB: "EZEKET ÉPÍTEM",
    storyTitleMid: "",
    storyQuote: "„Pirint Milán vagyok, a Landscale alapítója. A mesterséges intelligencia már jóval azelőtt lenyűgözött, hogy mindenki erről kezdett volna beszélni.”",
    storyP1: "Milán vagyok, a Landscale alapítója. A mesterséges intelligencia mióta az eszemet tudom, foglalkoztat, és mindig ugyanaz a kérdés érdekelt: egy valódi cég napjából mit tudna ténylegesen átvenni?",
    storyP2: "A válasz újra és újra az árazás és az adminisztráció volt. Szakemberek, akik minden este ugyanazokra az árkérdésekre válaszolnak. Irodai kollégák, akik naponta negyven hívást vesznek fel arról, hol tart egy rendelés. Költségvetés-készítők, akik egy fix áras ajánlat előtt kézzel mérik újra a teljes tervcsomagot.",
    storyP3: "Ez a munka lassú, ismétlődő, könnyű elrontani, és ritkán ez az, amiben a cég igazán jó. Viszont pont az a fajta munka, amit az AI jól elvégez, ha a céghez igazítják, és nem fordítva.",
    storyP4: "A Landscale ezért ezeket építi: árajánló asszisztenseket, amelyek a weboldalon adnak árbecslést, AI recepciósokat, amelyek felveszik a telefont és vezetik a CRM-et, és olyan eszközöket, amelyek átnézik a tervrajzokat és az ajánlatkéréseket, és jelzik, mi nem stimmel.",
    storyP5: "Minden projekt abból indul, ahogy most dolgozol: a munkáidból, az áraidból, a folyamataidból. A cél soha nem az, hogy a gép döntsön helyetted, hanem hogy visszakapd azokat az órákat, amelyekhez nem kell a szakértelmed.",
    photoCaption: "Pirint Milán",
    photoRole: "Alapító, Landscale",
    storyP6: "Végig közvetlenül velem tartod a kapcsolatot, az első beszélgetéstől az indulásig, és utána is. Ha valami nem működik, pontosan tudod, kit kell hívni.",
    procEyebrow: "Hogyan dolgozom",
    procTitleA: "A ",
    procTitleB: "FOLYAMATOM",
    process: [
      { step: "01", title: "Ismerkedő beszélgetés", desc: "Beszélünk a cégedről, arról, hogyan dolgoztok most, és hol megy el a legtöbb idő. Utána megmutatom, mit lehetne automatizálni, díjmentesen és kötelezettség nélkül." },
      { step: "02", title: "Egyedi ajánlat", desc: "Az igényeid és a kereted alapján írásban megkapod, mit építek, mennyi idő alatt és mennyiért. Te döntöd el, mi éri meg. Nincs meglepetés." },
      { step: "03", title: "Építés és együttműködés", desc: "Megépítem a weboldaladat vagy az AI-megoldásodat, rendszeres egyeztetésekkel és előnézetekkel. A visszajelzéseid alapján alakítjuk a végeredményt, végig átláthatóan." },
      { step: "04", title: "Indítás és támogatás", desc: "Elintézem a technikai indítást, betanítalak az oldal használatára, és utána is elérhető maradok a folyamatos támogatáshoz. Te közben a cégedre figyelhetsz." },
    ],
    diffEyebrow: "Miért más",
    diffTitleA: "MITŐL VAGYUNK",
    diffTitleB: "MÁSOK",
    diffTitleMid: "",
    diffSub: "A cégedre szabva, őszintén arról, mit tud és mit nem tud az AI, és az alapján mérve, mennyi időt spórol.",
    pillars: [
      { num: "01", title: "A cégedre szabva", desc: "Mielőtt bármit építenék, megismerem, hogyan dolgozol valójában: milyen munkákat árazol, milyen kérdéseket kapsz, milyen árakkal számolsz, milyen programokat használsz. Az eszköz a te folyamatodhoz igazodik, nem fordítva.", detail: "Nincs sablon. Minden asszisztens a saját munkáiddal, áraiddal és szóhasználatoddal készül." },
      { num: "02", title: "Korszerű technológia, józanul", desc: "A legújabb AI- és automatizálási eszközökkel dolgozom, de nem azért, mert divatos, hanem mert valódi problémát old meg: árbecslés, telefonok, tervellenőrzés, utánkövetés.", detail: "Én követem a fejlődést, hogy neked ne kelljen. Te csak a kész, működő eszközt kapod meg." },
      { num: "03", title: "Az eredmény számít", desc: "Nem a kattintásokat és a megtekintéseket nézem, hanem azt, mennyi időt spórolsz, és mennyi komoly megkeresés érkezik. Minden projektnek világos célja van, és vállalom érte a felelősséget.", detail: "Ha valami nem működik, változtatok rajta. Nekem is az a jó, ha neked megéri." },
    ],
    valEyebrow: "Alapelvek",
    valTitleA: "AZ ",
    valTitleB: "ÉRTÉKEINK",
    values: [
      { title: "Őszinteség mindenekelőtt", desc: "Azt mondom, amit tudnod kell, nem azt, amit hallani szeretnél. Ha valami nem fog működni, megmondom előre." },
      { title: "Nem a látszatszámok számítanak", desc: "Az oldalmegtekintés és a követőszám nem fizeti a számlákat. A megspórolt idő és a komoly megkeresések igen." },
      { title: "Egy világos fókusz", desc: "Egy problémával foglalkozom: azzal az idővel, ami a cégeknél árazásra, telefonokra és adminisztrációra megy el. Ez a fókusz teszi lehetővé, hogy ezt igazán jól csináljam." },
      { title: "Hosszú távú gondolkodás", desc: "Olyan megoldásokat építek, amelyek évekig működnek, nem gyors trükköket, amelyek fél év múlva szétesnek." },
    ],
    faqEyebrow: "GYIK",
    faqTitleA: "GYAKORI",
    faqTitleB: "KÉRDÉSEK",
    faqs: [
      { q: "Mennyi idő alatt készül el egy weboldal?", a: "A projekttől függ. Egy Framer-sablon testreszabása 1–2 hét alatt megvan. Egy teljesen egyedi Next.js oldal 3–6 hét. Amikor beszélünk, világos ütemtervet adok." },
      { q: "Milyen cégekkel dolgozol?", a: "Főleg szakipari és építőipari cégekkel: felújítókkal, gáz- és fűtésszerelőkkel, klímaszerelőkkel, generálkivitelezőkkel és tervrajzból árazó gyártókkal, valamint autószervizekkel és olyan szolgáltatókkal, ahová sok hívás érkezik. Ha nálad az árazás vagy a telefon viszi el a napot, érdemes egy rövid beszélgetés." },
      { q: "Mivel építed a weboldalakat, Framer vagy kód?", a: "Az igényeidtől és a keretedtől függ. A Framer remek, ha magad akarod szerkeszteni a tartalmat és gyorsan kell valami. Az egyedi Next.js jobb az összetett, fejlett funkciós oldalakhoz. Amikor beszélünk, azt ajánlom, ami neked megéri." },
      { q: "Milyen AI-megoldásokat készítesz?", a: "AI árajánló asszisztenst (azonnali árbecslés a weboldaladon), CRM-mel összekötött AI recepcióst, terv- és kiírás-ellenőrzést kivitelezőknek és gyártóknak, chatbotot és automatikus véleménygyűjtést. Hogy melyik kell, az attól függ, hol megy el a legtöbb időd." },
      { q: "Mennyibe kerül egy projekt?", a: "Attól függ, mire van szükséged. Egy rövid beszélgetés után írásban megkapod a pontos árat, mielőtt bármi elindulna." },
      { q: "Szerkeszthetem magam a weboldalt, miután megépítetted?", a: "Ha Framerrel készül, igen: kifejezetten úgy tervezték, hogy programozói tudás nélkül is szerkeszthető legyen. Egyedi oldalaknál betanítalak a CMS használatára, vagy folyamatos támogatást nyújtok a frissítésekhez." },
      { q: "Van részletfizetési lehetőség?", a: "Igen, nagyobb projekteknél. A fizetési feltételeket az ajánlatnál egyeztetjük. Rugalmas vagyok, igazodom a keretedhez." },
      { q: "Mi történik a weboldal indítása után?", a: "Betanítalak az oldal használatára, és elérhető vagyok a folyamatos támogatáshoz. Sok ügyfél havidíjas támogatást kér frissítésekhez, SEO-hoz vagy új funkciókhoz. Teljesen rajtad múlik." },
    ],
    ctaTitleA: "DOLGOZZUNK",
    ctaTitleB: "EGYÜTT?",
    ctaSub: "Egyszerre csak korlátozott számú projektet vállalok, hogy mindegyikre teljes figyelmem jusson. Foglalj egy rövid hívást, és nézzük meg, passzolunk-e.",
    ctaBtn: "Foglalj időpontot",
    ctaEmail: "vagy írj a ",
  },
} as const;

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-white/[0.06] group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.6, ease: SPRING }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-start justify-between gap-6 py-7 text-left relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold/40 transition-all duration-300" />
        <span className="font-grotesk font-bold text-base md:text-lg text-cream group-hover:text-gold transition-colors duration-300 pl-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="font-grotesk font-bold text-xl text-gold flex-shrink-0 mt-0.5">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="font-inter text-text-muted text-sm leading-relaxed pb-7 pl-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const values = c.values.map((v, i) => ({ ...v, Icon: valueIcons[i] }));

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 800, height: 800, top: "-25%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.26) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-2"
          style={{ width: 600, height: 600, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full pointer-events-none orb-3"
          style={{ width: 350, height: 350, top: "30%", right: "20%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="absolute bottom-0 right-0 font-grotesk font-bold text-[14vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[25%]">
          STORY
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full pb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
          </motion.div>

          {c.h1.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(42px,7.5vw,110px)] leading-[0.92] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-2xl mt-8">
            {c.heroSub}
          </motion.p>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-0 right-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em]">WHY</div>
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 700, height: 700, top: "-10%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-28 items-start">
            <Reveal>
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6">
                <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "left" }} />
                {c.storyEyebrow}
              </span>
              <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em] mb-6">
                {c.storyTitleA}<br />{c.storyTitleMid}<span className="text-gradient-gold">{c.storyTitleB}</span>
              </h2>
              <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed">
                {c.storyQuote}
              </p>
              <figure className="mt-10 max-w-[300px]">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/25 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <Image src="/images/milan-pirint.jpg" alt={c.photoCaption} fill sizes="300px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-grotesk font-bold text-base text-cream">{c.photoCaption}</span>
                  <span className="block font-inter text-xs uppercase tracking-[0.18em] text-gold/70 mt-1">{c.photoRole}</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 font-inter text-text-muted leading-relaxed text-base">
                <motion.p className="text-cream/70 border-l-2 border-gold/30 pl-5 italic font-cormorant text-lg"
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  {c.storyP1}
                </motion.p>
                <p>{c.storyP2}</p>
                <p>{c.storyP3}</p>
                <p>{c.storyP4}</p>
                <p>{c.storyP5}</p>
                <motion.p className="text-cream/70 border-l-2 border-gold/30 pl-5 italic font-cormorant text-lg"
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
                  {c.storyP6}
                </motion.p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full pointer-events-none orb-2"
          style={{ width: 800, height: 800, bottom: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(100px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 py-16 md:py-32 lg:py-44">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />{c.procEyebrow}
            </span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              {c.procTitleA}<span className="text-gradient-gold">{c.procTitleB}</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {c.process.map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: SPRING }}
                className="relative bg-[#080808] p-6 md:p-10 xl:p-14 group hover:bg-[#0D0D0D] transition-colors duration-500 overflow-hidden cursor-default">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.06) 0%, transparent 65%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
                <div className="absolute bottom-2 right-4 font-grotesk font-bold leading-none text-white/[0.065] group-hover:text-gold/[0.20] transition-colors duration-500 select-none pointer-events-none"
                  style={{ fontSize: "clamp(90px,12vw,160px)" }}>{item.step}</div>
                <div className="relative z-10">
                  <div className="font-grotesk font-bold text-[10px] uppercase tracking-[0.3em] text-gold/40 mb-4">{item.step}</div>
                  <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-4 tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                  <p className="font-inter text-text-muted text-base leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute left-0 top-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em]">EDGE</div>
        <div className="absolute rounded-full pointer-events-none orb-3"
          style={{ width: 700, height: 700, top: "20%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
            <div className="md:sticky md:top-32">
              <Reveal>
                <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />{c.diffEyebrow}</span>
                <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em] mb-8">
                  {c.diffTitleA}<br />{c.diffTitleMid}<span className="text-gradient-gold">{c.diffTitleB}</span>
                </h2>
                <p className="font-cormorant text-xl text-cream/40 font-light italic leading-relaxed max-w-sm">
                  {c.diffSub}
                </p>
              </Reveal>
            </div>
            <div className="space-y-0">
              {c.pillars.map((pillar, i) => (
                <Reveal key={pillar.num} delay={i * 0.15}>
                  <motion.div className="border-b border-white/[0.05] py-10 group relative overflow-hidden cursor-default"
                    whileHover={{ x: 6 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold transition-all duration-300" />
                    <div className="flex items-start gap-6 pl-4">
                      <span className="font-grotesk font-bold text-[36px] text-white/[0.09] group-hover:text-gold/20 transition-colors duration-500 mt-1 flex-shrink-0 leading-none">{pillar.num}</span>
                      <div>
                        <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mb-3 tracking-tight group-hover:text-gold transition-colors duration-300">{pillar.title}</h3>
                        <p className="font-inter text-text-muted text-base leading-relaxed mb-3">{pillar.desc}</p>
                        <p className="font-cormorant text-base text-gold/60 italic">{pillar.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#0D0D0D] relative overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute rounded-full pointer-events-none orb-1"
          style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10 py-16 md:py-32 lg:py-40">
          <Reveal className="mb-20">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />{c.valEyebrow}</span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,80px)] text-cream leading-[0.92] tracking-[-0.03em]">
              {c.valTitleA}<span className="text-gradient-gold">{c.valTitleB}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {values.map((value, i) => (
              <motion.div key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: SPRING }}
                className="bg-[#0D0D0D] p-6 md:p-10 xl:p-14 group hover:bg-[#111111] transition-colors duration-500 relative overflow-hidden cursor-default">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/25 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:bg-gold/20 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                    <value.Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="font-grotesk font-bold text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">{value.title}</h3>
                  <p className="font-inter text-text-muted text-base leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-32 lg:py-44 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute rounded-full pointer-events-none orb-2"
          style={{ width: 600, height: 600, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal className="mb-16">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-5"><span className="w-8 h-px bg-gold" />{c.faqEyebrow}</span>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,72px)] text-cream leading-[0.92] tracking-[-0.03em]">
              {c.faqTitleA}<br /><span className="text-gradient-gold">{c.faqTitleB}</span>
            </h2>
          </Reveal>
          <div className="max-w-3xl">
            {c.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 md:py-48 lg:py-64 bg-[#060606] overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full orb-1" style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 65%)", filter: "blur(90px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 400, height: 400, top: "10%", right: "5%", background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute rounded-full orb-3" style={{ width: 300, height: 300, bottom: "15%", left: "8%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8">
          <div className="overflow-hidden mb-4">
            <motion.h2 initial={{ y: "60%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1, ease: SPRING }}
              className="font-grotesk font-bold text-[clamp(48px,8vw,112px)] text-cream leading-[0.88] tracking-[-0.04em]">
              {c.ctaTitleA}<br /><span className="text-gradient-gold">{c.ctaTitleB}</span>
            </motion.h2>
          </div>
          <Reveal delay={0.2} className="mb-12">
            <p className="font-cormorant text-xl md:text-2xl text-cream/40 font-light italic leading-relaxed max-w-lg mx-auto">
              {c.ctaSub}
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-lg px-12 py-6 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1.5">
                {c.ctaBtn}
                <span>→</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="font-inter text-text-muted/60 text-sm hover:text-gold transition-colors">
                {c.ctaEmail}{EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
