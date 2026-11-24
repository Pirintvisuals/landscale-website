"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileSearch, FileText, FileSpreadsheet, Check, AlertTriangle, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

// Scripted walkthrough of plan & tender review, played on a loop like the
// other hero visuals. Sample data only: no real client, project or company.
const PHASES = [
  1500, // 0  files land
  1700, // 1  reading progress
  1100, // 2  plan sheet shown
  1500, // 3  red frame drawn round the bathroom
  2100, // 4  measured quantity with source + confidence
  900,  // 5  comparison table header
  2300, // 6  rows fill in
  1900, // 7  missing item flagged
  2300, // 8  clarifying question drafted
  2600, // 9  Excel ready
];

type Status = "ok" | "diff" | "missing";

const CONTENT: Record<Locale, {
  title: string; sub: string; active: string;
  steps: [string, string, string, string];
  files: [string, string][];
  reading: string; readStats: string;
  sheet: string; rooms: [string, string][];
  qtyLabel: string; qtyVal: string; formula: string; source: string; conf: string;
  cols: [string, string, string];
  rows: { item: string; plan: string; bud: string; status: Status; note: string }[];
  flag: string;
  qTitle: string; qTo: string; qText: string;
  termsTitle: string; terms: [string, string][];
  excel: string; excelDone: string; summary: string;
}> = {
  hu: {
    title: "Terv- és kiírás-ellenőrző",
    sub: "Ajánlatadás előtt",
    active: "Fut",
    steps: ["Feltöltés", "Mérés", "Összevetés", "Átadás"],
    files: [
      ["Építészeti tervlapok.pdf", "24 lap"],
      ["Statikai terv, vaslista.pdf", "11 lap"],
      ["Gépészeti terv.pdf", "7 lap"],
      ["Tervezői költségvetés.xlsx", "318 tétel"],
      ["Műszaki leírás.pdf", "46 oldal"],
    ],
    reading: "Olvasás és mérés",
    readStats: "42 tervlap · 318 tétel · 497 bekezdés",
    sheet: "A-101 · Földszinti alaprajz",
    rooms: [["Nappali", "28,40 m²"], ["Konyha", "12,10 m²"], ["Háló", "14,80 m²"], ["Előtér", "8,90 m²"], ["Fürdő", "6,24 m²"]],
    qtyLabel: "Padlószigetelés · Fürdő",
    qtyVal: "6,24 m²",
    formula: "2,40 m × 2,60 m (méretezett falak között)",
    source: "Forrás: A-101, földszinti alaprajz",
    conf: "96%",
    cols: ["Tétel", "Terv", "Költségvetés"],
    rows: [
      { item: "Falazat, 30 cm", plan: "142,6 m²", bud: "142,6 m²", status: "ok", note: "Egyezik" },
      { item: "Betonacél B500B", plan: "3 842 kg", bud: "3 620 kg", status: "diff", note: "+6,1%" },
      { item: "Ablak 120×150", plan: "14 db", bud: "12 db", status: "diff", note: "−2 db" },
      { item: "Padlószigetelés, fürdő", plan: "6,24 m²", bud: "—", status: "missing", note: "Hiányzik" },
    ],
    flag: "Kimaradt a költségvetésből: fix áras ajánlatnál ez a te hasznodból menne el.",
    qTitle: "Tisztázó kérdés, megírva",
    qTo: "Címzett: tervező",
    qText: "Az A-101 lapon 14 db 120×150-es ablak szerepel, a költségvetésben 12 db. Melyik a mérvadó?",
    termsTitle: "Árat és kockázatot érintő feltételek",
    terms: [["Teljesítési határidő", "45 nap"], ["Késedelmi kötbér", "napi 0,5%, max. 20%"], ["Előleg", "nincs, 30 napos fizetés"]],
    excel: "Munkafüzet letöltése (Excel)",
    excelDone: "Excel kész, a megszokott formában",
    summary: "318 tétel · 2 eltérés · 1 hiány · minden számnál forrás",
  },
  en: {
    title: "Plan & Tender Review",
    sub: "Before you price",
    active: "Running",
    steps: ["Upload", "Measure", "Compare", "Hand-off"],
    files: [
      ["Architectural drawings.pdf", "24 sheets"],
      ["Structural, rebar schedule.pdf", "11 sheets"],
      ["MEP drawings.pdf", "7 sheets"],
      ["Designer's bill of quantities.xlsx", "318 items"],
      ["Specification.pdf", "46 pages"],
    ],
    reading: "Reading and measuring",
    readStats: "42 sheets · 318 items · 497 paragraphs",
    sheet: "A-101 · Ground floor plan",
    rooms: [["Living", "28.40 m²"], ["Kitchen", "12.10 m²"], ["Bedroom", "14.80 m²"], ["Hall", "8.90 m²"], ["Bath", "6.24 m²"]],
    qtyLabel: "Floor insulation · Bathroom",
    qtyVal: "6.24 m²",
    formula: "2.40 m × 2.60 m (between dimensioned walls)",
    source: "Source: A-101, ground floor plan",
    conf: "96%",
    cols: ["Item", "Drawings", "BoQ"],
    rows: [
      { item: "Masonry, 30 cm", plan: "142.6 m²", bud: "142.6 m²", status: "ok", note: "Match" },
      { item: "Rebar B500B", plan: "3,842 kg", bud: "3,620 kg", status: "diff", note: "+6.1%" },
      { item: "Window 120×150", plan: "14 pcs", bud: "12 pcs", status: "diff", note: "−2 pcs" },
      { item: "Floor insulation, bath", plan: "6.24 m²", bud: "—", status: "missing", note: "Missing" },
    ],
    flag: "Left out of the bill of quantities. On a fixed-price bid, this comes out of your margin.",
    qTitle: "Clarifying question, drafted",
    qTo: "To: designer",
    qText: "Sheet A-101 shows 14 windows at 120×150, the BoQ lists 12. Which one is correct?",
    termsTitle: "Terms that affect price and risk",
    terms: [["Completion deadline", "45 days"], ["Delay penalty", "0.5%/day, max 20%"], ["Advance payment", "none, 30-day terms"]],
    excel: "Download workbook (Excel)",
    excelDone: "Excel ready, in your usual format",
    summary: "318 items · 2 differences · 1 missing · every number sourced",
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
const RED = "#E5484D";

const STATUS_STYLE: Record<Status, { color: string; bg: string }> = {
  ok: { color: "#34D399", bg: "rgba(52,211,153,0.10)" },
  diff: { color: "#F5B83D", bg: "rgba(245,184,61,0.10)" },
  missing: { color: RED, bg: "rgba(229,72,77,0.12)" },
};

const fadeUp = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } };

