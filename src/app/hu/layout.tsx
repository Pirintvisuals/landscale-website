import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Becslés Agent & Chatbot Magyar Vállalkozásoknak | Landscale",
  description:
    "AI árajánlat és lead-szűrő magyar vállalkozásoknak. Tereprendezés, kertészet, építőipar — vége a komolytalan érdeklődőknek. Automatikus válasz 24/7.",
  keywords:
    "AI chatbot magyar vállalkozás, automatikus árajánlat rendszer Magyarország, tereprendezés weboldal, kertészet AI lead szűrés, építőipar chatbot, vízvezetékszerelés weboldal, magyar szolgáltató automatizálás, webdesign Miskolc, webdesign Magyarország",
  alternates: {
    canonical: "https://landscale.agency/hu",
    languages: {
      "hu": "https://landscale.agency/hu",
      "en": "https://landscale.agency",
      "x-default": "https://landscale.agency",
    },
  },
  openGraph: {
    title: "AI Becslés Agent & Chatbot Magyar Vállalkozásoknak | Landscale",
    description:
      "Vége a komolytalan érdeklődőknek. AI-alapú rendszer, ami 24/7 szűri a leadeket, azonnali árajánlatot ad, és csak a komoly megrendelőket engedi át hozzád.",
    type: "website",
    url: "https://landscale.agency/hu",
    siteName: "Landscale Agency",
    locale: "hu_HU",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function HuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
