import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helyi SEO és marketing vállalkozásoknak | Landscale",
  description:
    "Urald a helyi keresést. Google Cégprofil, kulcsszó-stratégia, tartalommarketing és havi riportok, hogy első legyél, amikor a helyi ügyfelek a szakmádra keresnek.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/seo-marketing",
    languages: {
      en: "https://landscale.agency/services/seo-marketing",
      hu: "https://landscale.agency/hu/services/seo-marketing",
      "x-default": "https://landscale.agency/services/seo-marketing",
    },
  },
  openGraph: {
    title: "Helyi SEO és marketing vállalkozásoknak | Landscale",
    description: "Legyél első, amikor a helyi ügyfelek a szakmádra keresnek.",
    type: "website",
    url: "https://landscale.agency/hu/services/seo-marketing",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
