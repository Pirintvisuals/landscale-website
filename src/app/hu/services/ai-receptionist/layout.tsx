import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI recepciós CRM-kapcsolattal | Landscale",
  description: "AI recepciós, amely minden hívást felvesz, a CRM-ből megmondja a rendelés állapotát, és minden hívást automatikusan rögzít.",
  alternates: {
    canonical: "https://landscale.agency/hu/services/ai-receptionist",
    languages: {
      en: "https://landscale.agency/services/ai-receptionist",
      hu: "https://landscale.agency/hu/services/ai-receptionist",
      "x-default": "https://landscale.agency/services/ai-receptionist",
    },
  },
  openGraph: {
    title: "AI recepciós CRM-kapcsolattal | Landscale",
    description: "AI recepciós, amely minden hívást felvesz, a CRM-ből megmondja a rendelés állapotát, és minden hívást automatikusan rögzít.",
    type: "website",
    url: "https://landscale.agency/hu/services/ai-receptionist",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
