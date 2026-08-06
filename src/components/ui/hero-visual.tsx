"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, HardHat, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Msg =
  | { type: "ai" | "user"; text: string }
  | { type: "estimate" }
  | { type: "badge" };

const CONTENT: Record<Locale, {
  script: Msg[];
  agent: string;
  live: string;
  active: string;
  visitor: string;
  inputPlaceholder: string;
  estimateTitle: string;
  estimateTotal: string;
  estimateRows: [string, string][];
  estimateBasis: string;
  qualifiedTitle: string;
  qualifiedSub: string;
}> = {
  en: {
    script: [
      { type: "ai",   text: "Hi! I can give you an instant quote. What type of project are you looking for?" },
      { type: "user", text: "Patio installation" },
      { type: "ai",   text: "Does anything need to be removed first? Is the ground sloped?" },
      { type: "user", text: "Old decking needs removing, slightly sloped" },
      { type: "ai",   text: "How big is the area? (m²)" },
      { type: "user", text: "About 40m²" },
      { type: "ai",   text: "How wide is the entrance for equipment?" },
      { type: "user", text: "Standard gate, about 90cm" },
      { type: "ai",   text: "What materials are you thinking? (pavers, concrete, natural stone, porcelain)" },
      { type: "user", text: "Natural stone" },
      { type: "ai",   text: "What's your postcode? (so we can check we cover your area)" },
      { type: "user", text: "SW11 4NL" },
      { type: "ai",   text: "And your ideal timeline, when would you like this done?" },
      { type: "user", text: "Within the next 6–8 weeks" },
      { type: "ai",   text: "Last one, what's your approximate budget?" },
      { type: "user", text: "£5,000–8,000" },
      { type: "estimate" },
      { type: "ai",   text: "To send this quote and follow up, can I get your name, phone and email?" },
      { type: "user", text: "James Thompson, 07700 900123, james@email.com" },
      { type: "badge" },
    ],
    agent: "AI Estimator Agent",
    live: "Live on your website 24/7",
    active: "Active",
    visitor: "Visitor from London, UK",
    inputPlaceholder: "Type your answer...",
    estimateTitle: "Instant Estimate",
    estimateTotal: "£6,000–6,600",
    estimateRows: [
      ["Removal + prep", "£600–800"],
      ["Natural stone (40m²)", "£2,400–2,800"],
      ["Labour", "£3,000"],
    ],
    estimateBasis: "Based on 40m² · natural stone · SW11",
    qualifiedTitle: "Lead Qualified",
    qualifiedSub: "Quote + brief sent to owner",
  },
  hu: {
    script: [
      { type: "ai",   text: "Szia! Adok egy azonnali árajánlatot. Milyen projektet tervezel?" },
      { type: "user", text: "Teraszburkolás" },
      { type: "ai",   text: "Kell előtte bármit bontani? Lejtős a terep?" },
      { type: "user", text: "Régi fadeckot kell bontani, kissé lejtős" },
      { type: "ai",   text: "Mekkora a terület? (m²)" },
      { type: "user", text: "Kb. 40 m²" },
      { type: "ai",   text: "Milyen széles a bejárat a gépeknek?" },
      { type: "user", text: "Normál kapu, kb. 90 cm" },
      { type: "ai",   text: "Milyen anyagra gondolsz? (térkő, beton, természetes kő, gres)" },
      { type: "user", text: "Természetes kő" },
      { type: "ai",   text: "Mi az irányítószámod? (hogy leellenőrizzük, lefedjük-e a környéket)" },
      { type: "user", text: "1114" },
      { type: "ai",   text: "És az ideális határidő, mikorra szeretnéd?" },
      { type: "user", text: "A következő 6–8 hétben" },
      { type: "ai",   text: "Utolsó kérdés, mi a hozzávetőleges kereted?" },
      { type: "user", text: "1,5–2,5 millió Ft" },
      { type: "estimate" },
      { type: "ai",   text: "Hogy elküldjem az ajánlatot és jelentkezni tudjak, megadnád a neved, telefonszámod és e-mail-címed?" },
      { type: "user", text: "Kovács János, 06 30 123 4567, janos@email.hu" },
      { type: "badge" },
    ],
    agent: "AI Árajánló Ügynök",
    live: "0–24 él a weboldaladon",
    active: "Aktív",
    visitor: "Látogató Budapestről",
    inputPlaceholder: "Írd be a válaszod...",
    estimateTitle: "Azonnali becslés",
    estimateTotal: "1,8–2,1M Ft",
    estimateRows: [
      ["Bontás + előkészítés", "180–240e Ft"],
      ["Természetes kő (40 m²)", "720–840e Ft"],
      ["Munkadíj", "900e Ft"],
    ],
    estimateBasis: "40 m² · természetes kő · 1114 alapján",
    qualifiedTitle: "Érdeklődő minősítve",
    qualifiedSub: "Ajánlat + adatok elküldve a tulajdonosnak",
  },
};

const AI_DELAY   = 700;   // typing indicator duration
const USER_PAUSE = 550;   // pause after user message
const READ_PAUSE = 900;   // pause after AI message appears

