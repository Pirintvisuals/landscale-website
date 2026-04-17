import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot for Home Service Businesses — Stop Wasting Time on Unqualified Leads | Landscale",
  description:
    "AI chatbot that qualifies leads 24/7, filters out time-wasters, and sends only serious buyers to your inbox. Built for landscaping, construction, and home service businesses.",
  keywords:
    "AI chatbot landscaping business, lead qualification chatbot, landscaping lead filter, home service AI chatbot UK, chatbot for landscapers, automatic lead scoring",
  alternates: { canonical: "https://landscale.agency/services/ai-chatbot" },
  openGraph: {
    title: "AI Chatbot — Stop Wasting Time on Unqualified Leads | Landscale",
    description:
      "Your AI chatbot qualifies every visitor 24/7 — filtering out bad leads so you only deal with serious, ready-to-book clients.",
    type: "website",
    url: "https://landscale.agency/services/ai-chatbot",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
