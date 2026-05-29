import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Landscale Agency — AI Estimator & Chatbot for Tradesmen",
  description:
    "AI estimator & chatbot for tradesmen. Instant quotes, automatic lead filtering, 20+ hours saved weekly. Premium websites for roofers, landscapers & builders.",
  keywords:
    "AI estimator for tradesmen, roofing website design UK, AI lead generation for contractors, landscaping marketing agency UK, instant quote tool construction, AI chatbot tradesmen, hardscaping website design, remodelling business automation, home service business website UK",
  alternates: {
    canonical: "https://landscale.agency",
    languages: {
      "en": "https://landscale.agency",
      "hu": "https://landscale.agency/hu",
      "x-default": "https://landscale.agency",
    },
  },
  openGraph: {
    title: "Landscale Agency — AI Estimator & Chatbot for Tradesmen",
    description:
      "AI estimator & chatbot for tradesmen. Instant quotes, automatic lead filtering, 20+ hours saved weekly. Premium websites for roofers, landscapers & builders.",
    type: "website",
    url: "https://landscale.agency",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/opengraph-image", width: 1200, height: 630, alt: "Landscale Agency — AI Lead Qualification for Tradesmen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landscale Agency — AI Estimator & Chatbot for Tradesmen",
    description: "Instant quotes, automatic lead filtering, 20+ hours saved weekly.",
    images: ["https://landscale.agency/opengraph-image"],
  },
  authors: [{ name: "Milan Pirint", url: "https://landscale.agency/about" }],
  creator: "Milan Pirint",
  publisher: "Landscale Agency",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Landscale Agency",
    url: "https://landscale.agency",
    logo: "https://landscale.agency/logo-schema.png",
    description: "AI-powered estimator, chatbot, and website builder for roofers, landscapers, hardscapers, builders, remodellers, and all tradesmen.",
    email: "landscale.agency@gmail.com",
    founder: { "@type": "Person", name: "Milan Pirint" },
    areaServed: ["GB", "HU", "Worldwide"],
    sameAs: [
      "https://www.facebook.com/profile.php?id=100083279266241",
      "https://www.instagram.com/pirintmilan/",
      "https://www.linkedin.com/in/mil%C3%A1n-pirint-0598413b7/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Landscale Agency",
    url: "https://landscale.agency",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://landscale.agency/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Lead Generation & Website Design",
    provider: { "@type": "Organization", name: "Landscale Agency" },
    areaServed: ["GB", "HU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscale Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Estimator Agent" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbot" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design" } },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${cormorant.variable} ${inter.variable} bg-deep-black text-cream antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
