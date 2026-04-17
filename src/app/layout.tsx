import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  title: "Landscale Agency - AI Estimator & Chatbot for Home Service Businesses | Save 20+ Hours/Week",
  description:
    "AI-powered estimator and chatbot for landscaping, construction, and home service businesses. Give automatic quotes, filter out bad leads, save 20+ hours per week. Custom websites with intelligent lead qualification built in.",
  keywords:
    "AI estimator for landscapers, landscaping website design UK, AI lead generation for landscapers, landscaping marketing agency UK, instant quote tool landscaping, AI chatbot home services, construction website design, home service business automation",
  alternates: {
    canonical: "https://landscale.agency",
    languages: {
      "en": "https://landscale.agency",
      "hu": "https://landscale.agency/hu",
    },
  },
  openGraph: {
    title: "Landscale Agency - AI Estimator & Chatbot for Home Service Businesses",
    description:
      "Give automatic quotes, filter out bad leads, save 20+ hours per week. AI-powered websites built for landscaping, construction, and home service businesses.",
    type: "website",
    url: "https://landscale.agency",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landscale Agency - AI Estimator & Chatbot for Home Service Businesses",
    description: "Give automatic quotes, filter out bad leads, save 20+ hours per week.",
    images: ["https://landscale.agency/logo-schema.png"],
  },
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
    description: "AI-powered estimator, chatbot, and website builder for landscaping, construction, and home service businesses.",
    email: "landscale.agency@gmail.com",
    founder: { "@type": "Person", name: "Milan Pirint" },
    areaServed: ["GB", "HU", "Worldwide"],
    sameAs: ["https://www.facebook.com/profile.php?id=100083279266241"],
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
      </body>
    </html>
  );
}