export function TenderVisual({ lang = "en" }: { lang?: Locale }) {
  const c = CONTENT[lang];
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setP(prev => (prev + 1) % PHASES.length), PHASES[p]);
    return () => clearTimeout(t);
  }, [p]);

  const screen = p <= 1 ? 0 : p <= 4 ? 1 : p <= 7 ? 2 : 3;

  return (
    <div className="w-full flex flex-col gap-3 p-5 h-full select-none">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#D4AF37 0%,#B8941F 100%)", boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}>
            <FileSearch size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
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
      <div className="flex-1 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }} className="flex flex-col gap-2 h-full">

            {/* 1. Upload */}
            {screen === 0 && (
              <>
                {c.files.map(([name, meta], i) => (
                  <motion.div key={name} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.18 }}
                    className="rounded-lg px-3 py-2 flex items-center gap-2.5" style={PLAIN_CARD}>
                    {name.endsWith(".xlsx")
                      ? <FileSpreadsheet size={13} className="text-emerald-400/80 flex-shrink-0" />
                      : <FileText size={13} className="text-[#D4AF37]/70 flex-shrink-0" />}
                    <span className="font-inter text-[10px] text-[#F5F1E8]/80 flex-1 truncate">{name}</span>
                    <span className="font-inter text-[8px] text-[#F5F1E8]/35">{meta}</span>
                  </motion.div>
                ))}
                {p >= 1 && (
                  <motion.div {...fadeUp} className="rounded-xl p-3 mt-1" style={GOLD_CARD}>
                    <div className="flex justify-between mb-2">
                      <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{c.reading}</span>
                      <span className="font-inter text-[8px] text-[#D4AF37]/80">{c.readStats}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: "#D4AF37" }}
                        initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* 2. Measure on the plan */}
            {screen === 1 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/85">{c.sheet}</p>
                  <span className="font-mono text-[8px] text-[#F5F1E8]/35">1:100</span>
                </div>
                <div className="rounded-xl overflow-hidden relative" style={{ ...PLAIN_CARD, background: "rgba(245,241,232,0.02)" }}>
                  <PlanSheet rooms={c.rooms} framed={p >= 3} />
                </div>
                {p >= 4 && (
                  <motion.div {...fadeUp} className="rounded-xl px-3 py-2.5" style={GOLD_CARD}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{c.qtyLabel}</span>
                      <span className="font-grotesk font-bold text-[12px] text-[#F5F1E8]">{c.qtyVal}</span>
                    </div>
                    <p className="font-mono text-[8.5px] text-[#F5F1E8]/45">{c.formula}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-inter text-[8.5px] text-[#D4AF37]/75">{c.source}</span>
                      <span className="font-inter text-[8px] text-emerald-400/90 rounded px-1.5 py-0.5" style={{ background: "rgba(52,211,153,0.1)" }}>{c.conf}</span>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* 3. Compare with the cost estimate */}
            {screen === 2 && (
              <>
                <div className="rounded-xl overflow-hidden" style={PLAIN_CARD}>
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr] gap-2 px-3 py-1.5 border-b border-white/[0.06]">
                    {c.cols.map((h) => <span key={h} className="font-grotesk font-bold text-[8px] uppercase tracking-[0.12em] text-[#F5F1E8]/35">{h}</span>)}
                    <span />
                  </div>
                  {p >= 6 && c.rows.map((r, i) => {
                    const st = STATUS_STYLE[r.status];
                    const flagged = r.status === "missing" && p >= 7;
                    return (
                      <motion.div key={r.item} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.4 }}
                        className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr] gap-2 items-center px-3 py-2 border-b border-white/[0.04] transition-colors duration-500"
                        style={flagged ? { background: "rgba(229,72,77,0.08)" } : undefined}>
                        <span className="font-inter text-[9px] text-[#F5F1E8]/80 truncate">{r.item}</span>
                        <span className="font-inter text-[9px] text-[#F5F1E8]/60">{r.plan}</span>
                        <span className="font-inter text-[9px] text-[#F5F1E8]/60">{r.bud}</span>
                        <span className="font-inter text-[8px] font-semibold rounded px-1.5 py-0.5 text-center" style={{ color: st.color, background: st.bg }}>{r.note}</span>
                      </motion.div>
                    );
                  })}
                </div>
                {p >= 7 && (
                  <motion.div {...fadeUp} className="flex items-start gap-2 rounded-xl px-3 py-2.5"
                    style={{ background: "rgba(229,72,77,0.08)", border: `1px solid ${RED}55` }}>
                    <AlertTriangle size={12} style={{ color: RED }} className="flex-shrink-0 mt-px" />
                    <span className="font-inter text-[9px] text-[#F5F1E8]/80 leading-snug">{c.flag}</span>
                  </motion.div>
                )}
              </>
            )}

            {/* 4. Hand-off: question + Excel */}
            {screen === 3 && (
              <>
                <div className="rounded-xl p-3" style={PLAIN_CARD}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">
                      <Mail size={11} className="text-[#D4AF37]" />{c.qTitle}
                    </span>
                    <span className="font-inter text-[8px] text-[#D4AF37]/70">{c.qTo}</span>
                  </div>
                  <TypedText text={c.qText} />
                </div>
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                  className="rounded-xl p-3" style={PLAIN_CARD}>
                  <p className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85 mb-1.5">{c.termsTitle}</p>
                  {c.terms.map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-white/[0.04] last:border-0">
                      <span className="font-inter text-[9px] text-[#F5F1E8]/55">{k}</span>
                      <span className="font-inter text-[9px] font-semibold text-[#F5B83D]">{v}</span>
                    </div>
                  ))}
                </motion.div>
                {p >= 9 && (
                  <motion.p {...fadeUp} className="font-inter text-[9px] text-[#F5F1E8]/45 text-center">{c.summary}</motion.p>
                )}
                <motion.div
                  animate={p === 9 ? { boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 18px rgba(212,175,55,0.55)", "0 0 0px rgba(212,175,55,0)"] } : {}}
                  transition={{ duration: 1.3, repeat: p === 9 ? Infinity : 0 }}
                  className="mt-auto flex items-center justify-center gap-1.5 rounded-lg py-2 font-grotesk font-bold text-[10px] text-[#0A0A0A]"
                  style={{ background: "#D4AF37" }}>
                  {p === 9 ? <Check size={11} strokeWidth={3} /> : <FileSpreadsheet size={11} strokeWidth={2.5} />}
                  {p === 9 ? c.excelDone : c.excel}
                </motion.div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Simplified ground-floor plan; the bathroom gets a red frame once "measured". */
function PlanSheet({ rooms, framed }: { rooms: [string, string][]; framed: boolean }) {
  const wall = "rgba(245,241,232,0.55)";
  const label = (x: number, y: number, [name, area]: [string, string], hi = false) => (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize="7" fontFamily="Inter, sans-serif" fill={hi ? "#F5F1E8" : "rgba(245,241,232,0.55)"} fontWeight={hi ? 700 : 400}>{name}</text>
      <text x={x} y={y + 9} textAnchor="middle" fontSize="6" fontFamily="Inter, sans-serif" fill={hi ? "#D4AF37" : "rgba(245,241,232,0.35)"}>{area}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 300 150" className="w-full h-auto block">
      {/* grid */}
      <defs>
        <pattern id="tv-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="150" fill="url(#tv-grid)" />
      {/* outer + inner walls */}
      <rect x="20" y="15" width="260" height="120" fill="none" stroke={wall} strokeWidth="3" />
      <path d="M150 15V135 M150 80H280 M215 80V135 M20 90H95 M120 90H150" stroke={wall} strokeWidth="1.6" fill="none" />
      {/* door swings + window marks */}
      <path d="M95 90a25 25 0 0 1 25 0" stroke="rgba(245,241,232,0.3)" strokeWidth="0.7" fill="none" />
      <path d="M60 13.5h30 M190 13.5h30 M282 40v25" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      {/* dimension line */}
      <path d="M215 141H280 M215 138v6 M280 138v6" stroke="rgba(245,241,232,0.35)" strokeWidth="0.6" />
      <text x="247.5" y="148.5" textAnchor="middle" fontSize="5.5" fontFamily="Inter, sans-serif" fill="rgba(245,241,232,0.45)">2600</text>
      {label(85, 50, rooms[0])}
      {label(85, 110, rooms[1])}
      {label(215, 45, rooms[2])}
      {label(182, 105, rooms[3])}
      {label(247.5, 105, rooms[4], framed)}
      {/* red measurement frame */}
      {framed && (
        <motion.rect x="217" y="82" width="61" height="51" rx="1.5" fill="rgba(229,72,77,0.10)" stroke={RED} strokeWidth="1.6"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.9, ease: "easeInOut" }} />
      )}
    </svg>
  );
}

function TypedText({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN(v => (v >= text.length ? v : v + 2)), 30);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p className="font-inter text-[9.5px] text-[#F5F1E8]/75 leading-relaxed min-h-[42px]">
      {text.slice(0, n)}
      {n < text.length && <span className="text-[#D4AF37]">|</span>}
    </p>
  );
}
