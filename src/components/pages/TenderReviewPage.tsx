"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { CALENDLY_URL } from "@/content/ui";
import { ContractorDemos } from "@/components/ui/contractor-demos";

const SPRING = [0.16, 1, 0.3, 1] as const;

type Tool = { name: string; title: string; lead: string; does: string[]; example: string };

const content: Record<Locale, {
  eyebrow: string; h1a: string; h1b: string; sub: string; ctaMain: string; ctaNote: string;
  defTitle: string; def: string;
  toolsTitleA: string; toolsTitleB: string; doesLabel: string; exampleLabel: string; tools: Tool[];
  stepsTitleA: string; stepsTitleB: string; steps: { step: string; title: string; desc: string }[];
  benefitsTitleA: string; benefitsTitleB: string; benefits: { title: string; desc: string }[];
  notTitle: string; not: string;
  forTitle: string; forList: string[];
  ctaTitleA: string; ctaTitleB: string; ctaSub: string; ctaBtn: string;
}> = {
  en: {
    eyebrow: "New · For contractors & manufacturers",
    h1a: "NOTHING LEFT OUT ",
    h1b: "OF THE BID.",
    sub: "Two tools that check drawings, bills of quantities and tender packages before you price, and show you every difference, gap and open question, each one traced back to its source.",
    ctaMain: "Book a Free Call →",
    ctaNote: "Why no public demo? I show it on a real company's real documents, so it can't go on the website. On a call I'll walk you through it live, on one of your own past tenders if you like.",
    defTitle: "What Is Plan & Tender Review?",
    def: "Before a contractor or manufacturer can price a job, someone has to go through the whole package: drawings, specifications, the bill of quantities and the contract terms. They count, measure and cross-check by hand, often for days. On a fixed-price bid, every missed or miscounted item comes straight out of the margin. Plan & Tender Review does that first pass. It reads the package, measures and counts, compares the sources with each other, and hands your estimator a checked first version in Excel, with the source and the confidence next to every number. Your estimator reviews the differences and approves. Pricing stays your call.",
    toolsTitleA: "Two Tools, ",
    toolsTitleB: "One Way of Working",
    doesLabel: "What it does",
    exampleLabel: "Tested on real documents",
    tools: [
      {
        name: "Plan Reader",
        title: "Quantities from the drawings, checked against the bill of quantities",
        lead: "For general contractors and estimators who price houses and apartment buildings from a full plan set.",
        does: [
          "Reads the architectural, structural and MEP drawings, specifications and the designer's bill of quantities",
          "Measures rooms, walls, openings, slabs, rebar schedules and MEP items",
          "Compares line by line with the bill of quantities: what matches, what differs, what may be missing",
          "Writes the sheet and the calculation next to every number, with a confidence level, and marks the spot on the drawing with a red frame",
          "Where the drawings don't say exactly, it estimates and writes down the formula and the assumption so you can check it",
          "Exports to Excel in the usual cost-estimate layout",
        ],
        example: "On a real family house it caught that the designer's bill of quantities had left out the floor insulation of one room entirely.",
      },
      {
        name: "Tender Prep",
        title: "A full tender package, reviewed and ready to price",
        lead: "For manufacturers and specialist subcontractors (joinery, windows and doors, kitchen technology) that answer complex requests for quotation, including public tenders.",
        does: [
          "Cross-checks the drawings, data sheets and item list, and shows where quantities or sizes don't agree",
          "Lists likely errors and missing data, ranked by probability, each with its source one click away",
          "Drafts the clarifying questions for the right recipient (main contractor, designer or a colleague), in other languages too",
          "Splits the items by which workshop makes them and which ones you buy in from suppliers",
          "Pulls out the contract terms that affect price and risk: deadlines, penalties, payment terms, guarantees",
          "Builds a first price draft from your own rates, in an Excel workbook you keep working in",
        ],
        example: "On a real 60-item public furniture tender it flagged a shelf depth written as 600 cm where the allowed range was 550–700 mm, plus a referenced attachment that was never included.",
      },
    ],
    stepsTitleA: "How It ",
    stepsTitleB: "Works",
    steps: [
      { step: "01", title: "Upload the folder", desc: "Drop in the whole package as it arrived: PDF drawings, specifications, Excel item lists, contract documents." },
      { step: "02", title: "It reads, measures and compares", desc: "Every sheet and every line is read and checked against the others. A typical package takes minutes, not days." },
      { step: "03", title: "Review the differences", desc: "You don't re-measure everything. You go through the flagged items and the uncertain ones, each with its source." },
      { step: "04", title: "Continue in Excel", desc: "Approved quantities, questions and the price draft land in a workbook in your usual format, ready to finish." },
    ],
    benefitsTitleA: "What You ",
    benefitsTitleB: "Get From It",
    benefits: [
      { title: "Fewer missed items", desc: "Gaps between the drawings and the bill of quantities come up before you price, not after you've signed." },
      { title: "Faster checking", desc: "Your estimator reviews the differences and the uncertain items instead of measuring the whole job again." },
      { title: "Every number traceable", desc: "Each quantity shows where it came from, which makes a bid or a variation claim much easier to defend." },
    ],
    notTitle: "What it doesn't do",
    not: "It doesn't replace your estimator, and it doesn't set your prices. It produces a checked first version that a person reviews and approves. Pricing stays your business.",
    forTitle: "Who it's for",
    forList: [
      "General contractors and building companies giving fixed-price or turnkey bids",
      "Estimators and pre-construction teams who calculate quantities from drawings",
      "Family-house and apartment builders with many drawings and many line items",
      "Manufacturers and specialist subcontractors who answer tenders with drawings and item lists",
    ],
    ctaTitleA: "LET'S RUN IT ON",
    ctaTitleB: "ONE OF YOUR JOBS",
    ctaSub: "Book a short call and bring a past tender or plan set. I'll show you what the tool finds in it, and we'll see if it's worth it for you.",
    ctaBtn: "Book a Free Call →",
  },
  hu: {
    eyebrow: "Új · Kivitelezőknek és gyártóknak",
    h1a: "EGY TÉTEL SEM MARAD KI ",
    h1b: "AZ AJÁNLATBÓL.",
    sub: "Két eszköz, amely árazás előtt átnézi a tervrajzokat, a költségvetést és az ajánlatkérést, és megmutat minden eltérést, hiányt és tisztázandó kérdést, mindegyiket a forrásával együtt.",
    ctaMain: "Foglalj időpontot →",
    ctaNote: "Miért nincs nyilvános demó? Egy valódi cég valódi anyagain mutatom be, ezért nem kerülhet a weboldalra. Egy hívásban élőben végigmegyünk rajta, akár a saját korábbi ajánlatkérésedre lefuttatva.",
    defTitle: "Mi az a terv- és kiírás-ellenőrzés?",
    def: "Mielőtt egy kivitelező vagy gyártó árat adhatna, valakinek végig kell néznie a teljes csomagot: a tervrajzokat, a műszaki leírást, a költségvetést vagy tételjegyzéket és a szerződéses feltételeket. Kézzel számol, mér és vet össze, sokszor napokig. Fix áras ajánlatnál minden kimaradt vagy elszámolt tétel egyenesen a hasznot viszi el. A terv- és kiírás-ellenőrzés ezt az első kört végzi el. Beolvassa a csomagot, mér és számol, összeveti a forrásokat egymással, és egy ellenőrzött első változatot ad át Excelben, minden szám mellett a forrással és azzal, mennyire biztos benne. A kollégád átnézi az eltéréseket, és jóváhagyja. Az árazás a te döntésed marad.",
    toolsTitleA: "Két eszköz, ",
    toolsTitleB: "egy logika",
    doesLabel: "Mit csinál?",
    exampleLabel: "Valódi dokumentumokon kipróbálva",
    tools: [
      {
        name: "Tervolvasó",
        title: "Mennyiségek a tervrajzokból, összevetve a költségvetéssel",
        lead: "Generálkivitelezőknek és költségvetés-készítőknek, akik teljes tervcsomagból áraznak családi házat vagy társasházat.",
        does: [
          "Beolvassa az építészeti, statikai és gépészeti terveket, a műszaki leírást és a tervező költségvetését",
          "Kiméri a helyiségeket, falakat, nyílászárókat, födémeket, a statikai vaslistákat és a gépészeti tételeket",
          "Soronként összeveti a költségvetéssel: mi egyezik, mi tér el, és mi maradhatott ki",
          "Minden szám mellé odaírja, melyik tervlapról és milyen számítással jön, mennyire biztos benne, és a rajzon piros kerettel meg is mutatja",
          "Ahol a terv nem ad pontos adatot, ott becsül, és leírja a képletet meg a feltételezést, hogy ellenőrizhető legyen",
          "Az eredményt Excelben adja ki, a megszokott költségvetési formában",
        ],
        example: "Egy valódi családi háznál kiszúrta, hogy a tervezői költségvetésből teljesen kimaradt az egyik helyiség padlószigetelése.",
      },
      {
        name: "Ajánlat-előkészítő",
        title: "Egy teljes ajánlatkérés, átnézve és árazásra készen",
        lead: "Gyártó és szakági cégeknek (bútor, nyílászáró, konyhatechnológia), amelyek rendszeresen kapnak összetett ajánlatkérést, közbeszerzésen is.",
        does: [
          "Összeveti a tervrajzot, a műszaki lapokat és a tételjegyzéket, és megmutatja, hol tér el a darabszám vagy a méret",
          "Kigyűjti a lehetséges hibákat és hiányzó adatokat valószínűség szerint sorba rendezve, mindegyiknél az eredeti forrással, egy kattintásra",
          "Megírja a tisztázó kérdéseket a megfelelő címzettnek (generálkivitelező, tervező vagy belső kolléga), akár idegen nyelven is",
          "Szétosztja a tételeket aszerint, hogy melyik üzem gyártja őket, és mit kell beszállítótól megrendelni",
          "Kigyűjti a szerződésből az árat és a kockázatot érintő feltételeket: határidő, kötbér, fizetési feltételek, jótállás",
          "Első árvázlatot készít a cég saját árai alapján, egy Excel-munkafüzetben, amiben a munka folytatható",
        ],
        example: "Egy valódi, 60 tételes bútor-közbeszerzésnél kiszúrta, hogy egy polc mélysége 600 cm-ként szerepel, miközben a megengedett sáv 550–700 mm, és azt is, hogy egy hivatkozott melléklet hiányzik a kiírásból.",
      },
    ],
    stepsTitleA: "Hogyan ",
    stepsTitleB: "működik?",
    steps: [
      { step: "01", title: "Feltöltöd a mappát", desc: "A teljes csomag úgy, ahogy megérkezett: PDF-tervlapok, műszaki leírások, Excel-tételjegyzékek, szerződéses dokumentumok." },
      { step: "02", title: "Beolvas, mér és összevet", desc: "Minden tervlapot és minden sort beolvas, és összeveti a többivel. Egy átlagos csomag percek alatt megvan, nem napok alatt." },
      { step: "03", title: "Átnézed az eltéréseket", desc: "Nem kell mindent újramérni. Csak a megjelölt és a bizonytalan tételeket nézed át, mindegyiket a forrásával." },
      { step: "04", title: "Excelben folytatod", desc: "A jóváhagyott mennyiségek, a kérdések és az árvázlat a megszokott formátumú munkafüzetbe kerülnek, befejezésre készen." },
    ],
    benefitsTitleA: "Mire jó ",
    benefitsTitleB: "a gyakorlatban?",
    benefits: [
      { title: "Kevesebb kimaradt tétel", desc: "A tervrajz és a költségvetés közötti hiányok még árazás előtt előkerülnek, nem a szerződés aláírása után." },
      { title: "Gyorsabb ellenőrzés", desc: "A szakembernek nem kell mindent újramérnie, elég az eltéréseket és a bizonytalan tételeket átnéznie." },
      { title: "Visszakereshető számok", desc: "Minden mennyiségről látszik, honnan jött, így sokkal könnyebb megvédeni egy ajánlatot vagy egy pótmunkát." },
    ],
    notTitle: "Mit nem csinál?",
    not: "Nem helyettesíti a szakembert, és nem árazza be helyetted a munkát. Egy ellenőrzött első változatot ad, amit ember néz át és hagy jóvá. Az árazás a cég saját dolga marad.",
    forTitle: "Kinek szól?",
    forList: [
      "Generálkivitelezőknek és építőipari cégeknek, akik kulcsrakész vagy fix áras ajánlatot adnak",
      "Költségvetés-készítőknek és műszaki előkészítőknek, akik tervekből számolnak mennyiséget",
      "Családiház- és társasházépítőknek, ahol sok a terv és sok a tétel",
      "Gyártó és szakági cégeknek, amelyek tervrajzos, tételjegyzékes ajánlatkérésekre adnak árat",
    ],
    ctaTitleA: "PRÓBÁLJUK KI",
    ctaTitleB: "AZ EGYIK MUNKÁDON",
    ctaSub: "Foglalj egy rövid hívást, és hozz egy korábbi ajánlatkérést vagy tervcsomagot. Megmutatom, mit talál benne az eszköz, és együtt eldöntjük, megéri-e neked.",
    ctaBtn: "Foglalj időpontot →",
  },
};

