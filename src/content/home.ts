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
    demoToggle: { trades: string; contractors: string; garage: string };
    garage: { eyebrow: string; line1: string; line2: string; line3: string; sub: string; ctaSecondary: string };
    contractors: { eyebrow: string; line1: string; line2: string; line3: string; sub: string; ctaSecondary: string };
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
    featured: {
      badge: string; tag: string; title: string; italic: string; desc: string;
      features: string[];
      demoLabel: string; demoNote: string; cta: string;
    };
    tender: {
      badge: string; tag: string; head: string; intro: string;
      cards: { name: string; title: string; desc: string; features: string[] }[];
      note: string; cta: string;
    };
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
    { quote: "Milán built our website and we're completely happy with his work. He was helpful, precise and reliable right from the first conversation, took all our ideas on board and gave us plenty of useful professional advice. What we got is a modern, fast, good-looking website, exactly what we wanted. I especially want to point out the quote-request widget he built for us, it's made our everyday work so much easier. I just send interested people to it, and they come back already filled in and with a rough idea of the price, so we don't have to start every conversation from scratch. I can honestly recommend Milán to anyone looking for a professional, reliable web developer.", name: "Polyák Zoltán", company: "Kecskemét Klíma", stars: 5, logo: "" },
    { quote: "Milan built our new website with great care and attention to every detail. His input gave the site an aesthetic and professional look that our new clients have spoken highly of. I recommend him to everyone who values a quality online presence.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5, logo: "/images/lavotha-logo.jpg" },
    { quote: "The website is stunning and immediately positions us as a premium service. We've had multiple clients tell us it's the most professional landscaping site they've seen. It's already paying for itself in the quality of leads we're getting.", name: "Basil", company: "Mimosa Gardens", stars: 5, logo: "/images/mimosa-logo.jpg" },
    { quote: "Milan delivered exactly what we needed in record time. The site is fast, professional, and has helped us attract better clients. Working with him was smooth from start to finish, highly recommend.", name: "Péter Mantlik", company: "ViszCAD", stars: 5, logo: "/images/viszcad-logo.png" },
  ],
  hu: [
    { quote: "Nagyon elégedettek vagyunk Milán munkájával. Modern, letisztult és igényes weboldalt kaptunk, ami gyönyörűen bemutatja az NM Bau szolgáltatásait és a munkánk minőségét. Az együttműködés gördülékeny volt, gyorsan reagált a kéréseinkre, a végeredmény pedig pontosan azt a profi képet tükrözi, amit közvetíteni szerettünk volna. Csak ajánlani tudjuk!", name: "Nagy Máté", company: "NM Bau", stars: 5, logo: "/images/nmbau-logo.png" },
    { quote: "Nagyon elégedett voltam Milánnal. Szerintem szakmailag fényévekkel a többi weboldalkészítő előtt jár. Teljes szívből ajánlom mindenkinek. Egyedi árkalkulátort épített az oldalamra, amivel sokkal könnyebb kiválasztani a hozzám érkező jó munkákat. Rengeteg időt, energiát és pénzt spóroltunk vele.", name: "Polyák Zoltán", company: "Kazán Szerviz Kecskemét", stars: 5, logo: "" },
    { quote: "Milán készítette el a weboldalunkat, és maximálisan elégedettek vagyunk a munkájával. Már az első egyeztetéstől kezdve segítőkész, precíz és megbízható volt, minden elképzelésünket figyelembe vette, és szakmailag is rengeteg hasznos tanáccsal segített. A végeredmény egy modern, gyors és igényes weboldal lett, pontosan olyan, amilyet szerettünk volna. Külön kiemelem az árajánlatkérő widgetet is, azóta sokkal egyszerűbb lett a mindennapi munkánk. Egyszerűen odairányítom az érdeklődőket, ők pedig már kitöltve, nagyjából az árat is ismerve keresnek vissza, így nem kell a semmiből tárgyalást kezdeni mindenkivel. Milánt mindenkinek jó szívvel ajánlom, aki profi és megbízható weboldalkészítőt keres.", name: "Polyák Zoltán", company: "Kecskemét Klíma", stars: 5, logo: "" },
    { quote: "Milán nagy gonddal, a legapróbb részletekre is figyelve építette meg az új weboldalunkat. A meglátásai esztétikus és profi megjelenést adtak az oldalnak, amit az új ügyfeleink is dicsérnek. Mindenkinek ajánlom, akinek fontos az igényes online jelenlét.", name: "Balázs Lavotha", company: "Lavotha Kert Kft", stars: 5, logo: "/images/lavotha-logo.jpg" },
    { quote: "A weboldal lenyűgöző, és azonnal prémium szolgáltatásként pozicionál minket. Több ügyfelünk is azt mondta, ez a legprofibb kertészeti oldal, amit valaha láttak. Már most megtérül: sokkal jobb minőségű érdeklődők keresnek meg minket.", name: "Basil", company: "Mimosa Gardens", stars: 5, logo: "/images/mimosa-logo.jpg" },
    { quote: "Milán pontosan azt szállította, amire szükségünk volt, méghozzá rekordidő alatt. Az oldal gyors, profi, és segített jobb ügyfeleket vonzani. Az elejétől a végéig gördülékeny volt vele a munka, csak ajánlani tudom.", name: "Péter Mantlik", company: "ViszCAD", stars: 5, logo: "/images/viszcad-logo.png" },
  ],
};

