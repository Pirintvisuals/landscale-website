import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact, Landscale Agency",
  description:
    "Book a free call with Landscale, send a message or ring +36 70 250 1739. Replies usually come the same day.",
  keywords:
    "contact Landscale Agency, AI quoting assistant for tradesmen, contractor website quote, trade business website UK",
  openGraph: {
    title: "Contact, Landscale Agency",
    description:
      "Book a free call or send a message, replies usually the same day.",
    type: "website",
    url: "https://landscale.agency/contact",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
