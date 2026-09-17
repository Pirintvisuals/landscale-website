import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact, Landscale Agency",
  description:
    "Message Landscale on Facebook or send an enquiry. Starting prices are published, and replies usually come the same day.",
  keywords:
    "contact Landscale Agency, AI quoting assistant for tradesmen, contractor website quote, trade business website UK",
  openGraph: {
    title: "Contact, Landscale Agency",
    description:
      "Message me on Facebook, replies usually the same day.",
    type: "website",
    url: "https://landscale.agency/contact",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/og.png", width: 1200, height: 630, alt: "Landscale Agency" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
