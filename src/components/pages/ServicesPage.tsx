"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Star, MessageCircle, Search, LayoutDashboard, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";
import { CALENDLY_URL, PHONE } from "@/content/ui";

const SPRING = [0.16, 1, 0.3, 1] as const;

const extraIcons = [Star, MessageCircle, Search, LayoutDashboard];

const content = {
  en: {
    eyebrow: "Services",
    h1: ["SIX CORE SERVICES.", "ONE GOAL."],
    heroSub: "Built for trade, construction and service businesses: less time on quoting, calls and admin, more time on the work that pays.",
    ticker: ["AI Quoting Assistants", "• Plan & Tender Review", "AI Receptionists", "• Premium Websites", "Instant Estimates", "• CRM Integration", "Local SEO"],
    coreServices: [
      {
        num: "01", tag: "Core · Quoting Assistant", tagPulse: true,
        title: "AI Quoting\nAssistant", titleGold: "Instant Estimates",
        subtitle: "Estimates on your website, no phone call needed.",
        desc: "A visitor asks for a price. The assistant asks the questions you would ask, scope, size, materials, location and timeline, then gives an itemised estimate on the spot, 24/7. You only hear from people who already know the price and still want to go ahead.",
        features: ["Questions tailored to your jobs", "Built on your own prices", "Instant itemised estimate", "Location & site-access checks", "Contact details after the estimate", "Saves 15–20 hrs/week on quoting"],
        stats: [{ label: "Availability", val: "24/7" }, { label: "Live on", val: "4 sites" }, { label: "Conversations", val: "Unlimited" }],
        href: "/services/ai-estimator", cta: "See How It Works",
      },
      {
        num: "02", tag: "New · Tender Prep", tagPulse: true,
        title: "Tender\nPrep", titleGold: "Ready to Price",
        subtitle: "A full request for quotation, checked and ready to price.",
        desc: "For manufacturers and specialist subcontractors. It cross-checks the item list, drawings and contract, ranks the errors and gaps, drafts the clarifying questions, splits every item by workshop or supplier, compares revised item lists and builds a first price draft from your own rates. Your estimator approves.",
        features: ["Errors and gaps ranked by probability, with sources", "Approve or reject each finding", "Clarifying questions drafted, in other languages too", "Items split by workshop or supplier", "Revised item lists compared line by line", "First price draft in Excel"],
        stats: [{ label: "60-item tender read in", val: "110 s" }, { label: "Errors in one real tender", val: "11" }, { label: "Output", val: "Excel" }],
        href: "/services/tender-review", cta: "See How It Works",
      },
      {
        num: "03", tag: "New · Plan Reader", tagPulse: true,
        title: "Plan\nReader", titleGold: "Quantities from Drawings",
        subtitle: "Quantities measured from the drawings, checked against the bill of quantities.",
        desc: "For general contractors and estimators pricing houses and apartment buildings. It reads the architectural, structural and MEP drawings, measures rooms, walls, openings, slabs and rebar schedules, and compares every line with the designer's bill of quantities, so missing or miscounted items show up before you price.",
        features: ["Architectural, structural & MEP drawings", "Rooms, walls, openings, slabs, rebar", "Line-by-line check against the BoQ", "Sheet, calculation and confidence for every number", "Marked on the drawing with a red frame", "Excel in the usual cost-estimate layout"],
        stats: [{ label: "Every number", val: "Sourced" }, { label: "Shown on", val: "The drawing" }, { label: "Output", val: "Excel" }],
        href: "/services/tender-review", cta: "See How It Works",
      },
      {
        num: "04", tag: "New · AI Receptionist", tagPulse: true,
        title: "AI\nReceptionist", titleGold: "Connected to Your CRM",
        subtitle: "Answers every call, and writes every call back into your CRM.",
        desc: "It picks up your phone, checks your CRM to tell customers where their order stands, answers the questions you get every day, takes new enquiries and hands over to a person when needed. After each call it logs what the caller wanted, automatically.",
        features: ["Answers every call, day or night", "Order status straight from the CRM", "Every call logged automatically", "Handles routine questions", "Takes down new enquiries", "Hands over to a person when needed"],
        stats: [{ label: "Answers", val: "24/7" }, { label: "CRM", val: "Read & write" }, { label: "Missed calls", val: "0" }],
        href: "/services/ai-receptionist", cta: "See How It Works",
      },
      {
        num: "05", tag: "Website", tagPulse: false,
        title: "Premium\nWebsite", titleGold: "Built to Convert",
        subtitle: "Luxury websites for trade businesses, with local SEO built in.",
        desc: "A bespoke, fast-loading website that positions you as the premium choice in your area. Built on Next.js or Framer, designed to convert visitors into enquiries, and optimised for local Google search and Google Business Profile from day one.",
        features: ["Bespoke luxury design", "Mobile-first & under 2s load", "Lead capture & contact forms", "Local SEO built in from day one", "Google Business Profile setup", "Analytics & conversion tracking"],
        stats: [{ label: "PageSpeed Score", val: "100/100" }, { label: "Load time", val: "<0.8s" }, { label: "SEO Score", val: "100/100" }],
        href: "/services/website-design", cta: "Learn More",
      },
      {
        num: "06", tag: "Mechanics & Garages", tagPulse: true,
        title: "Quote\nBuilder", titleGold: "Itemised in Minutes",
        subtitle: "For your workshop: an itemised quote from a VIN in minutes, not a phone round for prices.",
        desc: "You enter the VIN and pick the job. It identifies the exact vehicle, recommends parts from your brands, asks when something can't be decided from the VIN, adds your labour rate and VAT, and gives you a PDF quote to send.",
        features: ["VIN-based vehicle lookup", "Recommends your brands", "Asks instead of guessing", "Your prices & labour rate", "Remembers your price corrections", "Itemised PDF quote"],
        stats: [{ label: "Quote from", val: "VIN" }, { label: "Built around", val: "Your garage" }, { label: "Output", val: "PDF" }],
        href: "/services/mechanic-quoting", cta: "See How It Works",
      },
    ],
    extraServices: [
      { title: "AI Review Agent", desc: "After a job is done, the AI automatically messages the client asking them to rate their experience from 1–10. Score 7 or above? They get a direct link to leave a Google review. Below 7? The AI asks what went wrong, so you can fix it before it becomes a public complaint." },
      { title: "AI Chatbot", desc: "A chatbot on your website that greets every visitor, checks budget, location and timeline, politely declines the wrong fits and sends the serious enquiries straight to your inbox, 24/7." },
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
    pricingTitleB: "Priced to Your Business.",
    pricingDesc: "Every business is different, so every price is too. After a short call you get a fixed price in writing, before anything starts.",
    plans: [
      {
        name: "Quoting Assistant", desc: "Your 24/7 sales team, added to the website you already have.",
        price: "Custom price", priceNote: "setup + monthly fee", monthly: "In writing before anything starts",
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
        price: "Custom price", priceNote: "one-off + monthly fee", monthly: "In writing before anything starts",
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
        price: "Custom price", priceNote: "", monthly: "Priced to what you need",
        features: ["AI Receptionist", "Plan & Tender Review", "AI Review Agent", "Operations Dashboard"],
      },
    ],
    foundingOffer: "",
    pricingCta: "Book a Free Call →",
    ctaTitleA: "NOT SURE WHICH",
    ctaTitleB: "SERVICE YOU NEED?",
    ctaSub: "Book a short call, tell me what you do, and I'll tell you honestly which one will make the difference.",
    ctaBtn: "Book a Free Call →",
  },
  hu: {
    eyebrow: "Szolgáltatások",
    h1: ["HAT FŐ SZOLGÁLTATÁS.", "EGY CÉL."],
    heroSub: "Szakipari, építőipari és szolgáltató cégeknek: kevesebb idő megy el árazásra, telefonra és adminisztrációra, több marad a munkára, ami pénzt hoz.",
    ticker: ["AI árajánló asszisztensek", "• Terv- és kiírás-ellenőrzés", "AI recepciósok", "• Prémium weboldalak", "Azonnali árbecslés", "• CRM-integráció", "Helyi SEO"],
    coreServices: [
      {
        num: "01", tag: "Fő · Árajánló asszisztens", tagPulse: true,
        title: "AI árajánló\nasszisztens", titleGold: "Azonnali árbecslés",
        subtitle: "Árbecslés a weboldaladon, telefonhívás nélkül.",
        desc: "A látogató árat kér. Az asszisztens felteszi azokat a kérdéseket, amiket te is feltennél (a munka jellege, méret, anyag, helyszín, határidő), majd azonnal tételes árbecslést ad, a nap 24 órájában. Csak azok keresnek meg, akik már ismerik az árat, és továbbra is szeretnék, hogy elvégezd a munkát.",
        features: ["A te munkáidra szabott kérdések", "A saját áraid alapján", "Azonnali, tételes árbecslés", "Helyszín- és megközelíthetőség-ellenőrzés", "Elérhetőséget csak a becslés után kér", "Heti 15–20 óra megtakarítás az árazáson"],
        stats: [{ label: "Elérhetőség", val: "0–24" }, { label: "Élesben", val: "4 oldalon" }, { label: "Beszélgetés", val: "Korlátlan" }],
        href: "/services/ai-estimator", cta: "Nézd meg, hogyan működik",
      },
      {
        num: "02", tag: "Új · Ajánlat-előkészítő", tagPulse: true,
        title: "Ajánlat-\nelőkészítő", titleGold: "Árazásra készen",
        subtitle: "Egy teljes ajánlatkérés átnézve, árazásra készen.",
        desc: "Gyártó és szakági cégeknek. Összeveti a tételjegyzéket, a tervlapokat és a szerződést, valószínűség szerint sorba rendezi a hibákat és hiányokat, megírja a tisztázó kérdéseket, üzemenként vagy beszállítónként szétosztja a tételeket, összeveti a javított tételjegyzékeket, és első árvázlatot ad a saját áraidból. A kollégád jóváhagyja.",
        features: ["Hibák és hiányok valószínűség szerint, forrással", "Minden felvetést jóváhagysz vagy elvetsz", "Megírt tisztázó kérdések, idegen nyelven is", "Tételek üzemenként vagy beszállítónként", "Javított tételjegyzékek soronként összevetve", "Első árvázlat Excelben"],
        stats: [{ label: "60 tételes kiírás", val: "110 mp" }, { label: "Hiba egy valódi kiírásban", val: "11" }, { label: "Eredmény", val: "Excel" }],
        href: "/services/tender-review", cta: "Nézd meg, hogyan működik",
      },
      {
        num: "03", tag: "Új · Tervolvasó", tagPulse: true,
        title: "Tervolvasó", titleGold: "Mennyiségek a tervrajzokból",
        subtitle: "Mennyiségek a tervrajzokból, összevetve a költségvetéssel.",
        desc: "Generálkivitelezőknek és költségvetés-készítőknek, akik családi házat vagy társasházat áraznak. Beolvassa az építészeti, statikai és gépészeti terveket, kiméri a helyiségeket, falakat, nyílászárókat, födémeket és a vaslistákat, majd soronként összeveti a tervező költségvetésével, így a kimaradt vagy elszámolt tételek még árazás előtt előkerülnek.",
        features: ["Építészeti, statikai és gépészeti tervek", "Helyiségek, falak, nyílászárók, födémek, vasalás", "Soronkénti összevetés a költségvetéssel", "Minden szám mellett a tervlap, a számítás és a biztonság", "A rajzon piros kerettel megjelölve", "Excel a megszokott költségvetési formában"],
        stats: [{ label: "Minden szám", val: "Forrással" }, { label: "Megjelölve", val: "A rajzon" }, { label: "Eredmény", val: "Excel" }],
        href: "/services/tender-review", cta: "Nézd meg, hogyan működik",
      },
      {
        num: "04", tag: "Új · AI recepciós", tagPulse: true,
        title: "AI\nrecepciós", titleGold: "CRM-mel összekötve",
        subtitle: "Minden hívást felvesz, és minden hívást visszaír a CRM-be.",
        desc: "Felveszi a telefont, a CRM-ből megmondja az ügyfélnek, hol tart a rendelése, megválaszolja a mindennap visszatérő kérdéseket, felveszi az új megkereséseket, és ha kell, átadja a hívást egy kollégának. Minden hívás után automatikusan rögzíti, mit szeretett volna a hívó.",
        features: ["Éjjel-nappal felveszi a hívásokat", "Rendelés állapota a CRM-ből", "Minden hívás automatikusan rögzítve", "Megválaszolja a visszatérő kérdéseket", "Felveszi az új megkereséseket", "Ha kell, kollégának adja át"],
        stats: [{ label: "Válaszol", val: "0–24" }, { label: "CRM", val: "Olvas és ír" }, { label: "Elmaradt hívás", val: "0" }],
        href: "/services/ai-receptionist", cta: "Nézd meg, hogyan működik",
      },
      {
        num: "05", tag: "Weboldal", tagPulse: false,
        title: "Prémium\nweboldal", titleGold: "Konverzióra építve",
        subtitle: "Igényes weboldalak vállalkozásoknak, beépített helyi SEO-val.",
        desc: "Egyedi, villámgyors weboldal, amin első ránézésre látszik, hogy a környéken te vagy a minőségi választás. Next.js vagy Framer alapon, arra tervezve, hogy a látogatókból ajánlatkérés legyen, és az első naptól optimalizálva a helyi Google-keresésre és a Google Cégprofilra.",
        features: ["Egyedi, igényes dizájn", "Mobilra optimalizált, 2 mp alatti betöltés", "Érdeklődő-gyűjtés és kapcsolati űrlapok", "Beépített helyi SEO az első naptól", "Google Cégprofil beállítás", "Analitika és konverziómérés"],
        stats: [{ label: "PageSpeed pont", val: "100/100" }, { label: "Betöltés", val: "<0,8 mp" }, { label: "SEO pont", val: "100/100" }],
        href: "/services/website-design", cta: "Részletek",
      },
      {
        num: "06", tag: "Autószervizeknek", tagPulse: true,
        title: "Árajánlat-\nkészítő", titleGold: "Tételesen, percek alatt",
        subtitle: "A műhelyednek: tételes árajánlat alvázszámból, percek alatt, árakért telefonálgatás nélkül.",
        desc: "Beírod az alvázszámot és kiválasztod a munkát. Beazonosítja a pontos járművet, a te márkáidból ajánl alkatrészt, rákérdez, ha valami nem dönthető el az alvázszámból, hozzáadja az óradíjadat és az ÁFA-t, és kész PDF-árajánlatot ad.",
        features: ["Jármű-azonosítás alvázszámból", "A te márkáidat ajánlja", "Rákérdez, nem találgat", "A te áraid és óradíjad", "Megjegyzi az árjavításaidat", "Tételes PDF-árajánlat"],
        stats: [{ label: "Az ajánlat alapja", val: "Alvázszám" }, { label: "Testre szabva", val: "A szervizedre" }, { label: "Eredmény", val: "PDF" }],
        href: "/services/mechanic-quoting", cta: "Nézd meg, hogyan működik",
      },
    ],
    extraServices: [
      { title: "AI véleménygyűjtő", desc: "A munka után az AI automatikusan ír az ügyfélnek, és megkéri, hogy 1-től 10-ig értékelje a munkát. 7 vagy több? Kap egy linket, ahol Google-értékelést írhat. 7 alatt? Az AI rákérdez, mi nem tetszett, így még azelőtt rendezheted, hogy nyilvános panasz lenne belőle." },
      { title: "AI chatbot", desc: "Chatbot a weboldaladon, amely minden látogatót fogad, rákérdez a keretre, a helyszínre és a határidőre, udvariasan elutasítja, aki nem illik hozzád, a komoly megkereséseket pedig egyből a postaládádba küldi, éjjel-nappal." },
      { title: "SEO és Google Cégprofil", desc: "Már van weboldalad? A helyi SEO-t és a Google Cégprofil beállítását külön is elvállaljuk, kulcsszó-stratégia, tartalom, helyi említések és havi riportok, hogy feljebb kerülj a környékeden." },
      { title: "Egyedi kimutatás", desc: "Egyedi felület, ahol minden munkád rendben, egy helyen látszik. Automatikusan rögzíti, mi készült el, mikor, mennyi lett a végösszeg, és hogyan értékelte az ügyfél. Tiszta képet ad a napi működésről, megmutatja, melyik munka hozza a legtöbbet, és minimálisra csökkenti a papírmunkát." },
    ],
    alsoEyebrow: "Szintén elérhető",
    alsoTitle: "Ezeket is elkészítem",
    diffTitle: "Más ötlet jár a fejedben?",
    diffDesc: "Ha olyasmire van szükséged, ami itt nem szerepel, keress meg nyugodtan. Ha időt spórol a cégednek, jó eséllyel meg tudom építeni.",
    bookCall: "Foglalj időpontot →",
    callNote: "Inkább beszélnél?",
    pricingEyebrow: "Árazás",
    pricingTitleA: "Egyszerű csomagok.",
    pricingTitleB: "Rád szabott ár.",
    pricingDesc: "Az ár a szakmádtól és az igényeidtől függ. Egy rövid beszélgetés után írásban megkapod, mielőtt bármi elindulna.",
    plans: [
      {
        name: "Árajánló asszisztens", desc: "Éjjel-nappal dolgozó értékesítő a meglévő weboldaladon.",
        price: "Egyedi ár", priceNote: "beállítás + havi díj", monthly: "Írásban, mielőtt bármi elindul",
        features: [
          "AI chatbot, ami a saját áraid alapján azonnal becslést ad",
          "Minden érdeklődőnél rákérdez a munkára, a keretre, a helyszínre és a határidőre",
          "Udvariasan kiszűri a komolytalanokat, mielőtt hozzád jutnának",
          "Automatikus utánkövetés, hogy ne hűljön ki az érdeklődő",
          "CRM-hez kötve, minden érdeklődő automatikusan rögzítve",
          "Azonnali értesítés e-mailben vagy SMS-ben",
          "Több nyelven is működik",
          "Beállítás, frissítések és támogatás benne van",
        ],
      },
      {
        name: "Weboldal + asszisztens", desc: "Prémium weboldal, ami munkát hoz, beépített asszisztenssel.",
        price: "Egyedi ár", priceNote: "egyszeri + havi díj", monthly: "Írásban, mielőtt bármi elindul",
        features: [
          "Egyedi dizájn, amivel te leszel a prémium választás a környéken",
          "Villámgyors és mobilra optimalizált",
          "Beépített helyi SEO az első naptól",
          "Google Cégprofil beállítás",
          "CRM-hez kötött ajánlatkérő űrlapok",
          "Blogot és fotókat te magad is egyszerűen frissíthetsz",
          "Analitika és konverziómérés",
          "Az árajánló asszisztens minden funkciója, beépítve",
        ],
      },
      {
        name: "Egyedi", desc: "Bármi más, amit meg kell építeni.",
        price: "Egyedi ajánlat", priceNote: "", monthly: "Az igényeidhez árazva",
        features: ["AI recepciós", "Terv- és kiírás-ellenőrzés", "AI véleménygyűjtő", "Egyedi kimutatás"],
      },
    ],
    foundingOffer: "",
    pricingCta: "Foglalj időpontot →",
    ctaTitleA: "NEM VAGY BIZTOS BENNE,",
    ctaTitleB: "MELYIK KELL NEKED?",
    ctaSub: "Foglalj egy rövid hívást, mondd el, mivel foglalkozol, és őszintén megmondom, melyik hozza a legtöbbet.",
    ctaBtn: "Foglalj időpontot →",
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
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              {c.ctaBtn}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
