import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscale Services — AI Lead Qualification for Tradesmen",
  description:
    "AI Estimator, AI Chatbot, Website Design & Local SEO for roofers, landscapers and contractors. Automate lead qualification and stop wasting time on bad leads.",
  keywords:
    "AI estimator tradesmen, AI chatbot roofers, contractor website design UK, local SEO tradesmen, lead automation construction UK, hardscaping website design, remodelling business automation",
  alternates: { canonical: "https://landscale.agency/services" },
  openGraph: {
    title: "Landscale Services — AI Lead Qualification for Tradesmen",
    description:
      "AI Estimator, AI Chatbot, Website Design & Local SEO for roofers, landscapers and contractors. Automate lead qualification and stop wasting time on bad leads.",
    type: "website",
    url: "https://landscale.agency/services",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
