"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Star, Phone, Search, LayoutDashboard } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";
import { MESSENGER_URL, PHONE } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

const extraIcons = [Star, Phone, Search, LayoutDashboard];

const content = {
  en: {
    eyebrow: "What We Do",
    h1: ["THREE CORE SERVICES.", "ONE GOAL."],
    heroSub: "Everything built specifically for trade businesses. We understand your industry, your clients, and what it takes to grow.",
    ticker: ["Premium Websites", "• AI Lead Filtering", "Local SEO", "• 24/7 AI Estimator", "Instant Quotes", "• Lead Qualification", "Smart Automation"],
    coreServices: [
      {
        num: "01", tag: "AI Estimator", tagPulse: true,
        title: "AI Estimator\nAgent", titleGold: "Instant Quotes",
        subtitle: "Project estimates delivered on your site, no phone call needed.",
        desc: "A visitor asks for a quote. The AI asks specific questions about scope, area, materials, entrance, postcode and timeline, then gives an accurate estimate immediately, 24/7. You only hear from leads who already know the price and still want to book.",
        features: ["Patio, lawn, landscaping & more", "Project-specific questions", "Instant line-item breakdown", "Postcode & site-access checks", "Contact details collected after quote", "Saves 15–20 hrs/week on quoting"],
        stats: [{ label: "Availability", val: "24/7" }, { label: "Response time", val: "<2s" }, { label: "Conversations", val: "Unlimited" }],
        href: "/services/ai-estimator", cta: "See How It Works",
      },
      {
        num: "02", tag: "AI Chatbot", tagPulse: true,
        title: "AI Chatbot\n& Qualifier", titleGold: "24/7 on Your Site",
        subtitle: "Engages every visitor, filters out time-wasters, passes the rest straight to you.",
        desc: "The chatbot greets every visitor, asks about budget, location and timeline, and makes a decision. Wrong area, wrong budget, not the right fit? It declines politely, you never hear about it. Serious lead? Their full details land in your inbox.",
        features: ["Budget, location & timeline check", "Automatic lead scoring", "Declines unfit leads politely", "Owner never bothered by junk", "Instant contact via SMS or email", "24/7 with no extra effort from you"],
        stats: [{ label: "Qualified leads", val: "+300%" }, { label: "Response time", val: "<2s" }, { label: "Junk leads reaching you", val: "0" }],
        href: "/services/ai-chatbot", cta: "See How It Works",
      },
      {
        num: "03", tag: "Website", tagPulse: false,
        title: "Premium\nWebsite", titleGold: "Built to Convert",
        subtitle: "Luxury websites for trade businesses, with local SEO built in.",
        desc: "A bespoke, fast-loading website that positions you as the premium choice in your area. Built on Next.js or Framer, designed to convert visitors into enquiries, and optimised for local Google search and Google Business Profile from day one.",
        features: ["Bespoke luxury design", "Mobile-first & under 2s load", "Lead capture & contact forms", "Local SEO built in from day one", "Google Business Profile setup", "Analytics & conversion tracking"],
        stats: [{ label: "PageSpeed Score", val: "100/100" }, { label: "Load time", val: "<0.8s" }, { label: "SEO Score", val: "100/100" }],
        href: "/services/website-design", cta: "Learn More",
      },
    ],
    extraServices: [
      { title: "AI Review Agent", desc: "After a job is done, the AI automatically messages the client asking them to rate their experience from 1–10. Score 7 or above? They get a direct link to leave a Google review. Below 7? The AI asks what went wrong, so you can fix it before it becomes a public complaint." },
      { title: "AI Receptionist", desc: "An AI that answers calls exactly like a real receptionist, takes down the caller's name, number and reason for calling, and sends you a summary. Can run 24/7 or only kick in out of hours / when you don't pick up. Never miss a lead because you were on a job." },
      { title: "SEO & Google Business", desc: "Already have a website? We handle your local SEO and Google Business Profile setup separately, keyword strategy, content, local citations, and monthly reporting so you climb the rankings in your area." },
      { title: "Operations Dashboard", desc: "A bespoke dashboard that keeps your jobs perfectly sorted. It automatically logs what work was done, when it happened, the final cost, and the client's review. A crystal-clear picture of your daily operations, helping you spot your most profitable jobs and keeping admin strictly to a minimum." },
    ],
    alsoEyebrow: "Also Available",
    alsoTitle: "More tools we build",
    diffTitle: "Have a different idea in mind?",
    diffDesc: "If you need something that's not listed here, get in touch, if it helps tradespeople win better clients, we can probably build it.",
    bookCall: "Book a Call →",
    callNote: "Prefer to talk?",
    pricingEyebrow: "Pricing",
    pricingTitleA: "Simple Packages.",
    pricingTitleB: "Clear Starting Prices.",
    pricingDesc: "So you know where you stand before we ever talk. Your final price depends on your trade and what you need, and you get it in writing before anything starts.",
    plans: [
      {
        name: "Quoting Assistant", desc: "Your 24/7 sales team, added to the website you already have.",
        price: "£295", priceNote: "one-off setup", monthly: "+ £99/month",
        features: [
          "AI chatbot that gives instant estimates from your own prices",
          "Qualifies every lead: job, budget, postcode, timeline",
          "Politely filters out time-wasters before they reach you",
          "Automatic follow-up so warm leads don't go cold",
          "Connects to your CRM, every lead logged automatically",
          "Instant lead alerts by email or SMS",
          "Works in multiple languages",
          "Setup, updates and support included",
        ],
      },
      {
        name: "Website + Assistant", desc: "A premium website built to win jobs, with the assistant already inside.",
        price: "from £1,195", priceNote: "one-off", monthly: "+ from £79/month",
        features: [
          "Custom design that makes you the premium choice locally",
          "Lightning-fast and mobile-first",
          "Local SEO built in from day one",
          "Google Business Profile setup",
          "Enquiry forms connected to your CRM",
          "Easy blog and photo updates you can do yourself",
          "Analytics and conversion tracking",
          "Everything in Quoting Assistant, built in",
        ],
      },
      {
        name: "Custom", desc: "Anything else you need built.",
        price: "Custom quote", priceNote: "", monthly: "Priced to what you need",
        features: ["AI Receptionist", "AI Review Agent", "Operations Dashboard", "Local SEO & Google Business"],
      },
    ],
    foundingOffer: "Founding UK offer: the first 5 UK businesses pay no setup fee, in return for a short case study once it's live.",
    pricingCta: "Message Me on Facebook →",
    ctaTitleA: "NOT SURE WHICH",
    ctaTitleB: "SERVICE YOU NEED?",
    ctaSub: "Send me a message on Facebook, tell me what you do, and I'll tell you honestly which one will make the difference.",
    ctaBtn: "Message Me on Facebook →",
  },
  hu: {
    eyebrow: "Amit csinálunk",
    h1: ["HÁROM FŐ SZOLGÁLTATÁS.", "EGY CÉL."],
    heroSub: "Minden kifejezetten vállalkozásoknak építve. Értjük a szakmádat, az ügyfeleidet, és azt, mi kell a növekedéshez.",
    ticker: ["Prémium weboldalak", "• AI érdeklődő-szűrés", "Helyi SEO", "• 0–24 AI árajánló", "Azonnali árajánlat", "• Érdeklődő-minősítés", "Okos automatizálás"],
    coreServices: [
      {
        num: "01", tag: "AI Árajánló", tagPulse: true,
        title: "AI Árajánló\nÜgynök", titleGold: "Azonnali árajánlat",
        subtitle: "Projektbecslés a weboldaladon, telefonhívás nélkül.",
        desc: "A látogató árajánlatot kér. Az AI konkrét kérdéseket tesz fel a munka jellegéről, a területről, az anyagokról, a bejáratról, az irányítószámról és a határidőről, majd azonnal pontos becslést ad, a nap 24 órájában. Csak azok az érdeklődők keresnek meg, akik már ismerik az árat és még mindig foglalni akarnak.",
        features: ["Terasz, gyep, tereprendezés és több", "Projektre szabott kérdések", "Azonnali, tételes bontás", "Irányítószám- és helyszín-ellenőrzés", "Elérhetőség az árajánlat után", "Heti 15–20 óra megtakarítás az árajánlatokon"],
        stats: [{ label: "Elérhetőség", val: "0–24" }, { label: "Válaszidő", val: "<2 mp" }, { label: "Beszélgetés", val: "Korlátlan" }],
        href: "/services/ai-estimator", cta: "Nézd meg, hogy működik",
      },
      {
        num: "02", tag: "AI Chatbot", tagPulse: true,
        title: "AI Chatbot\nés minősítő", titleGold: "0–24 az oldaladon",
        subtitle: "Foglalkozik minden látogatóval, kiszűri a komolytalanokat, a többit egyből hozzád küldi.",
        desc: "A chatbot minden látogatót köszönt, rákérdez a büdzsére, a helyszínre és a határidőre, majd dönt. Rossz terület, rossz büdzsé, nem passzol? Udvariasan elutasítja, te nem is hallasz róla. Komoly érdeklődő? A teljes adatai a postaládádba kerülnek.",
        features: ["Büdzsé-, helyszín- és határidő-ellenőrzés", "Automatikus lead-pontozás", "Udvariasan elutasít, ha nem passzol", "A tulajdonost nem zavarja a kacat", "Azonnali értesítés SMS-ben vagy e-mailben", "0–24, plusz erőfeszítés nélkül"],
        stats: [{ label: "Minőségi érdeklődő", val: "+300%" }, { label: "Válaszidő", val: "<2 mp" }, { label: "Hozzád jutó kacat", val: "0" }],
        href: "/services/ai-chatbot", cta: "Nézd meg, hogy működik",
      },
      {
        num: "03", tag: "Weboldal", tagPulse: false,
        title: "Prémium\nWeboldal", titleGold: "Konverzióra építve",
        subtitle: "Igényes weboldalak vállalkozásoknak, beépített helyi SEO-val.",
        desc: "Egyedi, villámgyors weboldal, ami a környékeden a prémium választásként pozicionál. Next.js vagy Framer alapon, arra tervezve, hogy a látogatókból érdeklődő legyen, és az első naptól optimalizálva a helyi Google-keresésre és a Google Cégprofilra.",
        features: ["Egyedi, igényes dizájn", "Mobilra optimalizált, 2 mp alatti betöltés", "Érdeklődő-gyűjtés és kapcsolati űrlapok", "Beépített helyi SEO az első naptól", "Google Cégprofil beállítás", "Analitika és konverziómérés"],
        stats: [{ label: "PageSpeed pont", val: "100/100" }, { label: "Betöltés", val: "<0,8 mp" }, { label: "SEO pont", val: "100/100" }],
        href: "/services/website-design", cta: "Tudj meg többet",
      },
    ],
    extraServices: [
      { title: "AI Vélemény-ügynök", desc: "A munka elvégzése után az AI automatikusan ír az ügyfélnek, és megkéri, hogy 1–10-ig értékelje az élményt. 7 vagy afölött? Közvetlen linket kap egy Google-értékeléshez. 7 alatt? Az AI rákérdez, mi ment félre, hogy javíthasd, mielőtt nyilvános panasz lenne belőle." },
      { title: "AI Recepciós", desc: "Egy AI, ami pontosan úgy veszi fel a hívásokat, mint egy valódi recepciós, felírja a hívó nevét, számát és a hívás okát, majd összefoglalót küld neked. Futhat 0–24-ben, vagy csak munkaidőn kívül / amikor nem veszed fel. Soha ne szalassz el érdeklődőt azért, mert épp dolgoztál." },
      { title: "SEO és Google Cégprofil", desc: "Már van weboldalad? A helyi SEO-t és a Google Cégprofil beállítását külön is elvállaljuk, kulcsszó-stratégia, tartalom, helyi említések és havi riportok, hogy feljebb kerülj a környékeden." },
      { title: "Működési vezérlőpult", desc: "Egyedi vezérlőpult, ami tökéletes rendben tartja a munkáidat. Automatikusan rögzíti, milyen munka készült el, mikor, mennyi lett a végösszeg, és mit értékelt az ügyfél. Kristálytiszta kép a napi működésedről, segít kiszúrni a legjövedelmezőbb munkákat, és a papírmunkát a minimumon tartja." },
    ],
    alsoEyebrow: "Szintén elérhető",
    alsoTitle: "További eszközök, amiket építünk",
    diffTitle: "Más ötlet jár a fejedben?",
    diffDesc: "Ha olyasmire van szükséged, ami itt nincs felsorolva, keress meg, ha segít a szakembereknek jobb ügyfeleket szerezni, valószínűleg meg tudjuk építeni.",
    bookCall: "Foglalj hívást →",
    callNote: "Inkább beszélnél?",
    pricingEyebrow: "Árazás",
    pricingTitleA: "Egyszerű csomagok.",
    pricingTitleB: "Világos induló árak.",
    pricingDesc: "Hogy már az első beszélgetés előtt tudd, mire számíts. A végső ár a szakmádtól és az igényeidtől függ, és írásban megkapod, mielőtt bármi elindulna.",
    plans: [
      {
        name: "Árajánló-asszisztens", desc: "0–24-es értékesítő a meglévő weboldaladon.",
        price: "50 000 Ft", priceNote: "egyszeri beállítás", monthly: "+ 50 000 Ft/hó",
        features: [
          "AI chatbot, ami a saját áraid alapján azonnal becslést ad",
          "Minősít minden érdeklődőt: munka, büdzsé, helyszín, határidő",
          "Udvariasan kiszűri a komolytalanokat, mielőtt hozzád érnének",
          "Automatikus utánkövetés, hogy ne hűljön ki az érdeklődő",
          "CRM-hez kötve, minden érdeklődő automatikusan rögzítve",
          "Azonnali értesítés e-mailben vagy SMS-ben",
          "Több nyelven is működik",
          "Beállítás, frissítések és támogatás benne van",
        ],
      },
      {
        name: "Weboldal + asszisztens", desc: "Prémium weboldal, ami munkát hoz, beépített asszisztenssel.",
        price: "250 000 Ft-tól", priceNote: "egyszeri", monthly: "+ 30 000 Ft/hó-tól",
        features: [
          "Egyedi dizájn, amivel te leszel a prémium választás a környéken",
          "Villámgyors és mobilra optimalizált",
          "Beépített helyi SEO az első naptól",
          "Google Cégprofil beállítás",
          "CRM-hez kötött ajánlatkérő űrlapok",
          "Blogot és fotókat te magad is egyszerűen frissíthetsz",
          "Analitika és konverziómérés",
          "Minden, ami az Árajánló-asszisztensben, beépítve",
        ],
      },
      {
        name: "Egyedi", desc: "Bármi más, amit meg kell építeni.",
        price: "Egyedi ajánlat", priceNote: "", monthly: "Az igényeidhez árazva",
        features: ["AI Recepciós", "AI Vélemény-ügynök", "Működési vezérlőpult", "SEO és Google Cégprofil"],
      },
    ],
    foundingOffer: "",
    pricingCta: "Írj nekem Messengeren →",
    ctaTitleA: "NEM VAGY BIZTOS BENNE,",
    ctaTitleB: "MELYIK KELL NEKED?",
    ctaSub: "Írj nekem Facebookon, mondd el, mivel foglalkozol, és őszintén megmondom, melyik hozza a legtöbbet.",
    ctaBtn: "Írj nekem Messengeren →",
  },
} as const;

