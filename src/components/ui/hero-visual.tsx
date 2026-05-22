"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, MessageSquare, Zap, Clock, MapPin, DollarSign } from "lucide-react";

const messages = [
  { from: "user", text: "Hi, I need a quote for 80m² patio paving in Bristol." },
  { from: "ai", text: "Great! What material are you looking at — natural stone, porcelain, or block paving?" },
  { from: "user", text: "Porcelain. Budget around £4–6k." },
  { from: "ai", text: "Perfect — that budget works well for porcelain. I can have a contractor reach out within the hour. Can I take your name?" },
];

const stats = [
  { icon: Clock, label: "Response time", value: "< 2 min" },
  { icon: CheckCircle, label: "Leads qualified", value: "84%" },
  { icon: DollarSign, label: "Avg. job value", value: "£4,200" },
];

export function HeroVisual() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const showNext = (index: number) => {
      if (index >= messages.length) {
        timeout = setTimeout(() => {
          setShowBadge(true);
          // reset loop
          timeout = setTimeout(() => {
            setVisibleMessages(0);
            setShowBadge(false);
            timeout = setTimeout(() => showNext(0), 600);
          }, 3800);
        }, 600);
        return;
      }

      const msg = messages[index];
      if (msg.from === "ai") {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(index + 1);
          timeout = setTimeout(() => showNext(index + 1), 1400);
        }, 1200);
      } else {
        setVisibleMessages(index + 1);
        timeout = setTimeout(() => showNext(index + 1), 1000);
      }
    };

    timeout = setTimeout(() => showNext(0), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-8 gap-4 select-none">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
            <Zap size={13} className="text-gold" />
          </div>
          <div>
            <p className="font-grotesk font-bold text-[11px] text-cream/80 leading-none">AI Estimator Agent</p>
            <p className="font-inter text-[9px] text-gold/60 mt-0.5">Live on your website 24/7</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-inter text-[9px] text-green-400">Active</span>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex flex-col gap-2 overflow-hidden min-h-[200px]">

        {/* Location chip */}
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={10} className="text-gold/50" />
          <span className="font-inter text-[9px] text-cream/30">Visitor from Bristol, UK</span>
        </div>

        {messages.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] rounded-xl px-3 py-2 ${
              msg.from === "user"
                ? "bg-white/[0.07] text-cream/70"
                : "bg-gold/10 border border-gold/20 text-cream/80"
            }`}>
              <p className="font-inter text-[10px] leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex justify-start">
              <div className="bg-gold/10 border border-gold/20 rounded-xl px-3 py-2 flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1 h-1 rounded-full bg-gold/60"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Qualified badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-between bg-gold/10 border border-gold/30 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                <CheckCircle size={13} className="text-gold" />
              </div>
              <div>
                <p className="font-grotesk font-bold text-[11px] text-gold">Lead Qualified</p>
                <p className="font-inter text-[9px] text-cream/40">Forwarded with full brief</p>
              </div>
            </div>
            <motion.div animate={{ boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 16px rgba(212,175,55,0.6)", "0 0 0px rgba(212,175,55,0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gold" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-2 py-2 text-center">
            <Icon size={11} className="text-gold/50 mx-auto mb-1" />
            <p className="font-grotesk font-bold text-[12px] text-cream/80">{value}</p>
            <p className="font-inter text-[8px] text-cream/30 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2">
        <MessageSquare size={11} className="text-gold/40 flex-shrink-0" />
        <span className="font-inter text-[10px] text-cream/25 flex-1">Type your project details...</span>
        <div className="w-5 h-5 rounded-md bg-gold/20 flex items-center justify-center">
          <span className="text-gold text-[9px] font-bold">↑</span>
        </div>
      </div>
    </div>
  );
}
