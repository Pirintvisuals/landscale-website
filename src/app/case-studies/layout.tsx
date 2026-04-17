import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Real Results for Home Service Businesses | Landscale",
  description:
    "See real results: Lavotha Kert Kft (96 Performance, 100 SEO), Tiszaújváros Transz Kft (95 Performance, 100 SEO), ViszCAD. AI-powered websites that generate and qualify leads automatically.",
  keywords:
    "landscaping website case study, AI estimator results, home service business website examples, landscaping lead generation results UK",
  openGraph: {
    title: "Case Studies — Real Results for Home Service Businesses | Landscale",
    description:
      "Real projects, real results. See how Landscale-built websites achieve 95–100 performance scores and generate qualified leads automatically.",
    type: "website",
    url: "https://landscale.agency/case-studies",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
