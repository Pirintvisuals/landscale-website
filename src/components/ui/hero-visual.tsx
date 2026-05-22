"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, MessageSquare, Clock, MapPin, DollarSign, HardHat } from "lucide-react";

const messages = [
  { from: "user", text: "Hi, I need a quote for 80m² patio paving in Bristol." },
  { from: "ai",   text: "What material — natural stone, porcelain, or block paving?" },
  { from: "user", text: "Porcelain. Budget around £4–6k." },
  { from: "ai",   text: "Perfect. I'll have a roofer reach out within the hour. Your name?" },
];

const stats = [
  { icon: Clock,       label: "Response", value: "< 2 min" },
  { icon: CheckCircle, label: "Qualified", value: "84%"    },
  { icon: DollarSign,  label: "Avg. job",  value: "£4,200" },
];

export function HeroVisual() {
  const [visible, setVisible]   = useState(0);
  const [badge, setBadge]       = useState(false);
  const [typing, setTyping]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  const after = (ms: number, fn: () => void) => { clear(); timerRef.current = setTimeout(fn, ms); };

  useEffect(() => {
    let cancelled = false;

    function showMsg(i: number) {
      if (cancelled) return;
      if (i >= messages.length) {
        after(600, () => { if (!cancelled) { setBadge(true); after(3600, () => { if (!cancelled) { setVisible(0); setBadge(false); after(500, () => showMsg(0)); } }); } });
        return;
      }
      if (messages[i].from === "ai") {
        setTyping(true);
        after(1100, () => { if (cancelled) return; setTyping(false); setVisible(i + 1); after(1200, () => showMsg(i + 1)); });
      } else {
        setVisible(i + 1);
        after(900, () => showMsg(i + 1));
      }
    }

    after(700, () => showMsg(0));
    return () => { cancelled = true; clear(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 p-5 select-none">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Hard hat icon in brand gold */}
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)", boxShadow: "0 0 12px rgba(212,175,55,0.35)" }}>
            <HardHat size={15} className="text-[#0A0A0A]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-grotesk font-bold text-[11px] text-[#F5F1E8]/90 leading-none">AI Estimator Agent</p>
            <p className="font-inter text-[9px] text-[#D4AF37]/60 mt-0.5">Live on your website 24/7</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-inter text-[9px] text-emerald-400">Active</span>
        </div>
      </div>

      {/* Chat window */}
      <div className="rounded-xl p-3 flex flex-col gap-2 overflow-hidden min-h-[196px]"
        style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>

        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={10} className="text-[#D4AF37]/40" />
          <span className="font-inter text-[9px] text-[#F5F1E8]/25">Visitor from Bristol, UK</span>
        </div>

        {messages.slice(0, visible).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] rounded-xl px-3 py-2 ${
              msg.from === "user"
                ? "bg-[#F5F1E8]/[0.08] text-[#F5F1E8]/65"
                : "text-[#F5F1E8]/80"
            }`}
              style={msg.from === "ai" ? {
                background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(184,148,31,0.08) 100%)",
                border: "1px solid rgba(212,175,55,0.22)"
              } : {}}>
              <p className="font-inter text-[10px] leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex justify-start">
              <div className="rounded-xl px-3 py-2 flex items-center gap-1"
                style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.2)" }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1 h-1 rounded-full bg-[#D4AF37]/70"
                    animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Qualified badge */}
      <AnimatePresence>
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)", border: "1px solid rgba(212,175,55,0.35)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.2)" }}>
                <CheckCircle size={14} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-grotesk font-bold text-[11px] text-[#D4AF37]">Lead Qualified</p>
                <p className="font-inter text-[9px] text-[#F5F1E8]/35">Forwarded with full brief</p>
              </div>
            </div>
            <motion.div
              animate={{ boxShadow: ["0 0 0px #D4AF37", "0 0 14px #D4AF37", "0 0 0px #D4AF37"] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl px-2 py-2.5 text-center"
            style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.1)" }}>
            <Icon size={11} className="text-[#D4AF37]/50 mx-auto mb-1" />
            <p className="font-grotesk font-bold text-[12px] text-[#F5F1E8]/80">{value}</p>
            <p className="font-inter text-[8px] text-[#F5F1E8]/30 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: "rgba(245,241,232,0.03)", border: "1px solid rgba(245,241,232,0.06)" }}>
        <MessageSquare size={11} className="text-[#D4AF37]/35 flex-shrink-0" />
        <span className="font-inter text-[10px] text-[#F5F1E8]/20 flex-1">Describe your project...</span>
        <div className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.2)" }}>
          <span className="text-[#D4AF37] text-[9px] font-bold leading-none">↑</span>
        </div>
      </div>

    </div>
  );
}
