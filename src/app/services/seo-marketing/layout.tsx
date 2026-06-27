import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "Local SEO", item: "https://landscale.agency/services/seo-marketing" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Local SEO for Tradesmen & Contractors",
  description: "Local SEO services for roofers, landscapers, builders and all tradesmen. Rank #1 when clients search for your trade near me. Attract premium clients from your area.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/seo-marketing",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "Local SEO for Tradesmen & Contractors | Landscale",
  description:
    "Local SEO for roofers, landscapers, builders & all tradesmen. Rank #1 when local clients search for your trade. Attract premium clients from your area.",
  keywords:
    "local SEO tradesmen UK, roofer SEO, contractor SEO UK, rank roofers near me, construction company local SEO, hardscaping Google ranking, tradesman Google ranking",
  alternates: { canonical: "https://landscale.agency/services/seo-marketing" },
  openGraph: {
    title: "Local SEO for Tradesmen & Contractors | Landscale",
    description:
      "Local SEO for roofers, landscapers, builders & all tradesmen. Rank #1 when local clients search for your trade. Attract premium clients from your area.",
    type: "website",
    url: "https://landscale.agency/services/seo-marketing",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {children}
    </>
  );
}
