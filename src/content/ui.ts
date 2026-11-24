import type { Locale } from "@/lib/i18n";

/** One Hungarian number for both languages (the UK number is no longer in use). */
export const PHONE: Record<Locale, { display: string; href: string }> = {
  en: { display: "+36 70 250 1739", href: "tel:+36702501739" },
  hu: { display: "+36 70 250 1739", href: "tel:+36702501739" },
};

export const EMAIL = "milan@landscale.net";

/** Calendly booking page, the main call to action across the site. */
export const CALENDLY_URL = "https://calendly.com/pirint-milan/quoting-agent-sample";

/** Facebook Messenger chat with Milán, offered only on the Contact page. */
export const MESSENGER_URL = "https://m.me/100083279266241";

/** Registered business details, shown in the footer as a trust signal. */
export const BUSINESS = {
  name: "Pirint Frigyes E.V.",
  taxId: "91678270-1-35",
  regNo: "61696235",
  town: { en: "Rakamaz, Hungary", hu: "Rakamaz" } as Record<Locale, string>,
};

type ServiceItem = { href: string; label: string; desc: string; tag: string | null };

type NavDict = {
  services: ServiceItem[];
  serviceTag: string; // "Core"
  links: { href: string; label: string }[];
  viewAll: string;
  messageMe: string; // short nav button
  messageMeLong: string; // mobile menu button
  switchLabel: string; // label of the toggle target language
  otherSiteLabel: string; // mobile: "Magyar oldal" / "English site"
  otherSiteFlag: string;
};

type FooterDict = {
  ctaHeadA: string;
  ctaHeadB: string;
  ctaSub: string;
  ctaButton: string;
  brandTagline: string;
  quickLinksTitle: string;
  quickLinks: { href: string; label: string }[];
  servicesTitle: string;
  services: { href: string; label: string }[];
  connectTitle: string;
  builtWith: string;
  coverage: string;
};

