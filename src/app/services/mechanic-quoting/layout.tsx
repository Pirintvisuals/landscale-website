import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "Full Quoting Agent for Mechanics", item: "https://landscale.agency/services/mechanic-quoting" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Full Quoting Agent for Mechanics & Garages",
  description: "AI quoting agent for garages that gives real, itemised quotes from the VIN and part numbers, with labour at the garage's own rates. Cars, vans, motorbikes and commercial vehicles.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/mechanic-quoting",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "AI Quoting Agent for Garages, Quotes from a VIN | Landscale",
  description:
    "AI quoting agent for mechanics and garages: real itemised quotes from the VIN and part numbers, labour at your own rates. Cars, vans, motorbikes, commercial.",
  keywords:
    "garage quoting software, AI quote for mechanics, VIN quote tool, car repair quote online, garage website AI, mechanic quoting agent",
  alternates: {
    canonical: "https://landscale.agency/services/mechanic-quoting",
    languages: {
      en: "https://landscale.agency/services/mechanic-quoting",
      hu: "https://landscale.agency/hu/services/mechanic-quoting",
      "x-default": "https://landscale.agency/services/mechanic-quoting",
    },
  },
  openGraph: {
    title: "AI Quoting Agent for Garages, Quotes from a VIN | Landscale",
    description:
      "Real itemised quotes from the VIN and part numbers, labour at your own rates. For mechanics and garages.",
    type: "website",
    url: "https://landscale.agency/services/mechanic-quoting",
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
