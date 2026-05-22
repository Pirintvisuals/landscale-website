import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Landscale — AI & Web Design for Tradesmen",
  description:
    "Milan Pirint, founder of Landscale Agency. Building AI-powered websites and lead qualification systems for roofers, landscapers, hardscapers, builders, remodellers, and all tradesmen. Based in the UK & Hungary.",
  keywords:
    "Landscale Agency about, Milan Pirint web designer, AI website tradesmen UK, roofing website design, hardscaping website, contractor web design UK",
  openGraph: {
    title: "About Landscale — AI & Web Design for Tradesmen",
    description:
      "Meet the founder of Landscale. We build AI-powered websites for roofers, landscapers, builders and all tradesmen — filtering bad leads and saving 20+ hours per week.",
    type: "website",
    url: "https://landscale.agency/about",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