export const NAV: Record<Locale, NavDict> = {
  en: {
    services: [
      { href: "/services/ai-estimator", label: "AI Quoting Assistant", desc: "Instant estimates on your site, no call needed", tag: "Core" },
      { href: "/services/tender-review", label: "Plan & Tender Review", desc: "Quantities and discrepancies from plans and tenders", tag: "New" },
      { href: "/services/ai-receptionist", label: "AI Receptionist", desc: "Answers your calls and updates your CRM", tag: "New" },
      { href: "/services/mechanic-quoting", label: "Quote Builder for Garages", desc: "Itemised quotes from a VIN in minutes", tag: null },
      { href: "/services/ai-chatbot", label: "AI Chatbot", desc: "Qualifies leads 24/7, filters out time-wasters", tag: null },
      { href: "/services/website-design", label: "Website Design", desc: "Fast, premium sites with local SEO built in", tag: null },
      { href: "/services/seo-marketing", label: "Local SEO", desc: "Rank #1 when local clients search for your trade", tag: null },
    ],
    serviceTag: "Core",
    links: [
      { href: "/", label: "Home" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    viewAll: "View all services",
    messageMe: "Book a Call",
    messageMeLong: "Book a Free Call",
    switchLabel: "HU",
    otherSiteLabel: "Magyar oldal",
    otherSiteFlag: "🇭🇺",
  },
  hu: {
    services: [
      { href: "/services/ai-estimator", label: "AI árajánló asszisztens", desc: "Azonnali árbecslés a weboldaladon, telefon nélkül", tag: "Fő" },
      { href: "/services/tender-review", label: "Terv- és kiírás-ellenőrzés", desc: "Mennyiségek és eltérések tervekből, ajánlatkérésekből", tag: "Új" },
      { href: "/services/ai-receptionist", label: "AI recepciós", desc: "Felveszi a hívásokat, és vezeti a CRM-et", tag: "Új" },
      { href: "/services/mechanic-quoting", label: "Árajánlat-készítő szervizeknek", desc: "Tételes árajánlat alvázszámból, percek alatt", tag: null },
      { href: "/services/ai-chatbot", label: "AI chatbot", desc: "Éjjel-nappal megszűri az érdeklődőket", tag: null },
      { href: "/services/website-design", label: "Weboldalkészítés", desc: "Igényes, gyors oldalak beépített helyi SEO-val", tag: null },
      { href: "/services/seo-marketing", label: "Helyi SEO", desc: "Legyél elöl, amikor a környékeden a szakmádra keresnek", tag: null },
    ],
    serviceTag: "Fő",
    links: [
      { href: "/", label: "Főoldal" },
      { href: "/case-studies", label: "Referenciák" },
      { href: "/about", label: "Rólam" },
      { href: "/contact", label: "Kapcsolat" },
    ],
    viewAll: "Összes szolgáltatás",
    messageMe: "Időpontfoglalás",
    messageMeLong: "Foglalj időpontot",
    switchLabel: "EN",
    otherSiteLabel: "English site",
    otherSiteFlag: "🇬🇧",
  },
};

export const FOOTER: Record<Locale, FooterDict> = {
  en: {
    ctaHeadA: "Let's take quoting ",
    ctaHeadB: "off your plate.",
    ctaSub: "Book a short call. Tell me how your business runs and I'll show you where it would save you time.",
    ctaButton: "Book a Free Call",
    brandTagline: "AI quoting assistants, AI receptionists and websites for trade and construction businesses.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    servicesTitle: "Services",
    services: [
      { href: "/services/ai-estimator", label: "AI Quoting Assistant" },
      { href: "/services/tender-review", label: "Plan & Tender Review" },
      { href: "/services/ai-receptionist", label: "AI Receptionist" },
      { href: "/services/mechanic-quoting", label: "Quote Builder for Garages" },
      { href: "/services/ai-chatbot", label: "AI Chatbot" },
      { href: "/services/website-design", label: "Premium Website" },
      { href: "/services/seo-marketing", label: "Local SEO" },
      { href: "/services", label: "All Services" },
    ],
    connectTitle: "Connect",
    builtWith: "Built with care.",
    coverage: "Based in Hungary · clients in HU, AT & UK",
  },
  hu: {
    ctaHeadA: "Vegyük le a válladról ",
    ctaHeadB: "az árazást.",
    ctaSub: "Foglalj egy rövid hívást. Mondd el, hogyan működik a vállalkozásod, és megmutatom, hol spórolhatnál időt.",
    ctaButton: "Foglalj időpontot",
    brandTagline: "AI árajánló asszisztensek, AI recepciósok és weboldalak szakipari és építőipari cégeknek.",
    quickLinksTitle: "Gyors linkek",
    quickLinks: [
      { href: "/", label: "Főoldal" },
      { href: "/services", label: "Szolgáltatások" },
      { href: "/case-studies", label: "Referenciák" },
      { href: "/about", label: "Rólam" },
      { href: "/contact", label: "Kapcsolat" },
    ],
    servicesTitle: "Szolgáltatások",
    services: [
      { href: "/services/ai-estimator", label: "AI árajánló asszisztens" },
      { href: "/services/tender-review", label: "Terv- és kiírás-ellenőrzés" },
      { href: "/services/ai-receptionist", label: "AI recepciós" },
      { href: "/services/mechanic-quoting", label: "Árajánlat-készítő szervizeknek" },
      { href: "/services/ai-chatbot", label: "AI chatbot" },
      { href: "/services/website-design", label: "Prémium weboldal" },
      { href: "/services/seo-marketing", label: "Helyi SEO" },
      { href: "/services", label: "Összes szolgáltatás" },
    ],
    connectTitle: "Elérhetőség",
    builtWith: "Gondos munkával.",
    coverage: "Magyarországról · ügyfelek itthon, Ausztriában és Angliában",
  },
};
