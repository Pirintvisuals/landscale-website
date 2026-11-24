import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terv- és kiírás-ellenőrzés kivitelezőknek | Landscale",
  description: "Mennyiségek a tervrajzokból, összevetve a költségvetéssel, és átnézett ajánlatkérések árazás előtt. Minden szám mellett a forrás.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/tender-review",
    languages: {
      en: "https://landscale.agency/services/tender-review",
      hu: "https://landscale.agency/hu/services/tender-review",
      "x-default": "https://landscale.agency/services/tender-review",
    },
  },
  openGraph: {
    title: "Terv- és kiírás-ellenőrzés kivitelezőknek | Landscale",
    description: "Mennyiségek a tervrajzokból, összevetve a költségvetéssel, és átnézett ajánlatkérések árazás előtt. Minden szám mellett a forrás.",
    type: "website",
    url: "https://landscale.agency/hu/services/tender-review",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
