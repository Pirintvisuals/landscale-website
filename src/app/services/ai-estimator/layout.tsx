import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Estimator Agent — Instant Quotes on Your Site, No Phone Call Needed | Landscale",
  description:
    "Give your landscaping or home service website an AI estimator that delivers instant, accurate quotes 24/7. Filters unqualified leads before they reach you. Saves 15–20 hours per week.",
  keywords:
    "AI estimator landscaping, instant quote tool landscaping website, automatic quote generator landscapers, landscaping lead qualification tool, AI estimator home services UK",
  alternates: { canonical: "https://landscale.agency/services/ai-estimator" },
  openGraph: {
    title: "AI Estimator Agent — Instant Quotes, No Phone Call Needed | Landscale",
    description:
      "AI-powered estimator on your website delivers accurate quotes 24/7, collects contact details, and only sends you serious buyers. Saves 15–20 hours per week.",
    type: "website",
    url: "https://landscale.agency/services/ai-estimator",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
