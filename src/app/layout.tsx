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
  title: "Landscale Agency - AI Estimator for Landscaping Businesses | Save 20+ Hours/Week",
  description:
    "AI-powered instant estimator for landscaping businesses. Give automatic quotes, filter out bad leads, save 20+ hours per week. Custom websites with intelligent lead qualification built in.",
  keywords:
    "AI estimator for landscapers, landscaping website design UK, AI lead generation for landscapers, landscaping marketing agency UK, instant quote tool landscaping",
  openGraph: {
    title: "Landscale Agency - AI Estimator for Landscaping Businesses",
    description:
      "Give automatic quotes, filter out bad leads, save 20+ hours per week. AI-powered websites built exclusively for landscaping businesses.",
    type: "website",
    url: "https://landscale.agency",
    siteName: "Landscale Agency",
    images: [{ url: "https://landscale.agency/logo-schema.png", width: 512, height: 512, alt: "Landscale Agency" }],
  },
  twitter: {
    card: "summary",
    title: "Landscale Agency - AI Estimator for Landscaping Businesses",
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
    description: "AI-powered instant estimator and website builder for landscaping businesses.",
    email: "landscale.agency@gmail.com",
    areaServed: ["GB", "Worldwide"],
    sameAs: [],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
