import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design for Tradesmen & Contractors | Landscale",
  description:
    "Premium, conversion-focused websites for roofers, landscapers, hardscapers, builders, remodellers and all tradesmen. Built with local SEO, sub-1s load times, and AI lead qualification built in.",
  keywords:
    "roofing website design UK, contractor website design, hardscaping website designer, construction company website UK, tradesmen web design, local SEO contractor website",
  alternates: { canonical: "https://landscale.agency/services/website-design" },
  openGraph: {
    title: "Website Design for Tradesmen & Contractors | Landscale",
    description:
      "Luxury, conversion-focused websites that make you look premium and turn visitors into high-value clients. Local SEO and AI lead qualification built in.",
    type: "website",
    url: "https://landscale.agency/services/website-design",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
