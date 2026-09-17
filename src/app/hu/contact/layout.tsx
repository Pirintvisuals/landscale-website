import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat | Landscale",
  description:
    "Írj nekem Facebook Messengeren, vagy küldj üzenetet. Általában még aznap válaszolok.",
  alternates: {
    canonical: "https://landscale.agency/hu/contact",
    languages: {
      en: "https://landscale.agency/contact",
      hu: "https://landscale.agency/hu/contact",
      "x-default": "https://landscale.agency/contact",
    },
  },
  openGraph: {
    title: "Kapcsolat | Landscale",
    description: "Írj nekem Facebook Messengeren, általában még aznap válaszolok.",
    type: "website",
    url: "https://landscale.agency/hu/contact",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