export default function ServicesPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  const phone = PHONE[lang];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const coreServices = c.coreServices;
  const extraServices = c.extraServices.map((s, i) => ({ ...s, Icon: extraIcons[i] }));

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-[#080808] overflow-hidden min-h-[70vh] flex items-end">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-1" style={{ width: 900, height: 900, top: "-30%", right: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.20) 0%, transparent 60%)", filter: "blur(100px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 600, height: 600, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 60%)", filter: "blur(80px)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.020] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="absolute bottom-0 left-0 font-grotesk font-bold text-[16vw] leading-none text-white/[0.09] select-none pointer-events-none tracking-[-0.05em] translate-y-[20%]">
          SERVICES
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
            <motion.span className="w-8 h-px bg-gold block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ transformOrigin: "left" }} />
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
          </motion.div>
          {c.h1.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: SPRING }}
                className={`font-grotesk font-bold text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.04em] ${i === 1 ? "text-gradient-gold" : "text-cream"}`}>
                {line}
              </motion.h1>
            </div>
          ))}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }}
            className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mt-8">
            {c.heroSub}
          </motion.p>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#080808] py-4 overflow-hidden relative border-y border-gold/[0.06]">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="flex gap-14 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, gi) =>
            c.ticker.map((item, j) => (
              <span key={`${gi}-${j}`} className="font-grotesk text-xs font-medium text-gold/30 uppercase tracking-[0.2em]">{item}</span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── ALL SERVICES, unified cards ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full orb-1" style={{ width: 900, height: 900, top: "5%", right: "-20%", background: "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 60%)", filter: "blur(110px)" }} />
          <div className="absolute rounded-full orb-2" style={{ width: 700, height: 700, bottom: "20%", left: "-15%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 py-16 md:py-24 space-y-6 relative z-10">
          {coreServices.map((svc, i) => (
            <Reveal key={svc.num} delay={i * 0.06}>
              <div className="relative bg-[#0D0D0D] border border-gold/20 hover:border-gold/50 rounded-3xl overflow-hidden transition-all duration-300 group hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 25% 30%, rgba(212,175,55,0.07) 0%, transparent 55%)" }} />

                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
                  <div className="p-7 md:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-gold/[0.07]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-full">
                        {svc.tagPulse && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse" />
                        )}
                        <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{svc.tag}</span>
                      </div>
                      <span className="font-grotesk font-bold text-[56px] leading-none text-white/[0.075] group-hover:text-gold/08 transition-colors duration-500 select-none">{svc.num}</span>
                    </div>

                    <h2 className="font-grotesk font-bold text-[clamp(28px,3.5vw,52px)] text-cream leading-[0.92] tracking-[-0.03em] mb-2 group-hover:text-cream transition-colors duration-300">
                      {svc.title.split("\n").map((line, li) => (
                        <span key={li}>{line}{li < svc.title.split("\n").length - 1 && <br />}</span>
                      ))}
                      <br /><span className="text-gradient-gold">{svc.titleGold}</span>
                    </h2>

                    <p className="font-cormorant text-base md:text-lg text-gold/55 italic mb-5 leading-relaxed">{svc.subtitle}</p>
                    <p className="font-inter text-text-muted text-sm leading-relaxed mb-7 max-w-xl">{svc.desc}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 font-inter text-xs text-text-muted group-hover:text-cream/55 transition-colors duration-300">
                          <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0 mt-1.5 group-hover:bg-gold transition-colors duration-300" />{f}
                        </div>
                      ))}
                    </div>

                    <Link href={localize(svc.href, lang)}
                      className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-7 py-3.5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5">
                      {svc.cta} →
                    </Link>
                  </div>

                  <div className="p-7 md:p-10 xl:p-12 flex flex-col justify-center gap-4 relative">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.055) 0%, transparent 60%)" }} />
                    <div className="relative z-10 space-y-3">
                      {svc.stats.map((s, si) => (
                        <motion.div key={s.label}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.08 + i * 0.05, duration: 0.6, ease: SPRING }}
                          className="bg-[#0A0A0A] border border-white/[0.06] group-hover:border-gold/15 rounded-2xl px-5 py-4 flex items-center justify-between transition-colors duration-300">
                          <span className="font-inter text-xs text-text-muted">{s.label}</span>
                          <span className="font-grotesk font-bold text-gold text-base">{s.val}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="absolute bottom-6 right-8 font-grotesk font-bold text-[100px] leading-none text-white/[0.06] select-none pointer-events-none">
                      {svc.num}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* ── ALSO AVAILABLE ── */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 py-16 md:py-20 relative z-10">
          <Reveal className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gold/40 block" />
              <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-gold/50">{c.alsoEyebrow}</span>
            </div>
            <h3 className="font-grotesk font-bold text-[clamp(22px,3vw,40px)] text-cream/80 tracking-[-0.02em]">
              {c.alsoTitle}
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {extraServices.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.07}>
                <div className="relative bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/40 hover:-translate-y-2 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 group h-full overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/[0.08] border border-gold/15 flex items-center justify-center text-gold group-hover:bg-gold/15 group-hover:border-gold/30 transition-all duration-300 flex-shrink-0">
                      <svc.Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-grotesk font-bold text-lg text-cream group-hover:text-gold transition-colors duration-300 mb-1">{svc.title}</h4>
                      <p className="font-inter text-sm text-text-muted leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="relative bg-[#0D0D0D] border border-gold/15 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <p className="font-grotesk font-bold text-base text-cream mb-1">{c.diffTitle}</p>
                <p className="font-inter text-sm text-text-muted">{c.diffDesc}</p>
              </div>
              <a href={phone.href}
                className="relative z-10 flex-shrink-0 inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-6 py-3 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
                {c.bookCall}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-16 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute rounded-full orb-2 pointer-events-none" style={{ width: 700, height: 700, top: "50%", right: "-15%", transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 60%)", filter: "blur(90px)" }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative z-10">
          <Reveal className="mb-10 md:mb-14 max-w-2xl">
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6"><span className="w-8 h-px bg-gold" />{c.pricingEyebrow}</span>
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,60px)] text-cream leading-[0.92] tracking-[-0.03em] mb-5">
              {c.pricingTitleA}<br /><span className="text-gradient-gold">{c.pricingTitleB}</span>
            </h2>
            <p className="font-inter text-text-muted text-base leading-relaxed">{c.pricingDesc}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {c.plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.07} className="h-full">
                <div className="relative bg-[#111111] border border-gold/15 hover:border-gold/40 rounded-3xl p-7 md:p-8 h-full flex flex-col overflow-hidden transition-colors duration-300">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
                  <h3 className="font-grotesk font-bold text-xl text-cream mb-1">{plan.name}</h3>
                  <p className="font-inter text-sm text-text-muted mb-6">{plan.desc}</p>
                  <div className="font-grotesk font-bold text-[clamp(28px,3vw,40px)] text-gradient-gold leading-none tracking-[-0.03em]">{plan.price}</div>
                  <div className="font-inter text-xs text-text-muted mt-2 min-h-[1rem]">{plan.priceNote}</div>
                  <div className="font-grotesk font-semibold text-sm text-cream mt-3 mb-6">{plan.monthly}</div>
                  <ul className="space-y-2.5 border-t border-white/[0.06] pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-inter text-sm text-text-muted">
                        <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0 mt-2" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {c.foundingOffer && (
            <Reveal className="mt-5">
              <div className="bg-gold/[0.06] border border-gold/30 rounded-2xl px-6 py-4 font-inter text-sm text-cream">{c.foundingOffer}</div>
            </Reveal>
          )}

          <Reveal className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
                {c.pricingCta}
              </a>
              <a href={phone.href}
                className="flex items-center justify-center gap-3 border border-white/[0.1] hover:border-gold/40 text-cream hover:text-gold font-grotesk font-medium text-sm px-8 py-4 transition-all duration-300">
                <Phone size={16} className="text-gold" aria-hidden="true" />
                {c.callNote} {phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-44 bg-[#060606] overflow-hidden text-center">
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
              {c.ctaTitleA}<br /><span className="text-gradient-gold">{c.ctaTitleB}</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">
              {c.ctaSub}
            </p>
            <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              {c.ctaBtn}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
