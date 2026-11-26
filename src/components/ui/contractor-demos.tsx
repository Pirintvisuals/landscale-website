"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { TenderVisual } from "@/components/ui/tender-visual";
import { PlanReaderVisual } from "@/components/ui/plan-reader-visual";

type Tool = "tender" | "plans";

const LABELS: Record<Locale, Record<Tool, string>> = {
  hu: { tender: "Ajánlat-előkészítő", plans: "Tervolvasó" },
  en: { tender: "Tender Prep", plans: "Plan Reader" },
};

/**
 * The two contractor tools share one demo slot: a small switch picks which
 * self-playing demo runs (tender package review, or quantities from drawings).
 */
export function ContractorDemos({ lang, initial = "tender" }: { lang: Locale; initial?: Tool }) {
  const [tool, setTool] = useState<Tool>(initial);
  return (
    <div className="w-full h-full flex flex-col">
      <div role="tablist" className="flex-shrink-0 flex gap-1 p-1 mx-4 mt-3 rounded-full bg-white/[0.03] border border-white/[0.08] self-start">
        {(["tender", "plans"] as const).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={tool === k} onClick={() => setTool(k)}
            className={`font-grotesk text-[10px] font-semibold px-3 py-1 rounded-full transition-colors duration-200 ${tool === k ? "bg-cream text-deep-black" : "text-cream/55 hover:text-cream"}`}>
            {LABELS[lang][k]}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        {tool === "tender" ? <TenderVisual key="tender" lang={lang} /> : <PlanReaderVisual key="plans" lang={lang} />}
      </div>
    </div>
  );
}
