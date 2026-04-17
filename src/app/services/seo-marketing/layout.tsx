import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local SEO for Landscaping & Home Service Businesses — Dominate Local Search | Landscale",
  description:
    "Local SEO services for landscaping, construction, and home service businesses. Rank #1 when clients search 'landscapers near me'. Attract premium clients from your area.",
  keywords:
    "local SEO landscaping UK, landscaping marketing agency, rank landscapers near me, home service SEO, construction company local SEO, landscaping Google ranking",
  alternates: { canonical: "https://landscale.agency/services/seo-marketing" },
  openGraph: {
    title: "Local SEO for Landscaping & Home Service Businesses | Landscale",
    description:
      "When someone searches 'landscapers near me', you should be first. Local SEO built specifically for home service businesses.",
    type: "website",
    url: "https://landscale.agency/services/seo-marketing",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
