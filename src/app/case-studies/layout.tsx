import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Real Results for Home Service Businesses | Landscale",
  description:
    "Real results, including a live AI quoting system in production. 100/100 SEO, sub-1s loads. Landscale-built sites that generate and qualify leads for tradesmen & contractors.",
  keywords:
    "trade business website case study, AI estimator results, contractor website examples, tradesmen lead generation results UK, landscaping website case study",
  alternates: { canonical: "https://landscale.agency/case-studies" },
  openGraph: {
    title: "Case Studies — Real Results for Home Service Businesses | Landscale",
    description:
      "Real results, including a live AI quoting system in production. 100/100 SEO, sub-1s loads. Landscale-built sites that generate and qualify leads for tradesmen & contractors.",
    type: "website",
    url: "https://landscale.agency/case-studies",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
