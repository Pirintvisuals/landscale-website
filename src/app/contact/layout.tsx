import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Audit — Landscale Agency",
  description:
    "Book a free 30-minute audit with Landscale. We'll show you exactly where your business is losing leads and how AI automation can fix it. No pressure, no hidden fees.",
  keywords:
    "book free audit tradesmen website, AI lead generation consultation, contractor website quote, free website audit UK, roofer website free audit",
  openGraph: {
    title: "Book a Free Audit — Landscale Agency",
    description:
      "30-minute free consultation. We'll show you exactly where you're losing leads and how to fix it with AI automation.",
    type: "website",
    url: "https://landscale.agency/contact",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
