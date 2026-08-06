import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weboldal készítés vállalkozásoknak, konverzióra építve | Landscale",
  description:
    "Egyedi, villámgyors weboldalak vállalkozásoknak, beépített helyi SEO-val. 1 mp alatti betöltés, 100/100 SEO, prémium megjelenés, ami látogatókból ügyfeleket csinál.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/website-design",
    languages: {
      en: "https://landscale.agency/services/website-design",
      hu: "https://landscale.agency/hu/services/website-design",
      "x-default": "https://landscale.agency/services/website-design",
    },
  },
  openGraph: {
    title: "Weboldal készítés vállalkozásoknak, konverzióra építve | Landscale",
    description: "Egyedi, villámgyors weboldalak beépített helyi SEO-val.",
    type: "website",
    url: "https://landscale.agency/hu/services/website-design",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