export default function TenderReviewPage({ lang }: { lang: Locale }) {
  const c = content[lang];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 30% 60%, #D4AF37 0%, transparent 55%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold">{c.eyebrow}</span>
            </motion.div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: SPRING }} className="font-grotesk font-bold text-[clamp(40px,6vw,88px)] text-cream leading-[0.95] tracking-[-0.03em] max-w-4xl">
                {c.h1a}
                <span className="text-gradient-gold">{c.h1b}</span>
              </motion.h1>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: SPRING }} className="font-cormorant text-xl md:text-2xl text-cream/50 font-light italic leading-relaxed max-w-xl mb-10">
              {c.sub}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: SPRING }}>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-deep-black font-grotesk font-bold text-sm px-8 py-4 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-0.5">
                {c.ctaMain}
              </a>
              <p className="font-inter text-xs text-text-muted mt-4">{c.ctaNote}</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: SPRING }}
            className="w-full h-[570px] bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.07)] flex flex-col">
            <ContractorDemos lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-16 bg-[#080808] border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal>
            <span className="font-grotesk text-xs font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />{c.defTitle}
            </span>
            <p className="font-inter text-cream/65 text-base md:text-lg leading-relaxed max-w-3xl">{c.def}</p>
          </Reveal>
        </div>
      </section>

      {/* The two tools */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal className="mb-14">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              {c.toolsTitleA}<span className="text-gradient-gold">{c.toolsTitleB}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {c.tools.map((tool, i) => (
              <Reveal key={tool.name} delay={i * 0.1}>
                <div className="relative bg-[#111111] border border-gold/25 rounded-3xl p-7 md:p-9 h-full flex flex-col overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")} · {tool.name}</span>
                  <h3 className="font-grotesk font-bold text-xl md:text-2xl text-cream mt-3 mb-3 tracking-tight">{tool.title}</h3>
                  <p className="font-inter text-text-muted text-sm leading-relaxed mb-6">{tool.lead}</p>
                  <p className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 mb-3">{c.doesLabel}</p>
                  <ul className="space-y-2.5 mb-7">
                    {tool.does.map((d) => (
                      <li key={d} className="flex items-start gap-3 font-inter text-sm text-cream/70 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-2" />{d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto rounded-2xl border border-gold/20 bg-gold/[0.05] p-5">
                    <p className="font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">{c.exampleLabel}</p>
                    <p className="font-cormorant text-lg text-cream/80 italic leading-snug">{tool.example}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal className="mb-16">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              {c.stepsTitleA}<span className="text-gradient-gold">{c.stepsTitleB}</span>
            </h2>
          </Reveal>
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
      </section>

      {/* Benefits + limits + audience */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16">
          <Reveal className="mb-14">
            <h2 className="font-grotesk font-bold text-[clamp(32px,4vw,56px)] text-cream tracking-[-0.02em]">
              {c.benefitsTitleA}<span className="text-gradient-gold">{c.benefitsTitleB}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="bg-[#0A0A0A] border border-white/[0.06] hover:border-gold/40 rounded-2xl p-8 h-full transition-colors duration-300">
                  <h3 className="font-grotesk font-bold text-lg text-cream mb-3">{b.title}</h3>
                  <p className="font-inter text-text-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-2xl border border-white/[0.08] p-8 h-full">
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-4">{c.notTitle}</p>
                <p className="font-inter text-cream/70 text-base leading-relaxed">{c.not}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-white/[0.08] p-8 h-full">
                <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-4">{c.forTitle}</p>
                <ul className="space-y-3">
                  {c.forList.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-inter text-sm text-cream/70 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-2" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A0A0A] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at center, #D4AF37 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <Reveal>
            <h2 className="font-grotesk font-bold text-[clamp(36px,5vw,64px)] text-cream leading-[0.95] tracking-[-0.03em] mb-6">
              {c.ctaTitleA}<br /><span className="text-gradient-gold">{c.ctaTitleB}</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 font-light italic leading-relaxed mb-10">{c.ctaSub}</p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-deep-black font-grotesk font-bold text-base px-10 py-5 btn-shine hover:bg-bright-gold transition-all duration-300 hover:shadow-button-hover hover:-translate-y-1">
              {c.ctaBtn}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
