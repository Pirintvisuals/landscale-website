"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Ruler, FileText, FileSpreadsheet, Check, EyeOff, AlertTriangle, Calculator, CheckCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/*
 * Scripted walkthrough of Tervolvasó (Plan Reader), modelled on the real review screen:
 * plan set + designer's unpriced budget in → sheets read → every budget line compared
 * (matches / differs / estimated) → a difference explained on the drawing → an estimate
 * with its formula → matches approved in one click → Excel.
 * Numbers come from a real reference family house; no client, address or town is shown.
 */

// [screen, duration ms]
const PHASES: [number, number][] = [
  [0, 3000], // plan set uploaded, personal data covered
  [1, 3800], // sheets read, checks tick off
  [2, 4000], // comparison summary + matching lines
  [3, 2000], // a difference: the two numbers
  [3, 3000], // red frame on the drawing + reason
  [4, 3800], // an estimate with its formula
  [5, 2400], // all matches approved in one click
  [5, 2800], // Excel ready
];
const firstPhaseOf = (screen: number) => PHASES.findIndex(([s]) => s === screen);

type Row = { item: string; theirs: string; ours: string; note: string };

const CONTENT: Record<Locale, {
  title: string; sub: string; active: string;
  steps: string[]; captions: string[];
  files: [string, string][]; redacted: string;
  checks: string[]; readDone: string;
  total: string; tiles: [string, string][]; colItem: string; colTheirs: string; colOurs: string; rows: Row[];
  diffItem: string; diffTheirs: string; diffOurs: string; diffConf: string; diffSource: string;
  rooms: { garage: string; garageArea: string; bike: string; bikeArea: string; living: string; kitchen: string };
  diffWhy: string;
  estItem: string; estTheirs: string; estOurs: string; estRange: string; estFormula: string; estRule: string; estPick: [string, string];
  approveBtn: string; approved: string; approvedCount: string;
  excel: string; excelDone: string; excelSheets: string;
  theirsLabel: string; oursLabel: string;
}> = {
  hu: {
    title: "Tervolvasó",
    sub: "Összevetés a tervező költségvetésével",
    active: "Fut",
    steps: ["Feltöltés", "Olvasás", "Összevetés", "Eltérés", "Becslés", "Jóváhagyás"],
    captions: [
      "Feltöltöd a tervcsomagot és a tervező árazatlan költségvetését. A személyes adatokat kitakarja.",
      "Végigolvassa a tervlapokat: helyiségek, falak, nyílások, homlokzatok, vaslisták.",
      "Soronként összeveti a költségvetéssel: mi egyezik, mi tér el, és mit kell becsülni.",
      "Ahol eltér, megmutatja, miért, és a rajzon piros kerettel jelöli.",
      "Ahol a rajz nem ad pontos adatot, becsül, és leírja a képletet meg a feltételezést.",
      "Az egyezéseket egy gombbal jóváhagyod, a többit átnézed. Az eredmény Excelben.",
    ],
    files: [["Építészeti tervlapok.pdf", "8 lap"], ["Statikai terv, vaslisták.pdf", "5 lap"], ["Gépészeti terv.pdf", "4 lap"], ["Műszaki leírás.pdf", "12 oldal"], ["Tervezői költségvetés.xlsx", "424 tétel"]],
    redacted: "Megrendelő neve, címe, helyrajzi szám kitakarva",
    checks: ["8 tervlap besorolva, méretarány ellenőrizve", "13 helyiségpecsét kiolvasva", "11 helyiség kimérve (±0,6%)", "24 nyílás a falakon", "4 homlokzat, 12 külső nyílás", "Vaslisták összeadva, lapösszesítővel egyezik"],
    readDone: "100 mennyiség kiszámolva, mindegyik forrással",
    total: "424 tétel",
    tiles: [["123", "egyezik"], ["5", "eltér"], ["20", "becslés"]],
    colItem: "Tétel", colTheirs: "Tervező", colOurs: "Program",
    rows: [
      { item: "Betonacél Ø10", theirs: "4,154 t", ours: "4,154 t", note: "kilóra" },
      { item: "Sáv- és lemezalap", theirs: "43,22 m³", ours: "43,43 m³", note: "" },
      { item: "Bűzelzáró HL136N", theirs: "3 db", ours: "3 db", note: "tervjelből" },
      { item: "Ablak 180/145", theirs: "4 db", ours: "4 db", note: "" },
    ],
    diffItem: "Padló hőszigetelés, aljzatbeton alá",
    diffTheirs: "44,19 m²", diffOurs: "51,03 m²", diffConf: "97%", diffSource: "Forrás: helyiséglista + helyiségpecsétek",
    rooms: { garage: "Garázs", garageArea: "44,19 m²", bike: "Kerékpár-\ntároló", bikeArea: "6,84 m²", living: "Nappali", kitchen: "Konyha" },
    diffWhy: "A kerékpártároló kimaradt a költségvetésből. Fix áras ajánlatnál ez a te hasznodból menne el.",
    estItem: "Födémzsaluzás",
    estTheirs: "238,99 m²", estOurs: "236,09 m²", estRange: "±10%",
    estFormula: "Képlet: a födémek alatti helyiségek területe",
    estRule: "Feltételezés: a födém alját a falak között zsaluzzák. Ha te máshogy számolod, a te szabályod lesz a beállítás.",
    estPick: ["A tervező száma", "Saját szám"],
    approveBtn: "Összes egyezés jóváhagyása",
    approved: "Jóváhagyva",
    approvedCount: "123 / 148",
    excel: "Ajánlat letöltése (Excel)",
    excelDone: "Excel kész: összevetés + kérdések lap",
    excelSheets: "Minden sorban: a tervező száma, a program száma, honnan jön, mennyire biztos",
    theirsLabel: "Tervező", oursLabel: "Program",
  },
  en: {
    title: "Plan Reader",
    sub: "Compared with the designer's bill of quantities",
    active: "Running",
    steps: ["Upload", "Read", "Compare", "Difference", "Estimate", "Approve"],
    captions: [
      "You upload the plan set and the designer's unpriced bill of quantities. Personal data is covered first.",
      "It reads every sheet: rooms, walls, openings, elevations, rebar schedules.",
      "It compares every line with the bill of quantities: what matches, what differs, what needs an estimate.",
      "Where a number differs, it shows why, and marks the spot on the drawing with a red frame.",
      "Where the drawing isn't exact, it estimates and writes down the formula and the assumption.",
      "Approve all matches in one click and review the rest. The result goes to Excel.",
    ],
    files: [["Architectural drawings.pdf", "8 sheets"], ["Structural, rebar schedules.pdf", "5 sheets"], ["MEP drawings.pdf", "4 sheets"], ["Specification.pdf", "12 pages"], ["Designer's BoQ.xlsx", "424 lines"]],
    redacted: "Client name, address and plot number covered",
    checks: ["8 sheets classified, scale verified", "13 room stamps read", "11 rooms measured (±0.6%)", "24 openings found in the walls", "4 elevations, 12 external openings", "Rebar schedules added up, match sheet totals"],
    readDone: "100 quantities computed, each with its source",
    total: "424 lines",
    tiles: [["123", "match"], ["5", "differ"], ["20", "estimated"]],
    colItem: "Line", colTheirs: "Designer", colOurs: "Program",
    rows: [
      { item: "Rebar Ø10", theirs: "4.154 t", ours: "4.154 t", note: "to the kg" },
      { item: "Strip & slab footings", theirs: "43.22 m³", ours: "43.43 m³", note: "" },
      { item: "Floor trap HL136N", theirs: "3 pcs", ours: "3 pcs", note: "from symbols" },
      { item: "Window 180/145", theirs: "4 pcs", ours: "4 pcs", note: "" },
    ],
    diffItem: "Floor insulation under the screed",
    diffTheirs: "44.19 m²", diffOurs: "51.03 m²", diffConf: "97%", diffSource: "Source: room schedule + room stamps",
    rooms: { garage: "Garage", garageArea: "44.19 m²", bike: "Bike store", bikeArea: "6.84 m²", living: "Living", kitchen: "Kitchen" },
    diffWhy: "The bike store was left out of the bill of quantities. On a fixed-price bid, that comes out of your margin.",
    estItem: "Slab formwork",
    estTheirs: "238.99 m²", estOurs: "236.09 m²", estRange: "±10%",
    estFormula: "Formula: floor area of the rooms under each slab",
    estRule: "Assumption: the slab soffit is formed between the walls. If you measure it differently, your rule becomes the setting.",
    estPick: ["Designer's number", "My own number"],
    approveBtn: "Approve all matches",
    approved: "Approved",
    approvedCount: "123 / 148",
    excel: "Download offer (Excel)",
    excelDone: "Excel ready: comparison + questions sheet",
    excelSheets: "Every line: designer's number, program's number, where it came from, how sure it is",
    theirsLabel: "Designer", oursLabel: "Program",
  },
};

