import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

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
  title: "Landscale Agency — Marketing for Elite Landscaping Businesses | UK",
  description:
    "AI-powered marketing agency for landscaping businesses. Premium websites, local SEO, and automated lead generation. Stop wasting time on bad leads.",
  keywords:
    "landscaping marketing agency UK, landscaping website design UK, SEO for landscapers UK, AI lead generation for landscapers",
  openGraph: {
    title: "Landscale Agency — Stop Wasting Time on Shitty Leads",
    description:
      "AI-powered marketing for landscaping businesses. Premium websites, local SEO, 24/7 lead generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${cormorant.variable} ${inter.variable} bg-deep-black text-cream antialiased`}
      >
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
