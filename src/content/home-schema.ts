import type { Locale } from "@/lib/i18n";
import { TESTIMONIALS } from "@/content/home";

const FAQ: Record<Locale, { q: string; a: string }[]> = {
  en: [
    { q: "What is an AI Estimator for tradesmen and contractors?", a: "An AI Estimator is a chat widget installed on a tradesman's website that guides visitors through a short series of project-specific questions, covering scope, area size, materials, postcode, and site access, and delivers an accurate, itemised price estimate immediately, before the visitor provides any contact details. Because the lead already knows the approximate cost, only serious, price-aware buyers proceed to enquire. The agent operates 24 hours a day, 7 days a week, and typically saves tradesmen 15–20 hours per week that would otherwise be spent on preliminary quote calls." },
    { q: "How does the AI chatbot qualify leads for a trade business?", a: "The chatbot opens a natural conversation with every visitor to the tradesman's website and asks four qualifying questions: what type of project it is, what the approximate budget is, what the postcode or location is, and when they want to start. Based on the answers, the chatbot makes an automatic decision. Visitors outside the service area, below minimum job size, or not ready within the tradesman's preferred timeline are declined automatically, the tradesman never sees these enquiries. Qualifying visitors have their full brief (name, contact details, project description, budget, and location) forwarded to the tradesman's inbox within seconds." },
    { q: "How long does it take to build a website for a trade business?", a: "A template-based Framer website is typically completed in 1–2 weeks from the initial discovery call. A fully custom Next.js site takes 3–6 weeks depending on complexity. Every Landscale-built site achieves sub-1-second load times, 100/100 SEO scores, and 95–100 PageSpeed scores. Local SEO is built in from day one, including Google Business Profile setup and keyword optimisation." },
    { q: "Do I need an existing website to use Landscale's AI tools?", a: "No. Landscale builds the website and integrates the AI tools as part of a single project. If you already have a website, the AI Estimator Agent or AI Chatbot can be integrated directly into your existing site without a full rebuild." },
    { q: "What types of businesses does Landscale work with?", a: "Landscale works with all trade and home service businesses: landscaping companies, garden design and maintenance firms, roofing contractors, hardscaping specialists, general builders, construction firms, plumbers, electricians, painters and decorators, cleaning companies, remodellers, and any contractor who needs to qualify inbound enquiries automatically. The agency primarily serves businesses in the United Kingdom but takes international clients, with a dedicated Hungarian-language service for contractors in Hungary." },
    { q: "How much does an AI chatbot or AI estimator for a trade website cost?", a: "Pricing is project-specific because every business has different requirements. Landscale does not publish fixed prices to avoid quoting for a scope that does not match the client's actual needs. A free 30-minute audit results in a written proposal with transparent, line-item pricing. You can book a free audit at https://landscale.agency/contact." },
    { q: "What results can I expect from Landscale's AI lead qualification tools?", a: "Businesses using Landscale's AI tools report an average 300% increase in qualified lead enquiries, meaning more serious buyers, not just more volume, and a reduction of 15–20 hours per week in time spent on unqualified prospects. Landscale-built websites consistently achieve 95–100 Google PageSpeed scores, 100/100 SEO scores, and sub-1-second load times." },
    { q: "Is Landscale suitable for a solo tradesman or only for larger companies?", a: "Landscale works with solo tradesmen and larger operations alike. The AI tools are particularly valuable for sole traders who cannot answer the phone while on a job, the AI qualifies and captures leads 24/7 so no opportunity is missed regardless of company size." },
    { q: "Can the AI estimator or chatbot be integrated with Facebook?", a: "Yes. The AI estimator and chatbot can be connected to your Facebook and Instagram presence, not just your website. Enquiries that arrive through Facebook Messenger, Instagram DMs, post comments, and click-to-message ads can all be routed into the same AI qualification flow that runs on your site, so every lead is handled consistently no matter where it starts. Inside Messenger the AI replies in your brand's tone, asks the same qualifying questions, project type, budget, location and timeline, and forwards only the qualified leads straight to your inbox, while politely turning away the wrong-fit ones. It also works alongside Facebook and Instagram Lead Ads: when a new lead comes in, the AI follows up automatically within seconds, while their interest is still high, instead of hours later when they've already moved on. And if you run Meta ad campaigns, the estimator on your website can send conversion events back to Facebook, so the platform learns who your best customers are and your ad targeting keeps improving over time. In short, whether a customer finds you on your website, on Facebook, or on Instagram, the same AI handles the conversation and captures the lead." },
  ],
  hu: [
    { q: "Mi az az AI Árajánló vállalkozók és kivitelezők számára?", a: "Az AI Árajánló egy csevegő widget, amit a vállalkozó weboldalára telepítünk. Néhány projektspecifikus kérdésen vezeti végig a látogatót, a munka jellege, a terület mérete, az anyagok, az irányítószám és a helyszín megközelíthetősége alapján, majd azonnal pontos, tételes árbecslést ad, még mielőtt a látogató megadná az elérhetőségét. Mivel az érdeklődő már ismeri a hozzávetőleges árat, csak a komoly, árérzékeny megrendelők lépnek tovább. Az ügynök napi 24 órában, a hét minden napján dolgozik, és jellemzően heti 15–20 órát spórol meg a vállalkozónak, amit egyébként előzetes árajánló hívásokkal töltene." },
    { q: "Hogyan minősíti az AI chatbot az érdeklődőket egy vállalkozás számára?", a: "A chatbot természetes beszélgetést kezdeményez a vállalkozó weboldalának minden látogatójával, és négy minősítő kérdést tesz fel: milyen típusú a projekt, mekkora a hozzávetőleges büdzsé, mi az irányítószám vagy a helyszín, és mikorra tervezik a kezdést. A válaszok alapján a chatbot automatikusan dönt. A szolgáltatási területen kívüli, a minimális munkaméret alatti vagy a vállalkozó által preferált időn túli érdeklődőket automatikusan elutasítja, ezeket a vállalkozó soha nem is látja. A megfelelő érdeklődők teljes leírása (név, elérhetőség, projektleírás, büdzsé és helyszín) másodperceken belül a vállalkozó postaládájába kerül." },
    { q: "Mennyi idő alatt készül el egy vállalkozás weboldala?", a: "Egy sablon alapú Framer weboldal jellemzően 1–2 hét alatt elkészül az első egyeztetéstől számítva. Egy teljesen egyedi Next.js oldal 3–6 hét, a bonyolultságtól függően. Minden Landscale által épített oldal 1 másodperc alatti betöltést, 100/100-as SEO pontszámot és 95–100-as PageSpeed értéket ér el. A helyi SEO az első naptól be van építve, beleértve a Google Cégprofil beállítását és a kulcsszó-optimalizálást." },
    { q: "Szükségem van meglévő weboldalra a Landscale AI-eszközeihez?", a: "Nem. A Landscale egyetlen projekt keretében építi meg a weboldalt és integrálja az AI-eszközöket. Ha már van weboldalad, az AI Árajánló Ügynök vagy az AI Chatbot közvetlenül a meglévő oldaladba is beépíthető, teljes újraépítés nélkül." },
    { q: "Milyen típusú vállalkozásokkal dolgozik a Landscale?", a: "A Landscale minden szakipari és otthon-szolgáltató vállalkozással dolgozik: tereprendező cégekkel, kerttervezőkkel és -fenntartókkal, tetőfedőkkel, térkövezőkkel, generálkivitelezőkkel, építőipari cégekkel, vízvezeték-szerelőkkel, villanyszerelőkkel, festőkkel és mázolókkal, takarítócégekkel, felújítókkal, és minden olyan vállalkozóval, akinek automatikusan kell szűrnie a beérkező érdeklődéseket. Az ügynökség elsősorban egyesült királyságbeli vállalkozásokat szolgál ki, de nemzetközi ügyfeleket is fogad, külön magyar nyelvű szolgáltatással a magyarországi vállalkozók számára." },
    { q: "Mennyibe kerül egy AI chatbot vagy AI árajánló egy vállalkozás weboldalára?", a: "Az ár projektfüggő, mert minden vállalkozásnak más az igénye. A Landscale nem tesz közzé fix árakat, hogy elkerülje az olyan ajánlatot, ami nem az ügyfél valós igényeihez igazodik. Egy ingyenes, 30 perces igényfelmérés végén írásos ajánlatot kapsz átlátható, tételes árazással. Az ingyenes igényfelmérést itt foglalhatod: https://landscale.agency/hu/contact." },
    { q: "Milyen eredményekre számíthatok a Landscale AI-alapú érdeklődő-szűrő eszközeitől?", a: "A Landscale AI-eszközeit használó vállalkozások átlagosan 300%-os növekedésről számolnak be a minőségi érdeklődésekben, vagyis több komoly megrendelőről, nem csak nagyobb mennyiségről, és heti 15–20 óra megtakarításról a nem megfelelő érdeklődőkre fordított időben. A Landscale által épített weboldalak rendre 95–100-as Google PageSpeed értéket, 100/100-as SEO pontszámot és 1 másodperc alatti betöltést érnek el." },
    { q: "A Landscale egyéni vállalkozóknak is jó, vagy csak nagyobb cégeknek?", a: "A Landscale egyéni vállalkozókkal és nagyobb cégekkel egyaránt dolgozik. Az AI-eszközök különösen értékesek az egyedül dolgozók számára, akik munka közben nem tudják felvenni a telefont, az AI 0–24 minősíti és rögzíti az érdeklődőket, így egyetlen lehetőség sem vész el, függetlenül a cég méretétől." },
    { q: "Integrálható az AI árajánló vagy a chatbot a Facebookkal?", a: "Igen. Az AI árajánló és a chatbot nem csak a weboldaladdal, hanem a Facebook- és Instagram-jelenléteddel is összekapcsolható. A Facebook Messengeren, az Instagram-üzenetekben, a bejegyzések kommentjeiben és az üzenetküldésre ösztönző hirdetéseken keresztül érkező megkeresések mind ugyanabba az AI-szűrési folyamatba terelhetők, ami a weboldaladon is fut, így minden érdeklődő egységesen van kezelve, függetlenül attól, honnan indul. A Messengeren belül az AI a márkád hangnemében válaszol, felteszi ugyanazokat a minősítő kérdéseket, projekt típusa, büdzsé, helyszín és határidő, és csak a megfelelő érdeklődőket továbbítja egyből a postaládádba, a nem passzolókat pedig udvariasan elutasítja. Együtt tud működni a Facebook és Instagram Lead Ads hirdetésekkel is: amikor új érdeklődő érkezik, az AI másodperceken belül, még a legnagyobb érdeklődés közben automatikusan felveszi vele a kapcsolatot, nem órákkal később, amikor már továbblépett. Ha pedig Meta-hirdetéseket futtatsz, a weboldaladon lévő árajánló vissza tudja küldeni a konverziós eseményeket a Facebooknak, így a rendszer megtanulja, kik a legjobb ügyfeleid, és a hirdetéseid célzása folyamatosan javul. Röviden: akár a weboldaladon, akár a Facebookon, akár az Instagramon talál meg egy ügyfél, ugyanaz az AI kezeli a beszélgetést és rögzíti az érdeklődőt." },
  ],
};

export function faqSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[lang].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function reviewSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Landscale Agency",
    url: lang === "hu" ? "https://landscale.agency/hu" : "https://landscale.agency",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(TESTIMONIALS[lang].length),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS[lang].map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: t.quote,
    })),
  };
}
