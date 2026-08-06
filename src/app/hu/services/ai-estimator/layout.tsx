import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Árajánló Ügynök, azonnali árajánlat a weboldaladon | Landscale",
  description:
    "AI árajánló ügynök vállalkozásoknak: a látogató árat kér, az AI projektspecifikus kérdéseket tesz fel, és azonnal pontos becslést ad, 0–24, telefonhívás nélkül.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/ai-estimator",
    languages: {
      en: "https://landscale.agency/services/ai-estimator",
      hu: "https://landscale.agency/hu/services/ai-estimator",
      "x-default": "https://landscale.agency/services/ai-estimator",
    },
  },
  openGraph: {
    title: "AI Árajánló Ügynök, azonnali árajánlat a weboldaladon | Landscale",
    description: "A látogató árat kér, az AI azonnal pontos becslést ad, 0–24, telefonhívás nélkül.",
    type: "website",
    url: "https://landscale.agency/hu/services/ai-estimator",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
