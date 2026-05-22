import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — AI Estimator, Chatbot & Website Design for Tradesmen | Landscale",
  description:
    "AI Estimator Agent, AI Chatbot, Website Design, and Local SEO for roofers, landscapers, hardscapers, builders, remodellers and all tradesmen. Stop wasting time on bad leads — automate with Landscale.",
  keywords:
    "AI estimator tradesmen, AI chatbot roofers, contractor website design UK, local SEO tradesmen, lead automation construction UK, hardscaping website design, remodelling business automation",
  alternates: { canonical: "https://landscale.agency/services" },
  openGraph: {
    title: "Services — AI Estimator, Chatbot & Website Design | Landscale",
    description:
      "Four services, one goal: more qualified leads with less time wasted. AI Estimator, AI Chatbot, Website Design, and Local SEO for home service businesses.",
    type: "website",
    url: "https://landscale.agency/services",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
