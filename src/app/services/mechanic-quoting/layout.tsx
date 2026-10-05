import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "Quote Builder for Garages", item: "https://landscale.agency/services/mechanic-quoting" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Quote Builder for Mechanics & Garages",
  description: "Quote builder for garage workshops: enter the VIN, pick the job, and get an itemised PDF quote with the garage's own brands, parts prices and labour rate.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/mechanic-quoting",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "Quote Builder for Garages, Itemised Quotes from a VIN | Landscale",
  description:
    "Quote builder for mechanics and garages: enter the VIN, pick the job, get an itemised PDF quote with your brands, your parts prices and your labour rate.",
  keywords:
    "garage quoting software, quote builder for mechanics, VIN quote tool, car repair quote software, workshop quoting tool, mechanic estimate software",
  alternates: {
    canonical: "https://landscale.agency/services/mechanic-quoting",
    languages: {
      en: "https://landscale.agency/services/mechanic-quoting",
      hu: "https://landscale.agency/hu/services/mechanic-quoting",
      "x-default": "https://landscale.agency/services/mechanic-quoting",
    },
  },
  openGraph: {
    title: "Quote Builder for Garages, Itemised Quotes from a VIN | Landscale",
    description:
      "Enter the VIN, pick the job, get an itemised PDF quote with your brands, prices and labour rate. For mechanics and garages.",
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
