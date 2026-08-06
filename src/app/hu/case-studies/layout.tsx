import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenciák, éles projektek | Landscale",
  description:
    "Hat éles projekt, amit most azonnal megnyithatsz, köztük működő AI árajánló rendszerek. Valódi weboldalak, valódi vállalkozások, mind a Landscale keze alól.",
  alternates: {
    canonical: "https://landscale.agency/hu/case-studies",
    languages: {
      en: "https://landscale.agency/case-studies",
      hu: "https://landscale.agency/hu/case-studies",
      "x-default": "https://landscale.agency/case-studies",
    },
  },
  openGraph: {
    title: "Referenciák, éles projektek | Landscale",
    description: "Hat éles projekt, köztük működő AI árajánló rendszerek.",
    type: "website",
    url: "https://landscale.agency/hu/case-studies",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
