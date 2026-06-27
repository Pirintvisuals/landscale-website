import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "AI Estimator Agent", item: "https://landscale.agency/services/ai-estimator" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Estimator Agent",
  description: "AI-powered estimator that delivers instant, accurate quotes 24/7 on your trade website. Filters unqualified leads and saves 15–20 hours per week.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/ai-estimator",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "AI Estimator Agent — Instant Quotes, No Call Needed | Landscale",
  description:
    "Add an AI estimator to your trade website — instant, accurate quotes 24/7, automatic lead filtering, and 15–20 hours saved per week. No phone call needed.",
  keywords:
    "AI estimator landscaping, instant quote tool landscaping website, automatic quote generator landscapers, landscaping lead qualification tool, AI estimator home services UK",
  alternates: { canonical: "https://landscale.agency/services/ai-estimator" },
  openGraph: {
    title: "AI Estimator Agent — Instant Quotes, No Call Needed | Landscale",
    description:
      "Add an AI estimator to your trade website — instant, accurate quotes 24/7, automatic lead filtering, and 15–20 hours saved per week. No phone call needed.",
    type: "website",
    url: "https://landscale.agency/services/ai-estimator",
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
