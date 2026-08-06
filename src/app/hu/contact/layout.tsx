import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat, ingyenes igényfelmérés | Landscale",
  description:
    "Foglalj egy ingyenes, 30 perces igényfelmérést. Átnézzük a helyzetedet, megkeressük a hiányosságokat, és megmutatjuk, hogyan javítsd őket, kötelezettség nélkül.",
  alternates: {
    canonical: "https://landscale.agency/hu/contact",
    languages: {
      en: "https://landscale.agency/contact",
      hu: "https://landscale.agency/hu/contact",
      "x-default": "https://landscale.agency/contact",
    },
  },
  openGraph: {
    title: "Kapcsolat, ingyenes igényfelmérés | Landscale",
    description: "Foglalj egy ingyenes, 30 perces igényfelmérést, kötelezettség nélkül.",
    type: "website",
    url: "https://landscale.agency/hu/contact",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
