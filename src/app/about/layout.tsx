import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Landscale — AI & Web Design for Home Service Businesses",
  description:
    "Milan Pirint, founder of Landscale Agency. Building AI-powered websites and lead qualification systems for landscaping, construction, and home service businesses. Based in the UK & Hungary.",
  keywords:
    "Landscale Agency about, Milan Pirint web designer, AI website landscaping UK, home service business web design",
  openGraph: {
    title: "About Landscale — AI & Web Design for Home Service Businesses",
    description:
      "Meet the team behind Landscale. We build AI-powered websites that filter leads and save service businesses 20+ hours per week.",
    type: "website",
    url: "https://landscale.agency/about",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