export function HeroVisual({ lang = "en" }: { lang?: Locale }) {
  const c = CONTENT[lang];
  const script = c.script;
  const [visible, setVisible] = useState<Msg[]>([]);
  const [typing,  setTyping]  = useState(false);
  const chatRef   = useRef<HTMLDivElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const after = (ms: number, fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, ms);
  };

  useEffect(() => {
    let cancelled = false;

    function show(i: number) {
      if (cancelled || i >= script.length) {
        // restart after pause
        if (!cancelled) after(3000, () => { if (!cancelled) { setVisible([]); setTyping(false); after(600, () => show(0)); } });
        return;
      }

      const item = script[i];

      if (item.type === "ai") {
        setTyping(true);
        after(AI_DELAY, () => {
          if (cancelled) return;
          setTyping(false);
          setVisible(prev => [...prev, item]);
          after(READ_PAUSE, () => show(i + 1));
        });
      } else if (item.type === "user") {
        after(USER_PAUSE, () => {
          if (cancelled) return;
          setVisible(prev => [...prev, item]);
          after(READ_PAUSE, () => show(i + 1));
        });
      } else {
        // estimate or badge, just append
        after(500, () => {
          if (cancelled) return;
          setVisible(prev => [...prev, item]);
          after(item.type === "estimate" ? 1200 : 2800, () => show(i + 1));
        });
      }
    }

    after(600, () => show(0));
    return () => { cancelled = true; if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // scroll only the chat container, never the page
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible, typing]);

  return (
    <div className="w-full flex flex-col gap-3 p-5 h-full select-none">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#D4AF37 0%,#B8941F 100%)", boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}>
            <HardHat size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/90 leading-none">{c.agent}</p>
            <p className="font-inter text-[9px] text-[#D4AF37]/60 mt-0.5">{c.live}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[9px] text-emerald-400">{c.active}</span>
        </div>
      </div>

      {/* Location chip */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <MapPin size={9} className="text-[#D4AF37]/40" />
        <span className="font-inter text-[9px] text-[#F5F1E8]/25">{c.visitor}</span>
      </div>

      {/* Chat scroll area */}
      <div ref={chatRef} className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 min-h-0
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {visible.map((item, i) => {
          if (item.type === "estimate") return <EstimateCard key={i} c={c} />;
          if (item.type === "badge")    return <QualifiedBadge key={i} c={c} />;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
              className={`flex ${item.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-xl px-3 py-2 ${item.type === "user" ? "bg-[#F5F1E8]/[0.08] text-[#F5F1E8]/65" : "text-[#F5F1E8]/80"}`}
                style={item.type === "ai" ? {
                  background: "linear-gradient(135deg,rgba(212,175,55,0.13) 0%,rgba(184,148,31,0.06) 100%)",
                  border: "1px solid rgba(212,175,55,0.2)"
                } : {}}>
                <p className="font-inter text-[10px] leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex justify-start">
              <div className="rounded-xl px-3 py-2 flex items-center gap-1"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.18)" }}>
                {[0,1,2].map(k => (
                  <motion.div key={k} className="w-1 h-1 rounded-full bg-[#D4AF37]/70"
                    animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: k * 0.12 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 flex-shrink-0"
        style={{ background: "rgba(245,241,232,0.03)", border: "1px solid rgba(245,241,232,0.06)" }}>
        <span className="font-inter text-[10px] text-[#F5F1E8]/20 flex-1">{c.inputPlaceholder}</span>
        <div className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.2)" }}>
          <span className="text-[#D4AF37] text-[9px] font-bold leading-none">↑</span>
        </div>
      </div>

    </div>
  );
}

function EstimateCard({ c }: { c: (typeof CONTENT)[Locale] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden"
      style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.14) 0%,rgba(184,148,31,0.06) 100%)", border: "1px solid rgba(212,175,55,0.28)" }}>
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-grotesk font-bold text-[11px] text-[#D4AF37]">{c.estimateTitle}</span>
          <span className="font-grotesk font-bold text-[15px] text-[#F5F1E8]">{c.estimateTotal}</span>
        </div>
        <div className="space-y-1">
          {c.estimateRows.map(([label, val]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="font-inter text-[9px] text-[#F5F1E8]/45">{label}</span>
              <span className="font-inter text-[9px] text-[#F5F1E8]/65 font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-1.5" style={{ background: "rgba(212,175,55,0.08)", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        <span className="font-inter text-[8px] text-[#D4AF37]/70">{c.estimateBasis}</span>
      </div>
    </motion.div>
  );
}

function QualifiedBadge({ c }: { c: (typeof CONTENT)[Locale] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex items-center justify-between rounded-xl px-3 py-2.5"
      style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.16) 0%,rgba(212,175,55,0.05) 100%)", border: "1px solid rgba(212,175,55,0.38)" }}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(212,175,55,0.22)" }}>
          <CheckCircle size={13} className="text-[#D4AF37]" />
        </div>
        <div>
          <p className="font-grotesk font-bold text-[11px] text-[#D4AF37]">{c.qualifiedTitle}</p>
          <p className="font-inter text-[9px] text-[#F5F1E8]/35">{c.qualifiedSub}</p>
        </div>
      </div>
      <motion.div
        animate={{ boxShadow: ["0 0 0px #D4AF37", "0 0 14px #D4AF37", "0 0 0px #D4AF37"] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
    </motion.div>
  );
}
