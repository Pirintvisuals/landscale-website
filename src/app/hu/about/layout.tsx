import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólam, a Landscale története | Landscale",
  description:
    "Pirint Milán, a Landscale alapítója. AI árajánló asszisztenseket, AI recepciósokat és tervellenőrző eszközöket építek szakipari és építőipari cégeknek.",
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
    description: "Pirint Milán, a Landscale alapítója: AI árajánló asszisztensek, AI recepciósok és tervellenőrzés cégeknek.",
    type: "website",
    url: "https://landscale.agency/hu/about",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
