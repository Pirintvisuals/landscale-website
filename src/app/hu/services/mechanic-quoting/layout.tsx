import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Árajánlat-készítő autószervizeknek, alvázszámból | Landscale",
  description:
    "Árajánlat-készítő autószerelőknek és szervizeknek: beírod az alvázszámot, kiválasztod a munkát, és tételes PDF-árajánlatot kapsz a te márkáiddal, áraiddal és óradíjaddal.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/mechanic-quoting",
    languages: {
      en: "https://landscale.agency/services/mechanic-quoting",
      hu: "https://landscale.agency/hu/services/mechanic-quoting",
      "x-default": "https://landscale.agency/services/mechanic-quoting",
    },
  },
  openGraph: {
    title: "Árajánlat-készítő autószervizeknek, alvázszámból | Landscale",
    description: "Tételes PDF-árajánlat alvázszámból, percek alatt, a te márkáiddal, áraiddal és óradíjaddal.",
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
