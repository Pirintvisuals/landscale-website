import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI árajánló autószervizeknek, alvázszám alapján | Landscale",
  description:
    "AI árajánló ügynök autószerelőknek és szervizeknek: valódi, tételes árajánlat alvázszám és cikkszám alapján, a saját óradíjaddal. Autó, kisbusz, motor, haszonjármű.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/mechanic-quoting",
    languages: {
      en: "https://landscale.agency/services/mechanic-quoting",
      hu: "https://landscale.agency/hu/services/mechanic-quoting",
      "x-default": "https://landscale.agency/services/mechanic-quoting",
    },
  },
  openGraph: {
    title: "AI árajánló autószervizeknek, alvázszám alapján | Landscale",
    description: "Valódi, tételes árajánlat alvázszám és cikkszám alapján, a saját óradíjaddal.",
    type: "website",
    url: "https://landscale.agency/hu/services/mechanic-quoting",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
