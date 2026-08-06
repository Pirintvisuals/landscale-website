import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólam, a Landscale története | Landscale",
  description:
    "Milán vagyok, egy tereprendező családban nőttem fel Magyarországon. Nem a szokásos marketingügynökség, weboldalakat és AI-automatizálást építek vállalkozásoknak.",
  alternates: {
    canonical: "https://landscale.agency/hu/about",
    languages: {
      en: "https://landscale.agency/about",
      hu: "https://landscale.agency/hu/about",
      "x-default": "https://landscale.agency/about",
    },
  },
  openGraph: {
    title: "Rólam, a Landscale története | Landscale",
    description: "Nem a szokásos marketingügynökség, weboldalak és AI-automatizálás vállalkozásoknak.",
    type: "website",
    url: "https://landscale.agency/hu/about",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