const GOLD_CARD = {
  background: "linear-gradient(135deg,rgba(212,175,55,0.13) 0%,rgba(184,148,31,0.06) 100%)",
  border: "1px solid rgba(212,175,55,0.35)",
};
const PLAIN_CARD = { background: "rgba(245,241,232,0.03)", border: "1px solid rgba(245,241,232,0.07)" };
const RED = "#E5484D";
const AMBER = "#F5B83D";
const GREEN = "#34D399";

export function PlanReaderVisual({ lang = "en" }: { lang?: Locale }) {
  const c = CONTENT[lang];
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setP(prev => (prev + 1) % PHASES.length), PHASES[p][1]);
    return () => clearTimeout(t);
  }, [p]);

  const screen = PHASES[p][0];

  return (
    <div className="w-full flex flex-col gap-2.5 p-4 h-full select-none">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#D4AF37 0%,#B8941F 100%)", boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}>
            <Ruler size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/90 leading-none">{c.title}</p>
            <p className="font-inter text-[9px] text-[#D4AF37]/60 mt-0.5">{c.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[9px] text-emerald-400">{c.active}</span>
        </div>
      </div>

      {/* Stepper (clickable) */}
      <div className="grid grid-cols-6 gap-1 flex-shrink-0">
        {c.steps.map((label, i) => (
          <button key={label} type="button" onClick={() => setP(firstPhaseOf(i))} className="flex flex-col gap-1 text-left cursor-pointer group">
            <div className="h-0.5 rounded-full transition-colors duration-500" style={{ background: i <= screen ? "#D4AF37" : "rgba(245,241,232,0.08)" }} />
            <span className={`font-inter text-[8px] leading-tight transition-colors duration-300 ${i === screen ? "text-[#D4AF37]" : "text-[#F5F1E8]/30 group-hover:text-[#F5F1E8]/60"}`}>
              {i + 1}. {label}
            </span>
          </button>
        ))}
      </div>

      {/* Plain-language caption */}
      <AnimatePresence mode="wait">
        <motion.div key={`cap-${screen}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          className="flex-shrink-0 rounded-lg px-3 py-2 flex items-start gap-2" style={{ background: "rgba(212,175,55,0.07)", borderLeft: "2px solid #D4AF37" }}>
          <span className="font-grotesk font-bold text-[11px] text-[#D4AF37] leading-snug">{screen + 1}.</span>
          <p className="font-inter text-[10.5px] text-[#F5F1E8]/85 leading-snug">{c.captions[screen]}</p>
        </motion.div>
      </AnimatePresence>

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
                    className="rounded-lg px-3 py-1.5 flex items-center gap-2.5" style={PLAIN_CARD}>
                    {name.endsWith(".xlsx") ? <FileSpreadsheet size={12} className="text-emerald-400/80 flex-shrink-0" /> : <FileText size={12} className="text-[#D4AF37]/70 flex-shrink-0" />}
                    <span className="font-inter text-[10px] text-[#F5F1E8]/80 flex-1 truncate">{name}</span>
                    <span className="font-inter text-[8px] text-[#F5F1E8]/35">{meta}</span>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                  className="rounded-lg px-3 py-2 flex items-center gap-2 mt-1" style={GOLD_CARD}>
                  <EyeOff size={12} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="font-inter text-[9.5px] text-[#F5F1E8]/85">{c.redacted}</span>
                  <span className="ml-auto flex gap-1">
                    {[42, 28, 36].map((w, i) => <span key={i} className="h-2 rounded-sm bg-[#0A0A0A] border border-white/10" style={{ width: w }} />)}
                  </span>
                </motion.div>
              </>
            )}

            {/* 2. Read */}
            {screen === 1 && (
              <div className="rounded-xl p-3 flex flex-col gap-1.5" style={PLAIN_CARD}>
                {c.checks.map((txt, i) => (
                  <motion.div key={txt} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.45 }}
                    className="flex items-center gap-2">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.45 + 0.25 }}
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(52,211,153,0.15)" }}>
                      <Check size={9} className="text-emerald-400" strokeWidth={3} />
                    </motion.span>
                    <span className="font-inter text-[10px] text-[#F5F1E8]/80">{txt}</span>
                  </motion.div>
                ))}
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden mt-1.5">
                  <motion.div className="h-full rounded-full" style={{ background: "#D4AF37" }}
                    initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "easeInOut" }} />
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}
                  className="font-grotesk font-bold text-[10px] text-[#D4AF37]">{c.readDone}</motion.p>
              </div>
            )}

            {/* 3. Compare */}
            {screen === 2 && (
              <>
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="rounded-lg py-2 text-center" style={PLAIN_CARD}>
                    <p className="font-grotesk font-bold text-[13px] text-[#F5F1E8] leading-none">{c.total.split(" ")[0]}</p>
                    <p className="font-inter text-[7.5px] text-[#F5F1E8]/45 mt-1">{c.total.split(" ").slice(1).join(" ")}</p>
                  </div>
                  {c.tiles.map(([v, l], i) => {
                    const col = [GREEN, RED, AMBER][i];
                    return (
                      <motion.div key={l} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.2 }}
                        className="rounded-lg py-2 text-center" style={{ background: `${col}14`, border: `1px solid ${col}55` }}>
                        <p className="font-grotesk font-bold text-[13px] leading-none" style={{ color: col }}>{v}</p>
                        <p className="font-inter text-[7.5px] text-[#F5F1E8]/55 mt-1">{l}</p>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="rounded-xl overflow-hidden" style={PLAIN_CARD}>
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_0.5fr] gap-2 px-3 py-1.5 border-b border-white/[0.06]">
                    {[c.colItem, c.colTheirs, c.colOurs].map((h) => <span key={h} className="font-grotesk font-bold text-[8px] uppercase tracking-[0.12em] text-[#F5F1E8]/35">{h}</span>)}
                    <span />
                  </div>
                  {c.rows.map((r, i) => (
                    <motion.div key={r.item} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.4 }}
                      className="grid grid-cols-[1.6fr_1fr_1fr_0.5fr] gap-2 items-center px-3 py-1.5 border-b border-white/[0.04]">
                      <span className="font-inter text-[9.5px] text-[#F5F1E8]/80 truncate">{r.item}{r.note && <span className="text-[#D4AF37]/70"> · {r.note}</span>}</span>
                      <span className="font-inter text-[9.5px] text-[#F5F1E8]/55">{r.theirs}</span>
                      <span className="font-inter text-[9.5px] text-[#F5F1E8]/90 font-semibold">{r.ours}</span>
                      <span className="flex justify-end"><Check size={11} className="text-emerald-400" strokeWidth={3} /></span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* 4. Difference, shown on the drawing */}
            {screen === 3 && (
              <>
                <div className="rounded-xl p-2.5" style={{ ...PLAIN_CARD, borderLeft: `2px solid ${RED}` }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle size={11} style={{ color: RED }} />
                    <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/90 flex-1 truncate">{c.diffItem}</span>
                    <span className="font-inter text-[8px] font-semibold rounded px-1.5 py-0.5" style={{ color: GREEN, background: "rgba(52,211,153,0.1)" }}>{c.diffConf}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-inter text-[9px] text-[#F5F1E8]/45">{c.theirsLabel}: <span className="text-[11px] text-[#F5F1E8]/70">{c.diffTheirs}</span></span>
                    <span className="text-[#F5F1E8]/30 text-[10px]">→</span>
                    <span className="font-inter text-[9px] text-[#F5F1E8]/45">{c.oursLabel}: <span className="font-grotesk font-bold text-[13px]" style={{ color: RED }}>{c.diffOurs}</span></span>
                  </div>
                  <p className="font-inter text-[7.5px] text-[#D4AF37]/60 mt-1">{c.diffSource} ›</p>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ ...PLAIN_CARD, background: "rgba(245,241,232,0.02)" }}>
                  <FloorPlan c={c} framed={p >= 4} />
                </div>
                {p >= 4 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg px-3 py-2 flex items-start gap-2" style={{ background: "rgba(229,72,77,0.08)", border: `1px solid ${RED}55` }}>
                    <AlertTriangle size={11} style={{ color: RED }} className="flex-shrink-0 mt-px" />
                    <span className="font-inter text-[9.5px] text-[#F5F1E8]/85 leading-snug">{c.diffWhy}</span>
                  </motion.div>
                )}
              </>
            )}

            {/* 5. Estimate with formula */}
            {screen === 4 && (
              <div className="rounded-xl p-3 flex flex-col gap-2" style={{ ...PLAIN_CARD, borderLeft: `2px solid ${AMBER}` }}>
                <div className="flex items-center gap-1.5">
                  <Calculator size={12} style={{ color: AMBER }} />
                  <span className="font-grotesk font-bold text-[10.5px] text-[#F5F1E8]/90 flex-1">{c.estItem}</span>
                  <span className="font-inter text-[8px] font-semibold rounded px-1.5 py-0.5" style={{ color: AMBER, background: "rgba(245,184,61,0.12)" }}>{c.estRange}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[[c.theirsLabel, c.estTheirs], [c.oursLabel, c.estOurs]].map(([l, v], i) => (
                    <div key={l} className="rounded-lg px-2.5 py-1.5" style={{ background: "rgba(10,10,10,0.5)", border: "1px solid rgba(245,241,232,0.06)" }}>
                      <p className="font-inter text-[8px] text-[#F5F1E8]/45">{l}</p>
                      <p className="font-grotesk font-bold text-[12px]" style={{ color: i === 1 ? AMBER : "#F5F1E8" }}>{v}</p>
                    </div>
                  ))}
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="font-mono text-[9px] text-[#F5F1E8]/70 rounded-md px-2 py-1.5" style={{ background: "rgba(245,184,61,0.06)" }}>{c.estFormula}</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  className="font-inter text-[9.5px] text-[#F5F1E8]/70 leading-snug">{c.estRule}</motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex gap-1.5">
                  {c.estPick.map((label, i) => (
                    <span key={label} className="font-inter text-[8.5px] rounded-md px-2 py-1"
                      style={i === 1 ? { background: "#D4AF37", color: "#0A0A0A", fontWeight: 700 } : { ...PLAIN_CARD, color: "rgba(245,241,232,0.6)" }}>
                      {label}
                    </span>
                  ))}
                </motion.div>
              </div>
            )}

            {/* 6. Approve + Excel */}
            {screen === 5 && (
              <>
                <motion.div
                  animate={{ scale: [1, 0.96, 1] }} transition={{ duration: 0.35, delay: 0.5 }}
                  className="rounded-lg py-2 flex items-center justify-center gap-1.5 font-grotesk font-bold text-[10px]"
                  style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.45)", color: GREEN }}>
                  <CheckCheck size={12} />{c.approveBtn} (123)
                </motion.div>
                <div className="rounded-xl p-3" style={PLAIN_CARD}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-inter text-[9.5px] text-[#F5F1E8]/60">{c.approved}</span>
                    <span className="font-grotesk font-bold text-[11px] text-[#F5F1E8]">{c.approvedCount}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: GREEN }}
                      initial={{ width: "0%" }} animate={{ width: `${(123 / 148) * 100}%` }} transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }} />
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    {[["5", RED], ["20", AMBER]].map(([n, col], i) => (
                      <span key={i} className="font-inter text-[8.5px] rounded px-1.5 py-0.5" style={{ color: col, background: `${col}18` }}>
                        {n} {i === 0 ? c.tiles[1][1] : c.tiles[2][1]}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                  className="font-inter text-[9px] text-[#F5F1E8]/50 leading-snug">{c.excelSheets}</motion.p>
                <motion.div
                  animate={p === 7 ? { boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 18px rgba(212,175,55,0.55)", "0 0 0px rgba(212,175,55,0)"] } : {}}
                  transition={{ duration: 1.3, repeat: p === 7 ? Infinity : 0 }}
                  className="mt-auto flex items-center justify-center gap-1.5 rounded-lg py-2 font-grotesk font-bold text-[10px] text-[#0A0A0A]"
                  style={{ background: "#D4AF37" }}>
                  {p === 7 ? <Check size={11} strokeWidth={3} /> : <FileSpreadsheet size={11} strokeWidth={2.5} />}
                  {p === 7 ? c.excelDone : c.excel}
                </motion.div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Simplified ground floor: garage and bike store are the unheated rooms; the bike store gets the red frame. */
function FloorPlan({ c, framed }: { c: (typeof CONTENT)[Locale]; framed: boolean }) {
  const wall = "rgba(245,241,232,0.55)";
  const label = (x: number, y: number, name: string, area: string, hi = false, dim = false) => (
    <g>
      <text x={x} y={y} textAnchor="middle" fontSize="7" fontFamily="Inter, sans-serif" fontWeight={hi ? 700 : 400}
        fill={hi ? "#F5F1E8" : dim ? "rgba(245,241,232,0.3)" : "rgba(245,241,232,0.6)"}>
        {name.split("\n").map((part, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 8}>{part}</tspan>)}
      </text>
      {area && <text x={x} y={y + 9 + (name.split("\n").length - 1) * 8} textAnchor="middle" fontSize="6" fontFamily="Inter, sans-serif" fill={hi ? RED : "rgba(212,175,55,0.7)"}>{area}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 300 120" className="w-full h-auto block">
      <defs>
        <pattern id="pr-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="120" fill="url(#pr-grid)" />
      {/* outer walls */}
      <rect x="14" y="12" width="272" height="96" fill="none" stroke={wall} strokeWidth="3" />
      {/* inner walls: garage | bike store | house */}
      <path d="M120 12V108 M120 72H170 M170 12V108 M228 12V64 M170 64H286" stroke={wall} strokeWidth="1.6" fill="none" />
      {/* garage counted by the designer: soft gold tint */}
      <rect x="16" y="14" width="102" height="92" fill="rgba(212,175,55,0.08)" />
      {label(67, 56, c.rooms.garage, c.rooms.garageArea)}
      {label(145, c.rooms.bike.includes("\n") ? 83 : 86, c.rooms.bike, c.rooms.bikeArea, framed)}
      {label(199, 36, c.rooms.living, "", false, true)}
      {label(257, 36, c.rooms.kitchen, "", false, true)}
      {framed && (
        <motion.rect x="122" y="74" width="46" height="32" rx="1.5" fill="rgba(229,72,77,0.12)" stroke={RED} strokeWidth="1.8"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
      )}
    </svg>
  );
}
