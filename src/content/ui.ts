import type { Locale } from "@/lib/i18n";

/** Phone number shown per locale (UK for English, Hungarian for /hu). */
export const PHONE: Record<Locale, { display: string; href: string }> = {
  en: { display: "+44 7478 075473", href: "tel:+447478075473" },
  hu: { display: "+36 70 250 1739", href: "tel:+36702501739" },
};

export const EMAIL = "milan@landscale.net";

type ServiceItem = { href: string; label: string; desc: string; tag: string | null };

type NavDict = {
  services: ServiceItem[];
  serviceTag: string; // "Core"
  links: { href: string; label: string }[];
  viewAll: string;
  freeAudit: string;
  bookFreeAudit: string;
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
      { href: "/services/ai-estimator", label: "AI Estimator Agent", desc: "Instant project quotes on your site, no call needed", tag: "Core" },
      { href: "/services/ai-chatbot", label: "AI Chatbot", desc: "Qualifies leads 24/7, filters out time-wasters", tag: null },
      { href: "/services/website-design", label: "Website Design", desc: "Luxury sites with local SEO built in", tag: null },
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
    freeAudit: "Free Audit",
    bookFreeAudit: "Book Free Audit",
    switchLabel: "HU",
    otherSiteLabel: "Magyar oldal",
    otherSiteFlag: "🇭🇺",
  },
  hu: {
    services: [
      { href: "/services/ai-estimator", label: "AI Árajánló Ügynök", desc: "Azonnali árajánlat a weboldaladon, hívás nélkül", tag: "Fő" },
      { href: "/services/ai-chatbot", label: "AI Chatbot", desc: "0–24 szűri az érdeklődőket, kiszórja a komolytalanokat", tag: null },
      { href: "/services/website-design", label: "Weboldal Készítés", desc: "Igényes oldalak beépített helyi SEO-val", tag: null },
      { href: "/services/seo-marketing", label: "Helyi SEO", desc: "Legyél első, amikor a helyi ügyfelek a szakmádra keresnek", tag: null },
    ],
    serviceTag: "Fő",
    links: [
      { href: "/", label: "Főoldal" },
      { href: "/case-studies", label: "Referenciák" },
      { href: "/about", label: "Rólam" },
      { href: "/contact", label: "Kapcsolat" },
    ],
    viewAll: "Összes szolgáltatás",
    freeAudit: "Igényfelmérés",
    bookFreeAudit: "Ingyenes igényfelmérés",
    switchLabel: "EN",
    otherSiteLabel: "English site",
    otherSiteFlag: "🇬🇧",
  },
};

export const FOOTER: Record<Locale, FooterDict> = {
  en: {
    ctaHeadA: "Ready to dominate your ",
    ctaHeadB: "local market?",
    ctaSub: "Book a free 30-minute audit. I'll show you exactly where you're losing leads and how to fix it, no obligation.",
    ctaButton: "Book Your Free Audit",
    brandTagline: "Premium websites & AI automation for trade businesses.",
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
      { href: "/services/ai-estimator", label: "AI Estimator Agent" },
      { href: "/services/ai-chatbot", label: "AI Chatbot" },
      { href: "/services/website-design", label: "Premium Website" },
      { href: "/services/seo-marketing", label: "Local SEO" },
      { href: "/services", label: "All Services" },
    ],
    connectTitle: "Connect",
    builtWith: "Built with care.",
    coverage: "UK & Worldwide",
  },
  hu: {
    ctaHeadA: "Készen állsz uralni a ",
    ctaHeadB: "helyi piacodat?",
    ctaSub: "Foglalj egy ingyenes, 30 perces igényfelmérést. Pontosan megmutatom, hol veszíted el a megrendeléseket, és hogyan hozd helyre, kötelezettség nélkül.",
    ctaButton: "Foglald az ingyenes igényfelmérést",
    brandTagline: "Prémium weboldalak és AI-automatizálás vállalkozóknak.",
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
      { href: "/services/ai-estimator", label: "AI Árajánló Ügynök" },
      { href: "/services/ai-chatbot", label: "AI Chatbot" },
      { href: "/services/website-design", label: "Prémium Weboldal" },
      { href: "/services/seo-marketing", label: "Helyi SEO" },
      { href: "/services", label: "Összes szolgáltatás" },
    ],
    connectTitle: "Elérhetőség",
    builtWith: "Gonddal építve.",
    coverage: "Magyarország & világszerte",
  },
};
