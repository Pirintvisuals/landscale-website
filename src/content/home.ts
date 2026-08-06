import type { Locale } from "@/lib/i18n";

export type HomeDict = {
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
    scroll: string;
  };
  stats: { value: number; suffix: string; label: string; desc: string }[];
  problems: {
    eyebrow: string;
    headA: string;
    headB: string;
    items: { num: string; title: string; desc: string }[];
  };
  testimonials: { headA: string; headB: string };
  services: {
    eyebrow: string;
    headA: string;
    headB: string;
    learnMore: string;
    footNote: string;
    seeAll: string;
    availabilityLabel: string;
    responseLabel: string;
    cards: {
      num: string; tag: string; href: string; title: string; italic: string; desc: string;
      features: string[];
      stats: { val: string; label: string }[];
    }[];
  };
  why: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    italic: string;
    story: string;
    pillars: { num: string; title: string; desc: string }[];
  };
  trust: {
    eyebrow: string;
    headA: string;
    headB: string;
    items: { value: string; label: string; desc: string }[];
  };
};

export const TESTIMONIALS: Record<Locale, { quote: string; name: string; company: string; stars: number; logo: string }[]> = {
  en: [
    { quote: "We are very satisfied with Milán's work. We received a modern, clean, and refined website that showcases NM Bau's services and the quality of our work beautifully. The collaboration was smooth, he responded quickly to our requests, and the end result reflects exactly the professional image we wanted to present. We highly recommend him!", name: "Nagy Máté", company: "NM Bau", stars: 5, logo: "/images/nmbau-logo.png" },
    { quote: "I was very satisfied with Milán. In my opinion, he is light-years ahead of other web developers in skill. I wholeheartedly recommend him to everyone. He built a custom price calculator for my site that made it much easier to select the quality jobs coming in. It saved us a huge amount of time, energy, and money.", name: "Polyák Zoltán", company: "Kazán Szerviz Kecskemét", stars: 5, logo: "" },
    { quote: "Milan built our new website with great care and attention to every detail. His input gave the site an aesthetic and professional look that our new clients have spoken highly of. I recommend him to everyone who values a quality online presence.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5, logo: "/images/lavotha-logo.jpg" },
    { quote: "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen. It's already paying for itself in the quality of leads we're getting.", name: "Basil", company: "Mimosa Gardens", stars: 5, logo: "/images/mimosa-logo.jpg" },
    { quote: "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients. Working with him was smooth from start to finish, highly recommend.", name: "Péter Mantlik", company: "ViszCAD", stars: 5, logo: "/images/viszcad-logo.png" },
  ],
  hu: [
    { quote: "Nagyon elégedettek vagyunk Milán munkájával. Modern, letisztult és igényes weboldalt kaptunk, ami gyönyörűen bemutatja az NM Bau szolgáltatásait és a munkánk minőségét. Az együttműködés gördülékeny volt, gyorsan reagált a kéréseinkre, a végeredmény pedig pontosan azt a profi képet tükrözi, amit közvetíteni szerettünk volna. Csak ajánlani tudjuk!", name: "Nagy Máté", company: "NM Bau", stars: 5, logo: "/images/nmbau-logo.png" },
    { quote: "Nagyon elégedett voltam Milánnal. Szerintem szakmailag fényévekkel a többi weboldalkészítő előtt jár. Teljes szívből ajánlom mindenkinek. Egyedi árkalkulátort épített az oldalamra, amivel sokkal könnyebb kiválasztani a hozzám érkező jó munkákat. Rengeteg időt, energiát és pénzt spóroltunk vele.", name: "Polyák Zoltán", company: "Kazán Szerviz Kecskemét", stars: 5, logo: "" },
    { quote: "Milán nagy gonddal, a legapróbb részletekre is figyelve építette meg az új weboldalunkat. A meglátásai esztétikus és profi megjelenést adtak az oldalnak, amit az új ügyfeleink is dicsérnek. Mindenkinek ajánlom, akinek fontos az igényes online jelenlét.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5, logo: "/images/lavotha-logo.jpg" },
    { quote: "A weboldal lenyűgöző, és azonnal prémium szolgáltatásként pozicionál minket. Több ügyfelünk is azt mondta, ez a legprofibb kertészeti oldal, amit valaha láttak. Már most megtérül abban, hogy mennyivel jobb minőségű érdeklődők keresnek meg.", name: "Basil", company: "Mimosa Gardens", stars: 5, logo: "/images/mimosa-logo.jpg" },
    { quote: "Milán pontosan azt szállította, amire szükségünk volt, méghozzá rekordidő alatt. Az oldal gyors, profi, és segített jobb ügyfeleket vonzani. Az elejétől a végéig gördülékeny volt vele a munka, csak ajánlani tudom.", name: "Péter Mantlik", company: "ViszCAD", stars: 5, logo: "/images/viszcad-logo.png" },
  ],
};

export const homeContent: Record<Locale, HomeDict> = {
  en: {
    hero: {
      eyebrow: "AI-Powered Lead Qualification for Tradesmen",
      line1: "TRADESMEN",
      line2: "STOP CHASING",
      line3: "DEAD LEADS.",
      sub: "We build premium websites with AI-powered lead filtering, intelligent estimator agents that qualify leads and give instant quotes, so you only talk to serious buyers.",
      ctaPrimary: "Get Your Free Audit",
      ctaSecondary: "See Our Work",
      trust: "Trusted by trade businesses",
      scroll: "Scroll",
    },
    stats: [
      { value: 85, suffix: "%", label: "Time Saved on Lead Qualifying", desc: "Stop wasting hours on tyre-kickers. Our AI filters them before they reach you." },
      { value: 300, suffix: "%", label: "Average Increase in Qualified Leads", desc: "Not just more leads, better ones. Higher budgets, clearer briefs, faster decisions." },
      { value: 24, suffix: "/7", label: "Hours Your AI Works For You", desc: "While you sleep, your AI is qualifying leads, answering questions, booking calls." },
      { value: 6, suffix: "+", label: "Live Projects Running Right Now", desc: "Real businesses, real results, including a live AI quoting system in production. Every project is proven in the market." },
    ],
    problems: {
      eyebrow: "Sound Familiar?",
      headA: "The Problems",
      headB: "Holding You Back",
      items: [
        { num: "01", title: "Your Website Isn't Generating Leads", desc: "You've got a website, but it collects digital dust. Visitors come, they leave, you never hear from them." },
        { num: "02", title: "You Waste Hours on Unqualified Leads", desc: "Time-wasters who want the cheapest job, won't commit, or ghost you after quotes. Your time is worth more." },
        { num: "03", title: "You're Invisible on Google", desc: "Your competitors show up first when local customers search. You're on page 3, practically invisible." },
      ],
    },
    testimonials: { headA: "WHAT CLIENTS", headB: "SAY" },
    services: {
      eyebrow: "What We Do",
      headA: "Everything You Need",
      headB: "Under One Roof",
      learnMore: "Learn More →",
      footNote: "Looking for something else? We also build AI Review Agents, AI Receptionists, Operations Dashboards, and more.",
      seeAll: "See All Services →",
      availabilityLabel: "Availability",
      responseLabel: "Response",
      cards: [
        {
          num: "01", tag: "AI Estimator", href: "/services/ai-estimator",
          title: "AI Estimator Agent",
          italic: "Instant project quotes, no phone call needed.",
          desc: "Visitors ask for a quote. The AI collects area, materials, postcode and timeline, then gives an accurate estimate immediately. You hear from leads who already know the price.",
          features: ["Project-specific questions", "Instant line-item estimate", "Contact collected after quote", "Saves 15–20 hrs/week"],
          stats: [{ val: "24/7", label: "Availability" }, { val: "<0.8s", label: "Response" }, { val: "0", label: "Missed leads" }],
        },
        {
          num: "02", tag: "AI Chatbot", href: "/services/ai-chatbot",
          title: "AI Chatbot",
          italic: "Qualifies leads 24/7, filters out time-wasters.",
          desc: "The chatbot greets every visitor, checks budget, location and timeline, and makes a decision. Wrong fit? It declines politely. Right fit? Their details land straight in your inbox.",
          features: ["Budget & location check", "Automatic lead scoring", "Declines bad fits politely", "Instant alert to you"],
          stats: [{ val: "+300%", label: "Qualified leads" }, { val: "<0.8s", label: "Response" }, { val: "0", label: "Junk leads" }],
        },
        {
          num: "03", tag: "Website", href: "/services/website-design",
          title: "Premium Website",
          italic: "Built to convert, with local SEO included.",
          desc: "A bespoke, fast-loading website that positions you as the premium choice. Luxury design, smart lead capture, local SEO and Google Business Profile setup from day one.",
          features: ["Bespoke luxury design", "<0.8s load time", "Local SEO built in", "Google Business setup"],
          stats: [{ val: "100", label: "PageSpeed" }, { val: "<0.8s", label: "Load time" }, { val: "100", label: "SEO Score" }],
        },
      ],
    },
    why: {
      eyebrow: "Why Me",
      line1: "WHY ELITE",
      line2: "TRADESMEN",
      line3: "CHOOSE ME",
      italic: "I grew up around tradespeople. I understand your industry at a level a generalist agency never could.",
      story: "My story →",
      pillars: [
        { num: "01", title: "Deep Industry Knowledge", desc: "My family are tradespeople. I understand the work cycles, the client types, the pressures. You won't need to explain your business to me." },
        { num: "02", title: "AI-First Approach", desc: "I use the latest AI tools to automate lead qualification, estimates, and follow-ups, so you focus on the work you love." },
        { num: "03", title: "Results-Driven, Always", desc: "I measure success in leads and revenue, not impressions. If something isn't working, I change it." },
      ],
    },
    trust: {
      eyebrow: "By The Numbers",
      headA: "Why Tradesmen",
      headB: "Trust Landscale",
      items: [
        { value: "100/100", label: "Google PageSpeed Score", desc: "Perfect performance on every build" },
        { value: "<0.8s", label: "Average Load Time", desc: "Faster than 99% of competitor sites" },
        { value: "5", label: "Trade Businesses Live", desc: "Real results across renovation, landscaping, construction & more" },
        { value: "UK + INT", label: "Coverage", desc: "Serving clients across UK & internationally" },
      ],
    },
  },
  hu: {
    hero: {
      eyebrow: "AI-alapú érdeklődő-szűrés vállalkozóknak",
      line1: "VÉGE A",
      line2: "KOMOLYTALAN",
      line3: "ÉRDEKLŐDŐKNEK.",
      sub: "Prémium weboldalakat építünk beépített AI-szűréssel, okos árajánló ügynökök, amelyek megszűrik az érdeklődőket és azonnal árat adnak, így már csak a komoly megrendelőkkel kell foglalkoznod.",
      ctaPrimary: "Kérd az ingyenes igényfelmérést",
      ctaSecondary: "Nézd meg a munkáinkat",
      trust: "Vállalkozók bíznak bennünk",
      scroll: "Görgess",
    },
    stats: [
      { value: 85, suffix: "%", label: "Megspórolt idő az érdeklődők szűrésén", desc: "Ne pazarold az órákat a nézelődőkre. Az AI kiszűri őket, mielőtt egyáltalán hozzád érnének." },
      { value: 300, suffix: "%", label: "Átlagos növekedés a minőségi érdeklődőkben", desc: "Nem csak több érdeklődő, jobbak is. Nagyobb büdzsé, tisztább igény, gyorsabb döntés." },
      { value: 24, suffix: "/7", label: "Ennyit dolgozik érted az AI", desc: "Amíg te alszol, az AI szűri az érdeklődőket, válaszol a kérdésekre és időpontot foglal." },
      { value: 6, suffix: "+", label: "Éles projekt fut már most", desc: "Valódi vállalkozások, valódi eredmények, köztük egy éles, működő AI árajánló rendszer. Minden projekt bizonyított a piacon." },
    ],
    problems: {
      eyebrow: "Ismerős?",
      headA: "A problémák,",
      headB: "amik visszahúznak",
      items: [
        { num: "01", title: "A weboldalad nem hoz megrendelést", desc: "Van weboldalad, de csak porosodik. Jönnek a látogatók, elmennek, és soha nem hallasz felőlük többé." },
        { num: "02", title: "Órákat vesztegetsz komolytalan érdeklődőkre", desc: "Nézelődők, akik a legolcsóbbat keresik, nem köteleződnek el, vagy az árajánlat után eltűnnek. Az időd többet ér ennél." },
        { num: "03", title: "Láthatatlan vagy a Google-ön", desc: "Amikor a helyi ügyfelek keresnek, a versenytársaid jönnek elő elsőként. Te a 3. oldalon vagy, vagyis gyakorlatilag sehol." },
      ],
    },
    testimonials: { headA: "MIT MONDANAK", headB: "AZ ÜGYFELEK" },
    services: {
      eyebrow: "Amit csinálunk",
      headA: "Minden, amire szükséged van",
      headB: "egy helyen",
      learnMore: "Tudj meg többet →",
      footNote: "Mást keresel? Építünk AI vélemény-ügynököt, AI recepcióst, működési vezérlőpultot és még sok mást is.",
      seeAll: "Összes szolgáltatás →",
      availabilityLabel: "Elérhetőség",
      responseLabel: "Válaszidő",
      cards: [
        {
          num: "01", tag: "AI Árajánló", href: "/services/ai-estimator",
          title: "AI Árajánló Ügynök",
          italic: "Azonnali árajánlat, telefonhívás nélkül.",
          desc: "A látogató árajánlatot kér. Az AI bekéri a területet, az anyagokat, az irányítószámot és a határidőt, majd azonnal pontos becslést ad. Így már csak azok keresnek meg, akik ismerik az árat.",
          features: ["Projektre szabott kérdések", "Azonnali, tételes becslés", "Elérhetőség az árajánlat után", "Heti 15–20 óra megtakarítás"],
          stats: [{ val: "0–24", label: "Elérhetőség" }, { val: "<0,8 mp", label: "Válaszidő" }, { val: "0", label: "Elszalasztott érdeklődő" }],
        },
        {
          num: "02", tag: "AI Chatbot", href: "/services/ai-chatbot",
          title: "AI Chatbot",
          italic: "0–24 szűri az érdeklődőket, kiszórja a komolytalanokat.",
          desc: "A chatbot minden látogatót köszönt, ellenőrzi a büdzsét, a helyszínt és a határidőt, majd dönt. Nem passzol? Udvariasan elutasítja. Passzol? Az adatai egyből a postaládádban landolnak.",
          features: ["Büdzsé- és helyszín-ellenőrzés", "Automatikus lead-pontozás", "Udvariasan elutasít, ha nem passzol", "Azonnali értesítés neked"],
          stats: [{ val: "+300%", label: "Minőségi érdeklődő" }, { val: "<0,8 mp", label: "Válaszidő" }, { val: "0", label: "Felesleges érdeklődő" }],
        },
        {
          num: "03", tag: "Weboldal", href: "/services/website-design",
          title: "Prémium Weboldal",
          italic: "Konverzióra építve, helyi SEO-val együtt.",
          desc: "Egyedi, villámgyors weboldal, ami a prémium választásként pozicionál. Igényes dizájn, okos érdeklődő-gyűjtés, helyi SEO és Google Cégprofil beállítás már az első naptól.",
          features: ["Egyedi, igényes dizájn", "<0,8 mp betöltés", "Beépített helyi SEO", "Google Cégprofil beállítás"],
          stats: [{ val: "100", label: "PageSpeed" }, { val: "<0,8 mp", label: "Betöltés" }, { val: "100", label: "SEO pont" }],
        },
      ],
    },
    why: {
      eyebrow: "Miért én",
      line1: "MIÉRT ENGEM",
      line2: "VÁLASZTJÁK A",
      line3: "LEGJOBBAK",
      italic: "Iparosok között nőttem fel. Úgy értem a szakmádat, ahogy egy általános ügynökség soha nem tudná.",
      story: "A történetem →",
      pillars: [
        { num: "01", title: "Mélyreható szakmai ismeret", desc: "A családom iparos. Ismerem a munka ritmusát, az ügyféltípusokat, a nyomást. Nem kell elmagyaráznod, hogyan működik a szakmád." },
        { num: "02", title: "AI-központú szemlélet", desc: "A legújabb AI-eszközökkel automatizálom az érdeklődők szűrését, az árajánlatokat és az utánkövetést, hogy te arra figyelhess, amit igazán szeretsz csinálni." },
        { num: "03", title: "Mindig az eredmény számít", desc: "A sikert megrendelésben és bevételben mérem, nem megjelenésben. Ha valami nem működik, megváltoztatom." },
      ],
    },
    trust: {
      eyebrow: "Számokban",
      headA: "Miért bíznak a vállalkozók",
      headB: "a Landscale-ben",
      items: [
        { value: "100/100", label: "Google PageSpeed pontszám", desc: "Tökéletes teljesítmény minden elkészült oldalon" },
        { value: "<0,8 mp", label: "Átlagos betöltési idő", desc: "Gyorsabb, mint a versenytársak oldalainak 99%-a" },
        { value: "5", label: "Éles vállalkozás", desc: "Valódi eredmények felújítás, tereprendezés, építőipar és több más területen" },
        { value: "HU + INT", label: "Lefedettség", desc: "Ügyfelek Magyarországon és nemzetközileg egyaránt" },
      ],
    },
  },
};
