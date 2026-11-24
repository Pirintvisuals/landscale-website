import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI árajánló asszisztens és AI recepciós cégeknek | Landscale",
  description:
    "AI árajánló asszisztens, AI recepciós és terv- és kiírás-ellenőrzés szakipari és építőipari cégeknek. Azonnali árbecslés, minden hívás felvéve, egy tétel sem marad ki.",
  keywords:
    "AI árajánló, automatikus árajánlat rendszer, AI recepciós, tervolvasó, mennyiségkimutatás AI, költségvetés ellenőrzés, ajánlat-előkészítés, közbeszerzés ajánlat, építőipar weboldal, webdesign Magyarország",
  alternates: {
    canonical: "https://landscale.agency/hu",
    languages: {
      "hu": "https://landscale.agency/hu",
      "en": "https://landscale.agency",
      "x-default": "https://landscale.agency",
    },
  },
  openGraph: {
    title: "AI árajánló asszisztens és AI recepciós cégeknek | Landscale",
    description:
      "Vége a komolytalan érdeklődőknek. AI-alapú rendszer, ami 24/7 szűri a leadeket, azonnali árajánlatot ad, és csak a komoly megrendelőket engedi át hozzád.",
    type: "website",
    url: "https://landscale.agency/hu",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function HuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
