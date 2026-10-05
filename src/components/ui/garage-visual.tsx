"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Wrench, Check, FileText, Brain } from "lucide-react";
import type { Locale } from "@/lib/i18n";

// Scripted walkthrough of the garage quote builder, played on a loop like
// HeroVisual. One phase index drives everything; screens swap as it advances.
const PHASES = [
  1700, // 0  VIN typed
  600,  // 1  search pressed
  1100, // 2  matching cars listed
  900,  // 3  car picked
  1100, // 4  job tiles
  900,  // 5  job picked
  1700, // 6  recommended pads
  1300, // 7  disc question
  1000, // 8  disc answered, recommendation shown
  1500, // 9  extras ticked
  2200, // 10 quote rows fill in
  1300, // 11 mechanic overwrites a price
  2200, // 12 price remembered
  2600, // 13 PDF ready
];

const PRICES = { pads: 14900, padsEdited: 16400, disc: 21500, cleaner: 1500, rate: 14000, hours: 1.5 };

const ft = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`;

const CONTENT: Record<Locale, {
  title: string; sub: string; active: string;
  steps: [string, string, string, string];
  vinLabel: string; vin: string; find: string; matches: string;
  cars: [string, string][];
  jobTitle: string; car: string;
  jobs: [string, string][];
  pads: string; padsCount: string; recommended: string; padsPart: string; ownBrand: string; more: string;
  discs: string; discsCount: string; discQ: string; discOpts: string[]; discPart: string;
  extrasTitle: string; extrasTag: string; extras: [string, string][];
  quote: string; plate: string;
  rows: { pads: string; discs: string; cleaner: string; labour: string; pcs: string; hrs: string };
  net: string; vat: string; total: string; pdf: string;
  memory: string; pdfDone: string;
}> = {
  en: {
    title: "Quote Builder",
    sub: "At your service desk",
    active: "Active",
    steps: ["Vehicle", "Job", "Parts", "Quote"],
    vinLabel: "Vehicle from VIN",
    vin: "TMBJG7NE8F0123456",
    find: "Find car",
    matches: "3 variants match, pick the engine",
    cars: [
      ["SKODA OCTAVIA III (5E3) 1.6 TDI", "81 kW · 2013–2020"],
      ["SKODA OCTAVIA III (5E3) 2.0 TDI", "110 kW · 2013–2020"],
      ["SKODA OCTAVIA III Combi 1.6 TDI", "77 kW · 2013–2017"],
    ],
    jobTitle: "What's the job?",
    car: "SKODA OCTAVIA III 1.6 TDI",
    jobs: [
      ["Oil change", "Oil, oil filter"],
      ["Small service", "Oil + 4 filters"],
      ["Timing belt", "Kit, water pump"],
      ["Brake pads + discs", "Pads, discs"],
      ["Clutch", "Clutch kit"],
      ["Shock absorbers", "Shocks"],
    ],
    pads: "Brake pads",
    padsCount: "251 parts",
    recommended: "Recommended",
    padsPart: "TRW GDB1550",
    ownBrand: "your brand",
    more: "+ 250 more options",
    discs: "Brake discs",
    discsCount: "115 parts",
    discQ: "Disc diameter? (front and rear usually differ)",
    discOpts: ["256 mm", "288 mm", "Not sure"],
    discPart: "BREMBO 09.A820.11",
    extrasTitle: "Goes with this job",
    extrasTag: "usual",
    extras: [["Brake cleaner", "1 pc"], ["Brake fluid DOT 4", "1 l"]],
    quote: "Quote",
    plate: "ABC-123",
    rows: { pads: "Brake pads, TRW", discs: "Brake discs, Brembo", cleaner: "Brake cleaner", labour: "Labour", pcs: "pc", hrs: "1.5 h" },
    net: "Net",
    vat: "VAT 27%",
    total: "Total",
    pdf: "PDF / print",
    memory: "Saved. Next time this part is priced at",
    pdfDone: "PDF ready to send",
  },
  hu: {
    title: "Árajánlat-készítő",
    sub: "A szervizpultnál",
    active: "Aktív",
    steps: ["Jármű", "Munka", "Alkatrész", "Ajánlat"],
    vinLabel: "Autó alvázszámból",
    vin: "TMBJG7NE8F0123456",
    find: "Autó keresése",
    matches: "3 változat illik rá, válaszd ki a motort",
    cars: [
      ["SKODA OCTAVIA III (5E3) 1.6 TDI", "81 kW · 2013–2020"],
      ["SKODA OCTAVIA III (5E3) 2.0 TDI", "110 kW · 2013–2020"],
      ["SKODA OCTAVIA III Combi 1.6 TDI", "77 kW · 2013–2017"],
    ],
    jobTitle: "Mi a munka?",
    car: "SKODA OCTAVIA III 1.6 TDI",
    jobs: [
      ["Olajcsere", "Olaj, olajszűrő"],
      ["Kis szerviz", "Olaj + 4 szűrő"],
      ["Vezérműszíj-csere", "Készlet, vízpumpa"],
      ["Fékbetét + féktárcsa", "Fékbetét, féktárcsa"],
      ["Kuplungcsere", "Kuplungszett"],
      ["Lengéscsillapító", "Lengéscsillapító"],
    ],
    pads: "Fékbetét",
    padsCount: "251 cikk",
    recommended: "Ajánlott",
    padsPart: "TRW GDB1550",
    ownBrand: "a műhely márkája",
    more: "+ 250 további opció",
    discs: "Féktárcsa",
    discsCount: "115 cikk",
    discQ: "Mekkora a tárcsa átmérője? (elöl és hátul általában eltér)",
    discOpts: ["256 mm", "288 mm", "Nem tudom"],
    discPart: "BREMBO 09.A820.11",
    extrasTitle: "Mellé járó tételek",
    extrasTag: "szokásos",
    extras: [["Féktisztító", "1 db"], ["Fékfolyadék DOT 4", "1 l"]],
    quote: "Ajánlat",
    plate: "ABC-123",
    rows: { pads: "Fékbetét, TRW", discs: "Féktárcsa, Brembo", cleaner: "Féktisztító", labour: "Munkadíj", pcs: "db", hrs: "1,5 óra" },
    net: "Nettó",
    vat: "ÁFA 27%",
    total: "Fizetendő",
    pdf: "PDF / nyomtatás",
    memory: "Megjegyezve. Legközelebb ez az ár:",
    pdfDone: "PDF kész, küldhető",
  },
};

const GOLD_CARD = {
  background: "linear-gradient(135deg,rgba(212,175,55,0.13) 0%,rgba(184,148,31,0.06) 100%)",
  border: "1px solid rgba(212,175,55,0.35)",
};
const PLAIN_CARD = {
  background: "rgba(245,241,232,0.03)",
  border: "1px solid rgba(245,241,232,0.07)",
};

const fadeUp = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } };

export function GarageVisual({ lang = "en" }: { lang?: Locale }) {
  const c = CONTENT[lang];
  const [p, setP] = useState(0);
  const [typed, setTyped] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  // advance phases, loop back to 0 after the last one
  useEffect(() => {
    const t = setTimeout(() => setP(prev => (prev + 1) % PHASES.length), PHASES[p]);
    return () => clearTimeout(t);
  }, [p]);

  // type the VIN during phase 0
  useEffect(() => {
    if (p !== 0) return;
    setTyped(0);
    const id = setInterval(() => setTyped(n => (n >= c.vin.length ? n : n + 1)), 75);
    return () => clearInterval(id);
  }, [p, c.vin.length]);

  // keep the newest part of the parts screen in view, scrolling only the card
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [p]);

  const screen = p <= 3 ? 0 : p <= 5 ? 1 : p <= 9 ? 2 : 3;
  const padsPrice = p >= 11 ? PRICES.padsEdited : PRICES.pads;
  const net = padsPrice + PRICES.disc * 2 + PRICES.cleaner + PRICES.rate * PRICES.hours;

  return (
    <div className="w-full flex flex-col gap-3 p-5 h-full select-none">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#D4AF37 0%,#B8941F 100%)", boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}>
            <Wrench size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/90 leading-none">{c.title}</p>
            <p className="font-inter text-[9px] text-[#D4AF37]/60 mt-0.5">{c.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[9px] text-emerald-400">{c.active}</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {c.steps.map((label, i) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="h-0.5 rounded-full transition-colors duration-500"
              style={{ background: i <= screen ? "#D4AF37" : "rgba(245,241,232,0.08)" }} />
            <span className={`font-inter text-[8px] transition-colors duration-500 ${i === screen ? "text-[#D4AF37]" : "text-[#F5F1E8]/25"}`}>
              {String(i + 1).padStart(2, "0")} · {label}
            </span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto min-h-0 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }} className="flex flex-col gap-2">

            {/* 1. Vehicle */}
            {screen === 0 && (
              <>
                <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/85">{c.vinLabel}</p>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg px-3 py-2 font-mono text-[11px] tracking-wider text-[#F5F1E8]/85" style={PLAIN_CARD}>
                    {c.vin.slice(0, typed)}
                    {p === 0 && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="text-[#D4AF37]">|</motion.span>}
                  </div>
                  <motion.div animate={p === 1 ? { scale: [1, 0.93, 1] } : {}} transition={{ duration: 0.3 }}
                    className="rounded-lg px-3 py-2 font-grotesk font-bold text-[10px] text-[#0A0A0A] flex items-center"
                    style={{ background: "#D4AF37" }}>
                    {c.find}
                  </motion.div>
                </div>
                {p >= 2 && (
                  <motion.div {...fadeUp} className="flex flex-col gap-1.5">
                    <p className="font-inter text-[9px] text-[#F5F1E8]/35">{c.matches}</p>
                    {c.cars.map(([name, spec], i) => (
                      <motion.div key={name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                        className="rounded-lg px-3 py-2 transition-all duration-300"
                        style={p >= 3 && i === 0 ? GOLD_CARD : PLAIN_CARD}>
                        <p className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{name}</p>
                        <p className="font-inter text-[8px] text-[#F5F1E8]/35">{spec}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}

            {/* 2. Job */}
            {screen === 1 && (
              <>
                <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/85">{c.jobTitle}</p>
                <div className="rounded-lg px-3 py-1.5" style={PLAIN_CARD}>
                  <p className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/80">{c.car}</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {c.jobs.map(([name, parts], i) => (
                    <motion.div key={name} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                      className="rounded-lg px-2.5 py-2 transition-all duration-300"
                      style={p >= 5 && i === 3 ? GOLD_CARD : PLAIN_CARD}>
                      <p className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85 leading-tight">{name}</p>
                      <p className="font-inter text-[8px] text-[#F5F1E8]/35 mt-0.5">{parts}</p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* 3. Parts */}
            {screen === 2 && (
              <>
                <PartGroup title={c.pads} count={c.padsCount}>
                  <RecommendedPart c={c} part={c.padsPart} />
                  <p className="font-inter text-[8px] text-[#F5F1E8]/30 pl-1">{c.more}</p>
                </PartGroup>

                {p >= 7 && (
                  <motion.div {...fadeUp}>
                    <PartGroup title={c.discs} count={c.discsCount}>
                      <div className="rounded-lg px-2.5 py-2" style={p >= 8 ? PLAIN_CARD : GOLD_CARD}>
                        <p className="font-inter text-[9px] text-[#F5F1E8]/75 mb-1.5">{c.discQ}</p>
                        <div className="flex gap-1.5">
                          {c.discOpts.map((o, i) => (
                            <span key={o} className="rounded-md px-2 py-1 font-grotesk font-bold text-[9px] transition-all duration-300"
                              style={p >= 8 && i === 1
                                ? { background: "#D4AF37", color: "#0A0A0A" }
                                : { background: "rgba(245,241,232,0.05)", color: "rgba(245,241,232,0.6)" }}>
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>
                      {p >= 8 && <motion.div {...fadeUp}><RecommendedPart c={c} part={c.discPart} /></motion.div>}
                    </PartGroup>
                  </motion.div>
                )}

                {p >= 9 && (
                  <motion.div {...fadeUp} className="rounded-xl p-2.5 flex flex-col gap-1.5" style={PLAIN_CARD}>
                    <div className="flex items-center justify-between">
                      <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{c.extrasTitle}</span>
                      <span className="font-inter text-[8px] text-[#D4AF37]/70">{c.extrasTag}</span>
                    </div>
                    {c.extras.map(([name, qty], i) => (
                      <div key={name} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-[3px] flex items-center justify-center flex-shrink-0"
                          style={i === 0 ? { background: "#D4AF37" } : { border: "1px solid rgba(245,241,232,0.2)" }}>
                          {i === 0 && <Check size={8} className="text-[#0A0A0A]" strokeWidth={3} />}
                        </span>
                        <span className="font-inter text-[9px] text-[#F5F1E8]/70">{name}</span>
                        <span className="font-inter text-[8px] text-[#F5F1E8]/30">{qty}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </>
            )}

            {/* 4. Quote */}
            {screen === 3 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/85">{c.quote}</p>
                  <span className="font-mono text-[9px] text-[#F5F1E8]/40 rounded px-1.5 py-0.5" style={PLAIN_CARD}>{c.plate}</span>
                </div>
                <div className="rounded-xl overflow-hidden" style={PLAIN_CARD}>
                  {[
                    { label: c.rows.pads, qty: `1 ${c.rows.pcs}`, val: padsPrice, edited: true },
                    { label: c.rows.discs, qty: `2 ${c.rows.pcs}`, val: PRICES.disc * 2 },
                    { label: c.rows.cleaner, qty: `1 ${c.rows.pcs}`, val: PRICES.cleaner },
                    { label: c.rows.labour, qty: c.rows.hrs, val: PRICES.rate * PRICES.hours },
                  ].map((row, i) => (
                    <motion.div key={row.label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.35 }}
                      className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
                      <span className="font-inter text-[9px] text-[#F5F1E8]/70">{row.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-inter text-[8px] text-[#F5F1E8]/30">{row.qty}</span>
                        <motion.span
                          key={row.edited ? padsPrice : undefined}
                          initial={row.edited && p >= 11 ? { backgroundColor: "rgba(212,175,55,0.35)" } : false}
                          animate={{ backgroundColor: "rgba(212,175,55,0)" }}
                          transition={{ duration: 1.2 }}
                          className={`font-inter text-[9px] font-medium rounded px-1 w-[62px] text-right ${row.edited && p >= 11 ? "text-[#D4AF37]" : "text-[#F5F1E8]/70"}`}>
                          {ft(row.val)}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                  <div className="px-3 py-2 space-y-0.5">
                    <div className="flex justify-between font-inter text-[9px] text-[#F5F1E8]/45"><span>{c.net}</span><span>{ft(net)}</span></div>
                    <div className="flex justify-between font-inter text-[9px] text-[#F5F1E8]/45"><span>{c.vat}</span><span>{ft(net * 0.27)}</span></div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-grotesk font-bold text-[11px] text-[#D4AF37]">{c.total}</span>
                      <span className="font-grotesk font-bold text-[14px] text-[#F5F1E8]">{ft(net * 1.27)}</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {p === 12 && (
                    <motion.div key="memory" initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl px-3 py-2" style={GOLD_CARD}>
                      <Brain size={12} className="text-[#D4AF37] flex-shrink-0" />
                      <span className="font-inter text-[9px] text-[#F5F1E8]/75">{c.memory} <b className="text-[#D4AF37]">{ft(PRICES.padsEdited)}</b></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={p === 13 ? { boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 18px rgba(212,175,55,0.55)", "0 0 0px rgba(212,175,55,0)"] } : {}}
                  transition={{ duration: 1.3, repeat: p === 13 ? Infinity : 0 }}
                  className="flex items-center justify-center gap-1.5 rounded-lg py-2 font-grotesk font-bold text-[10px] text-[#0A0A0A]"
                  style={{ background: "#D4AF37" }}>
                  {p === 13 ? <Check size={11} strokeWidth={3} /> : <FileText size={11} strokeWidth={2.5} />}
                  {p === 13 ? c.pdfDone : c.pdf}
                </motion.div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PartGroup({ title, count, children }: { title: string; count: string; children: React.ReactNode }) {
  return (
    <motion.div {...fadeUp} className="rounded-xl p-2.5 flex flex-col gap-1.5" style={PLAIN_CARD}>
      <div className="flex items-center justify-between">
        <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{title}</span>
        <span className="font-inter text-[8px] text-[#D4AF37]/70">{count}</span>
      </div>
      {children}
    </motion.div>
  );
}

function RecommendedPart({ c, part }: { c: (typeof CONTENT)[Locale]; part: string }) {
  return (
    <div className="rounded-lg px-2.5 py-2 flex items-center justify-between" style={GOLD_CARD}>
      <div>
        <span className="inline-block rounded px-1.5 py-0.5 mb-1 font-grotesk font-bold text-[7px] uppercase tracking-[0.15em] text-[#0A0A0A]"
          style={{ background: "#D4AF37" }}>{c.recommended}</span>
        <p className="font-mono font-bold text-[10px] text-[#F5F1E8]/90">{part}</p>
      </div>
      <span className="font-inter text-[8px] text-emerald-400/90 rounded px-1.5 py-0.5" style={{ background: "rgba(52,211,153,0.1)" }}>{c.ownBrand}</span>
    </div>
  );
}
