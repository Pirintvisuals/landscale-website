"use client";

import { useId } from "react";
import Link from "next/link";
import { switchLocaleHref, type Locale } from "@/lib/i18n";

/* Inline SVG flags — emoji flags don't render on Windows (they show as "GB"/"HU" letters). */
function FlagUK({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <clipPath id={`uk-t-${id}`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#uk-t-${id})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagHU({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 6 3" className={className} aria-hidden="true" preserveAspectRatio="none">
      <rect width="6" height="1" fill="#CD2A3E" />
      <rect y="1" width="6" height="1" fill="#FFFFFF" />
      <rect y="2" width="6" height="1" fill="#436F4D" />
    </svg>
  );
}

const OPTIONS: { code: Locale; label: string; name: string; Flag: typeof FlagUK }[] = [
  { code: "en", label: "EN", name: "English", Flag: FlagUK },
  { code: "hu", label: "HU", name: "Magyar", Flag: FlagHU },
];

/**
 * Segmented EN | HU switch. Both languages are always visible with flags,
 * the active one is filled gold, so it's obvious the site exists in Hungarian too.
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
  const pad = size === "lg" ? "px-5 py-2.5 text-sm gap-2" : size === "sm" ? "px-2.5 py-1 text-[11px] gap-1.5" : "px-3.5 py-1.5 text-xs gap-2";
  const flag = size === "lg" ? "w-6 h-4" : size === "sm" ? "w-4 h-[11px]" : "w-5 h-[13px]";

  return (
    <div
      role="group"
      aria-label={lang === "hu" ? "Nyelv választása" : "Choose language"}
      className={`inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-gold/30 shadow-[0_0_18px_rgba(212,175,55,0.12)] ${size === "lg" ? "w-full" : ""}`}
    >
      {OPTIONS.map(({ code, label, name, Flag }) => {
        const active = code === lang;
        const inner = (
          <>
            <span className={`${flag} rounded-[3px] overflow-hidden flex-shrink-0 ring-1 ring-black/20 ${active ? "" : "opacity-80"}`}>
              <Flag className="w-full h-full block" />
            </span>
            <span>{size === "lg" ? name : label}</span>
          </>
        );
        const base = `inline-flex items-center justify-center rounded-full font-grotesk font-bold tracking-wide transition-all duration-200 ${pad} ${size === "lg" ? "flex-1" : ""}`;
        return active ? (
          <span key={code} aria-current="true" className={`${base} bg-gold text-deep-black shadow-[0_0_14px_rgba(212,175,55,0.4)]`}>
            {inner}
          </span>
        ) : (
          <Link
            key={code}
            href={switchLocaleHref(pathname, code)}
            hrefLang={code}
            lang={code}
            onClick={onNavigate}
            aria-label={code === "hu" ? "Magyar nyelvű oldal" : "Switch to English"}
            className={`${base} text-cream/75 hover:text-cream hover:bg-white/[0.08]`}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
