import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "Plan & Tender Review", item: "https://landscale.agency/services/tender-review" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Plan & Tender Review",
  description: "Quantities from drawings, checked against the bill of quantities, and tender packages reviewed before you price. Every number traced to its source.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/tender-review",
  areaServed: ["HU", "AT", "GB"],
};

export const metadata: Metadata = {
  title: "Plan & Tender Review for Contractors | Landscale",
  description: "Quantities from drawings, checked against the bill of quantities, and tender packages reviewed before you price. Every number traced to its source.",
  alternates: {
    canonical: "https://landscale.agency/services/tender-review",
    languages: {
      en: "https://landscale.agency/services/tender-review",
      hu: "https://landscale.agency/hu/services/tender-review",
      "x-default": "https://landscale.agency/services/tender-review",
    },
  },
  openGraph: {
    title: "Plan & Tender Review for Contractors | Landscale",
    description: "Quantities from drawings, checked against the bill of quantities, and tender packages reviewed before you price. Every number traced to its source.",
    type: "website",
    url: "https://landscale.agency/services/tender-review",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
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
