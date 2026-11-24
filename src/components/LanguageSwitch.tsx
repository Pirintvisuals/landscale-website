"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { switchLocaleHref, type Locale } from "@/lib/i18n";

const OPTIONS: { code: Locale; label: string; name: string }[] = [
  { code: "hu", label: "HU", name: "Magyar" },
  { code: "en", label: "EN", name: "English" },
];

/**
 * Quiet segmented HU | EN switch. A globe icon and a solid cream "active" pill
 * make it easy to spot without the gold glow and flags of the old version.
 */
export default function LanguageSwitch({
  pathname,
  lang,
  size = "md",
  onNavigate,
}: {
  pathname: string;
  lang: Locale;
  size?: "sm" | "md" | "lg";
  onNavigate?: () => void;
}) {
  const lg = size === "lg";
  const seg = lg ? "flex-1 px-4 py-2.5 text-sm" : size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label={lang === "hu" ? "Nyelv választása" : "Choose language"}
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.03] p-[3px] ${lg ? "w-full" : ""}`}
    >
      <Globe aria-hidden="true" className={`text-gold/80 flex-shrink-0 ${lg ? "w-4 h-4 mx-2" : size === "sm" ? "w-3 h-3 mx-1" : "w-3.5 h-3.5 mx-1.5"}`} />
      {OPTIONS.map(({ code, label, name }) => {
        const active = code === lang;
        const base = `inline-flex items-center justify-center rounded-full font-grotesk font-semibold tracking-[0.08em] transition-colors duration-200 ${seg}`;
        return active ? (
          <span key={code} aria-current="true" className={`${base} bg-cream text-deep-black`}>
            {lg ? name : label}
          </span>
        ) : (
          <Link
            key={code}
            href={switchLocaleHref(pathname, code)}
            hrefLang={code}
            lang={code}
            onClick={onNavigate}
            aria-label={code === "hu" ? "Magyar nyelvű oldal" : "Switch to English"}
            className={`${base} text-cream/60 hover:text-cream hover:bg-white/[0.08]`}
          >
            {lg ? name : label}
          </Link>
        );
      })}
    </div>
  );
}
