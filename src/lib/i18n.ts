"use client";

import { usePathname } from "next/navigation";

export type Locale = "en" | "hu";

/**
 * English-root paths that have a Hungarian (/hu) version built.
 * Add a path here as its Hungarian page ships, until then links stay on the
 * working English page instead of 404-ing under /hu.
 */
export const HU_ROUTES = new Set<string>([
  "/",
  "/services",
  "/services/ai-estimator",
  "/services/ai-chatbot",
  "/services/website-design",
  "/services/seo-marketing",
  "/about",
  "/contact",
  "/case-studies",
]);

export function hasHuVersion(path: string): boolean {
  return HU_ROUTES.has(path);
}

/** Read the active locale from a pathname. Hungarian lives under /hu. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/hu" || pathname.startsWith("/hu/") ? "hu" : "en";
}

/** Hook: active locale for the current route. */
export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

/**
 * Turn an English-root href into the correct href for the given locale.
 * External links, anchors, tel: and mailto: are left untouched.
 *   localize("/contact", "hu") -> "/hu/contact"
 *   localize("/", "hu")        -> "/hu"
 */
export function localize(href: string, locale: Locale): string {
  if (locale === "en") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/hu" || href.startsWith("/hu/")) return href; // already localized
  if (!hasHuVersion(href)) return href; // no HU page yet, keep the English one
  return href === "/" ? "/hu" : `/hu${href}`;
}

/** Strip the /hu prefix, giving the English-root equivalent of a path. */
export function toEnglishPath(pathname: string): string {
  if (pathname === "/hu") return "/";
  if (pathname.startsWith("/hu/")) return pathname.slice(3);
  return pathname;
}

/** The path that shows the current page in the opposite language. */
export function switchLocaleHref(pathname: string, target: Locale): string {
  const en = toEnglishPath(pathname);
  if (target === "en") return en;
  // Switching to Hungarian: use the HU page if it exists, else fall back to HU home.
  return hasHuVersion(en) ? localize(en, "hu") : "/hu";
}
