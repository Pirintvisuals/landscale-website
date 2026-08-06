import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szolgáltatások, AI árajánló, chatbot és weboldal | Landscale",
  description:
    "AI árajánló, AI chatbot, weboldal készítés és helyi SEO vállalkozásoknak. Automatizáld az érdeklődők szűrését, és ne pazarolj időt a komolytalanokra.",
  alternates: {
    canonical: "https://landscale.agency/hu/services",
    languages: {
      en: "https://landscale.agency/services",
      hu: "https://landscale.agency/hu/services",
      "x-default": "https://landscale.agency/services",
    },
  },
  openGraph: {
    title: "Szolgáltatások, AI árajánló, chatbot és weboldal | Landscale",
    description:
      "AI árajánló, AI chatbot, weboldal készítés és helyi SEO vállalkozásoknak.",
    type: "website",
    url: "https://landscale.agency/hu/services",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