export const homeContent: Record<Locale, HomeDict> = {
  en: {
    hero: {
      eyebrow: "AI Quoting for Trades",
      line1: "TRADES:",
      line2: "NO MORE",
      line3: "DEAD LEADS.",
      sub: "We build premium websites and AI quoting assistants. Your customers get an instant estimate on your website, and you only talk to serious buyers.",
      ctaPrimary: "Book a Free Call",
      ctaSecondary: "See Our Work",
      trust: "Trusted by trades, contractors & garages",
      scroll: "Scroll",
      demoToggle: { trades: "Trades", contractors: "Contractors", garage: "Garages" },
      garage: {
        eyebrow: "Quote Builder for Garages",
        line1: "LESS QUOTING,",
        line2: "MORE TIME",
        line3: "ON THE TOOLS.",
        sub: "An itemised quote in minutes: enter the VIN, pick the job, and it's priced with your brands, your prices and your labour rate. No more ringing round for parts prices.",
        ctaSecondary: "See How It Works",
      },
      contractors: {
        eyebrow: "New · For contractors & manufacturers",
        line1: "NOTHING",
        line2: "LEFT OUT",
        line3: "OF THE BID.",
        sub: "It reads the drawings, the bill of quantities and the tender documents, measures the quantities, and shows what matches, what differs and what's missing. Every number traced back to its sheet.",
        ctaSecondary: "See How It Works",
      },
    },
    stats: [
      { value: 85, suffix: "%", label: "Time Saved on Lead Qualifying", desc: "Stop wasting hours on tyre-kickers. Our AI filters them before they reach you." },
      { value: 300, suffix: "%", label: "Average Increase in Qualified Leads", desc: "Not just more leads, better ones. Higher budgets, clearer briefs, faster decisions." },
      { value: 24, suffix: "/7", label: "Hours Your AI Works For You", desc: "While you sleep, your AI is qualifying leads, answering questions, booking calls." },
      { value: 9, suffix: "", label: "Live Projects Running Right Now", desc: "Real businesses, real results, including four live AI quoting assistants. Every project is proven in the market." },
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
      footNote: "Looking for something else? I also build AI chatbots, review collection, local SEO and custom dashboards.",
      seeAll: "See All Services →",
      availabilityLabel: "Availability",
      responseLabel: "Response",
      cards: [
        {
          num: "01", tag: "Quoting Assistant", href: "/services/ai-estimator",
          title: "AI Quoting Assistant",
          italic: "Instant estimates on your website, no phone call needed.",
          desc: "Visitors ask for a price. The assistant asks the questions you would ask, area, materials, location, timeline, and gives an estimate on the spot. You only hear from people who already know the price.",
          features: ["Questions tailored to your jobs", "Instant itemised estimate", "Contact details after the estimate", "Saves 15–20 hrs/week"],
          stats: [{ val: "24/7", label: "Availability" }, { val: "4", label: "Live sites" }, { val: "0", label: "Missed leads" }],
        },
        {
          num: "02", tag: "AI Receptionist", href: "/services/ai-receptionist",
          title: "AI Receptionist",
          italic: "Picks up every call, even the fortieth one today.",
          desc: "It answers your phone, tells customers where their order stands by checking your CRM, answers the routine questions, and logs every call back into the CRM. Your team only gets the calls that need a person.",
          features: ["Connected to your CRM", "Order status on request", "Every call logged automatically", "Hands over to a person when needed"],
          stats: [{ val: "24/7", label: "Answers" }, { val: "CRM", label: "Connected" }, { val: "0", label: "Missed calls" }],
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
      featured: {
        badge: "For Garages",
        tag: "For Mechanics & Garages",
        title: "Quote Builder for Garages",
        italic: "Quote a job in minutes, without ringing round for parts prices.",
        desc: "You enter the VIN and pick the job. You get an itemised quote with your brands, your parts prices and your labour rate, ready to send as a PDF.",
        features: ["Built around the jobs you quote every week", "Your brands, your prices, your markup, every time", "No ringing round for parts prices mid-quote", "A professional itemised PDF the customer can say yes to"],
        demoLabel: "Try the demo →",
        demoNote: "The demo runs on sample prices. During a 30-day pilot we set it up with your own.",
        cta: "See how it works →",
      },
      tender: {
        badge: "New",
        tag: "For contractors & manufacturers",
        head: "Bid preparation, without the missed items",
        intro: "Two tools for companies that price from drawings and tender packages. They work the same way: you upload the folder, they do the checking, and your estimator approves the result.",
        cards: [
          {
            name: "Plan Reader",
            title: "Quantities from the drawings",
            desc: "Reads the architectural, structural and MEP drawings, measures rooms, walls, openings, slabs and rebar schedules, and compares them line by line with the designer's bill of quantities.",
            features: ["Every number shows its sheet and its calculation", "Marked on the drawing with a red frame", "Flags what differs and what may be missing", "Output in Excel, in your usual format"],
          },
          {
            name: "Tender Prep",
            title: "A tender package, checked in minutes",
            desc: "Checks the drawings, data sheets and item list against each other, ranks the likely errors and gaps, drafts the clarifying questions, and splits the items between your workshops and suppliers.",
            features: ["Quantity and size conflicts, with sources", "Clarifying questions drafted, in other languages too", "Items split by workshop or supplier", "First price draft from your own rates"],
          },
        ],
        note: "It doesn't replace your estimator. It gives them a checked first version, so they review the differences instead of re-measuring everything.",
        cta: "See how it works →",
      },
    },
    why: {
      eyebrow: "Why Me",
      line1: "WHY BUSINESSES",
      line2: "WORK WITH",
      line3: "LANDSCALE",
      italic: "One focus: taking the slow, repetitive part of quoting and admin off your desk, without handing your decisions to a machine.",
      story: "About me →",
      pillars: [
        { num: "01", title: "Built Around How You Work", desc: "Every tool starts from your jobs, your prices and your process. Not a template, and nothing you have to change your business to fit." },
        { num: "02", title: "AI Where It Actually Helps", desc: "Estimates, calls, plan checks, follow-ups. I use AI for the repetitive work, and you stay the one who approves the result." },
        { num: "03", title: "You Talk to the Founder", desc: "No account managers, no handoffs. The person you speak to on the first call is the one responsible for the result, and still there after launch." },
      ],
    },
    trust: {
      eyebrow: "By The Numbers",
      headA: "Why Businesses",
      headB: "Trust Landscale",
      items: [
        { value: "100/100", label: "Google PageSpeed Score", desc: "Top performance scores on delivered builds" },
        { value: "<0.8s", label: "Average Load Time", desc: "Faster than 99% of competitor sites" },
        { value: "8", label: "Businesses Live", desc: "Renovation, building services, construction, engineering & more" },
        { value: "HU · AT · UK", label: "Clients In", desc: "Hungary, Austria and the United Kingdom" },
      ],
    },
  },
  hu: {
    hero: {
      eyebrow: "AI árajánlás szakembereknek",
      line1: "VÉGE A",
      line2: "KOMOLYTALAN",
      line3: "ÉRDEKLŐDŐKNEK.",
      sub: "Weboldalakat és AI árajánló asszisztenseket építünk. Az ügyfeleid azonnal árbecslést kapnak a weboldaladon, te pedig már csak a komoly megrendelőkkel beszélsz.",
      ctaPrimary: "Foglalj időpontot",
      ctaSecondary: "Nézd meg a referenciákat",
      trust: "Szakemberek, kivitelezők és szervizek bíznak bennünk",
      scroll: "Görgess",
      demoToggle: { trades: "Szakemberek", contractors: "Kivitelezők", garage: "Szervizek" },
      garage: {
        eyebrow: "Árajánlat-készítő autószervizeknek",
        line1: "KEVESEBB",
        line2: "ÁRAZÁS,",
        line3: "TÖBB SZERELÉS.",
        sub: "Tételes árajánlat percek alatt: beírod az alvázszámot, kiválasztod a munkát, és már kész is, a te márkáiddal, áraiddal és óradíjaddal. Nem kell alkatrészárakért telefonálgatni.",
        ctaSecondary: "Nézd meg, hogyan működik",
      },
      contractors: {
        eyebrow: "Új · Kivitelezőknek és gyártóknak",
        line1: "EGY TÉTEL",
        line2: "SEM MARAD KI",
        line3: "AZ AJÁNLATBÓL.",
        sub: "Átnézi a tervrajzokat, a költségvetést és a kiírást, kigyűjti a mennyiségeket, és megmutatja, mi egyezik, mi tér el és mi maradt ki. Minden szám mellett ott a forrás: melyik tervlapról jön.",
        ctaSecondary: "Nézd meg, hogyan működik",
      },
    },
    stats: [
      { value: 85, suffix: "%", label: "Kevesebb idő megy el az érdeklődők szűrésére", desc: "Ne a nézelődőkre menjenek el az óráid. Az AI kiszűri őket, mielőtt hozzád jutnának." },
      { value: 300, suffix: "%", label: "Átlagosan ennyivel több komoly érdeklődő", desc: "Nem csak több megkeresés, hanem jobbak is: nagyobb keret, tisztább igény, gyorsabb döntés." },
      { value: 24, suffix: "/7", label: "Ennyit dolgozik helyetted az AI", desc: "Amíg alszol, az AI válaszol a kérdésekre, árbecslést ad, és megszűri az érdeklődőket." },
      { value: 9, suffix: "", label: "Éles projekt, most is fut", desc: "Valódi vállalkozások, köztük négy éles AI árajánló asszisztens. Mindegyik megnyitható és kipróbálható." },
    ],
    problems: {
      eyebrow: "Ismerős?",
      headA: "A problémák,",
      headB: "amik visszahúznak",
      items: [
        { num: "01", title: "A weboldalad nem hoz megrendelést", desc: "Van weboldalad, de csak porosodik. Jönnek a látogatók, aztán elmennek, és soha többé nem hallasz felőlük." },
        { num: "02", title: "Órák mennek el komolytalan érdeklődőkre", desc: "Nézelődők, akik a legolcsóbbat keresik, nem tudnak dönteni, vagy az árajánlat után eltűnnek. Az időd ennél többet ér." },
        { num: "03", title: "Nem találnak meg a Google-ön", desc: "Amikor a környékeden a szakmádra keresnek, a versenytársaid jönnek fel elsőként. Te a 3. oldalon vagy, vagyis gyakorlatilag sehol." },
      ],
    },
    testimonials: { headA: "MIT MONDANAK", headB: "AZ ÜGYFELEK" },
    services: {
      eyebrow: "Szolgáltatások",
      headA: "Minden, ami kell,",
      headB: "egy kézből",
      learnMore: "Részletek →",
      footNote: "Mást keresel? AI chatbotot, véleménygyűjtést, helyi SEO-t és egyedi kimutatásokat is készítek.",
      seeAll: "Összes szolgáltatás →",
      availabilityLabel: "Elérhetőség",
      responseLabel: "Válaszidő",
      cards: [
        {
          num: "01", tag: "Árajánló asszisztens", href: "/services/ai-estimator",
          title: "AI árajánló asszisztens",
          italic: "Azonnali árbecslés a weboldaladon, telefon nélkül.",
          desc: "A látogató árat kér. Az asszisztens felteszi azokat a kérdéseket, amiket te is feltennél (méret, anyag, helyszín, határidő), és azonnal árbecslést ad. Így csak olyanok keresnek meg, akik már ismerik az árat.",
          features: ["A te munkáidra szabott kérdések", "Azonnali, tételes árbecslés", "Elérhetőséget csak a becslés után kér", "Heti 15–20 óra megtakarítás"],
          stats: [{ val: "0–24", label: "Elérhetőség" }, { val: "4", label: "Éles oldal" }, { val: "0", label: "Elszalasztott érdeklődő" }],
        },
        {
          num: "02", tag: "AI recepciós", href: "/services/ai-receptionist",
          title: "AI recepciós",
          italic: "Felveszi a telefont, a napi negyvenedik hívásnál is.",
          desc: "Felveszi a hívásokat, a CRM-ből megmondja az ügyfélnek, hol tart a rendelése, megválaszolja a visszatérő kérdéseket, és minden hívást rögzít a CRM-ben. A kollégáidhoz csak az a hívás jut el, amihez tényleg ember kell.",
          features: ["Közvetlen kapcsolat a CRM-mel", "Rendelés állapota kérésre", "Minden hívás automatikusan rögzítve", "Ha kell, átadja egy kollégának"],
          stats: [{ val: "0–24", label: "Válaszol" }, { val: "CRM", label: "Összekötve" }, { val: "0", label: "Elmaradt hívás" }],
        },
        {
          num: "03", tag: "Weboldal", href: "/services/website-design",
          title: "Prémium weboldal",
          italic: "Megrendelésre tervezve, helyi SEO-val.",
          desc: "Egyedi, gyors weboldal, amin első ránézésre látszik, hogy minőségi munkát végzel. Igényes dizájn, egyszerű ajánlatkérés, helyi SEO és Google Cégprofil beállítás az első naptól.",
          features: ["Egyedi, igényes dizájn", "<0,8 mp betöltés", "Beépített helyi SEO", "Google Cégprofil beállítás"],
          stats: [{ val: "100", label: "PageSpeed" }, { val: "<0,8 mp", label: "Betöltés" }, { val: "100", label: "SEO pont" }],
        },
      ],
      featured: {
        badge: "Autószervizeknek",
        tag: "Autószerelőknek és szervizeknek",
        title: "Árajánlat-készítő szervizeknek",
        italic: "Tételes árajánlat alvázszámból, percek alatt, alkatrészár-telefonálgatás nélkül.",
        desc: "Beírod az alvázszámot, és kiválasztod a munkát. Tételes árajánlatot kapsz a te márkáiddal, alkatrészáraiddal és óradíjaddal, PDF-ben, küldésre készen.",
        features: ["A hetente árazott munkáidra szabva", "A te márkáid, áraid és árrésed, minden alkalommal", "Nem kell alkatrészárakért telefonálgatni", "Igényes, tételes PDF, amire az ügyfél rábólint"],
        demoLabel: "Próbáld ki a demót →",
        demoNote: "A demó mintaárakkal számol. A 30 napos próbaidőszakban a saját adataiddal állítjuk be.",
        cta: "Hogyan működik? →",
      },
      tender: {
        badge: "Új",
        tag: "Kivitelezőknek és gyártóknak",
        head: "Ajánlat-előkészítés, kimaradt tételek nélkül",
        intro: "Két eszköz azoknak a cégeknek, amelyek tervrajzokból és ajánlatkérési csomagokból áraznak. Ugyanúgy működnek: feltöltöd a mappát, a program elvégzi az ellenőrzést, a költségvetés-készítőd pedig jóváhagyja az eredményt.",
        cards: [
          {
            name: "Tervolvasó",
            title: "Mennyiségek a tervrajzokból",
            desc: "Beolvassa az építészeti, statikai és gépészeti terveket, kiméri a helyiségeket, falakat, nyílászárókat, födémeket és a vaslistákat, majd soronként összeveti a tervező költségvetésével.",
            features: ["Minden szám mellett a tervlap és a számítás", "A rajzon piros kerettel megjelölve", "Megmutatja az eltéréseket és a kimaradt tételeket", "Excelben, a megszokott költségvetési formában"],
          },
          {
            name: "Ajánlat-előkészítő",
            title: "Ajánlatkérés átnézve, percek alatt",
            desc: "Összeveti a tervrajzot, a műszaki lapokat és a tételjegyzéket, valószínűség szerint sorba rendezi a hibákat és a hiányzó adatokat, megírja a tisztázó kérdéseket, és szétosztja a tételeket üzemek és beszállítók között.",
            features: ["Darabszám- és méreteltérések, forrással", "Megírt tisztázó kérdések, idegen nyelven is", "Tételek üzemenként vagy beszállítónként", "Első árvázlat a saját áraid alapján"],
          },
        ],
        note: "Nem helyettesíti a szakembert. Egy ellenőrzött első változatot ad, így a kollégád az eltéréseket nézi át, és nem kell mindent újramérnie.",
        cta: "Hogyan működik? →",
      },
    },
    why: {
      eyebrow: "Miért én",
      line1: "MIÉRT ENGEM",
      line2: "VÁLASZTANAK",
      line3: "A CÉGEK",
      italic: "Egy célom van: levenni a válladról az árazás és az adminisztráció lassú, ismétlődő részét úgy, hogy a döntés továbbra is a tiéd maradjon.",
      story: "Rólam →",
      pillars: [
        { num: "01", title: "A te működésedre szabva", desc: "Minden eszköz a te munkáidból, áraidból és folyamataidból indul. Nem sablon, és nem neked kell hozzá alkalmazkodnod." },
        { num: "02", title: "AI ott, ahol tényleg segít", desc: "Árbecslés, telefonok, tervellenőrzés, utánkövetés. Az ismétlődő munkát az AI végzi, az eredményt pedig te hagyod jóvá." },
        { num: "03", title: "Közvetlenül az alapítóval beszélsz", desc: "Nincs ügyfélmenedzser, nincs továbbpasszolás. Akivel az első hívásban beszélsz, az felel az eredményért, és az átadás után is elérhető." },
      ],
    },
    trust: {
      eyebrow: "Számokban",
      headA: "Miért bíznak a cégek",
      headB: "a Landscale-ben",
      items: [
        { value: "100/100", label: "Google PageSpeed pontszám", desc: "Kiemelkedő eredmények az átadott oldalakon" },
        { value: "<0,8 mp", label: "Átlagos betöltési idő", desc: "Gyorsabb, mint a versenytársak oldalainak 99%-a" },
        { value: "8", label: "Éles vállalkozás", desc: "Felújítás, épületgépészet, építőipar, mérnöki iroda és más területek" },
        { value: "HU · AT · UK", label: "Ügyfelek", desc: "Magyarország, Ausztria és az Egyesült Királyság" },
      ],
    },
  },
};
