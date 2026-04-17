import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design for Landscaping & Home Service Businesses | Landscale",
  description:
    "Premium, conversion-focused websites for landscaping, construction, and home service businesses. Built with local SEO, sub-1s load times, and AI lead qualification built in.",
  keywords:
    "landscaping website design UK, home service business website, construction company website, landscaper website designer, premium landscaping web design, local SEO website landscaping",
  alternates: { canonical: "https://landscale.agency/services/website-design" },
  openGraph: {
    title: "Website Design for Landscaping & Home Service Businesses | Landscale",
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
