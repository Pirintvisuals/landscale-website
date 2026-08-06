import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot, érdeklődő-minősítés 0–24 | Landscale",
  description:
    "AI chatbot, ami 0–24 minősíti a weboldalad látogatóit: ellenőrzi a büdzsét, a helyszínt és a határidőt, kiszűri a komolytalanokat, a komoly érdeklődőket egyből hozzád küldi.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/ai-chatbot",
    languages: {
      en: "https://landscale.agency/services/ai-chatbot",
      hu: "https://landscale.agency/hu/services/ai-chatbot",
      "x-default": "https://landscale.agency/services/ai-chatbot",
    },
  },
  openGraph: {
    title: "AI Chatbot, érdeklődő-minősítés 0–24 | Landscale",
    description: "Kiszűri a komolytalanokat, a komoly érdeklődőket egyből hozzád küldi, 0–24.",
    type: "website",
    url: "https://landscale.agency/hu/services/ai-chatbot",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
