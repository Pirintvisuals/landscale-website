"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileSearch, FileText, FileSpreadsheet, Check, X, Mail, Inbox, Factory, GitCompare, AlertTriangle, Calculator } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/*
 * Scripted walkthrough of the tender-prep tool, modelled on the real product flow:
 * request arrives → package read → errors flagged → estimator approves / rejects →
 * question letter drafted → 60 items split by workshop → revised item list compared →
 * first price draft from the company's own rates → Excel workbook.
 * Sample data only: no client, tender or company is named.
 */

// [screen, duration ms]
const PHASES: [number, number][] = [
  [0, 3200], // request email arrives
  [1, 2600], // files read, progress bar
  [1, 1600], // reading done
  [2, 2600], // error cards appear
  [2, 2800], // estimator approves 3, rejects 1
  [3, 4600], // question letter typed
  [4, 3800], // items sorted into workshops
  [5, 3600], // revised item list compared
  [6, 3600], // first price draft from own rates
  [6, 2800], // workbook ready
];
const firstPhaseOf = (screen: number) => PHASES.findIndex(([s]) => s === screen);

type Decision = "ok" | "no";
type Err = { conf: number; type: string; item: string; text: string; src: string; decision: Decision };

const CONTENT: Record<Locale, {
  title: string; sub: string; active: string; badgeNew: string;
  steps: string[];
  captions: string[];
  mailFrom: string; mailSubject: string; mailBody: string; mailDeadline: string;
  attachments: [string, string][];
  reading: string; readStats: string; readDone: string;
  errHead: string; errCounts: string; approve: string; reject: string; approved: string; rejected: string; sourceLabel: string;
  errors: Err[];
  qTo: string; qLangs: string[]; qText: string; qSend: string;
  shopsHead: string; shopsNote: string; shops: [string, number, string][]; itemsWord: string;
  revHead: string; revStats: [string, string][]; revItem: string; revField: string; revOld: string; revNew: string; revPrice: string; revFlagged: string;
  priceHead: string; priceRows: [string, string, "ok" | "pending"][]; priceCond: string; priceTotalLabel: string; priceTotal: string; priceApprove: string;
  excel: string; excelDone: string;
}> = {
  hu: {
    title: "Ajánlat-előkészítő",
    sub: "Ajánlatadási csoport",
    active: "Fut",
    badgeNew: "ÚJ",
    steps: ["Ajánlatkérés", "Beolvasás", "Hibák", "Kérdések", "Üzemek", "Változások", "Árazás"],
    captions: [
      "Beérkezik egy ajánlatkérés: tételjegyzék, tervlapok, konszignáció és szerződés.",
      "Az árajánlatadó feltölti a mappát. A program mindent végigolvas és összevet.",
      "Megjelöli a hibákat és hiányokat, forrással. A kolléga dönt: jóváhagyja, vagy „nem hiba”.",
      "A jóváhagyott hibákból kész kérdéslevél lesz az ajánlatkérőnek.",
      "Mind a 60 tételt besorolja: melyik üzem gyártja, és mit kell beszállítótól venni.",
      "Javított tételjegyzék érkezik? Megmutatja, pontosan mi változott.",
      "Első árvázlatot ad a cég saját áraiból. A végső árat a kolléga hagyja jóvá.",
    ],
    mailFrom: "Ajánlatkérő",
    mailSubject: "Ajánlatkérés: bútorok gyártása, szállítása és beépítése",
    mailBody: "Kérjük, a mellékelt dokumentumok alapján adja meg ajánlatát. 4 rész, 60 tétel.",
    mailDeadline: "Ajánlattételi határidő: 12 nap",
    attachments: [["Tételjegyzék.xlsx", "60 tétel"], ["Tervlapok.pdf", "6 lap"], ["Konszignáció.pdf", "2 lap"], ["Szerződéstervezet.pdf", "14 oldal"], ["Műszaki leírás.pdf", "9 oldal"]],
    reading: "Olvasás és összevetés",
    readStats: "60 tétel · 1 049 db · 497 bekezdés",
    readDone: "Kész, 110 másodperc alatt",
    errHead: "Hibák a kiírásban",
    errCounts: "11 hiba · 9 hiányzó adat",
    approve: "Jóváhagyom",
    reject: "Nem hiba",
    approved: "Jóváhagyva",
    rejected: "Nem hiba",
    sourceLabel: "Forrás",
    errors: [
      { conf: 95, type: "Pontatlan méret", item: "3/1 · Fém polcrendszer · 18 db", text: "Mélység: 600 cm, a megengedett sáv 550–700 mm. Valószínűleg 600 mm.", src: "Tételjegyzék, 3. rész, 2. sor", decision: "ok" },
      { conf: 90, type: "Ellentmondás", item: "1/4 · Kétajtós szekrény · 25 db", text: "A 70 cm-es szélességbe nem fér el 3 oszlop szabványos fiók.", src: "Tételjegyzék, 1. rész, 5. sor", decision: "ok" },
      { conf: 85, type: "Eltérő darabszám", item: "1/14 · Falipolc", text: "A konszignáció 9 db-ot ír, a tételjegyzék 7 db-ot.", src: "Konszignáció, 2. lap", decision: "ok" },
      { conf: 70, type: "Talán hiba", item: "1/13 · Fiókos konténer · 9 db", text: "684+65 mm nem fér az asztal alá. Lehet, hogy a +65 mm csak görgő.", src: "Tételjegyzék, 1. rész, 14. sor", decision: "no" },
    ],
    qTo: "Címzett: ajánlatkérő",
    qLangs: ["Magyar", "Deutsch", "Română"],
    qText: "Tisztelt Ajánlatkérő!\nAz ajánlat elkészítéséhez az alábbiak pontosítását kérjük:\n1. 3/1 Fém polcrendszer: a 600 cm-es mélység 600 mm-t jelent?\n2. 1/4 Kétajtós szekrény: 70 cm szélességben nem fér el 3 oszlop fiók. Melyik adat a mérvadó?\n3. 1/14 Falipolc: a konszignáció 9, a tételjegyzék 7 db-ot ír. Melyik a helyes?",
    qSend: "Küldésre kész",
    shopsHead: "60 tétel szétosztva",
    shopsNote: "A bizonytalan besorolások elöl, sárgával, átnézésre.",
    shops: [["Faüzem", 12, "131 db"], ["Fémüzem", 2, "43 db"], ["Fa + fém", 12, "207 db"], ["Kárpitos", 15, "229 db"], ["Beszállítói", 19, "439 db"]],
    itemsWord: "tétel",
    revHead: "Javított tételjegyzék érkezett",
    revStats: [["11", "módosított tétel"], ["6", "árat érinti"], ["8", "előre jelezte"]],
    revItem: "1/4 · Kétajtós szekrény",
    revField: "Szélesség",
    revOld: "70 cm",
    revNew: "100–110 cm",
    revPrice: "Árat érinti",
    revFlagged: "A program előre jelezte",
    priceHead: "Első árvázlat a saját áraidból",
    priceRows: [["Faüzem · 12 tétel", "6 840 000 Ft", "ok"], ["Fémüzem · 2 tétel", "1 120 000 Ft", "ok"], ["Fa + fém · 12 tétel", "5 960 000 Ft", "ok"], ["Kárpitos · 15 tétel", "4 380 000 Ft", "ok"], ["Beszállítói · 19 tétel", "ajánlat bekérve", "pending"]],
    priceCond: "3 tétel feltételesen árazva, amíg megjön a válasz a kérdésekre",
    priceTotalLabel: "Saját gyártás, nettó",
    priceTotal: "18 300 000 Ft",
    priceApprove: "A végső árat a kolléga hagyja jóvá",
    excel: "Munkafüzet letöltése (Excel)",
    excelDone: "Excel kész, a megszokott formában",
  },
  en: {
    title: "Tender Prep",
    sub: "Estimating team",
    active: "Running",
    badgeNew: "NEW",
    steps: ["Request", "Read", "Errors", "Questions", "Workshops", "Changes", "Pricing"],
    captions: [
      "A request for quotation arrives: item list, drawings, schedules and the contract.",
      "Your estimator uploads the folder. The tool reads everything and cross-checks it.",
      "It flags errors and gaps, with the source. Your estimator decides: approve, or “not an error”.",
      "The approved errors become a ready-to-send question letter to the client.",
      "All 60 items are sorted: which workshop makes what, and what to buy in.",
      "A revised item list arrives? It shows exactly what changed.",
      "A first price draft from your own rates. Your estimator approves the final price.",
    ],
    mailFrom: "Client",
    mailSubject: "Request for quotation: furniture manufacture, delivery and fitting",
    mailBody: "Please submit your offer based on the attached documents. 4 lots, 60 items.",
    mailDeadline: "Submission deadline: 12 days",
    attachments: [["Item list.xlsx", "60 items"], ["Drawings.pdf", "6 sheets"], ["Schedule.pdf", "2 sheets"], ["Draft contract.pdf", "14 pages"], ["Specification.pdf", "9 pages"]],
    reading: "Reading and cross-checking",
    readStats: "60 items · 1,049 units · 497 paragraphs",
    readDone: "Done in 110 seconds",
    errHead: "Errors in the tender",
    errCounts: "11 errors · 9 missing details",
    approve: "Approve",
    reject: "Not an error",
    approved: "Approved",
    rejected: "Not an error",
    sourceLabel: "Source",
    errors: [
      { conf: 95, type: "Wrong unit", item: "3/1 · Metal shelving · 18 pcs", text: "Depth: 600 cm, but the allowed range is 550–700 mm. Probably 600 mm.", src: "Item list, lot 3, row 2", decision: "ok" },
      { conf: 90, type: "Contradiction", item: "1/4 · Two-door cabinet · 25 pcs", text: "Three columns of standard drawers can't fit in a 70 cm width.", src: "Item list, lot 1, row 5", decision: "ok" },
      { conf: 85, type: "Count mismatch", item: "1/14 · Wall shelf", text: "The schedule says 9 pcs, the item list says 7 pcs.", src: "Schedule, sheet 2", decision: "ok" },
      { conf: 70, type: "Possible error", item: "1/13 · Drawer unit · 9 pcs", text: "684+65 mm won't fit under the desk. The +65 mm may just be castors.", src: "Item list, lot 1, row 14", decision: "no" },
    ],
    qTo: "To: client",
    qLangs: ["English", "Deutsch", "Magyar"],
    qText: "Dear Sir or Madam,\nBefore we submit our offer, please clarify the following:\n1. 3/1 Metal shelving: does the 600 cm depth mean 600 mm?\n2. 1/4 Two-door cabinet: three columns of drawers don't fit in 70 cm. Which figure applies?\n3. 1/14 Wall shelf: the schedule says 9 pcs, the item list 7. Which is correct?",
    qSend: "Ready to send",
    shopsHead: "60 items sorted",
    shopsNote: "Uncertain assignments come first, in yellow, for review.",
    shops: [["Joinery", 12, "131 pcs"], ["Metal shop", 2, "43 pcs"], ["Wood + metal", 12, "207 pcs"], ["Upholstery", 15, "229 pcs"], ["Bought in", 19, "439 pcs"]],
    itemsWord: "items",
    revHead: "Revised item list received",
    revStats: [["11", "items changed"], ["6", "affect price"], ["8", "flagged in advance"]],
    revItem: "1/4 · Two-door cabinet",
    revField: "Width",
    revOld: "70 cm",
    revNew: "100–110 cm",
    revPrice: "Affects price",
    revFlagged: "Flagged by the tool in advance",
    priceHead: "First price draft from your rates",
    priceRows: [["Joinery · 12 items", "£152,400", "ok"], ["Metal shop · 2 items", "£24,900", "ok"], ["Wood + metal · 12 items", "£132,800", "ok"], ["Upholstery · 15 items", "£97,600", "ok"], ["Bought in · 19 items", "quotes requested", "pending"]],
    priceCond: "3 items priced conditionally until the client answers your questions",
    priceTotalLabel: "In-house manufacture, net",
    priceTotal: "£407,700",
    priceApprove: "Your estimator approves the final price",
    excel: "Download workbook (Excel)",
    excelDone: "Excel ready, in your usual format",
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
const SHOP_COLORS = ["#D4AF37", "#9CA3AF", "#C9A96E", "#E58E6B", "#60A5FA"];

export function TenderVisual({ lang = "en" }: { lang?: Locale }) {
  const c = CONTENT[lang];
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setP(prev => (prev + 1) % PHASES.length), PHASES[p][1]);
    return () => clearTimeout(t);
  }, [p]);

  const screen = PHASES[p][0];
  const maxShop = Math.max(...c.shops.map(([, n]) => n));

  return (
    <div className="w-full flex flex-col gap-2.5 p-4 h-full select-none">

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
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[9px] text-emerald-400">{c.active}</span>
        </div>
      </div>

      {/* Stepper (clickable) */}
      <div className="grid grid-cols-7 gap-1 flex-shrink-0">
        {c.steps.map((label, i) => (
          <button key={label} type="button" onClick={() => setP(firstPhaseOf(i))} className="flex flex-col gap-1 text-left cursor-pointer group">
            <div className="h-0.5 rounded-full transition-colors duration-500" style={{ background: i <= screen ? "#D4AF37" : "rgba(245,241,232,0.08)" }} />
            <span className={`font-inter text-[8px] leading-tight transition-colors duration-300 ${i === screen ? "text-[#D4AF37]" : "text-[#F5F1E8]/30 group-hover:text-[#F5F1E8]/60"}`}>
              {i + 1}. {label}
            </span>
          </button>
        ))}
      </div>

      {/* Plain-language caption for the current step */}
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

            {/* 1. Request arrives */}
            {screen === 0 && (
              <motion.div initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45 }}
                className="rounded-xl p-3 flex flex-col gap-2" style={GOLD_CARD}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10px] text-[#F5F1E8]/90"><Inbox size={12} className="text-[#D4AF37]" />{c.mailFrom}</span>
                  <span className="font-inter text-[8px] font-bold text-[#0A0A0A] bg-[#D4AF37] rounded px-1.5 py-0.5">{c.badgeNew}</span>
                </div>
                <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8] leading-snug">{c.mailSubject}</p>
                <p className="font-inter text-[9.5px] text-[#F5F1E8]/60 leading-snug">{c.mailBody}</p>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {c.attachments.map(([name, meta], i) => (
                    <motion.div key={name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                      className="rounded-md px-2 py-1.5 flex items-center gap-1.5" style={PLAIN_CARD}>
                      {name.endsWith(".xlsx") ? <FileSpreadsheet size={11} className="text-emerald-400/80 flex-shrink-0" /> : <FileText size={11} className="text-[#D4AF37]/70 flex-shrink-0" />}
                      <span className="font-inter text-[9px] text-[#F5F1E8]/80 truncate flex-1">{name}</span>
                      <span className="font-inter text-[7.5px] text-[#F5F1E8]/35">{meta}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="font-inter text-[9px] mt-0.5" style={{ color: AMBER }}>{c.mailDeadline}</p>
              </motion.div>
            )}

            {/* 2. Upload & read */}
            {screen === 1 && (
              <>
                {c.attachments.map(([name, meta], i) => (
                  <motion.div key={name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
                    className="rounded-lg px-3 py-1.5 flex items-center gap-2.5" style={PLAIN_CARD}>
                    {name.endsWith(".xlsx") ? <FileSpreadsheet size={12} className="text-emerald-400/80 flex-shrink-0" /> : <FileText size={12} className="text-[#D4AF37]/70 flex-shrink-0" />}
                    <span className="font-inter text-[10px] text-[#F5F1E8]/80 flex-1 truncate">{name}</span>
                    <span className="font-inter text-[8px] text-[#F5F1E8]/35">{meta}</span>
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.35 }}>
                      <Check size={11} className="text-emerald-400" strokeWidth={3} />
                    </motion.span>
                  </motion.div>
                ))}
                <div className="rounded-xl p-3 mt-1" style={GOLD_CARD}>
                  <div className="flex justify-between mb-2">
                    <span className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/85">{p >= 2 ? c.readDone : c.reading}</span>
                    <span className="font-inter text-[8.5px] text-[#D4AF37]/85">{c.readStats}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: p >= 2 ? GREEN : "#D4AF37" }}
                      initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.2, ease: "easeInOut" }} />
                  </div>
                </div>
              </>
            )}

            {/* 3. Errors, approve / reject */}
            {screen === 2 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10.5px] text-[#F5F1E8]/90"><AlertTriangle size={12} style={{ color: RED }} />{c.errHead}</span>
                  <span className="font-inter text-[8.5px] font-semibold rounded px-1.5 py-0.5" style={{ color: RED, background: "rgba(229,72,77,0.12)" }}>{c.errCounts}</span>
                </div>
                {c.errors.map((e, i) => {
                  const decided = p >= 4;
                  const ok = e.decision === "ok";
                  const confColor = e.conf >= 90 ? RED : e.conf >= 80 ? AMBER : "#9CA3AF";
                  return (
                    <motion.div key={e.item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: decided && !ok ? 0.45 : 1, x: 0 }} transition={{ delay: decided ? i * 0.3 : i * 0.3 }}
                      className="rounded-lg px-2.5 py-1.5 transition-colors duration-500"
                      style={decided && ok ? { background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.3)" } : { ...PLAIN_CARD, borderLeft: `2px solid ${confColor}` }}>
                      <div className="flex items-center gap-1.5">
                        <span className="font-inter text-[8px] font-bold rounded px-1 py-px flex-shrink-0" style={{ color: confColor, background: `${confColor}22` }}>{e.conf}%</span>
                        <span className="font-grotesk font-bold text-[9.5px] text-[#F5F1E8]/90 flex-shrink-0">{e.type}</span>
                        <span className="font-inter text-[8px] text-[#F5F1E8]/40 truncate flex-1">{e.item}</span>
                        {decided ? (
                          <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.3 }}
                            className="flex items-center gap-0.5 font-inter text-[8px] font-semibold rounded px-1.5 py-0.5 flex-shrink-0"
                            style={ok ? { color: "#0A0A0A", background: GREEN } : { color: "#F5F1E8", background: "rgba(245,241,232,0.15)" }}>
                            {ok ? <Check size={8} strokeWidth={3} /> : <X size={8} strokeWidth={3} />}{ok ? c.approved : c.rejected}
                          </motion.span>
                        ) : (
                          <span className="flex gap-1 flex-shrink-0">
                            <span className="font-inter text-[7.5px] rounded px-1 py-0.5 text-[#F5F1E8]/60" style={PLAIN_CARD}>✓ {c.approve}</span>
                            <span className="font-inter text-[7.5px] rounded px-1 py-0.5 text-[#F5F1E8]/60" style={PLAIN_CARD}>✗ {c.reject}</span>
                          </span>
                        )}
                      </div>
                      <p className="font-inter text-[9px] text-[#F5F1E8]/70 leading-snug mt-0.5">{e.text}</p>
                      <p className="font-inter text-[7.5px] text-[#D4AF37]/60 mt-0.5">{c.sourceLabel}: {e.src} ›</p>
                    </motion.div>
                  );
                })}
              </>
            )}

            {/* 4. Question letter */}
            {screen === 3 && (
              <div className="rounded-xl p-3 flex flex-col gap-2 h-full" style={PLAIN_CARD}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10px] text-[#F5F1E8]/85"><Mail size={11} className="text-[#D4AF37]" />{c.qTo}</span>
                  <span className="flex gap-1">
                    {c.qLangs.map((l, i) => (
                      <span key={l} className="font-inter text-[7.5px] rounded px-1.5 py-0.5"
                        style={i === 0 ? { background: "#D4AF37", color: "#0A0A0A", fontWeight: 700 } : { ...PLAIN_CARD, color: "rgba(245,241,232,0.55)" }}>{l}</span>
                    ))}
                  </span>
                </div>
                <TypedText text={c.qText} />
                <div className="mt-auto flex justify-end">
                  <span className="flex items-center gap-1 font-inter text-[8.5px] font-semibold rounded px-2 py-1" style={{ color: "#0A0A0A", background: GREEN }}>
                    <Check size={9} strokeWidth={3} />{c.qSend}
                  </span>
                </div>
              </div>
            )}

            {/* 5. Items by workshop */}
            {screen === 4 && (
              <div className="rounded-xl p-3 flex flex-col gap-2" style={PLAIN_CARD}>
                <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10.5px] text-[#F5F1E8]/90"><Factory size={12} className="text-[#D4AF37]" />{c.shopsHead}</span>
                {/* stacked bar of all 60 items */}
                <div className="flex h-2 rounded-full overflow-hidden gap-px">
                  {c.shops.map(([name, n], i) => (
                    <motion.div key={name} initial={{ width: 0 }} animate={{ width: `${(n / 60) * 100}%` }} transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
                      style={{ background: SHOP_COLORS[i] }} />
                  ))}
                </div>
                {c.shops.map(([name, n, pcs], i) => (
                  <motion.div key={name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.25 }}
                    className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: SHOP_COLORS[i] }} />
                    <span className="font-inter text-[9.5px] text-[#F5F1E8]/80 w-[78px]">{name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: SHOP_COLORS[i] }}
                        initial={{ width: 0 }} animate={{ width: `${(n / maxShop) * 100}%` }} transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }} />
                    </div>
                    <span className="font-grotesk font-bold text-[9.5px] text-[#F5F1E8] w-[52px] text-right">{n} {c.itemsWord}</span>
                    <span className="font-inter text-[8px] text-[#F5F1E8]/40 w-[42px] text-right">{pcs}</span>
                  </motion.div>
                ))}
                <p className="font-inter text-[8.5px] mt-1" style={{ color: AMBER }}>{c.shopsNote}</p>
              </div>
            )}

            {/* 6. Revised item list compared */}
            {screen === 5 && (
              <>
                <div className="rounded-xl p-3 flex flex-col gap-2" style={PLAIN_CARD}>
                  <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10.5px] text-[#F5F1E8]/90"><GitCompare size={12} className="text-[#D4AF37]" />{c.revHead}</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {c.revStats.map(([v, l], i) => (
                      <motion.div key={l} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
                        className="rounded-lg py-1.5 text-center" style={{ background: "rgba(10,10,10,0.5)", border: "1px solid rgba(245,241,232,0.06)" }}>
                        <p className="font-grotesk font-bold text-[14px] leading-none" style={{ color: i === 1 ? AMBER : i === 2 ? GREEN : "#F5F1E8" }}>{v}</p>
                        <p className="font-inter text-[7.5px] text-[#F5F1E8]/45 mt-0.5">{l}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="rounded-lg p-2.5" style={GOLD_CARD}>
                    <p className="font-grotesk font-bold text-[10px] text-[#F5F1E8]/90">{c.revItem}</p>
                    <p className="font-inter text-[10px] mt-1">
                      <span className="text-[#F5F1E8]/50">{c.revField}: </span>
                      <span className="line-through" style={{ color: RED }}>{c.revOld}</span>
                      <span className="text-[#F5F1E8]/40"> → </span>
                      <span className="font-semibold" style={{ color: GREEN }}>{c.revNew}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="font-inter text-[8px] font-semibold rounded px-1.5 py-0.5" style={{ color: AMBER, background: "rgba(245,184,61,0.12)" }}>{c.revPrice}</span>
                      <span className="flex items-center gap-0.5 font-inter text-[8px] font-semibold rounded px-1.5 py-0.5" style={{ color: GREEN, background: "rgba(52,211,153,0.1)" }}><Check size={8} strokeWidth={3} />{c.revFlagged}</span>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

            {/* 7. First price draft */}
            {screen === 6 && (
              <>
                <div className="rounded-xl p-3 flex flex-col gap-1.5" style={PLAIN_CARD}>
                  <span className="flex items-center gap-1.5 font-grotesk font-bold text-[10.5px] text-[#F5F1E8]/90"><Calculator size={12} className="text-[#D4AF37]" />{c.priceHead}</span>
                  {c.priceRows.map(([label, val, st], i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.22 }}
                      className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                      <span className="flex items-center gap-2 font-inter text-[9.5px] text-[#F5F1E8]/75">
                        <span className="w-2 h-2 rounded-sm" style={{ background: SHOP_COLORS[i] }} />{label}
                      </span>
                      <span className="font-inter text-[9.5px] font-semibold" style={{ color: st === "pending" ? AMBER : "#F5F1E8" }}>{val}</span>
                    </motion.div>
                  ))}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                    className="font-inter text-[8.5px] leading-snug" style={{ color: AMBER }}>{c.priceCond}</motion.p>
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
                    className="flex items-baseline justify-between rounded-lg px-2.5 py-2 mt-0.5" style={GOLD_CARD}>
                    <span className="font-grotesk font-bold text-[10px] text-[#D4AF37]">{c.priceTotalLabel}</span>
                    <span className="font-grotesk font-bold text-[14px] text-[#F5F1E8]">{c.priceTotal}</span>
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
                    className="flex items-center gap-1 font-inter text-[8.5px] text-emerald-400/90"><Check size={9} strokeWidth={3} />{c.priceApprove}</motion.p>
                </div>
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

function TypedText({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN(v => (v >= text.length ? v : v + 4)), 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p className="font-inter text-[9.5px] text-[#F5F1E8]/80 leading-relaxed whitespace-pre-line">
      {text.slice(0, n)}
      {n < text.length && <span className="text-[#D4AF37]">|</span>}
    </p>
  );
}
