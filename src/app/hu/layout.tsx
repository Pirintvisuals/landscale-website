import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot & Automatikus Árajánlat | Magyar Vállalkozásoknak az UK-ban | Landscale",
  description:
    "AI chatbot és automatikus árajánlat-rendszer brit alapú magyar szolgáltató vállalkozásoknak. Tereprendezés, építőipar, takarítás, vízvezetékszerelés. Heti 15–20 óra megtakarítás, 24/7 elérhetőség.",
  keywords:
    "AI chatbot magyar vállalkozás UK, automatikus árajánlat rendszer, magyar szolgáltató brit piac, tereprendezés AI, építőipar chatbot, takarítás automatizálás",
  openGraph: {
    title: "AI Chatbot & Automatikus Árajánlat | Magyar Vállalkozásoknak az UK-ban",
    description:
      "Hagyd, hogy az AI szűrje ki a komoly ügyfeleket. 24/7 automatikus válasz, azonnali árajánlat, több megrendelés.",
    type: "website",
    url: "https://landscale.agency/hu",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function HuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
