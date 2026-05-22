import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local SEO for Tradesmen & Contractors — Dominate Local Search | Landscale",
  description:
    "Local SEO services for roofers, landscapers, builders, remodellers and all tradesmen. Rank #1 when clients search for your trade near me. Attract premium clients from your area.",
  keywords:
    "local SEO tradesmen UK, roofer SEO, contractor SEO UK, rank roofers near me, construction company local SEO, hardscaping Google ranking, tradesman Google ranking",
  alternates: { canonical: "https://landscale.agency/services/seo-marketing" },
  openGraph: {
    title: "Local SEO for Tradesmen & Contractors | Landscale",
    description:
      "When someone searches for your trade near them, you should be first. Local SEO built specifically for tradesmen and contractors.",
    type: "website",
    url: "https://landscale.agency/services/seo-marketing",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
