import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Becslés Agent & Chatbot Magyar Vállalkozásoknak | Landscale",
  description:
    "AI-alapú automatikus árajánlat és lead-szűrő rendszer magyar szolgáltató vállalkozásoknak. Tereprendezés, kertészet, építőipar, vízvezetékszerelés. Vége a komolytalan érdeklődőknek — 24/7 automatikus válasz.",
  keywords:
    "AI chatbot magyar vállalkozás, automatikus árajánlat rendszer Magyarország, tereprendezés weboldal, kertészet AI lead szűrés, építőipar chatbot, vízvezetékszerelés weboldal, magyar szolgáltató automatizálás, webdesign Miskolc, webdesign Magyarország",
  alternates: {
    canonical: "https://landscale.agency/hu",
    languages: {
      "hu": "https://landscale.agency/hu",
      "en": "https://landscale.agency",
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
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function HuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
