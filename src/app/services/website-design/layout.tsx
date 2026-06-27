import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "Website Design", item: "https://landscale.agency/services/website-design" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Website Design for Tradesmen",
  description: "Premium, conversion-focused websites for roofers, landscapers, builders and all tradesmen. Bespoke design, sub-1s load times, local SEO and AI lead qualification built in.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/website-design",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "Website Design for Tradesmen & Contractors | Landscale",
  description:
    "Premium websites for roofers, landscapers & all tradesmen. Bespoke design, sub-1s loads, local SEO and AI lead qualification built in from day one.",
  keywords:
    "roofing website design UK, contractor website design, hardscaping website designer, construction company website UK, tradesmen web design, local SEO contractor website",
  alternates: { canonical: "https://landscale.agency/services/website-design" },
  openGraph: {
    title: "Website Design for Tradesmen & Contractors | Landscale",
    description:
      "Premium websites for roofers, landscapers & all tradesmen. Bespoke design, sub-1s loads, local SEO and AI lead qualification built in from day one.",
    type: "website",
    url: "https://landscale.agency/services/website-design",
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
