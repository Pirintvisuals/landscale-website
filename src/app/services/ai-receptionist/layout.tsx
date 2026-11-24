import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "AI Receptionist", item: "https://landscale.agency/services/ai-receptionist" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Receptionist",
  description: "An AI receptionist that answers every call, checks order status in your CRM, handles routine questions and logs every call automatically.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/ai-receptionist",
  areaServed: ["HU", "AT", "GB"],
};

export const metadata: Metadata = {
  title: "AI Receptionist Connected to Your CRM | Landscale",
  description: "An AI receptionist that answers every call, checks order status in your CRM, handles routine questions and logs every call automatically.",
  alternates: {
    canonical: "https://landscale.agency/services/ai-receptionist",
    languages: {
      en: "https://landscale.agency/services/ai-receptionist",
      hu: "https://landscale.agency/hu/services/ai-receptionist",
      "x-default": "https://landscale.agency/services/ai-receptionist",
    },
  },
  openGraph: {
    title: "AI Receptionist Connected to Your CRM | Landscale",
    description: "An AI receptionist that answers every call, checks order status in your CRM, handles routine questions and logs every call automatically.",
    type: "website",
    url: "https://landscale.agency/services/ai-receptionist",
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
