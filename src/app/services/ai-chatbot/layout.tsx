import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://landscale.agency" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://landscale.agency/services" },
    { "@type": "ListItem", position: 3, name: "AI Chatbot", item: "https://landscale.agency/services/ai-chatbot" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AI Chatbot for Tradesmen",
  description: "AI chatbot that qualifies leads 24/7, filters out time-wasters, and sends only serious buyers to your inbox. Built for landscaping, construction, and home service businesses.",
  provider: { "@type": "Organization", name: "Landscale Agency", url: "https://landscale.agency" },
  url: "https://landscale.agency/services/ai-chatbot",
  areaServed: ["GB", "Worldwide"],
};

export const metadata: Metadata = {
  title: "AI Chatbot for Tradesmen — Filter Bad Leads 24/7 | Landscale",
  description:
    "AI chatbot that qualifies leads 24/7, filters out time-wasters, and sends only serious buyers to your inbox. For landscapers, roofers & home service businesses.",
  keywords:
    "AI chatbot landscaping business, lead qualification chatbot, landscaping lead filter, home service AI chatbot UK, chatbot for landscapers, automatic lead scoring",
  alternates: { canonical: "https://landscale.agency/services/ai-chatbot" },
  openGraph: {
    title: "AI Chatbot for Tradesmen — Filter Bad Leads 24/7 | Landscale",
    description:
      "AI chatbot that qualifies leads 24/7, filters out time-wasters, and sends only serious buyers to your inbox. For landscapers, roofers & home service businesses.",
    type: "website",
    url: "https://landscale.agency/services/ai-chatbot",
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
